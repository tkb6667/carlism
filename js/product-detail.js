document.addEventListener("DOMContentLoaded", () => {
  const $ = s => document.querySelector(s);
  const params = new URLSearchParams(location.search);

  const id = Number(params.get("id"));
  const selectedIndex = Number(params.get("image"));

  const products = Array.isArray(window.products)
    ? window.products
    : [];

  const product = products.find(
    p => Number(p.id) === id
  );

  if (!product) return;

  const categoryNames = {
    "wheels-suspension": "WHEELS & SUSPENSION",
    performance: "PERFORMANCE",
    exterior: "EXTERIOR",
    interior: "INTERIOR",
    tuning: "TUNING",
    accessories: "ACCESSORIES"
  };

  document.title =
    `${product.name} | CARLISM TH`;

  const categoryLink =
    $("#detailCategoryLink");

  if (categoryLink) {
    categoryLink.textContent =
      categoryNames[product.category] ||
      "PRODUCTS";

    categoryLink.href =
      `products.html?category=${product.category}`;
  }

  const setText = (selector, value) => {
    const el = $(selector);
    if (el) el.textContent = value || "-";
  };

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
    product.variant
  );

  setText(
    "#detailPrice",
    product.price || "CONTACT"
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

  /* GALLERY */

  const images =
    product.gallery?.filter(Boolean) ||
    [product.image].filter(Boolean);

  const selected =
    Number.isInteger(selectedIndex) &&
    selectedIndex >= 0 &&
    selectedIndex < images.length
      ? selectedIndex
      : 0;

  const gallery =
    product.album
      ? images
      : images[selected]
        ? [images[selected]]
        : [];

  let index =
    product.album
      ? selected
      : 0;

  const mainImage =
    $("#detailMainImage");

  const mainButton =
    $("#detailMainButton");

  const thumbs =
    $("#detailThumbnails");

  const lightbox =
    $("#detailLightbox");

  const lightboxImage =
    $("#detailLightboxImage");

  const counter =
    $("#detailLightboxCounter");

  const prev =
    $("#detailLightboxPrev");

  const next =
    $("#detailLightboxNext");

  const close =
    $("#detailLightboxClose");

  /* WEBP */

  const getThumb = src => {
    if (!src) return "";

    const path =
      src.replace(/\\/g, "/");

    if (/\/thumbs\/.+\.webp$/i.test(path)) {
      return path;
    }

    return path.replace(
      /\/([^/]+)\.[^/.]+$/,
      "/thumbs/$1.webp"
    );
  };

  const setImage = (element, original) => {
    if (!element || !original) return;

    delete element.dataset.fallbackUsed;

    element.dataset.original =
      original;

    element.src =
      getThumb(original);

    element.onerror = () => {
      if (
        element.dataset.fallbackUsed ===
        "true"
      ) return;

      element.dataset.fallbackUsed =
        "true";

      element.src =
        original;
    };
  };

  const loadFull = original => {
    if (!lightboxImage || !original) return;

    const full = new Image();

    full.src = original;

    full.onload = () => {
      if (
        lightbox?.classList.contains("active") &&
        gallery[index] === original
      ) {
        lightboxImage.src = original;
      }
    };
  };

  /* THUMBNAILS */

  if (thumbs) {
    thumbs.style.display = "";

    thumbs.innerHTML =
      gallery
        .map((image, i) => `
          <button
            type="button"
            class="detail-thumb ${
              i === index ? "active" : ""
            }"
            data-index="${i}"
          >
            <img
              src="${getThumb(image)}"
              data-original="${image}"
              alt="${product.name} ${i + 1}"
              loading="lazy"
              decoding="async"
            >
          </button>
        `)
        .join("");

    thumbs
      .querySelectorAll("img")
      .forEach(img => {
        img.onerror = () => {
          if (
            img.dataset.fallbackUsed ===
            "true"
          ) return;

          img.dataset.fallbackUsed =
            "true";

          img.src =
            img.dataset.original;
        };
      });
  }

  /* SHOW IMAGE */

  const showImage = newIndex => {
    if (!gallery.length) return;

    index =
      (newIndex + gallery.length) %
      gallery.length;

    const original =
      gallery[index];

    setImage(
      mainImage,
      original
    );

    if (counter) {
      counter.textContent =
        `${index + 1} / ${gallery.length}`;
    }

    thumbs
      ?.querySelectorAll(".detail-thumb")
      .forEach((button, i) => {
        button.classList.toggle(
          "active",
          i === index
        );
      });

    if (
      lightbox?.classList.contains(
        "active"
      )
    ) {
      setImage(
        lightboxImage,
        original
      );

      loadFull(original);
    }
  };

  thumbs?.addEventListener(
    "click",
    event => {
      const button =
        event.target.closest(
          ".detail-thumb"
        );

      if (!button) return;

      showImage(
        Number(button.dataset.index)
      );
    }
  );

  /* LIGHTBOX */

  const openLightbox = () => {
    if (
      !lightbox ||
      !gallery.length
    ) return;

    const original =
      gallery[index];

    setImage(
      lightboxImage,
      original
    );

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

    loadFull(original);
  };

  const closeLightbox = () => {
    lightbox?.classList.remove(
      "active"
    );

    lightbox?.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.classList.remove(
      "lightbox-open"
    );
  };

  mainButton?.addEventListener(
    "click",
    openLightbox
  );

  close?.addEventListener(
    "click",
    closeLightbox
  );

  prev?.addEventListener(
    "click",
    () => showImage(index - 1)
  );

  next?.addEventListener(
    "click",
    () => showImage(index + 1)
  );

  const multiple =
    gallery.length > 1;

  if (prev) {
    prev.style.display =
      multiple ? "" : "none";
  }

  if (next) {
    next.style.display =
      multiple ? "" : "none";
  }

  lightbox?.addEventListener(
    "click",
    event => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    }
  );

  /* KEYBOARD */

  document.addEventListener(
    "keydown",
    event => {
      if (
        !lightbox?.classList.contains(
          "active"
        )
      ) return;

      if (event.key === "Escape") {
        closeLightbox();
      }

      if (
        multiple &&
        event.key === "ArrowLeft"
      ) {
        showImage(index - 1);
      }

      if (
        multiple &&
        event.key === "ArrowRight"
      ) {
        showImage(index + 1);
      }
    }
  );

  /* SWIPE */

  let startX = 0;

  lightbox?.addEventListener(
    "touchstart",
    event => {
      startX =
        event.changedTouches[0]
          .clientX;
    },
    { passive: true }
  );

  lightbox?.addEventListener(
    "touchend",
    event => {
      if (!multiple) return;

      const distance =
        event.changedTouches[0]
          .clientX -
        startX;

      if (
        Math.abs(distance) < 50
      ) return;

      showImage(
        distance > 0
          ? index - 1
          : index + 1
      );
    },
    { passive: true }
  );

  showImage(index);
});