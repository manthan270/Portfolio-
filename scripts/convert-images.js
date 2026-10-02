import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

function getFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getFiles(fullPath, files);
    } else {
      if (['.jpg', '.jpeg', '.png'].includes(path.extname(fullPath).toLowerCase())) {
        files.push(fullPath);
      }
    }
  }
  return files;
}

async function processImages() {
  const imagesDir = path.join(process.cwd(), 'public', 'images');
  if (!fs.existsSync(imagesDir)) {
    throw new Error(`Images directory does not exist: ${imagesDir}`);
  }

  const files = getFiles(imagesDir);
  const deleteOriginals = process.argv.includes('--delete-originals');
  console.log(`Found ${files.length} images to convert.`);

  for (const file of files) {
    console.log(`Processing ${file}...`);
    const ext = path.extname(file);
    const basename = path.basename(file, ext);
    const dir = path.dirname(file);
    
    // Check if it's a hero image (in profile dir or named hero)
    const relativePath = path.relative(imagesDir, file).toLowerCase();
    const isHero = relativePath.split(path.sep).includes('profile') || basename.toLowerCase().includes('hero');
    const quality = isHero ? 85 : 80;

    const image = sharp(file);
    const metadata = await image.metadata();

    // Original size webp
    await image
      .webp({ quality })
      .toFile(path.join(dir, `${basename}.webp`));

    // 800w size webp
    if (metadata.width > 800) {
      await sharp(file)
        .resize({ width: 800 })
        .webp({ quality })
        .toFile(path.join(dir, `${basename}-800.webp`));
    }

    // 400w size webp
    if (metadata.width > 400) {
      await sharp(file)
        .resize({ width: 400 })
        .webp({ quality })
        .toFile(path.join(dir, `${basename}-400.webp`));
    }

    if (deleteOriginals) fs.unlinkSync(file);
    console.log(`Generated ${basename}.webp${deleteOriginals ? ' and removed the original' : '; kept the original'}`);
  }
}

processImages().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
