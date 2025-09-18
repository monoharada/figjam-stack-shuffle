const esbuild = require('esbuild');
const fs = require('fs');

async function build() {
  console.log('🔨 Building Figma Plugin...');

  // Clean dist directory
  if (fs.existsSync('./dist')) {
    fs.rmSync('./dist', { recursive: true });
  }
  fs.mkdirSync('./dist');

  // 1. Build UI script first
  await esbuild.build({
    entryPoints: ['src/ui.ts'],
    bundle: true,
    outfile: 'dist/ui.js',
    target: 'es2020',
    format: 'iife',
    minify: false,
    logLevel: 'info'
  });

  // 2. Read the built UI script
  const uiScript = fs.readFileSync('./dist/ui.js', 'utf8');

  // 3. Read HTML template
  let html = fs.readFileSync('./ui/index.html', 'utf8');

  // 4. Replace the external script tag with inline script
  html = html.replace(
    '<script type="text/javascript" src="./ui.js"></script>',
    `<script>${uiScript}</script>`
  );

  // 5. Save the complete HTML (for debugging)
  fs.writeFileSync('./dist/ui.html', html);

  // 6. Build plugin code with HTML embedded
  await esbuild.build({
    entryPoints: ['src/code.ts'],
    bundle: true,
    outfile: 'dist/code.js',
    target: 'es2020',
    format: 'iife',
    minify: false,
    logLevel: 'info',
    define: {
      '__html__': JSON.stringify(html)
    }
  });

  console.log('✅ Build complete!');
  console.log('   dist/code.js contains the plugin with embedded UI');
}

build().catch(err => {
  console.error(err);
  process.exit(1);
});