document.addEventListener("DOMContentLoaded", () => {

  const products =
    Array.isArray(window.products)
      ? window.products
      : [];

  const params =
    new URLSearchParams(
      window.location.search
    );

  const id =
    Number(params.get("id"));

  const product =
    products.find(
      item => Number(item.id) === id
    );

  if (!product) {
    console.error(
      "Product not found:",
      id
    );
    return;
  }


  /* =========================================
     CATEGORY
  ========================================== */

  const categoryNames = {
    "wheels-suspension": "WHEELS & SUSPENSION",
    performance: "PERFORMANCE",
    exterior: "EXTERIOR",
    interior: "INTERIOR",
    tuning: "TUNING",
    accessories: "ACCESSORIES"
  };

  const categoryName =
    categoryNames[product.category] ||
    "PRODUCTS";


  /* =========================================
     INFO
  ========================================== */

  document.title =
    `${product.name} | CARLISM TH`;

  const categoryLink =
    document.querySelector(
      "#detailCategoryLink"
    );

  if (categoryLink) {
    categoryLink.textContent =
      categoryName;

    categoryLink.href =
      `products.html?category=${product.category}`;
  }


  function setText(id, value) {

    const element =
      document.querySelector(id);

    if (element) {
      element.textContent =
        value || "-";
    }
  }


  setText(
    "#detailCategory",
    product.subcategoryLabel ||
    product.subcategory
  );

  setText(
    "#detailBrand",
    product.brand
  );

  setText(
    "#detailName",
    product.name
  );

  setText(
    "#detailSubtitle",
    product.subtitle ||
    product.variant ||
    ""
  );

  setText(
    "#detailPrice",
    product.price ||
    "CONTACT"
  );

  setText(
    "#detailSpecCategory",
    product.subcategoryLabel ||
    product.subcategory
  );

  setText(
    "#detailSpecBrand",
    product.brand
  );

  setText(
    "#detailSpecFinish",
    product.subtitle ||
    product.variant
  );


  /* =========================================
     GALLERY
  ========================================== */

  const gallery =
    Array.isArray(product.gallery) &&
    product.gallery.length
      ? product.gallery
      : [product.image];

  let index = 0;


  const mainImage =
    document.querySelector(
      "#detailMainImage"
    );

  const mainButton =
    document.querySelector(
      "#detailMainButton"
    );

  const thumbs =
    document.querySelector(
      "#detailThumbnails"
    );

  const lightbox =
    document.querySelector(
      "#detailLightbox"
    );

  const lightboxImage =
    document.querySelector(
      "#detailLightboxImage"
    );

  const counter =
    document.querySelector(
      "#detailLightboxCounter"
    );


  /* =========================================
     WEBP PATH
  ========================================== */

  function getThumbnailPath(imagePath) {

    if (!imagePath) {
      return "";
    }

    const normalized =
      imagePath.replace(/\\/g, "/");

    const slash =
      normalized.lastIndexOf("/");

    if (slash === -1) {
      return imagePath;
    }

    const directory =
      normalized.substring(
        0,
        slash
      );

    const filename =
      normalized.substring(
        slash + 1
      );

    const name =
      filename.replace(
        /\.[^/.]+$/,
        ""
      );

    return (
      `${directory}/thumbs/` +
      `${name}.webp`
    );
  }


  /* =========================================
     THUMBNAILS
  ========================================== */

  thumbs.innerHTML =
    gallery
      .map(
        (image, i) => {

          const webp =
            getThumbnailPath(image);

          return `
            <button
              type="button"
              class="detail-thumb ${
                i === 0 ? "active" : ""
              }"
              data-index="${i}"
            >
              <img
                src="${webp}"
                data-original="${image}"
                alt="${product.name} ${i + 1}"
                loading="lazy"
                decoding="async"
              >
            </button>
          `;
        }
      )
      .join("");


  /* =========================================
     THUMB FALLBACK
  ========================================== */

  thumbs
    .querySelectorAll("img")
    .forEach((image) => {

      image.addEventListener(
        "error",
        () => {

          const original =
            image.dataset.original;

          if (
            original &&
            image.dataset.fallbackUsed !== "true"
          ) {

            image.dataset.fallbackUsed =
              "true";

            image.src =
              original;
          }

        }
      );

    });


  /* =========================================
     LOAD ORIGINAL IN BACKGROUND
  ========================================== */

  function loadFullImage(
    original,
    targetImage
  ) {

    const fullImage =
      new Image();

    fullImage.src =
      original;

    fullImage.onload = () => {

      if (
        lightbox.classList.contains("active") &&
        gallery[index] === original
      ) {

        targetImage.src =
          original;

      }

    };
  }


  /* =========================================
     SHOW IMAGE
  ========================================== */

  function showImage(newIndex) {

    index =
      (newIndex + gallery.length) %
      gallery.length;

    const original =
      gallery[index];

    const webp =
      getThumbnailPath(original);


    /* MAIN IMAGE → WEBP */

    delete mainImage.dataset.fallbackUsed;

    mainImage.dataset.original =
      original;

    mainImage.src =
      webp;

    mainImage.alt =
      `${product.name} ${index + 1}`;

    mainImage.loading =
      "eager";

    mainImage.decoding =
      "async";


    /* WEBP ไม่มี → ORIGINAL */

    mainImage.onerror = () => {

      if (
        mainImage.dataset.fallbackUsed !== "true"
      ) {

        mainImage.dataset.fallbackUsed =
          "true";

        mainImage.src =
          original;

      }

    };


    /* LIGHTBOX เปิดอยู่ */

    if (
      lightbox.classList.contains(
        "active"
      )
    ) {

      lightboxImage.src =
        webp;

      lightboxImage.alt =
        `${product.name} ${index + 1}`;

      loadFullImage(
        original,
        lightboxImage
      );

    }


    counter.textContent =
      `${index + 1} / ${gallery.length}`;


    thumbs
      .querySelectorAll(
        ".detail-thumb"
      )
      .forEach(
        (button, i) => {

          button.classList.toggle(
            "active",
            i === index
          );

        }
      );
  }


  /* =========================================
     THUMB CLICK
  ========================================== */

  thumbs.addEventListener(
    "click",
    (event) => {

      const button =
        event.target.closest(
          ".detail-thumb"
        );

      if (!button) {
        return;
      }

      showImage(
        Number(
          button.dataset.index
        )
      );
    }
  );


  /* =========================================
     LIGHTBOX
  ========================================== */

  function openLightbox() {

    const original =
      gallery[index];

    const webp =
      getThumbnailPath(original);


    /* WEBP ขึ้นก่อนทันที */

    lightboxImage.src =
      webp;

    lightboxImage.alt =
      `${product.name} ${index + 1}`;


    lightbox.classList.add(
      "active"
    );

    lightbox.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.classList.add(
      "lightbox-open"
    );


    /* ORIGINAL โหลดเบื้องหลัง */

    loadFullImage(
      original,
      lightboxImage
    );

  }


  function closeLightbox() {

    lightbox.classList.remove(
      "active"
    );

    lightbox.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.classList.remove(
      "lightbox-open"
    );

    lightboxImage.removeAttribute(
      "src"
    );

  }


  mainButton.addEventListener(
    "click",
    openLightbox
  );


  document
    .querySelector(
      "#detailLightboxClose"
    )
    .addEventListener(
      "click",
      closeLightbox
    );


  document
    .querySelector(
      "#detailLightboxPrev"
    )
    .addEventListener(
      "click",
      () =>
        showImage(index - 1)
    );


  document
    .querySelector(
      "#detailLightboxNext"
    )
    .addEventListener(
      "click",
      () =>
        showImage(index + 1)
    );


  lightbox.addEventListener(
    "click",
    (event) => {

      if (
        event.target === lightbox
      ) {
        closeLightbox();
      }

    }
  );


  /* =========================================
     KEYBOARD
  ========================================== */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        !lightbox.classList.contains(
          "active"
        )
      ) {
        return;
      }

      if (
        event.key === "Escape"
      ) {
        closeLightbox();
      }

      if (
        event.key === "ArrowLeft"
      ) {
        showImage(index - 1);
      }

      if (
        event.key === "ArrowRight"
      ) {
        showImage(index + 1);
      }

    }
  );


  /* =========================================
     SWIPE
  ========================================== */

  let startX = 0;


  lightbox.addEventListener(
    "touchstart",
    (event) => {

      startX =
        event.changedTouches[0]
          .clientX;

    },
    {
      passive: true
    }
  );


  lightbox.addEventListener(
    "touchend",
    (event) => {

      const distance =
        event.changedTouches[0]
          .clientX -
        startX;

      if (
        Math.abs(distance) < 50
      ) {
        return;
      }

      showImage(
        distance > 0
          ? index - 1
          : index + 1
      );

    },
    {
      passive: true
    }
  );


  /* =========================================
     INIT
  ========================================== */

  showImage(0);

});