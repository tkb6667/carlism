document.addEventListener("DOMContentLoaded", () => {
  const $ = s => document.querySelector(s);

  const grid = $("#productsGrid");
  const count = $("#productCount");
  const filters = $("#productFilterButtons");
  const prev = $("#productFilterPrev");
  const next = $("#productFilterNext");

  if (!grid) return;

  const products =
    Array.isArray(window.products)
      ? window.products
      : [];

  const BASE_URL =
    "https://tkb6667.github.io/carlism/";

  const categories = {
all: {
  title: "ALL PRODUCTS",
  description:
    "Explore our complete selection of automotive parts, styling upgrades, performance products and accessories.",
  hero: "assets/products/wheels/hero/Carlism-260.jpg",
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
      hero: "assets/products/wheels/hero/wheels-hero.jpg",
      filters: [
        ["all", "ALL"],
        ["wheels", "WHEELS"],
        ["suspension", "SUSPENSION"]
      ]
    },

    performance: {
      title: "PERFORMANCE",
      description:
        "Enhance power, response and driving performance with our selection of performance upgrades.",
      hero: "assets/products/wheels/hero/DSC00139.jpg",
      filters: [
        ["all", "ALL"],
        ["intake", "INTAKE"],
        ["exhaust", "EXHAUST"],
        ["engine", "ENGINE"]
      ]
    },

exterior: {
  title: "EXTERIOR",
  description:
    "Transform your vehicle with premium exterior styling and aerodynamic parts.",
  hero: "assets/products/wheels/hero/1.jpg",
  filters: [
    ["all", "ALL"],
    ["front-lip", "FRONT LIP"],
    ["diffuser", "DIFFUSER"],
    ["canards", "CANARDS"],
    ["side-skirts", "SIDE SKIRTS"],
    ["spoiler", "SPOILER"],
    ["front-grille", "FRONT GRILLE"],
    ["hood-trunk-lid", "HOOD & TRUNK LID"],
    ["door-handles", "DOOR HANDLES"],
    ["side-mirrors", "SIDE MIRRORS"],
    ["light", "LIGHT"]
  ]
},
    interior: {
      title: "INTERIOR",
      description:
        "Refine your driving environment with premium interior upgrades.",
      hero: "assets/products/wheels/hero/DSC08517.jpg",
      filters: [
        ["all", "ALL"],
        ["steering", "STEERING"],
        ["seats", "SEATS"],
        ["accessories", "ACCESSORIES"]
      ]
    },

    tuning: {
      title: "TUNING",
      description:
        "Unlock greater performance with professional tuning solutions.",
      hero: "assets/products/wheels/hero/154.jpg",
      filters: [
        ["all", "ALL"],
        ["tuning", "TUNING SERVICE"]
      ]
    },

    accessories: {
      title: "ACCESSORIES",
      description:
        "Complete your vehicle with carefully selected automotive accessories.",
      hero: "",
      filters: [
        ["all", "ALL"]
      ]
    }
  };

  const params =
    new URLSearchParams(location.search);

  let category =
    params.get("category") || "all";

  if (category === "wheels") {
    category = "wheels-suspension";
  }

  if (!categories[category]) {
    category = "all";
  }

  const config = categories[category];
  const isAll = category === "all";

  const title = $("#categoryTitle");

  if (title) {
    title.innerHTML =
      config.titleHTML || config.title;
  }

  const setText = (selector, text) => {
    const el = $(selector);
    if (el) el.textContent = text;
  };

  setText(
    "#categoryDescription",
    config.description
  );

  setText(
    "#breadcrumbCategory",
    config.title
  );

  setText(
    "#stickyCategoryName",
    config.title
  );

  const getThumb = src => {
    if (!src) return "";

    const path =
      src.replace(/\\/g, "/");

    if (/\/thumbs\/.+\.webp$/i.test(path)) {
      return path;
    }

    return path.replace(
      /\/([^/]+)\.[^/.]+$/,
      "/thumbs/$1.webp"
    );
  };

  const hero = $("#categoryHeroImage");

  if (hero && config.hero) {
    hero.src = getThumb(config.hero);
    hero.dataset.original = config.hero;
    hero.alt = config.title;

    hero.onerror = () => {
      if (
        hero.dataset.fallbackUsed ===
        "true"
      ) return;

      hero.dataset.fallbackUsed = "true";
      hero.src = hero.dataset.original;
    };
  } else if (hero) {
    hero.style.display = "none";
  }

  const base =
    isAll
      ? products
      : products.filter(
          p => p.category === category
        );

  const pageProducts =
    base.flatMap(p => {
      const images =
        p.gallery?.filter(Boolean) ||
        [p.image];

      if (p.album) {
        return [{
          ...p,
          displayImage: images[0],
          imageIndex: 0
        }];
      }

      return images.map(
        (image, imageIndex) => ({
          ...p,
          displayImage: image,
          imageIndex
        })
      );
    });

  const card = p => {
    const original =
      p.displayImage || p.image || "";

    return `
      <a
        href="product-detail.html?id=${p.id}&image=${p.imageIndex}"
        class="category-product-card"
      >
        <div class="category-product-image">
          <img
            src="${getThumb(original)}"
            data-original="${original}"
            alt="${p.name}"
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
              ${p.subcategoryLabel || ""}
            </span>

            <span class="category-product-brand">
              ${p.brand || ""}
            </span>
          </div>

          <h3>${p.name}</h3>

          <span class="category-product-subtitle">
            ${p.subtitle || ""}
          </span>

          <div class="category-product-bottom">
            <span class="category-product-price">
              ${p.price || ""}
            </span>

            <span class="category-product-arrow">
              <i class="fa-solid fa-arrow-right"></i>
            </span>
          </div>
        </div>
      </a>
    `;
  };

  const setupFallback = () => {
    grid
      .querySelectorAll("img")
      .forEach(img => {
        img.onerror = () => {
          if (
            img.dataset.original &&
            img.dataset.fallbackUsed !== "true"
          ) {
            img.dataset.fallbackUsed =
              "true";

            img.src =
              img.dataset.original;
          }
        };
      });
  };

  const filtered = filter =>
    filter === "all"
      ? pageProducts
      : pageProducts.filter(p =>
          isAll
            ? p.category === filter
            : p.subcategory === filter
        );

  const render = filter => {
    const list = filtered(filter);

    if (count) {
      count.textContent = list.length;
    }

    grid.innerHTML = list.length
      ? list.map(card).join("")
      : `
        <div class="products-empty">
          <i class="fa-solid fa-box-open"></i>
          <p>No products available.</p>
        </div>
      `;

    setupFallback();
  };

  if (!filters) {
    render("all");
    return;
  }

  const href = filter => {
    if (isAll) {
      return filter === "all"
        ? "products.html"
        : `products.html?category=${filter}`;
    }

    const base =
      `products.html?category=${category}`;

    return filter === "all"
      ? base
      : `${base}&filter=${filter}`;
  };

  filters.innerHTML =
    config.filters
      .map(([value, label]) => `
        <a
          href="${href(value)}"
          class="product-filter-btn"
          data-filter="${value}"
        >
          ${label}
        </a>
      `)
      .join("");

  const buttons =
    filters.querySelectorAll(
      ".product-filter-btn"
    );

  const updateArrows = () => {
    if (!prev || !next) return;

    const max =
      filters.scrollWidth -
      filters.clientWidth;

    prev.classList.toggle(
      "is-disabled",
      filters.scrollLeft <= 1
    );

    next.classList.toggle(
      "is-disabled",
      filters.scrollLeft >= max - 1
    );
  };

  const move = direction => {
    filters.scrollBy({
      left:
        direction *
        Math.max(
          220,
          filters.clientWidth * 0.7
        ),
      behavior: "smooth"
    });
  };

  prev?.addEventListener(
    "click",
    () => move(-1)
  );

  next?.addEventListener(
    "click",
    () => move(1)
  );

  filters.addEventListener(
    "scroll",
    updateArrows,
    { passive: true }
  );

  addEventListener(
    "resize",
    updateArrows
  );

  const activate = filter => {
    buttons.forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.filter === filter
      );
    });
  };

  buttons.forEach(button => {
    button.addEventListener(
      "click",
      event => {
        event.preventDefault();

        const filter =
          button.dataset.filter;

        activate(filter);
        render(filter);

        const url =
          new URL(location.href);

        if (filter === "all") {
          url.searchParams.delete("filter");
        } else {
          url.searchParams.set(
            "filter",
            filter
          );
        }

        history.replaceState(
          {},
          "",
          url
        );
      }
    );
  });

  const requested =
    params.get("filter");

  const start =
    config.filters.some(
      ([value]) => value === requested
    )
      ? requested
      : "all";

  activate(start);
  render(start);

  requestAnimationFrame(
    updateArrows
  );
});