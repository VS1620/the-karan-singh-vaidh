import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const assetsDir = path.join(process.cwd(), 'src/assets');
const srcDir = path.join(process.cwd(), 'src');
const indexHtmlPath = path.join(process.cwd(), 'index.html');

async function optimizeImages() {
  const files = fs.readdirSync(assetsDir);
  const renames = new Map();

  for (const file of files) {
    if (file.match(/\.(png|jpe?g)$/i)) {
      const ext = path.extname(file);
      const base = path.basename(file, ext);
      const inputPath = path.join(assetsDir, file);
      const outputPath = path.join(assetsDir, `${base}.webp`);

      console.log(`Processing ${file}...`);
      
      // Limit width to 1920px max for huge images, webp compression at 80% quality
      await sharp(inputPath)
        .resize({ width: 1920, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(outputPath);

      renames.set(file, `${base}.webp`);
      
      // Remove original file to save space and ensure missing imports are caught
      fs.unlinkSync(inputPath);
    }
  }

  // Update references in src/
  function updateReferences(dir) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      if (fs.statSync(fullPath).isDirectory()) {
         if (item !== 'assets') {
           updateReferences(fullPath);
         }
      } else if (fullPath.match(/\.(jsx|js|ts|tsx)$/i)) {
        let content = fs.readFileSync(fullPath, 'utf8');
        let modified = false;
        
        for (const [oldName, newName] of renames) {
          const escapedOld = oldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const regex = new RegExp(escapedOld, 'g');
          if (regex.test(content)) {
             content = content.replace(regex, newName);
             modified = true;
          }
        }
        
        if (modified) {
          fs.writeFileSync(fullPath, content);
          console.log(`Updated references in ${item}`);
        }
      }
    }
  }

  updateReferences(srcDir);

  // Update index.html
  if (fs.existsSync(indexHtmlPath)) {
    let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
    let modified = false;
    for (const [oldName, newName] of renames) {
      const escapedOld = oldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escapedOld, 'g');
      if (regex.test(indexHtml)) {
        indexHtml = indexHtml.replace(regex, newName);
        modified = true;
      }
    }
    if (modified) {
      fs.writeFileSync(indexHtmlPath, indexHtml);
      console.log('Updated index.html references');
    }
  }

  console.log('Image Optimization complete!');
}

optimizeImages().catch(console.error);
