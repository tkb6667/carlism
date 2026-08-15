document.addEventListener("DOMContentLoaded", () => {

  const products =
    Array.isArray(window.wheelProducts)
      ? window.wheelProducts
      : [];


  const productsGrid =
    document.querySelector("#productsGrid");


  const productCount =
    document.querySelector("#productCount");


  const filterButtons =
    document.querySelectorAll(".product-filter-btn");


  if (!productsGrid) {
    return;
  }


  /* =========================================
     CREATE PRODUCT CARD
  ========================================== */

  function createProductCard(product) {

    return `
      <article class="category-product-card">

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


        <div class="category-product-info">

          <div class="category-product-top">

            <span class="category-product-category">
              ${product.category}
            </span>

            <span class="category-product-brand">
              ${product.brand}
            </span>

          </div>


          <h3>
            ${product.name}
          </h3>


          <span class="category-product-subtitle">
            ${product.subtitle || ""}
          </span>


          <div class="category-product-bottom">

            <span class="category-product-price">
              ${product.price}
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


    images.forEach((image) => {

      image.addEventListener("error", () => {

        const wrapper =
          image.closest(".category-product-image");


        if (wrapper) {

          image.remove();

          wrapper.classList.add(
            "image-missing"
          );

        }

      });

    });

  }


  /* =========================================
     RENDER PRODUCTS
  ========================================== */

  function renderProducts(category = "all") {

    const filteredProducts =
      category === "all"
        ? products
        : products.filter(
            product =>
              product.category === category
          );


    if (productCount) {

      productCount.textContent =
        filteredProducts.length;

    }


    if (filteredProducts.length === 0) {

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


    productsGrid.innerHTML =
      filteredProducts
        .map(createProductCard)
        .join("");


    setupImageFallback();

  }


  /* =========================================
     ACTIVE FILTER
  ========================================== */

  function setActiveFilter(category) {

    filterButtons.forEach((button) => {

      button.classList.toggle(
        "active",
        button.dataset.filter === category
      );

    });

  }


  /* =========================================
     CLICK FILTER
  ========================================== */

  filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const category =
        button.dataset.filter || "all";


      setActiveFilter(category);

      renderProducts(category);


      const url =
        new URL(window.location.href);


      if (category === "all") {

        url.searchParams.delete("filter");

      } else {

        url.searchParams.set(
          "filter",
          category
        );

      }


      window.history.replaceState(
        {},
        "",
        url
      );

    });

  });


  /* =========================================
     FILTER FROM URL
  ========================================== */

  const params =
    new URLSearchParams(
      window.location.search
    );


  const requestedFilter =
    params.get("filter");


  const oldCategory =
    params.get("category");


  let startingFilter = "all";


  if (
    requestedFilter === "wheels" ||
    requestedFilter === "suspension"
  ) {

    startingFilter =
      requestedFilter;

  }


  /*
    รองรับลิงก์เก่าจากหน้า Home เช่น:
    products.html?category=wheels
  */

  if (
    oldCategory === "wheels" ||
    oldCategory === "wheels-suspension"
  ) {

    startingFilter = "all";

  }


  setActiveFilter(startingFilter);

  renderProducts(startingFilter);

});