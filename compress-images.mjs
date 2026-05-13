import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.join(__dirname, "src", "assets");
const outputDir = path.join(__dirname, "src", "assets-optimized");

const allowedExtensions = [".jpg", ".jpeg", ".png"];

function walkDir(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      walkDir(filePath, fileList);
    } else if (allowedExtensions.includes(path.extname(file).toLowerCase())) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

async function compressImages() {
  const images = walkDir(inputDir);

  for (const imagePath of images) {
    const relativePath = path.relative(inputDir, imagePath);
    const parsedPath = path.parse(relativePath);

    const outputSubDir = path.join(outputDir, parsedPath.dir);
    const outputPath = path.join(outputSubDir, `${parsedPath.name}.webp`);

    fs.mkdirSync(outputSubDir, { recursive: true });

    await sharp(imagePath)
      .resize({
        width: 1600,
        withoutEnlargement: true,
      })
      .webp({
        quality: 82,
      })
      .toFile(outputPath);

    console.log(`Compressed: ${relativePath} → ${path.relative(__dirname, outputPath)}`);
  }

  console.log("Done. Optimized images are inside src/assets-optimized.");
}

compressImages().catch((error) => {
  console.error("Compression failed:", error);
});