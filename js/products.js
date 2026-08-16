document.addEventListener("DOMContentLoaded", () => {

  const grid = document.querySelector("#productsGrid");
  const count = document.querySelector("#productCount");
  const filterContainer = document.querySelector("#productFilterButtons");

  if (!grid) return;

  const products = Array.isArray(window.products)
    ? window.products
    : [];


  /* =========================================
     CATEGORY CONFIG
  ========================================== */

  const categories = {

    "wheels-suspension": {
      title: "WHEELS & SUSPENSION",
      titleHTML: "WHEELS &<br>SUSPENSION",
      description:
        "Upgrade your style, stance and driving experience with our selection of wheels and suspension parts.",
      hero:
        "assets/products/wheels/hero/wheels-hero.jpg",
      filters: [
        ["all", "ALL"],
        ["wheels", "WHEELS"],
        ["suspension", "SUSPENSION"]
      ]
    },

    performance: {
      title: "PERFORMANCE",
      titleHTML: "PERFORMANCE",
      description:
        "Enhance power, response and driving performance with our selection of performance upgrades.",
      hero:
        "assets/products/wheels/hero/DSC00139.jpg",
      filters: [
        ["all", "ALL"],
        ["intake", "INTAKE"],
        ["exhaust", "EXHAUST"],
        ["engine", "ENGINE"]
      ]
    },

    exterior: {
      title: "EXTERIOR",
      titleHTML: "EXTERIOR",
      description:
        "Transform your vehicle with premium exterior styling and aerodynamic parts.",
      hero:
        "assets/products/wheels/hero/DSC09760.jpg",
      filters: [
        ["all", "ALL"],
        ["aero", "AERO"],
        ["body", "BODY"],
        ["carbon", "CARBON"]
      ]
    },

    interior: {
      title: "INTERIOR",
      titleHTML: "INTERIOR",
      description:
        "Refine your driving environment with premium interior upgrades.",
      hero:
        "assets/products/wheels/hero/DSC08517.jpg",
      filters: [
        ["all", "ALL"],
        ["steering", "STEERING"],
        ["seats", "SEATS"],
        ["accessories", "ACCESSORIES"]
      ]
    },

    tuning: {
      title: "TUNING",
      titleHTML: "TUNING",
      description:
        "Unlock greater performance with professional tuning solutions.",
      hero:
        "assets/products/wheels/hero/154.jpg",
      filters: [
        ["all", "ALL"],
        ["ecu", "ECU"],
        ["software", "SOFTWARE"],
        ["electronics", "ELECTRONICS"]
      ]
    },

    accessories: {
      title: "ACCESSORIES",
      titleHTML: "ACCESSORIES",
      description:
        "Complete your vehicle with carefully selected automotive accessories.",
      hero: "",
      filters: [
        ["all", "ALL"],
        ["exterior-accessories", "EXTERIOR"],
        ["interior-accessories", "INTERIOR"],
        ["lifestyle", "LIFESTYLE"]
      ]
    }

  };


  /* =========================================
     URL
  ========================================== */

  const params = new URLSearchParams(
    window.location.search
  );

  let category =
    params.get("category") ||
    "wheels-suspension";

  if (category === "wheels") {
    category = "wheels-suspension";
  }

  if (!categories[category]) {
    category = "wheels-suspension";
  }

  const config = categories[category];


  /* =========================================
     PAGE INFO
  ========================================== */

  document.title =
    `${config.title} | CARLISM TH`;

  const title =
    document.querySelector("#categoryTitle");

  const description =
    document.querySelector("#categoryDescription");

  const breadcrumb =
    document.querySelector("#breadcrumbCategory");

  const stickyName =
    document.querySelector("#stickyCategoryName");

  const hero =
    document.querySelector("#categoryHeroImage");

  if (title) {
    title.innerHTML = config.titleHTML;
  }

  if (description) {
    description.textContent = config.description;
  }

  if (breadcrumb) {
    breadcrumb.textContent = config.title;
  }

  if (stickyName) {
    stickyName.textContent = config.title;
  }


  /* =========================================
     THUMBNAIL PATH
  ========================================== */

  function getThumbnailPath(imagePath) {

    if (!imagePath) return "";

    const normalized =
      imagePath.replace(/\\/g, "/");

    const slash =
      normalized.lastIndexOf("/");

    if (slash === -1) {
      return imagePath;
    }

    const directory =
      normalized.substring(0, slash);

    const filename =
      normalized.substring(slash + 1);

    const name =
      filename.replace(/\.[^/.]+$/, "");

    return `${directory}/thumbs/${name}.webp`;
  }


  /* =========================================
     HERO
  ========================================== */

  if (hero) {

    if (config.hero) {

      const heroThumb =
        getThumbnailPath(config.hero);

      hero.src = heroThumb;
      hero.dataset.original = config.hero;

      hero.alt = config.title;
      hero.loading = "eager";
      hero.fetchPriority = "high";
      hero.decoding = "async";
      hero.style.display = "";

      hero.addEventListener(
        "error",
        () => {

          if (
            hero.dataset.fallbackUsed !== "true"
          ) {

            hero.dataset.fallbackUsed = "true";
            hero.src = hero.dataset.original;

          }

        }
      );

    } else {

      hero.removeAttribute("src");
      hero.style.display = "none";

    }

  }


  /* =========================================
     CATEGORY PRODUCTS
  ========================================== */

  const categoryProducts =
    products.filter(
      (product) =>
        product.category === category
    );


  /* =========================================
     PRODUCT CARD
  ========================================== */

  function card(product) {

    const productUrl =
      `product-detail.html?id=${product.id}`;

    const subcategory =
      product.subcategoryLabel ||
      product.subcategory ||
      "";

    const subtitle =
      product.subtitle ||
      product.variant ||
      "";

    const thumbnail =
      getThumbnailPath(
        product.image
      );


    return `
      <a
        href="${productUrl}"
        class="category-product-card"
        aria-label="View ${product.name}"
      >

        <div class="category-product-image">

          <img
            src="${thumbnail}"
            data-original="${product.image}"
            alt="${product.name}"
            loading="lazy"
            decoding="async"
          >

          <div class="category-product-view">
            VIEW PRODUCT
          </div>

        </div>


        <div class="category-product-info">

          <div class="category-product-top">

            <span class="category-product-category">
              ${subcategory}
            </span>

            <span class="category-product-brand">
              ${product.brand || ""}
            </span>

          </div>


          <h3>
            ${product.name}
          </h3>


          <span class="category-product-subtitle">
            ${subtitle}
          </span>


          <div class="category-product-bottom">

            <span class="category-product-price">
              ${product.price || ""}
            </span>

            <span
              class="category-product-arrow"
              aria-hidden="true"
            >
              <i class="fa-solid fa-arrow-right"></i>
            </span>

          </div>

        </div>

      </a>
    `;
  }


  /* =========================================
     IMAGE FALLBACK
  ========================================== */

  function setupImageFallback() {

    grid
      .querySelectorAll(
        ".category-product-image img"
      )
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

              image.dataset.fallbackUsed = "true";
              image.src = original;

              return;
            }

            const wrapper =
              image.closest(
                ".category-product-image"
              );

            if (!wrapper) return;

            image.remove();

            wrapper.classList.add(
              "image-missing"
            );

          }
        );

      });
  }


  /* =========================================
     RENDER PRODUCTS
  ========================================== */

  function render(filter = "all") {

    const filtered =
      filter === "all"
        ? categoryProducts
        : categoryProducts.filter(
            (product) =>
              product.subcategory === filter
          );

    if (count) {
      count.textContent =
        filtered.length;
    }

    if (!filtered.length) {

      grid.innerHTML = `
        <div class="products-empty">
          <i class="fa-solid fa-box-open"></i>
          <p>No products available.</p>
        </div>
      `;

      return;
    }

    grid.innerHTML =
      filtered
        .map(card)
        .join("");

    setupImageFallback();
  }


  /* =========================================
     FILTER
  ========================================== */

  if (filterContainer) {

    filterContainer.innerHTML =
      config.filters
        .map(
          ([value, label]) => `
            <button
              type="button"
              class="product-filter-btn"
              data-filter="${value}"
            >
              ${label}
            </button>
          `
        )
        .join("");


    const buttons =
      filterContainer.querySelectorAll(
        ".product-filter-btn"
      );


    function activate(filter) {

      buttons.forEach((button) => {

        button.classList.toggle(
          "active",
          button.dataset.filter === filter
        );

      });
    }


    buttons.forEach((button) => {

      button.addEventListener(
        "click",
        () => {

          const filter =
            button.dataset.filter ||
            "all";

          activate(filter);
          render(filter);

          const url =
            new URL(
              window.location.href
            );

          if (filter === "all") {

            url.searchParams.delete(
              "filter"
            );

          } else {

            url.searchParams.set(
              "filter",
              filter
            );

          }

          window.history.replaceState(
            {},
            "",
            url
          );

        }
      );

    });


    const requestedFilter =
      params.get("filter");


    const validFilter =
      config.filters.some(
        ([value]) =>
          value === requestedFilter
      );


    const startingFilter =
      validFilter
        ? requestedFilter
        : "all";


    activate(startingFilter);
    render(startingFilter);


  } else {

    render();

  }

});