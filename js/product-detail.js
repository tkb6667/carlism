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
     CATEGORY NAME
  ========================================== */

  const categoryNames = {

    "wheels-suspension":
      "WHEELS & SUSPENSION",

    performance:
      "PERFORMANCE",

    exterior:
      "EXTERIOR",

    interior:
      "INTERIOR",

    tuning:
      "TUNING",

    accessories:
      "ACCESSORIES"
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
     THUMBNAILS
  ========================================== */

  thumbs.innerHTML =
    gallery.map(
      (image, i) => `

        <button
          type="button"
          class="detail-thumb ${
            i === 0 ? "active" : ""
          }"
          data-index="${i}"
        >

          <img
            src="${image}"
            alt="${product.name} ${i + 1}"
            loading="${i === 0 ? "eager" : "lazy"}"
          >

        </button>

      `
    ).join("");


  /* =========================================
     SHOW IMAGE
  ========================================== */

  function showImage(newIndex) {

    index =
      (newIndex + gallery.length) %
      gallery.length;


    const image =
      gallery[index];


    mainImage.src =
      image;

    mainImage.alt =
      `${product.name} ${index + 1}`;


    lightboxImage.src =
      image;

    lightboxImage.alt =
      `${product.name} ${index + 1}`;


    counter.textContent =
      `${index + 1} / ${gallery.length}`;


    thumbs
      .querySelectorAll(".detail-thumb")
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
        Number(button.dataset.index)
      );
    }
  );


  /* =========================================
     LIGHTBOX
  ========================================== */

  function openLightbox() {

    lightbox.classList.add("active");

    lightbox.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.classList.add(
      "lightbox-open"
    );
  }


  function closeLightbox() {

    lightbox.classList.remove("active");

    lightbox.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.classList.remove(
      "lightbox-open"
    );
  }


  mainButton.addEventListener(
    "click",
    openLightbox
  );


  document
    .querySelector("#detailLightboxClose")
    .addEventListener(
      "click",
      closeLightbox
    );


  document
    .querySelector("#detailLightboxPrev")
    .addEventListener(
      "click",
      () => showImage(index - 1)
    );


  document
    .querySelector("#detailLightboxNext")
    .addEventListener(
      "click",
      () => showImage(index + 1)
    );


  lightbox.addEventListener(
    "click",
    (event) => {

      if (event.target === lightbox) {
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


      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowLeft") {
        showImage(index - 1);
      }

      if (event.key === "ArrowRight") {
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
    { passive: true }
  );


  lightbox.addEventListener(
    "touchend",
    (event) => {

      const distance =
        event.changedTouches[0]
          .clientX -
        startX;


      if (Math.abs(distance) < 50) {
        return;
      }


      showImage(
        distance > 0
          ? index - 1
          : index + 1
      );

    },
    { passive: true }
  );


  /* =========================================
     INIT
  ========================================== */

  showImage(0);

});