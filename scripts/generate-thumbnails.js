const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

/* =========================================
   CONFIG
========================================= */

const ROOT_DIR = path.resolve(__dirname, "..");

const IMAGES_ROOT = path.join(
  ROOT_DIR,
  "assets",
  "images"
);

const THUMB_WIDTH = 1200;
const WEBP_QUALITY = 88;

const IMAGE_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png"
];


/* =========================================
   FIND ALL IMAGES
========================================= */

function getAllImages(directory) {
  const images = [];

  if (!fs.existsSync(directory)) {
    return images;
  }

  const items = fs.readdirSync(directory, {
    withFileTypes: true
  });

  for (const item of items) {
    const fullPath = path.join(
      directory,
      item.name
    );

    if (item.isDirectory()) {

      // ไม่เข้าไปสร้าง thumbs ซ้อน thumbs
      if (
        item.name.toLowerCase() === "thumbs"
      ) {
        continue;
      }

      images.push(
        ...getAllImages(fullPath)
      );

      continue;
    }

    if (!item.isFile()) {
      continue;
    }

    const extension = path
      .extname(item.name)
      .toLowerCase();

    if (
      IMAGE_EXTENSIONS.includes(extension)
    ) {
      images.push(fullPath);
    }
  }

  return images;
}


/* =========================================
   GET WEBP PATH
========================================= */

function getWebpPath(sourceFile) {
  const sourceDirectory =
    path.dirname(sourceFile);

  const filename =
    path.basename(
      sourceFile,
      path.extname(sourceFile)
    );

  return path.join(
    sourceDirectory,
    "thumbs",
    `${filename}.webp`
  );
}


/* =========================================
   CREATE WEBP
========================================= */

async function createWebp(
  sourceFile,
  index,
  total
) {
  const outputFile =
    getWebpPath(sourceFile);

  const outputDirectory =
    path.dirname(outputFile);

  const relativeSource =
    path.relative(
      ROOT_DIR,
      sourceFile
    );

  const relativeOutput =
    path.relative(
      ROOT_DIR,
      outputFile
    );

  console.log("");
  console.log(
    `[${index}/${total}] ${relativeSource}`
  );

  /* -----------------------------------------
     SKIP EXISTING WEBP
  ----------------------------------------- */

  if (fs.existsSync(outputFile)) {
    console.log(
      "  ⏭️ มี WebP อยู่แล้ว"
    );

    console.log(
      `  → ${relativeOutput}`
    );

    return "skipped";
  }


  /* -----------------------------------------
     CREATE thumbs FOLDER
  ----------------------------------------- */

  fs.mkdirSync(
    outputDirectory,
    {
      recursive: true
    }
  );


  /* -----------------------------------------
     CONVERT
  ----------------------------------------- */

  try {
    await sharp(sourceFile)
      .rotate()
      .resize({
        width: THUMB_WIDTH,
        withoutEnlargement: true,
        fit: "inside"
      })
      .webp({
        quality: WEBP_QUALITY,
        effort: 4
      })
      .toFile(outputFile);


    const originalSize =
      fs.statSync(sourceFile).size;

    const webpSize =
      fs.statSync(outputFile).size;

    const originalMB =
      (
        originalSize /
        1024 /
        1024
      ).toFixed(2);

    const webpKB =
      (
        webpSize /
        1024
      ).toFixed(0);

    const saving =
      originalSize > 0
        ? (
            (
              1 -
              webpSize / originalSize
            ) *
            100
          ).toFixed(1)
        : "0.0";


    console.log(
      `  ✅ ${originalMB} MB → ${webpKB} KB`
    );

    console.log(
      `  📉 ลด ${saving}%`
    );

    console.log(
      `  → ${relativeOutput}`
    );

    return "created";

  } catch (error) {

    console.log(
      "  ❌ แปลงไม่สำเร็จ"
    );

    console.log(
      `  ${error.message}`
    );

    return "error";
  }
}


/* =========================================
   MAIN
========================================= */

async function main() {

  console.log("");
  console.log(
    "========================================="
  );
  console.log(
    " CARLISM TH - WEBP GENERATOR"
  );
  console.log(
    "========================================="
  );


  const images =
    getAllImages(IMAGES_ROOT);


  console.log("");
  console.log(
    `พบรูปทั้งหมด: ${images.length} รูป`
  );

  console.log(
    `WebP Width: ${THUMB_WIDTH}px`
  );

  console.log(
    `WebP Quality: ${WEBP_QUALITY}%`
  );


  let created = 0;
  let skipped = 0;
  let errors = 0;


  for (
    let i = 0;
    i < images.length;
    i++
  ) {

    const result =
      await createWebp(
        images[i],
        i + 1,
        images.length
      );

    if (result === "created") {
      created++;
    }

    if (result === "skipped") {
      skipped++;
    }

    if (result === "error") {
      errors++;
    }
  }


  console.log("");
  console.log(
    "========================================="
  );
  console.log(
    " เสร็จเรียบร้อย"
  );
  console.log(
    "========================================="
  );

  console.log(
    `✅ สร้างใหม่: ${created}`
  );

  console.log(
    `⏭️ มีอยู่แล้ว: ${skipped}`
  );

  console.log(
    `⚠️ Error: ${errors}`
  );

  console.log("");
}


/* =========================================
   RUN
========================================= */

main().catch((error) => {
  console.error("");
  console.error(
    "เกิดข้อผิดพลาด:"
  );
  console.error(error);

  process.exit(1);
});