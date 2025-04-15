import { getAllServers, getServerVersions } from '@metorial-mcp-containers/manifest';
import fs from 'fs-extra';
import path from 'path';
import sade from 'sade';

let prog = sade('index');

prog.command('build', undefined, { default: true }).action(async () => {
  let out = path.join(process.cwd(), 'out');
  await fs.ensureDir(out);
  await fs.emptyDir(out);

  let servers = await getAllServers();

  let serversDir = path.join(out, 'servers');
  await fs.ensureDir(serversDir);

  await fs.writeFile(path.join(serversDir, 'list.json'), JSON.stringify(servers, null, 2));

  for (let server of servers) {
    let serverDir = path.join(serversDir, server.fullId);
    await fs.ensureDir(serverDir);

    await fs.writeFile(path.join(serverDir, 'info.json'), JSON.stringify(server, null, 2));

    let serverVersions = await getServerVersions(server.fullId);

    await fs.writeFile(
      path.join(serverDir, 'versions.json'),
      JSON.stringify(serverVersions, null, 2)
    );
  }
});

prog.parse(process.argv);
