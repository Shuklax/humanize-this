import { readdir, copyFile, rm } from 'fs/promises';
import { join } from 'path';

async function fixCJS() {
  const distDir = join(process.cwd(), 'dist');
  const cjsDir = join(distDir, 'cjs');
  
  // Move all .js files from cjs directory to dist and rename to .cjs
  const files = await readdir(cjsDir);
  for (const file of files) {
    if (file.endsWith('.js')) {
      const sourcePath = join(cjsDir, file);
      const targetPath = join(distDir, file.replace('.js', '.cjs'));
      await copyFile(sourcePath, targetPath);
    }
  }
  
  // Clean up cjs directory
  await rm(cjsDir, { recursive: true, force: true });
}

fixCJS().catch(console.error); 