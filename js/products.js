document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     ELEMENTS
  ========================================== */

  const productsGrid =
    document.querySelector("#productsGrid");

  const productCount =
    document.querySelector("#productCount");

  const filterContainer =
    document.querySelector("#productFilterButtons");

  const categoryTitle =
    document.querySelector("#categoryTitle");

  const categoryDescription =
    document.querySelector("#categoryDescription");

  const categoryHeroImage =
    document.querySelector("#categoryHeroImage");

  const breadcrumbCategory =
    document.querySelector("#breadcrumbCategory");

  const stickyCategoryName =
    document.querySelector("#stickyCategoryName");


  if (!productsGrid) {
    return;
  }


  /* =========================================
     PRODUCTS DATA
  ========================================== */

  const products =
    Array.isArray(window.products)
      ? window.products
      : [];


  /* =========================================
     CATEGORY CONFIG
  ========================================== */

  const categories = {

    /* -----------------------------------------
       WHEELS & SUSPENSION
    ------------------------------------------ */

    "wheels-suspension": {

      title:
        "WHEELS & SUSPENSION",

      titleHTML:
        "WHEELS &<br>SUSPENSION",

      description:
        "Upgrade your style, stance and driving experience with our selection of wheels and suspension parts.",

      hero:
        "assets/products/wheels/hero/wheels-hero.jpg",

      heroAlt:
        "Wheels and suspension",

      filters: [

        {
          value: "all",
          label: "ALL"
        },

        {
          value: "wheels",
          label: "WHEELS"
        },

        {
          value: "suspension",
          label: "SUSPENSION"
        }

      ]

    },


    /* -----------------------------------------
       PERFORMANCE
    ------------------------------------------ */

    "performance": {

      title:
        "PERFORMANCE",

      titleHTML:
        "PERFORMANCE",

      description:
        "Enhance power, response and driving performance with our selection of performance upgrades.",

      hero:
        "assets/products/performance/hero/performance-hero.jpg",

      heroAlt:
        "Performance products",

      filters: [

        {
          value: "all",
          label: "ALL"
        },

        {
          value: "intake",
          label: "INTAKE"
        },

        {
          value: "exhaust",
          label: "EXHAUST"
        },

        {
          value: "engine",
          label: "ENGINE"
        }

      ]

    },


    /* -----------------------------------------
       EXTERIOR
    ------------------------------------------ */

    "exterior": {

      title:
        "EXTERIOR",

      titleHTML:
        "EXTERIOR",

      description:
        "Transform the look of your vehicle with premium exterior styling and aerodynamic parts.",

      hero:
        "assets/products/exterior/hero/exterior-hero.jpg",

      heroAlt:
        "Exterior products",

      filters: [

        {
          value: "all",
          label: "ALL"
        },

        {
          value: "aero",
          label: "AERO"
        },

        {
          value: "body",
          label: "BODY"
        },

        {
          value: "carbon",
          label: "CARBON"
        }

      ]

    },


    /* -----------------------------------------
       INTERIOR
    ------------------------------------------ */

    "interior": {

      title:
        "INTERIOR",

      titleHTML:
        "INTERIOR",

      description:
        "Refine your driving environment with premium interior accessories and performance-focused upgrades.",

      hero:
        "assets/products/interior/hero/interior-hero.jpg",

      heroAlt:
        "Interior products",

      filters: [

        {
          value: "all",
          label: "ALL"
        },

        {
          value: "steering",
          label: "STEERING"
        },

        {
          value: "seats",
          label: "SEATS"
        },

        {
          value: "accessories",
          label: "ACCESSORIES"
        }

      ]

    },


    /* -----------------------------------------
       TUNING
    ------------------------------------------ */

    "tuning": {

      title:
        "TUNING",

      titleHTML:
        "TUNING",

      description:
        "Unlock greater performance with professional tuning solutions and electronic upgrades.",

      hero:
        "assets/products/tuning/hero/tuning-hero.jpg",

      heroAlt:
        "Tuning products",

      filters: [

        {
          value: "all",
          label: "ALL"
        },

        {
          value: "ecu",
          label: "ECU"
        },

        {
          value: "software",
          label: "SOFTWARE"
        },

        {
          value: "electronics",
          label: "ELECTRONICS"
        }

      ]

    },


    /* -----------------------------------------
       ACCESSORIES
    ------------------------------------------ */

    "accessories": {

      title:
        "ACCESSORIES",

      titleHTML:
        "ACCESSORIES",

      description:
        "Complete your vehicle with carefully selected automotive accessories and lifestyle products.",

      hero:
        "assets/products/accessories/hero/accessories-hero.jpg",

      heroAlt:
        "Automotive accessories",

      filters: [

        {
          value: "all",
          label: "ALL"
        },

        {
          value: "exterior-accessories",
          label: "EXTERIOR"
        },

        {
          value: "interior-accessories",
          label: "INTERIOR"
        },

        {
          value: "lifestyle",
          label: "LIFESTYLE"
        }

      ]

    }

  };


  /* =========================================
     GET URL CATEGORY
  ========================================== */

  const params =
    new URLSearchParams(
      window.location.search
    );


  let currentCategory =
    params.get("category") ||
    "wheels-suspension";


  /*
    รองรับ URL เก่า

    products.html?category=wheels
  */

  if (
    currentCategory === "wheels"
  ) {

    currentCategory =
      "wheels-suspension";

  }


  /*
    ถ้า URL category ไม่ถูก
  */

  if (
    !categories[currentCategory]
  ) {

    currentCategory =
      "wheels-suspension";

  }


  const currentCategoryData =
    categories[currentCategory];


  /* =========================================
     UPDATE PAGE INFORMATION
  ========================================== */

  function updatePageInformation() {

    document.title =
      `${currentCategoryData.title} | CARLISM TH`;


    /* META DESCRIPTION */

    const metaDescription =
      document.querySelector(
        'meta[name="description"]'
      );


    if (metaDescription) {

      metaDescription.setAttribute(
        "content",
        currentCategoryData.description
      );

    }


    /* TITLE */

    if (categoryTitle) {

      categoryTitle.innerHTML =
        currentCategoryData.titleHTML;

    }


    /* DESCRIPTION */

    if (categoryDescription) {

      categoryDescription.textContent =
        currentCategoryData.description;

    }


    /* BREADCRUMB */

    if (breadcrumbCategory) {

      breadcrumbCategory.textContent =
        currentCategoryData.title;

    }


    /* STICKY CATEGORY */

    if (stickyCategoryName) {

      stickyCategoryName.textContent =
        currentCategoryData.title;

    }


    /* HERO IMAGE */

    if (categoryHeroImage) {

      categoryHeroImage.src =
        currentCategoryData.hero;


      categoryHeroImage.alt =
        currentCategoryData.heroAlt;


      categoryHeroImage.addEventListener(
        "error",
        () => {

          categoryHeroImage.style.display =
            "none";

        }
      );

    }

  }


  /* =========================================
     CREATE FILTER BUTTONS
  ========================================== */

  function createFilterButtons() {

    if (!filterContainer) {
      return;
    }


    filterContainer.innerHTML =
      currentCategoryData.filters

        .map(
          (filter, index) => `

            <button
              class="product-filter-btn ${
                index === 0
                  ? "active"
                  : ""
              }"
              data-filter="${filter.value}"
              type="button"
            >
              ${filter.label}
            </button>

          `
        )

        .join("");

  }


  /* =========================================
     CATEGORY PRODUCTS
  ========================================== */

  const categoryProducts =
    products.filter(
      (product) => {

        return (
          product.category ===
          currentCategory
        );

      }
    );


  /* =========================================
     CREATE PRODUCT CARD
  ========================================== */

  function createProductCard(
    product
  ) {

    return `

      <article class="category-product-card">


        <!-- IMAGE -->

        <a
          href="product-detail.html?id=${product.id}"
          class="category-product-image"
        >

          <img
            src="${product.image}"
            alt="${product.name}"
            loading="lazy"
          >

          <div class="category-product-view">
            VIEW PRODUCT
          </div>

        </a>


        <!-- INFO -->

        <div class="category-product-info">


          <div class="category-product-top">

            <span class="category-product-category">
              ${
                product.subcategoryLabel ||
                product.subcategory ||
                ""
              }
            </span>


            <span class="category-product-brand">
              ${product.brand || ""}
            </span>

          </div>


          <h3>
            ${product.name}
          </h3>


          <span class="category-product-subtitle">
            ${
              product.subtitle ||
              product.variant ||
              ""
            }
          </span>


          <div class="category-product-bottom">

            <span class="category-product-price">
              ${product.price || ""}
            </span>


            <a
              href="product-detail.html?id=${product.id}"
              class="category-product-arrow"
              aria-label="View ${product.name}"
            >
              <i class="fa-solid fa-arrow-right"></i>
            </a>

          </div>

        </div>

      </article>

    `;

  }


  /* =========================================
     IMAGE FALLBACK
  ========================================== */

  function setupImageFallback() {

    const images =
      productsGrid.querySelectorAll(
        ".category-product-image img"
      );


    images.forEach(
      (image) => {

        image.addEventListener(
          "error",
          () => {

            const wrapper =
              image.closest(
                ".category-product-image"
              );


            if (wrapper) {

              image.remove();


              wrapper.classList.add(
                "image-missing"
              );

            }

          }
        );

      }
    );

  }


  /* =========================================
     RENDER PRODUCTS
  ========================================== */

  function renderProducts(
    filter = "all"
  ) {

    const filteredProducts =
      filter === "all"

        ? categoryProducts

        : categoryProducts.filter(
            (product) => {

              return (
                product.subcategory ===
                filter
              );

            }
          );


    /* COUNT */

    if (productCount) {

      productCount.textContent =
        filteredProducts.length;

    }


    /* EMPTY */

    if (
      filteredProducts.length === 0
    ) {

      productsGrid.innerHTML = `

        <div class="products-empty">

          <i class="fa-solid fa-box-open"></i>

          <p>
            No products available.
          </p>

        </div>

      `;

      return;

    }


    /* PRODUCTS */

    productsGrid.innerHTML =
      filteredProducts

        .map(createProductCard)

        .join("");


    setupImageFallback();

  }


  /* =========================================
     ACTIVE FILTER
  ========================================== */

  function setActiveFilter(
    filter
  ) {

    const buttons =
      document.querySelectorAll(
        ".product-filter-btn"
      );


    buttons.forEach(
      (button) => {

        button.classList.toggle(
          "active",
          button.dataset.filter ===
            filter
        );

      }
    );

  }


  /* =========================================
     FILTER EVENTS
  ========================================== */

  function setupFilterEvents() {

    const buttons =
      document.querySelectorAll(
        ".product-filter-btn"
      );


    buttons.forEach(
      (button) => {

        button.addEventListener(
          "click",
          () => {

            const filter =
              button.dataset.filter ||
              "all";


            setActiveFilter(
              filter
            );


            renderProducts(
              filter
            );


            /* UPDATE URL */

            const url =
              new URL(
                window.location.href
              );


            if (
              filter === "all"
            ) {

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

      }
    );

  }


  /* =========================================
     FILTER FROM URL
  ========================================== */

  function getStartingFilter() {

    const requestedFilter =
      params.get("filter");


    if (!requestedFilter) {

      return "all";

    }


    const filterExists =
      currentCategoryData.filters.some(
        (filter) => {

          return (
            filter.value ===
            requestedFilter
          );

        }
      );


    return filterExists
      ? requestedFilter
      : "all";

  }


  /* =========================================
     MOBILE COMPACT STICKY HEADER
  ========================================== */

  function initMobileStickyNavigation() {

    const stickyNav =
      document.querySelector(
        "#productStickyNav"
      );


    const stickyMenuToggle =
      document.querySelector(
        "#stickyMobileMenuToggle"
      );


    const stickyMenu =
      document.querySelector(
        "#stickyMobileMenu"
      );


    if (
      !stickyNav ||
      !stickyMenuToggle ||
      !stickyMenu
    ) {

      return;

    }


    /* =====================================
       MENU ICON
    ===================================== */

    const stickyMenuIcon =
      stickyMenuToggle.querySelector(
        "i"
      );


    /* =====================================
       COPY MENU FROM HEADER
    ===================================== */

    function copyMainMenu() {

      const originalNavMenu =
        document.querySelector(
          ".nav-menu"
        );


      if (!originalNavMenu) {

        return false;

      }


      stickyMenu.innerHTML =
        originalNavMenu.innerHTML;


      return true;

    }


    /*
      เผื่อ components.js
      ยังสร้าง Header ไม่เสร็จ
    */

    let attempts = 0;


    function waitForMainMenu() {

      if (copyMainMenu()) {

        return;

      }


      attempts++;


      if (attempts < 30) {

        setTimeout(
          waitForMainMenu,
          50
        );

      }

    }


    waitForMainMenu();


    /* =====================================
       ICON STATE
    ===================================== */

    function setMenuIcon(
      open
    ) {

      if (!stickyMenuIcon) {

        return;

      }


      stickyMenuIcon.classList.toggle(
        "fa-bars",
        !open
      );


      stickyMenuIcon.classList.toggle(
        "fa-xmark",
        open
      );

    }


    /* =====================================
       CLOSE COMPACT MENU
    ===================================== */

    function closeCompactMenu() {

      stickyNav.classList.remove(
        "menu-open"
      );


      stickyMenuToggle.setAttribute(
        "aria-expanded",
        "false"
      );


      setMenuIcon(false);

    }


    /* =====================================
       CLOSE ORIGINAL HEADER MENU
    ===================================== */

    function closeOriginalMenu() {

      const originalNavMenu =
        document.querySelector(
          ".nav-menu"
        );


      const originalToggle =
        document.querySelector(
          ".menu-toggle"
        );


      if (originalNavMenu) {

        originalNavMenu.classList.remove(
          "active"
        );

      }


      if (originalToggle) {

        originalToggle.classList.remove(
          "active"
        );


        originalToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    }


    /* =====================================
       COMPACT HAMBURGER CLICK
    ===================================== */

    stickyMenuToggle.addEventListener(
      "click",
      (event) => {

        event.stopPropagation();


        const open =
          stickyNav.classList.toggle(
            "menu-open"
          );


        stickyMenuToggle.setAttribute(
          "aria-expanded",
          open
            ? "true"
            : "false"
        );


        setMenuIcon(open);

      }
    );


    /* =====================================
       CLICK MENU LINK
    ===================================== */

    stickyMenu.addEventListener(
      "click",
      (event) => {

        const link =
          event.target.closest(
            "a"
          );


        if (link) {

          closeCompactMenu();

        }

      }
    );


    /* =====================================
       CLICK OUTSIDE
    ===================================== */

    document.addEventListener(
      "click",
      (event) => {

        if (
          !stickyNav.contains(
            event.target
          )
        ) {

          closeCompactMenu();

        }

      }
    );


    /* =====================================
       ESCAPE
    ===================================== */

    document.addEventListener(
      "keydown",
      (event) => {

        if (
          event.key === "Escape"
        ) {

          closeCompactMenu();

        }

      }
    );


    /* =====================================
       SCROLL STATE
    ===================================== */

    function updateStickyNavigation() {

      const isMobile =
        window.matchMedia(
          "(max-width: 820px)"
        ).matches;


      const shouldCompact =
        isMobile &&
        window.scrollY > 90;


      stickyNav.classList.toggle(
        "is-compact",
        shouldCompact
      );


      document.body.classList.toggle(
        "product-mobile-compact",
        shouldCompact
      );


      /*
        ตอนเข้าสู่ Compact
        ปิดเมนู Header เดิม
      */

      if (shouldCompact) {

        closeOriginalMenu();

      } else {

        closeCompactMenu();

      }


      /*
        ถ้ากลับเป็น PC
      */

      if (!isMobile) {

        closeCompactMenu();


        stickyNav.classList.remove(
          "is-compact"
        );


        document.body.classList.remove(
          "product-mobile-compact"
        );

      }

    }


    /* =====================================
       SCROLL LISTENER
    ===================================== */

    window.addEventListener(
      "scroll",
      updateStickyNavigation,
      {
        passive: true
      }
    );


    /* =====================================
       RESIZE LISTENER
    ===================================== */

    window.addEventListener(
      "resize",
      updateStickyNavigation
    );


    /* INITIAL */

    updateStickyNavigation();

  }


  /* =========================================
     INIT
  ========================================== */

  updatePageInformation();


  createFilterButtons();


  setupFilterEvents();


  const startingFilter =
    getStartingFilter();


  setActiveFilter(
    startingFilter
  );


  renderProducts(
    startingFilter
  );


  /*
    รอ Header จาก components.js
    ก่อนเริ่มระบบ Compact
  */

  setTimeout(
    initMobileStickyNavigation,
    0
  );

});