document.addEventListener("DOMContentLoaded", () => {

  const grid = document.querySelector("#productsGrid");
  const count = document.querySelector("#productCount");
  const filterContainer = document.querySelector("#productFilterButtons");

  if (!grid) return;

  const products =
    Array.isArray(window.products)
      ? window.products
      : [];

  const BASE_URL =
    "https://tkb6667.github.io/carlism/";


  /* =========================================
     CATEGORY CONFIG
  ========================================== */

  const categories = {

    all: {
      title: "ALL PRODUCTS",
      titleHTML: "ALL PRODUCTS",
      description:
        "Explore our complete selection of automotive parts, styling upgrades, performance products and accessories.",
      hero:
        "assets/products/wheels/hero/wheels-hero.jpg",
      filters: [
        ["all", "ALL"],
        ["wheels-suspension", "WHEELS & SUSPENSION"],
        ["performance", "PERFORMANCE"],
        ["exterior", "EXTERIOR"],
        ["interior", "INTERIOR"],
        ["tuning", "TUNING"],
        ["accessories", "ACCESSORIES"]
      ]
    },


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

  const params =
    new URLSearchParams(
      window.location.search
    );

  let category =
    params.get("category") ||
    "all";


  /* รองรับ URL เก่า */

  if (category === "wheels") {
    category = "wheels-suspension";
  }


  if (!categories[category]) {
    category = "all";
  }


  const isAllProducts =
    category === "all";

  const config =
    categories[category];


  /* =========================================
     PAGE INFO
  ========================================== */

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
    title.innerHTML =
      config.titleHTML;
  }

  if (description) {
    description.textContent =
      config.description;
  }

  if (breadcrumb) {
    breadcrumb.textContent =
      config.title;
  }

  if (stickyName) {
    stickyName.textContent =
      config.title;
  }


  /* =========================================
     URL HELPERS
  ========================================== */

  function absoluteUrl(path) {

    if (!path) return "";

    return new URL(
      path,
      BASE_URL
    ).href;
  }


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
      `${directory}/thumbs/${name}.webp`
    );
  }


  /* =========================================
     JSON-LD
  ========================================== */

  function setJsonLd(id, data) {

    let script =
      document.querySelector(
        `#${id}`
      );

    if (!script) {

      script =
        document.createElement(
          "script"
        );

      script.id = id;

      script.type =
        "application/ld+json";

      document.head.appendChild(
        script
      );
    }

    script.textContent =
      JSON.stringify(data);
  }


  function updateProductsSchema(list) {

    setJsonLd(
      "productsItemListSchema",
      {
        "@context":
          "https://schema.org",

        "@type":
          "ItemList",

        "name":
          config.title,

        "numberOfItems":
          list.length,

        "itemListElement":
          list.map(
            (product, index) => {

              const url =
                `${BASE_URL}product-detail.html?id=${product.id}`;

              return {
                "@type":
                  "ListItem",

                "position":
                  index + 1,

                "url":
                  url,

                "item": {
                  "@type":
                    "Product",

                  "name":
                    product.name,

                  "url":
                    url,

                  "image":
                    absoluteUrl(
                      product.image
                    ),

                  "category":
                    product.subcategoryLabel ||
                    product.category,

                  "brand": {
                    "@type":
                      "Brand",

                    "name":
                      product.brand ||
                      "CARLISM TH"
                  }
                }
              };

            }
          )
      }
    );
  }


  /* =========================================
     HERO
  ========================================== */

  if (hero) {

    if (config.hero) {

      hero.src =
        getThumbnailPath(
          config.hero
        );

      hero.dataset.original =
        config.hero;

      hero.alt =
        config.title;

      hero.loading =
        "eager";

      hero.fetchPriority =
        "high";

      hero.decoding =
        "async";

      hero.style.display =
        "";


      hero.addEventListener(
        "error",
        () => {

          if (
            hero.dataset.fallbackUsed ===
            "true"
          ) {
            return;
          }

          hero.dataset.fallbackUsed =
            "true";

          hero.src =
            hero.dataset.original;

        }
      );

    } else {

      hero.removeAttribute(
        "src"
      );

      hero.style.display =
        "none";

    }
  }


  /* =========================================
     PRODUCTS
  ========================================== */

  const pageProducts =
    isAllProducts
      ? products
      : products.filter(
          product =>
            product.category ===
            category
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
      .forEach(image => {

        image.addEventListener(
          "error",
          () => {

            const original =
              image.dataset.original;

            if (
              original &&
              image.dataset.fallbackUsed !==
                "true"
            ) {

              image.dataset.fallbackUsed =
                "true";

              image.src =
                original;

              return;
            }


            const wrapper =
              image.closest(
                ".category-product-image"
              );

            if (!wrapper) {
              return;
            }

            image.remove();

            wrapper.classList.add(
              "image-missing"
            );

          }
        );

      });
  }


  /* =========================================
     FILTER
  ========================================== */

  function getFilteredProducts(
    filter
  ) {

    if (filter === "all") {
      return pageProducts;
    }


    return pageProducts.filter(
      product => {

        if (isAllProducts) {

          return (
            product.category ===
            filter
          );
        }

        return (
          product.subcategory ===
          filter
        );

      }
    );
  }


  /* =========================================
     RENDER
  ========================================== */

  function render(
    filter = "all"
  ) {

    const filtered =
      getFilteredProducts(
        filter
      );


    if (count) {

      count.textContent =
        filtered.length;
    }


    updateProductsSchema(
      filtered
    );


    if (!filtered.length) {

      grid.innerHTML = `
        <div class="products-empty">

          <i class="fa-solid fa-box-open"></i>

          <p>
            No products available.
          </p>

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
     FILTER URL
  ========================================== */

  function getFilterHref(
    filter
  ) {

    /*
      ALL PRODUCTS:
      crawler สามารถตามไปแต่ละหมวดได้จริง
    */

    if (isAllProducts) {

      if (filter === "all") {
        return "products.html";
      }

      return (
        `products.html?category=${filter}`
      );
    }


    /*
      CATEGORY PAGE
    */

    const base =
      `products.html?category=${category}`;


    if (filter === "all") {
      return base;
    }


    return (
      `${base}&filter=${filter}`
    );
  }


  /* =========================================
     CREATE FILTER LINKS
  ========================================== */

  if (!filterContainer) {

    render();

    return;
  }


  filterContainer.innerHTML =
    config.filters
      .map(
        ([value, label]) => `
          <a
            href="${getFilterHref(value)}"
            class="product-filter-btn"
            data-filter="${value}"
          >
            ${label}
          </a>
        `
      )
      .join("");


  const buttons =
    filterContainer.querySelectorAll(
      ".product-filter-btn"
    );


  function activate(filter) {

    buttons.forEach(
      button => {

        button.classList.toggle(
          "active",
          button.dataset.filter ===
            filter
        );

      }
    );
  }


  function updateFilterUrl(
    filter
  ) {

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


  /* =========================================
     FILTER CLICK
  ========================================== */

  buttons.forEach(
    button => {

      button.addEventListener(
        "click",
        event => {

          /*
            Browser ปกติ:
            filter หน้าเดิม

            Crawler:
            ยังเห็น href จริง
          */

          event.preventDefault();


          const filter =
            button.dataset.filter ||
            "all";


          activate(
            filter
          );

          render(
            filter
          );

          updateFilterUrl(
            filter
          );

        }
      );

    }
  );


  /* =========================================
     INITIAL FILTER
  ========================================== */

  const requestedFilter =
    params.get(
      "filter"
    );


  const validFilter =
    config.filters.some(
      ([value]) =>
        value === requestedFilter
    );


  const startingFilter =
    validFilter
      ? requestedFilter
      : "all";


  activate(
    startingFilter
  );

  render(
    startingFilter
  );

});