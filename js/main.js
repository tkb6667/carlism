document.addEventListener("DOMContentLoaded", () => {

  /* =====================================
     DATA
  ===================================== */

  const categories = [
    ["wheels & suspension", "fa-compact-disc", "WHEELS & SUSPENSION"],
    ["performance", "fa-gears", "PERFORMANCE"],
    ["exterior", "fa-car-side", "EXTERIOR"],
    ["interior", "fa-chair", "INTERIOR"],
    ["tuning", "fa-gauge-high", "TUNING"],
    ["accessories", "fa-gear", "ACCESSORIES"]
  ];


const brands = [
  ["Mercedes-Benz", "assets/images/hero/brands/mercedes.png"],
  ["BMW", "assets/images/hero/brands/bmw.svg"],
  ["Audi", "assets/images/hero/brands/audi.svg"],
  ["Porsche", "assets/images/hero/brands/porsche.svg"],
  ["Volkswagen", "assets/images/hero/brands/volkswagen.svg"]
];


  const showcases = [
    [
      "interior",
      "Premium Car Interior",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=85"
    ],
    [
      "wheels",
      "Performance Wheels",
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=85"
    ],
    [
      "lighting",
      "Performance Lighting",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=900&q=85"
    ],
    [
      "performance",
      "Engine Performance",
      "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=900&q=85"
    ],
    [
      "exterior",
      "Exterior Parts",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=85"
    ],
    [
      "carbon",
      "Carbon Fiber",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=900&q=85"
    ]
  ];


  /* =====================================
     RENDER CATEGORIES
  ===================================== */

  const categoryGrid =
    document.querySelector("#categoryGrid");

  if (categoryGrid) {
    categoryGrid.innerHTML = categories
      .map(([category, icon, name]) => `
        <a
          href="products.html?category=${category}"
          class="category-item"
        >
          <div class="category-icon">
            <i class="fa-solid ${icon}"></i>
          </div>

          <span>${name}</span>
        </a>
      `)
      .join("");
  }


  /* =====================================
     RENDER BRANDS
  ===================================== */

  const brandsRow =
    document.querySelector("#brandsRow");

  if (brandsRow) {
    brandsRow.innerHTML = brands
      .map(([name, image]) => `
        <div class="brand-item">
          <img src="${image}" alt="${name}">
          <span>${name}</span>
        </div>
      `)
      .join("");
  }


  /* =====================================
     RENDER SHOWCASE
  ===================================== */

  const showcaseGrid =
    document.querySelector("#showcaseGrid");

  if (showcaseGrid) {
    showcaseGrid.innerHTML = showcases
      .map(([category, alt, image]) => `
        <a
          href="products.html?category=${category}"
          class="showcase-card"
        >
          <img src="${image}" alt="${alt}">
        </a>
      `)
      .join("");
  }


  /* =====================================
     RENDER FEATURED PRODUCTS
  ===================================== */

  const featuredProducts =
    document.querySelector("#featuredProducts");

  if (featuredProducts && window.products) {

    featuredProducts.innerHTML = window.products
      .slice(0, 6)
      .map(product => `
        <article class="product-card">

          <a
            href="product-detail.html?id=${product.id}"
            class="product-image"
          >
            <img
              src="${product.image}"
              alt="${product.name}"
            >
          </a>

          <div class="product-info">

            <h3>${product.name}</h3>

            <p class="product-variant">
              ${product.variant}
            </p>

            <p class="product-price">
              ${product.price}
            </p>

            <a
              href="product-detail.html?id=${product.id}"
              class="product-link"
            >
              VIEW DETAILS
              <i class="fa-solid fa-arrow-right"></i>
            </a>

          </div>

        </article>
      `)
      .join("");
  }


  /* =====================================
     MOBILE MENU
  ===================================== */

  const menuToggle =
    document.querySelector(".menu-toggle");

  const navMenu =
    document.querySelector(".nav-menu");

  if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

      const open =
        navMenu.classList.toggle("active");

      menuToggle.classList.toggle(
        "active",
        open
      );

      menuToggle.setAttribute(
        "aria-expanded",
        open
      );

    });


    navMenu.querySelectorAll("a")
      .forEach(link => {

        link.addEventListener("click", () => {

          navMenu.classList.remove("active");
          menuToggle.classList.remove("active");

          menuToggle.setAttribute(
            "aria-expanded",
            "false"
          );

        });

      });

  }


  /* =====================================
     BRAND ARROWS
  ===================================== */

  const left =
    document.querySelector(".brand-arrow-left");

  const right =
    document.querySelector(".brand-arrow-right");

  if (brandsRow && left && right) {

    left.addEventListener("click", () => {
      brandsRow.scrollBy({
        left: -250,
        behavior: "smooth"
      });
    });


    right.addEventListener("click", () => {
      brandsRow.scrollBy({
        left: 250,
        behavior: "smooth"
      });
    });

  }

});