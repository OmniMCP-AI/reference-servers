import { $ } from 'bun';
import { ensureNixDir } from './nixDir';

export let nixpacksPlan = async (id: string, version: string) => {
  let dir = await ensureNixDir(id, version);

  let output = await $`nixpacks plan .`.cwd(dir).text();

  return JSON.parse(output);
};
