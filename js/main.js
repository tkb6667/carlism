document.addEventListener("DOMContentLoaded", () => {

  /* =====================================
     DATA
  ===================================== */

  const categories = [

    [
      "wheels-suspension",
      "fa-compact-disc",
      "WHEELS & SUSPENSION"
    ],

    [
      "performance",
      "fa-bolt",
      "PERFORMANCE"
    ],

    [
      "exterior",
      "fa-car-side",
      "EXTERIOR"
    ],

    [
      "interior",
      "fa-car",
      "INTERIOR"
    ],

    [
      "tuning",
      "fa-gauge-high",
      "TUNING"
    ],

    [
      "accessories",
      "fa-screwdriver-wrench",
      "ACCESSORIES"
    ]

  ];


  /* =====================================
     BRANDS
  ===================================== */

  const brands = [

    [
      "Mercedes-Benz",
      "assets/images/hero/brands/mercedes.png"
    ],

    [
      "BMW",
      "assets/images/hero/brands/bmw.svg"
    ],

    [
      "Audi",
      "assets/images/hero/brands/audi.svg"
    ],

    [
      "Porsche",
      "assets/images/hero/brands/porsche.svg"
    ],

    [
      "Volkswagen",
      "assets/images/hero/brands/volkswagen.svg"
    ]

  ];


  /* =====================================
     SHOWCASE
  ===================================== */

  const showcases = [

    /* 1 - MERCEDES */
    [
      "wheels-suspension",
      "Mercedes-Benz Wheels",
      "assets/images/hero/showcase/Untitled-1.jpg"
    ],

    /* 2 - BMW */
    [
      "wheels-suspension",
      "BMW Wheels",
      "assets/images/hero/showcase/14.jpg"
    ],

    /* 3 */
    [
      "accessories",
      "Performance Accessories",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=900&q=85"
    ],

    /* 4 */
    [
      "performance",
      "Engine Performance",
      "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=900&q=85"
    ],

    /* 5 */
    [
      "exterior",
      "Exterior Parts",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=85"
    ],

    /* 6 */
    [
      "tuning",
      "Tuning",
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

          <span>
            ${name}
          </span>

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

          <img
            src="${image}"
            alt="${name}"
            loading="lazy"
          >

          <span>
            ${name}
          </span>

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

          <img
            src="${image}"
            alt="${alt}"
            loading="lazy"
          >

        </a>

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

    menuToggle.addEventListener(
      "click",
      () => {

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

      }
    );


    navMenu
      .querySelectorAll("a")
      .forEach((link) => {

        link.addEventListener(
          "click",
          () => {

            navMenu.classList.remove(
              "active"
            );


            menuToggle.classList.remove(
              "active"
            );


            menuToggle.setAttribute(
              "aria-expanded",
              "false"
            );

          }
        );

      });

  }


  /* =====================================
     BRAND ARROWS
  ===================================== */

  const left =
    document.querySelector(
      ".brand-arrow-left"
    );


  const right =
    document.querySelector(
      ".brand-arrow-right"
    );


  if (
    brandsRow &&
    left &&
    right
  ) {

    left.addEventListener(
      "click",
      () => {

        brandsRow.scrollBy({

          left: -250,

          behavior: "smooth"

        });

      }
    );


    right.addEventListener(
      "click",
      () => {

        brandsRow.scrollBy({

          left: 250,

          behavior: "smooth"

        });

      }
    );

  }

});