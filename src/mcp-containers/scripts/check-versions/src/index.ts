import { canonicalize } from '@metorial-mcp-containers/canonicalize';
import { getAllServers, readManifest } from '@metorial-mcp-containers/manifest';
import { nixpacksPlan } from '@metorial-mcp-containers/nixpacks';
import { $ } from 'bun';
import fs from 'fs-extra';
import PQueue from 'p-queue';
import path from 'path';
import sade from 'sade';
import { generateRepoReadme } from './readme/repo';
import { generateServerReadme } from './readme/server';

sade('check-versions', true)
  .option('--force, -f', 'Force version manifest creation even if it exists')
  .action(async (opts: { force: boolean }) => {
    let servers = await getAllServers();
    console.log(`Found ${servers.length} servers`);

    let rootDir = path.join(__dirname, '../../..');
    let catalogDir = path.join(rootDir, 'catalog');

    let normalizedServers = servers.map(s => ({
      id: s.id,
      owner: s.repo.owner,
      repo: s.repo.repo,
      repoUrl: s.repo.url
    }));

    await fs.writeFile(
      path.join(catalogDir, 'index.json'),
      JSON.stringify(normalizedServers, null, 2)
    );

    await fs.writeFile(path.join(rootDir, 'README.md'), await generateRepoReadme(servers));

    let queue = new PQueue({ concurrency: 10 });

    for (let server of servers) {
      queue.add(async () => {
        let version = (
          await $`git ls-remote ${server.repo.url} ${server.repo.branch} | awk '{ print $1 }'`.text()
        )
          .trim()
          .split(' ')[0]
          .split('\n')[0];

        let fullServerId = `${server.repo.owner}/${server.repo.repo}/${server.id}`;
        let manifest = await readManifest(fullServerId);
        let canonicalizedManifest = canonicalize(manifest);
        let manifestHash = Bun.CryptoHasher.hash('sha3-512', canonicalizedManifest)
          .toHex()
          .slice(0, 32);

        let serverDir = path.join(catalogDir, server.repo.owner, server.repo.repo, server.id);
        let versionsDir = path.join(serverDir, 'versions');
        let versionDir = path.join(versionsDir, version);

        await fs.writeFile(
          path.join(serverDir, 'README.md'),
          await generateServerReadme(server)
        );

        let versionExists = await fs.pathExists(versionDir);
        if (versionExists) {
          let versionManifest = await fs.readJSON(
            path.join(versionDir, 'version.json'),
            'utf-8'
          );

          if (versionManifest.manifestHash != manifestHash) {
            versionExists = false;

            console.log(
              `Version ${version} for ${fullServerId} exists but has a different manifest, rebuilding`
            );

            await fs.remove(versionDir);
          }
        }

        if (!versionExists || opts.force) {
          console.log(`Creating version ${version} for ${fullServerId}`);

          try {
            let plan = await nixpacksPlan(fullServerId, version);

            let versionConfig = {
              serverId: fullServerId,
              version,
              manifest,
              manifestHash,
              createdAt: new Date(),
              builder: [
                {
                  type: 'nixpacks',
                  plan
                }
              ]
            };

            await fs.mkdirp(versionDir);
            await fs.writeFile(
              path.join(versionDir, 'version.json'),
              JSON.stringify(versionConfig, null, 2)
            );
          } catch (e: any) {
            console.error(`Error creating version ${version} for ${fullServerId}:`);

            if (e.stdout) console.log(await new Response(e.stdout).text());
            if (e.stderr) console.log(await new Response(e.stderr).text());

            throw e;
          }
        } else {
          console.log(`Version ${version} for ${fullServerId} already exists`);
        }
      });
    }

    await queue.onIdle();

    console.log('Done');
  })
  .parse(process.argv);
