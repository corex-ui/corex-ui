import fs from 'fs-extra';

const run = async () => {
  if (await fs.pathExists('src')) {
    await fs.emptyDir('dist');
    await fs.copy('src', 'dist');
    console.log('✅ Copied src to dist');
  } else {
    console.warn('⚠️ No src directory found to copy.');
  }
};

run().catch((err) => {
  console.error('❌ Build script failed:', err);
  process.exit(1);
});
