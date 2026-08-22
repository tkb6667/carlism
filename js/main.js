document.addEventListener("DOMContentLoaded", () => {

  /* HERO */

  const hero = document.querySelector("#heroSlider");
  const slides = [...document.querySelectorAll(".hero-slide")];
  const progress = document.querySelector("#heroProgress");
  const HERO_DELAY = 5000;

  if (hero && slides.length && progress) {
    let current = 0;
    let timer;
    let startX = 0;
    let dragging = false;

    progress.innerHTML = slides
      .map((_, i) => `
        <button
          class="hero-progress-item"
          type="button"
          aria-label="Show slide ${i + 1}"
        >
          <span class="hero-progress-track"></span>
        </button>
      `)
      .join("");

    const indicators = [...progress.children];

    const showSlide = index => {
      current =
        (index + slides.length) %
        slides.length;

      slides.forEach((slide, i) =>
        slide.classList.toggle(
          "active",
          i === current
        )
      );

      indicators.forEach((item, i) =>
        item.classList.toggle(
          "active",
          i === current
        )
      );
    };

    const startAuto = () => {
      clearInterval(timer);

      timer = setInterval(
        () => showSlide(current + 1),
        HERO_DELAY
      );
    };

    indicators.forEach((item, i) => {
      item.addEventListener("click", () => {
        showSlide(i);
        startAuto();
      });
    });

    hero.addEventListener("pointerdown", event => {
      if (event.target.closest("a, button")) return;

      startX = event.clientX;
      dragging = true;

      hero.setPointerCapture?.(
        event.pointerId
      );

      clearInterval(timer);
    });

    hero.addEventListener("pointerup", event => {
      if (!dragging) return;

      dragging = false;

      const distance =
        event.clientX - startX;

      if (Math.abs(distance) >= 50) {
        showSlide(
          distance < 0
            ? current + 1
            : current - 1
        );
      }

      startAuto();
    });

    hero.addEventListener("pointercancel", () => {
      dragging = false;
      startAuto();
    });

    showSlide(0);
    startAuto();
  }


  /* DATA */

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
  ["Showcase 5", "assets/images/hero/showcase/thumbs/5.webp"],
  ["Showcase 2", "assets/images/hero/showcase/thumbs/2.webp"],
  ["Showcase 3", "assets/images/hero/showcase/thumbs/3.webp"],
  ["Showcase 4", "assets/images/hero/showcase/thumbs/4.webp"],
  ["Showcase 1", "assets/images/hero/showcase/thumbs/1.webp"],
  ["Showcase 6", "assets/images/hero/showcase/thumbs/6.webp"]
];

  /* CATEGORIES */

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


  /* BRANDS */

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


  /* SHOWCASE */

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


  /* MOBILE MENU */

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
        String(open)
      );
    });

    navMenu
      .querySelectorAll("a")
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


  /* BRAND SLIDER */

  const brandLeft =
    document.querySelector(".brand-arrow-left");

  const brandRight =
    document.querySelector(".brand-arrow-right");

  if (brandsRow && brandLeft && brandRight) {
    let scrollTimer;

    const maxScroll = () =>
      Math.max(
        0,
        brandsRow.scrollWidth -
        brandsRow.clientWidth
      );

    const scrollStep = () => {
      const item =
        brandsRow.querySelector(".brand-item");

      if (!item) return 170;

      const style =
        getComputedStyle(brandsRow);

      const gap =
        parseFloat(
          style.columnGap ||
          style.gap ||
          0
        );

      return (
        item.getBoundingClientRect().width +
        gap
      );
    };

    const updateArrows = () => {
      const max = maxScroll();
      const current = brandsRow.scrollLeft;

      brandLeft.disabled =
        max <= 2 || current <= 2;

      brandRight.disabled =
        max <= 2 || current >= max - 2;

      brandLeft.classList.toggle(
        "is-disabled",
        brandLeft.disabled
      );

      brandRight.classList.toggle(
        "is-disabled",
        brandRight.disabled
      );
    };

    const move = direction => {
      brandsRow.scrollTo({
        left: Math.min(
          maxScroll(),
          Math.max(
            0,
            brandsRow.scrollLeft +
            scrollStep() * direction
          )
        ),
        behavior: "smooth"
      });
    };

    brandLeft.addEventListener(
      "click",
      () => {
        if (!brandLeft.disabled) move(-1);
      }
    );

    brandRight.addEventListener(
      "click",
      () => {
        if (!brandRight.disabled) move(1);
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
      { passive: true }
    );

    addEventListener("resize", updateArrows);

    requestAnimationFrame(updateArrows);

    addEventListener(
      "load",
      updateArrows,
      { once: true }
    );
  }

});