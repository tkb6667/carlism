const fs = require("fs");
const path = require("path");
const vm = require("vm");
const sharp = require("sharp");


/* =========================================
   CONFIG
========================================= */

const ROOT_DIR = path.resolve(__dirname, "..");

const PRODUCTS_FILE = path.join(
  ROOT_DIR,
  "data",
  "products.js"
);

const HERO_ROOT = path.join(
  ROOT_DIR,
  "assets",
  "products"
);

const THUMB_WIDTH = 1200;
const WEBP_QUALITY = 88;


/* =========================================
   LOAD PRODUCTS.JS
========================================= */

function loadProducts() {

  if (!fs.existsSync(PRODUCTS_FILE)) {
    throw new Error(
      `ไม่พบไฟล์: ${PRODUCTS_FILE}`
    );
  }


  const code =
    fs.readFileSync(
      PRODUCTS_FILE,
      "utf8"
    );


  const sandbox = {
    window: {}
  };


  vm.createContext(sandbox);


  vm.runInContext(
    code,
    sandbox,
    {
      filename: PRODUCTS_FILE
    }
  );


  const products =
    sandbox.window.products;


  if (!Array.isArray(products)) {
    throw new Error(
      "ไม่พบ window.products ใน data/products.js"
    );
  }


  return products;
}


/* =========================================
   GET THUMBNAIL PATH
========================================= */

function getThumbnailPath(imagePath) {

  const normalized =
    imagePath.replace(/\\/g, "/");


  const directory =
    path.posix.dirname(normalized);


  const filename =
    path.posix.basename(
      normalized,
      path.posix.extname(normalized)
    );


  return path.posix.join(
    directory,
    "thumbs",
    `${filename}.webp`
  );
}


/* =========================================
   GET HERO IMAGES
========================================= */

function getHeroImages() {

  const heroImages = [];


  if (!fs.existsSync(HERO_ROOT)) {
    return heroImages;
  }


  const folders =
    fs.readdirSync(
      HERO_ROOT,
      {
        withFileTypes: true
      }
    );


  folders.forEach((folder) => {

    if (!folder.isDirectory()) {
      return;
    }


    const heroFolder =
      path.join(
        HERO_ROOT,
        folder.name,
        "hero"
      );


    if (!fs.existsSync(heroFolder)) {
      return;
    }


    const files =
      fs.readdirSync(
        heroFolder,
        {
          withFileTypes: true
        }
      );


    files.forEach((file) => {

      if (!file.isFile()) {
        return;
      }


      const extension =
        path.extname(
          file.name
        ).toLowerCase();


      if (
        extension !== ".jpg" &&
        extension !== ".jpeg" &&
        extension !== ".png" &&
        extension !== ".webp"
      ) {
        return;
      }


      const absolutePath =
        path.join(
          heroFolder,
          file.name
        );


      const relativePath =
        path.relative(
          ROOT_DIR,
          absolutePath
        );


      heroImages.push(
        relativePath.replace(/\\/g, "/")
      );

    });

  });


  return heroImages;
}


/* =========================================
   CREATE ONE THUMBNAIL
========================================= */

async function createThumbnail(
  imagePath,
  index,
  total
) {

  const thumbnailPath =
    getThumbnailPath(imagePath);


  const sourceFile =
    path.join(
      ROOT_DIR,
      ...imagePath.split("/")
    );


  const outputFile =
    path.join(
      ROOT_DIR,
      ...thumbnailPath.split("/")
    );


  const outputDirectory =
    path.dirname(outputFile);


  console.log("");

  console.log(
    `[${index}/${total}] ${imagePath}`
  );


  /* =======================================
     CHECK ORIGINAL
  ======================================== */

  if (!fs.existsSync(sourceFile)) {

    console.log(
      "  ❌ ไม่พบ Original"
    );

    return {
      status: "missing",
      imagePath,
      thumbnailPath
    };
  }


  /* =======================================
     CREATE THUMBS FOLDER
  ======================================== */

  fs.mkdirSync(
    outputDirectory,
    {
      recursive: true
    }
  );


  /* =======================================
     CHECK IF THUMBNAIL IS UP TO DATE
  ======================================== */

  if (fs.existsSync(outputFile)) {

    const sourceStat =
      fs.statSync(sourceFile);

    const thumbnailStat =
      fs.statSync(outputFile);


    if (
      thumbnailStat.mtimeMs >=
      sourceStat.mtimeMs
    ) {

      console.log(
        "  ⏭️  มี Thumbnail ล่าสุดแล้ว"
      );

      console.log(
        `  → ${thumbnailPath}`
      );

      return {
        status: "skipped",
        imagePath,
        thumbnailPath
      };
    }
  }


  /* =======================================
     GENERATE WEBP
  ======================================== */

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


    const thumbnailSize =
      fs.statSync(outputFile).size;


    const originalMB =
      (
        originalSize /
        1024 /
        1024
      ).toFixed(2);


    const thumbnailKB =
      (
        thumbnailSize /
        1024
      ).toFixed(0);


    const saving =
      (
        (
          1 -
          thumbnailSize /
          originalSize
        ) *
        100
      ).toFixed(1);


    console.log(
      `  ✅ ${originalMB} MB → ${thumbnailKB} KB`
    );

    console.log(
      `  📉 ลด ${saving}%`
    );

    console.log(
      `  → ${thumbnailPath}`
    );


    return {
      status: "created",
      imagePath,
      thumbnailPath
    };

  } catch (error) {

    console.log(
      "  ❌ สร้าง Thumbnail ไม่สำเร็จ"
    );

    console.log(
      `  ${error.message}`
    );


    return {
      status: "error",
      imagePath,
      thumbnailPath
    };

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
    " CARLISM TH - THUMBNAIL GENERATOR"
  );

  console.log(
    "========================================="
  );


  const products =
    loadProducts();


  /* =======================================
     PRODUCT IMAGES
  ======================================== */

  const productImages =
    products

      .map(
        (product) =>
          product.image
      )

      .filter(
        (image) =>
          typeof image === "string" &&
          image.trim() !== ""
      );


  /* =======================================
     HERO IMAGES
  ======================================== */

  const contactImages = [
  "assets/images/hero/DSC00740.jpg"
];


  /* =======================================
     MERGE ALL
  ======================================== */

const allImages =
  [
    ...new Set([
      ...productImages,
      ...heroImages,
      ...contactImages
    ])
  ];


  console.log("");

  console.log(
    `พบสินค้า: ${products.length} รายการ`
  );

  console.log(
    `รูปสินค้า: ${productImages.length} รูป`
  );

  console.log(
    `Hero: ${heroImages.length} รูป`
  );

  console.log(
    `รวมทั้งหมด: ${allImages.length} รูป`
  );

  console.log(
    `ขนาดสูงสุด: ${THUMB_WIDTH}px`
  );

  console.log(
    `WebP Quality: ${WEBP_QUALITY}%`
  );


  const results = [];


  for (
    let i = 0;
    i < allImages.length;
    i++
  ) {

    const result =
      await createThumbnail(
        allImages[i],
        i + 1,
        allImages.length
      );


    results.push(result);

  }


  /* =======================================
     SUMMARY
  ======================================== */

  const created =
    results.filter(
      (item) =>
        item.status === "created"
    ).length;


  const skipped =
    results.filter(
      (item) =>
        item.status === "skipped"
    ).length;


  const missing =
    results.filter(
      (item) =>
        item.status === "missing"
    ).length;


  const errors =
    results.filter(
      (item) =>
        item.status === "error"
    ).length;


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
    `⏭️  มีอยู่แล้ว: ${skipped}`
  );

  console.log(
    `❌ ไม่พบ Original: ${missing}`
  );

  console.log(
    `⚠️  Error: ${errors}`
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

  console.error(
    error
  );

  process.exit(1);

});