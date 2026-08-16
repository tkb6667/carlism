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


  const showcases = [
    [
      "wheels-suspension",
      "Mercedes-Benz Wheels",
      "assets/images/hero/showcase/Untitled-1.jpg"
    ],
    [
      "wheels-suspension",
      "BMW Wheels",
      "assets/images/hero/showcase/14.jpg"
    ],
    [
      "accessories",
      "Performance Accessories",
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

          <img
            src="${image}"
            alt="${name}"
            loading="lazy"
          >

          <span>${name}</span>

        </div>
      `)
      .join("");

  }


/* =====================================
   RENDER SHOWCASE
   IMAGE ONLY - NOT CLICKABLE
===================================== */

const showcaseGrid =
  document.querySelector("#showcaseGrid");

if (showcaseGrid) {

  showcaseGrid.innerHTML = showcases
    .map(([, alt, image]) => `
      <div class="showcase-card">
        <img
          src="${image}"
          alt="${alt}"
          loading="lazy"
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

    menuToggle.addEventListener("click", () => {

      const isOpen =
        navMenu.classList.toggle("active");

      menuToggle.classList.toggle(
        "active",
        isOpen
      );

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

    });


    navMenu
      .querySelectorAll("a")
      .forEach((link) => {

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
     BRAND SLIDER
     - เห็น Brand ต่อไปบางส่วน
     - เลื่อนได้ด้วยนิ้ว
     - กดลูกศรได้
     - ไม่เลื่อนเกินซ้าย/ขวา
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

    let scrollTimer = null;


    /* จำนวนสูงสุดที่เลื่อนได้ */

    const getMaxScroll = () => {

      return Math.max(
        0,
        brandsRow.scrollWidth -
        brandsRow.clientWidth
      );

    };


    /* ระยะเลื่อนต่อ 1 ครั้ง
       คำนวณจาก Brand จริง + gap
       ไม่ Fix 250px แบบเดิม
    */

    const getScrollStep = () => {

      const firstItem =
        brandsRow.querySelector(".brand-item");

      if (!firstItem) {
        return 170;
      }


      const styles =
        window.getComputedStyle(brandsRow);

      const gap =
        parseFloat(
          styles.columnGap ||
          styles.gap ||
          "0"
        );


      return (
        firstItem.getBoundingClientRect().width +
        gap
      );

    };


    /* อัปเดตสถานะลูกศร */

    const updateBrandArrows = () => {

      const maxScroll =
        getMaxScroll();

      const current =
        brandsRow.scrollLeft;


      const atStart =
        current <= 2;

      const atEnd =
        current >= maxScroll - 2;

      const noScroll =
        maxScroll <= 2;


      brandLeft.disabled =
        noScroll || atStart;

      brandRight.disabled =
        noScroll || atEnd;


      brandLeft.classList.toggle(
        "is-disabled",
        noScroll || atStart
      );

      brandRight.classList.toggle(
        "is-disabled",
        noScroll || atEnd
      );


      brandLeft.setAttribute(
        "aria-disabled",
        String(noScroll || atStart)
      );

      brandRight.setAttribute(
        "aria-disabled",
        String(noScroll || atEnd)
      );

    };


    /* เลื่อน Brand */

    const moveBrands = (direction) => {

      const maxScroll =
        getMaxScroll();

      const step =
        getScrollStep();


      let target =
        brandsRow.scrollLeft +
        (step * direction);


      /* ไม่เกินซ้าย */

      target =
        Math.max(0, target);


      /* ไม่เกินขวา */

      target =
        Math.min(
          maxScroll,
          target
        );


      brandsRow.scrollTo({
        left: target,
        behavior: "smooth"
      });

    };


    /* LEFT */

    brandLeft.addEventListener(
      "click",
      () => {

        if (brandLeft.disabled) {
          return;
        }

        moveBrands(-1);

      }
    );


    /* RIGHT */

    brandRight.addEventListener(
      "click",
      () => {

        if (brandRight.disabled) {
          return;
        }

        moveBrands(1);

      }
    );


    /* เวลา Swipe / Scroll */

    brandsRow.addEventListener(
      "scroll",
      () => {

        clearTimeout(scrollTimer);

        scrollTimer =
          setTimeout(() => {
            updateBrandArrows();
          }, 30);

      },
      {
        passive: true
      }
    );


    /* เวลาเปลี่ยนขนาดจอ */

    window.addEventListener(
      "resize",
      () => {

        const maxScroll =
          getMaxScroll();


        if (
          brandsRow.scrollLeft >
          maxScroll
        ) {

          brandsRow.scrollLeft =
            maxScroll;

        }


        updateBrandArrows();

      }
    );


    /* เริ่มต้น */

    requestAnimationFrame(() => {

      brandsRow.scrollLeft = 0;

      updateBrandArrows();

    });


    /* เช็กอีกครั้งหลังรูปโหลด */

    window.addEventListener(
      "load",
      () => {

        const maxScroll =
          getMaxScroll();


        if (
          brandsRow.scrollLeft >
          maxScroll
        ) {

          brandsRow.scrollLeft =
            maxScroll;

        }


        updateBrandArrows();

      },
      {
        once: true
      }
    );

  }

});