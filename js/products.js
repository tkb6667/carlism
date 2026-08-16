document.addEventListener("DOMContentLoaded", () => {

  const grid =
    document.querySelector("#productsGrid");

  const count =
    document.querySelector("#productCount");

  const filterContainer =
    document.querySelector(
      "#productFilterButtons"
    );


  if (!grid) {
    return;
  }


  const products =
    Array.isArray(window.products)
      ? window.products
      : [];


  /* =========================================
     CATEGORY CONFIG
  ========================================== */

  const categories = {

    "wheels-suspension": {

      title:
        "WHEELS & SUSPENSION",

      titleHTML:
        "WHEELS &<br>SUSPENSION",

      description:
        "Upgrade your style, stance and driving experience with our selection of wheels and suspension parts.",

      hero:
        "assets/images/wheels/DSC01003.jpg",

      filters: [
        ["all", "ALL"],
        ["wheels", "WHEELS"],
        ["suspension", "SUSPENSION"]
      ]
    },


    performance: {

      title:
        "PERFORMANCE",

      titleHTML:
        "PERFORMANCE",

      description:
        "Enhance power, response and driving performance with our selection of performance upgrades.",

      hero:
        "",

      filters: [
        ["all", "ALL"],
        ["intake", "INTAKE"],
        ["exhaust", "EXHAUST"],
        ["engine", "ENGINE"]
      ]
    },


    exterior: {

      title:
        "EXTERIOR",

      titleHTML:
        "EXTERIOR",

      description:
        "Transform your vehicle with premium exterior styling and aerodynamic parts.",

      hero:
        "",

      filters: [
        ["all", "ALL"],
        ["aero", "AERO"],
        ["body", "BODY"],
        ["carbon", "CARBON"]
      ]
    },


    interior: {

      title:
        "INTERIOR",

      titleHTML:
        "INTERIOR",

      description:
        "Refine your driving environment with premium interior upgrades.",

      hero:
        "",

      filters: [
        ["all", "ALL"],
        ["steering", "STEERING"],
        ["seats", "SEATS"],
        ["accessories", "ACCESSORIES"]
      ]
    },


    tuning: {

      title:
        "TUNING",

      titleHTML:
        "TUNING",

      description:
        "Unlock greater performance with professional tuning solutions.",

      hero:
        "",

      filters: [
        ["all", "ALL"],
        ["ecu", "ECU"],
        ["software", "SOFTWARE"],
        ["electronics", "ELECTRONICS"]
      ]
    },


    accessories: {

      title:
        "ACCESSORIES",

      titleHTML:
        "ACCESSORIES",

      description:
        "Complete your vehicle with carefully selected automotive accessories.",

      hero:
        "",

      filters: [
        ["all", "ALL"],
        [
          "exterior-accessories",
          "EXTERIOR"
        ],
        [
          "interior-accessories",
          "INTERIOR"
        ],
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
    "wheels-suspension";


  /* รองรับ URL เก่า */

  if (category === "wheels") {
    category = "wheels-suspension";
  }


  if (!categories[category]) {
    category = "wheels-suspension";
  }


  const config =
    categories[category];


  /* =========================================
     PAGE INFO
  ========================================== */

  document.title =
    `${config.title} | CARLISM TH`;


  const title =
    document.querySelector(
      "#categoryTitle"
    );

  const description =
    document.querySelector(
      "#categoryDescription"
    );

  const breadcrumb =
    document.querySelector(
      "#breadcrumbCategory"
    );

  const stickyName =
    document.querySelector(
      "#stickyCategoryName"
    );

  const hero =
    document.querySelector(
      "#categoryHeroImage"
    );


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


  if (hero) {

    if (config.hero) {

      hero.src =
        config.hero;

      hero.alt =
        config.title;

      hero.style.display =
        "";

    } else {

      hero.removeAttribute("src");

      hero.style.display =
        "none";
    }

  }


  /* =========================================
     CATEGORY PRODUCTS
  ========================================== */

  const categoryProducts =
    products.filter(
      product =>
        product.category === category
    );


  /* =========================================
     PRODUCT CARD

     ทั้งการ์ดกดได้
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


    return `

      <a
        href="${productUrl}"
        class="category-product-card"
        aria-label="View ${product.name}"
      >


        <!-- IMAGE -->

        <div class="category-product-image">

          <img
            src="${product.image}"
            alt="${product.name}"
            loading="lazy"
          >


          <div class="category-product-view">
            VIEW PRODUCT
          </div>

        </div>



        <!-- INFO -->

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

    const images =
      grid.querySelectorAll(
        ".category-product-image img"
      );


    images.forEach((image) => {

      image.addEventListener(
        "error",
        () => {

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

        },
        {
          once: true
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
            product =>
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
     FILTER BUTTONS
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


    /* =======================================
       ACTIVE FILTER
    ======================================== */

    function activate(filter) {

      buttons.forEach((button) => {

        button.classList.toggle(
          "active",
          button.dataset.filter === filter
        );

      });

    }


    /* =======================================
       FILTER CLICK
    ======================================== */

    buttons.forEach((button) => {

      button.addEventListener(
        "click",
        () => {

          const filter =
            button.dataset.filter ||
            "all";


          activate(filter);

          render(filter);


          /* URL */

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


    /* =======================================
       FILTER FROM URL
    ======================================== */

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