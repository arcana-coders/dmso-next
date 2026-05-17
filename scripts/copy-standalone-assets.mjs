import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const standaloneDir = join(root, '.next', 'standalone');

if (!existsSync(standaloneDir)) {
  console.log('[postbuild] .next/standalone no existe; nada que copiar.');
  process.exit(0);
}

const targets = [
  { from: join(root, '.next', 'static'), to: join(standaloneDir, '.next', 'static') },
  { from: join(root, 'public'), to: join(standaloneDir, 'public') },
];

for (const { from, to } of targets) {
  if (!existsSync(from)) continue;
  mkdirSync(to, { recursive: true });
  cpSync(from, to, { recursive: true });
  console.log(`[postbuild] copiado ${from} -> ${to}`);
}
