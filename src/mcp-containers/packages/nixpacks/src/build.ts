import { delay } from '@metorial-mcp-containers/delay';
import { readManifest } from '@metorial-mcp-containers/manifest';
import { TOML } from 'bun';
import fs from 'fs-extra';
import path from 'path';
import { ensureNixDir } from './nixDir';

export let getContainerName = (id: string) => {
  return `ghcr.io/metorial/mcp-container--${id.replaceAll('/', '--')}`.toLowerCase();
};

export let nixpacksBuild = async (
  id: string,
  version: string,
  opts: {
    platform?: string;
    publish?: boolean;
    out?: string;
    ci?: boolean;
  }
) => {
  if (opts.out && opts.ci) {
    throw new Error('Cannot use out and ci together');
  }

  if (opts.ci && !opts.platform) {
    throw new Error('Cannot use out and ci together');
  }

  console.log(`Building ${id} (${version})...`);

  let manifest = await readManifest(id);
  let buildDir = await ensureNixDir(id, version);

  if (manifest.build?.buildDir) {
    buildDir = path.join(buildDir, manifest.build.buildDir);
  }

  let name = getContainerName(id);

  let labels = {
    source: manifest.repo.url,
    publisher: 'Metorial'
  };

  let tags = opts.ci
    ? [`${name}:${version}-${opts.platform!.replace('linux/', '')}`]
    : [`${name}:${version}`, `${name}:latest`];

  let cmd: string[] = ['nixpacks', 'build', '.'];
  cmd.push('--name', name);
  if (opts.platform && !opts.ci) cmd.push('--platform', opts.platform);
  if (opts.out) cmd.push('--out', opts.out);
  for (let tag of tags) cmd.push('--tag', tag);
  for (let [key, value] of Object.entries(labels)) {
    cmd.push('--label', `org.opencontainers.image.${key}=${value}`);
  }

  if (manifest.build?.startCommand) {
    cmd.push('--start-cmd', manifest.build.startCommand);
  } else {
    let packageJsonPath = path.join(buildDir, 'package.json');
    if (await fs.exists(packageJsonPath)) {
      let packageJson = await fs.readJSON(packageJsonPath);

      if (!packageJson.scripts?.start) {
        if (packageJson.bin || packageJson.bins) {
          let bin = packageJson.bin || packageJson.bins;
          if (typeof bin == 'object') bin = Object.values(bin)[0];

          cmd.push('--start-cmd', `node ${bin}`);
        } else if (packageJson.main) {
          cmd.push('--start-cmd', `node ${packageJson.main}`);
        }
      }
    }

    let pyProjectPath = path.join(buildDir, 'pyproject.toml');
    if (await fs.exists(pyProjectPath)) {
      let pyProjectRaw = await fs.readFile(pyProjectPath, 'utf-8');
      let pyProject = TOML.parse(pyProjectRaw) as {
        project: { scripts: Record<string, string> };
      };

      if (pyProject?.project?.scripts) {
        let anyScript = Object.keys(pyProject.project.scripts)[0];
        if (anyScript) cmd.push('--start-cmd', anyScript);
      }
    }
  }

  if (manifest.build?.buildCommand) {
    cmd.push('--build-cmd', manifest.build.buildCommand);
  }

  if (manifest.build?.installCommand) {
    cmd.push('--install-cmd', manifest.build.installCommand);
  }

  if (manifest.build?.nixPackages) {
    for (let pkg of manifest.build.nixPackages) {
      cmd.push('--pkgs', pkg);
    }
  }

  if (manifest.build?.aptPackages) {
    for (let pkg of manifest.build.aptPackages) {
      cmd.push('--apt', pkg);
    }
  }

  if (opts.ci) cmd.push('--out', buildDir);

  // Run Nixpacks build
  console.log(`Running: ${cmd.join(' ')}`);

  let proc = Bun.spawn({
    cmd,
    cwd: buildDir,
    stdout: 'inherit',
    stderr: 'inherit',
    env: {
      ...process.env,

      NIXPACKS_NODE_VERSION: manifest.build?.nodeVersion ?? '20',
      NIXPACKS_PYTHON_VERSION: manifest.build?.pythonVersion ?? '3.11'
    }
  });

  await proc.exited;

  if (proc.exitCode !== 0) {
    throw new Error(`Failed to build ${id} (${version})`);
  }

  // Build the image manually if ci is set
  if (opts.ci) {
    await delay(100);

    let buildxCreate = Bun.spawn({
      cmd: ['docker', 'buildx', 'create', '--use'],
      cwd: buildDir,
      stdout: 'inherit',
      stderr: 'inherit'
    });
    await buildxCreate.exited;
    if (buildxCreate.exitCode !== 0) {
      throw new Error(`Failed to create buildx instance`);
    }

    let buildScript = (
      await fs.readFile(path.join(buildDir, '.nixpacks', 'build.sh'), 'utf-8')
    ).replace('docker build', 'docker buildx build');
    buildScript += ' --push --provenance false';

    console.log(`Running: ${buildScript}`);

    let ciProc = Bun.spawn({
      cmd: buildScript.split(' '),
      cwd: buildDir,
      stdout: 'inherit',
      stderr: 'inherit',
      env: {
        ...process.env,
        NIXPACKS_NODE_VERSION: manifest.build?.nodeVersion ?? '20',
        NIXPACKS_PYTHON_VERSION: manifest.build?.pythonVersion ?? '3.11'
      }
    });

    await ciProc.exited;
    if (ciProc.exitCode !== 0) {
      throw new Error(`Failed to build ${id} (${version})`);
    }
  }

  console.log(`Built ${id} (${version})`);

  // Test the image
  if (!opts.out) {
    let testCmd = ['docker', 'run', '--rm', '--interactive', tags[0]];

    console.log('Testing container');
    console.log(`Running: ${testCmd.join(' ')}`);

    let testRun = Bun.spawn({
      cmd: testCmd,
      cwd: buildDir,
      stdout: 'inherit',
      stderr: 'inherit'
    });

    await delay(2000);

    if (testRun.exitCode !== null) testRun.kill();

    try {
      testRun.disconnect();
    } catch (e) {}
  }

  // Publish the image
  if (opts.publish && !opts.ci) {
    console.log(`Publishing ${id} (${version})...`);

    for (let tag of tags) {
      let publishCmd = ['docker', 'push', tag];

      console.log(`Publishing: ${tag}`);
      console.log(`Running: ${publishCmd.join(' ')}`);

      let tryNumber = 0;
      let maxRetries = 5;

      try {
        let publishProc = Bun.spawn({
          cmd: publishCmd,
          cwd: buildDir,
          stdout: 'inherit',
          stderr: 'inherit'
        });

        await publishProc.exited;

        if (publishProc.exitCode !== 0) {
          throw new Error(`Failed to publish ${id} (${version})`);
        }
      } catch (e) {
        if (tryNumber >= maxRetries) throw e;

        tryNumber++;
        await delay(2000 * tryNumber);
      }
    }

    console.log(`Published ${id} (${version})`);
  }
};
