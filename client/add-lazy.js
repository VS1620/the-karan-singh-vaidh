import fs from 'fs';
import path from 'path';

const dirsToProcess = [
  path.join(process.cwd(), 'src/components/home'),
  path.join(process.cwd(), 'src/components/layout')
];

const excludeFiles = ['Hero.jsx'];

function processDir(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.match(/\.jsx?$/i) && !excludeFiles.includes(item)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      // match <img ... > but ensure we don't add duplicate loading="lazy"
      // using regex to add loading="lazy" if not present
      if (/<img\s+(?!.*loading=["'](lazy|eager)["'])/.test(content)) {
        content = content.replace(/<img\s+(?![^>]*loading=["'](lazy|eager)["'])/g, '<img loading="lazy" ');
        fs.writeFileSync(fullPath, content);
        console.log(`Added loading="lazy" to ${item}`);
      }
    }
  }
}

for (const dir of dirsToProcess) {
  if (fs.existsSync(dir)) {
    processDir(dir);
  }
}
