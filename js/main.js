document.addEventListener("DOMContentLoaded", () => {

  /* =====================================
     DATA
  ===================================== */

  const categories = [
    ["wheels-suspension", "fa-compact-disc", "WHEELS & SUSPENSION"],
    ["performance", "fa-bolt", "PERFORMANCE"],
    ["exterior", "fa-car-side", "EXTERIOR"],
    ["interior", "fa-car", "INTERIOR"],
    ["tuning", "fa-gauge-high", "TUNING"],
    ["accessories", "fa-screwdriver-wrench", "ACCESSORIES"]
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
      "Mercedes-Benz Wheels",
      "assets/images/hero/showcase/Untitled-1.jpg"
    ],
    [
      "BMW Wheels",
      "assets/images/hero/showcase/14.jpg"
    ],
    [
      "Performance Accessories",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=900&q=85"
    ],
    [
      "Engine Performance",
      "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=900&q=85"
    ],
    [
      "Exterior Parts",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=85"
    ],
    [
      "Tuning",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=900&q=85"
    ]
  ];


  /* =====================================
     CATEGORIES
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
     BRANDS
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
            decoding="async"
          >

          <span>${name}</span>

        </div>
      `)
      .join("");

  }


  /* =====================================
     SHOWCASE
  ===================================== */

  const showcaseGrid =
    document.querySelector("#showcaseGrid");

  if (showcaseGrid) {

    showcaseGrid.innerHTML = showcases
      .map(([alt, image]) => `
        <div class="showcase-card">

          <img
            src="${image}"
            alt="${alt}"
            loading="lazy"
            decoding="async"
            draggable="false"
          >

        </div>
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
          String(open)
        );

      }
    );


    navMenu
      .querySelectorAll("a")
      .forEach((link) => {

        link.addEventListener(
          "click",
          () => {

            navMenu.classList.remove("active");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
              "aria-expanded",
              "false"
            );

          }
        );

      });

  }


  /* =====================================
     BRAND SLIDER
  ===================================== */

  const brandLeft =
    document.querySelector(".brand-arrow-left");

  const brandRight =
    document.querySelector(".brand-arrow-right");


  if (
    brandsRow &&
    brandLeft &&
    brandRight
  ) {

    let scrollTimer;


    const getMaxScroll = () =>
      Math.max(
        0,
        brandsRow.scrollWidth -
        brandsRow.clientWidth
      );


    const getScrollStep = () => {

      const item =
        brandsRow.querySelector(".brand-item");

      if (!item) return 170;

      const styles =
        getComputedStyle(brandsRow);

      const gap =
        parseFloat(
          styles.columnGap ||
          styles.gap ||
          0
        );

      return (
        item.getBoundingClientRect().width +
        gap
      );
    };


    const updateArrows = () => {

      const max =
        getMaxScroll();

      const current =
        brandsRow.scrollLeft;

      const start =
        current <= 2;

      const end =
        current >= max - 2;

      const disabled =
        max <= 2;


      brandLeft.disabled =
        disabled || start;

      brandRight.disabled =
        disabled || end;


      brandLeft.classList.toggle(
        "is-disabled",
        disabled || start
      );

      brandRight.classList.toggle(
        "is-disabled",
        disabled || end
      );

    };


    const move = (direction) => {

      const max =
        getMaxScroll();

      const target =
        Math.min(
          max,
          Math.max(
            0,
            brandsRow.scrollLeft +
            getScrollStep() * direction
          )
        );


      brandsRow.scrollTo({
        left: target,
        behavior: "smooth"
      });

    };


    brandLeft.addEventListener(
      "click",
      () => {

        if (!brandLeft.disabled) {
          move(-1);
        }

      }
    );


    brandRight.addEventListener(
      "click",
      () => {

        if (!brandRight.disabled) {
          move(1);
        }

      }
    );


    brandsRow.addEventListener(
      "scroll",
      () => {

        clearTimeout(scrollTimer);

        scrollTimer =
          setTimeout(
            updateArrows,
            30
          );

      },
      {
        passive: true
      }
    );


    window.addEventListener(
      "resize",
      () => {

        const max =
          getMaxScroll();

        if (
          brandsRow.scrollLeft >
          max
        ) {
          brandsRow.scrollLeft =
            max;
        }

        updateArrows();

      }
    );


    requestAnimationFrame(
      updateArrows
    );


    window.addEventListener(
      "load",
      updateArrows,
      {
        once: true
      }
    );

  }

});