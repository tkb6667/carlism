/* =========================================
   CARLISM
   Shared Header & Footer
========================================= */


/* =========================================
   DATA
========================================= */

const navItems = [
  {
    label: "WHEELS & SUSPENSION",
    href: "products.html?category=wheels-suspension",
  },
  {
    label: "PERFORMANCE",
    href: "products.html?category=performance",
  },
  {
    label: "EXTERIOR",
    href: "products.html?category=exterior",
  },
  {
    label: "INTERIOR",
    href: "products.html?category=interior",
  },
  {
    label: "ACCESSORIES",
    href: "products.html?category=accessories",
  },
  {
    label: "TUNING",
    href: "products.html?category=tuning",
  },
  {
    label: "ACCESSORIES",
    href: "products.html?category=accessories",
  },
];


const shopItems = [
  {
    label: "Wheels",
    href: "products.html?category=wheels-suspension",
  },
  {
    label: "Suspension",
    href: "products.html?category=wheels-suspension",
  },
  {
    label: "Performance",
    href: "products.html?category=performance",
  },
  {
    label: "Exterior",
    href: "products.html?category=exterior",
  },
  {
    label: "Interior",
    href: "products.html?category=interior",
  },
  {
    label: "Accessories",
    href: "products.html?category=accessories",
  },
  {
    label: "Tuning",
    href: "products.html?category=tuning",
  },
];


const serviceItems = [
  "Engine Tuning",
  "Custom Builds",
  "Maintenance",
  "Detailing",
  "Consultation",
];


/* =========================================
   HELPERS
========================================= */

const createLinks = (items) =>
  items
    .map(
      ({ label, href }) => `
        <a href="${href}">
          ${label}
        </a>
      `
    )
    .join("");


const createDisabledLinks = (items) =>
  items
    .map(
      (label) => `
        <a
          class="footer-link-disabled"
          aria-disabled="true"
        >
          ${label}
        </a>
      `
    )
    .join("");


/* =========================================
   HEADER
========================================= */

const headerHTML = `
  <div class="topbar">
    <div class="container topbar-inner">

      <div class="topbar-left">

        <a href="tel:+66642240333">
          <i class="fa-solid fa-phone"></i>
          <span>+66 64 224 0333</span>
        </a>

        <a href="mailto:info@carlismth.com">
          <i class="fa-regular fa-envelope"></i>
          <span>info@Carlismth.com</span>
        </a>

      </div>


      <div class="topbar-right">

        <a href="contact.html">
          Contact
        </a>

      </div>

    </div>
  </div>


  <nav class="navbar">
    <div class="container navbar-inner">

      <a
        href="index.html"
        class="logo"
        aria-label="CARLISM Home"
      >
        <img
          src="assets/images/hero/Carlism Logo 1_0.png"
          alt="CARLISM"
          class="header-logo-image"
        >
      </a>


      <button
        class="menu-toggle"
        type="button"
        aria-label="Open navigation"
        aria-expanded="false"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>


      <div class="nav-menu">
        ${createLinks(navItems)}
      </div>

    </div>
  </nav>
`;


/* =========================================
   FOOTER
========================================= */

const footerHTML = `
  <div class="footer">
    <div class="container">

      <div class="footer-grid">


        <!-- BRAND -->

        <div class="footer-brand">

          <a
            href="index.html"
            class="footer-logo"
            aria-label="CARLISM Home"
          >
            <img
              src="assets/images/hero/Carlism Logo 1_0.png"
              alt="CARLISM"
              class="footer-logo-image"
            >
          </a>


          <p>
            Premium automotive parts and expert tuning
            for performance driven enthusiasts.
          </p>


          <div class="footer-social">

            <a
              href="https://www.instagram.com/carlismth/"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="fa-brands fa-instagram"></i>
            </a>


            <a
              href="https://www.facebook.com/p/Carlism-TH-100092271006003/"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="fa-brands fa-facebook-f"></i>
            </a>


            <a
              href="https://www.tiktok.com/@carlism.th"
              aria-label="TikTok"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="fa-brands fa-tiktok"></i>
            </a>


            <a
              href="https://line.me/R/ti/p/@carlismth"
              aria-label="LINE"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="fa-brands fa-line"></i>
            </a>

          </div>

        </div>


        <!-- SHOP -->

        <div>

          <h3 class="footer-title">
            SHOP
          </h3>

          <div class="footer-links">
            ${createLinks(shopItems)}
          </div>

        </div>


        <!-- SERVICES -->

        <div>

          <h3 class="footer-title">
            SERVICES
          </h3>

          <div class="footer-links">
            ${createDisabledLinks(serviceItems)}
          </div>

        </div>


        <!-- CONTACT -->

        <div>

          <h3 class="footer-title">
            CONTACT
          </h3>

          <div class="footer-links">

            <a
              href="tel:+66642240333"
              class="footer-contact-row"
            >
              <i class="fa-solid fa-phone"></i>

              <span>
                +66 64 224 0333
              </span>
            </a>


            <a
              href="mailto:info@carlismth.com"
              class="footer-contact-row"
            >
              <i class="fa-regular fa-envelope"></i>

              <span>
                info@Carlismth.com
              </span>
            </a>


            <p class="footer-contact-row">

              <i class="fa-solid fa-location-dot"></i>

              <span>
                Bangkok, Thailand
              </span>

            </p>


            <p class="footer-contact-row">

              <i class="fa-brands fa-line"></i>

              <span>
                LINE ID: @carlismth
              </span>

            </p>


            <p class="footer-contact-row">

              <i class="fa-brands fa-facebook"></i>

              <span>
                Facebook: Carlismth
              </span>

            </p>

          </div>

        </div>

      </div>


      <div class="footer-bottom">
        © 2026 CARLISMTH. All Rights Reserved.
      </div>

    </div>
  </div>
`;


/* =========================================
   RENDER
========================================= */

const siteHeader = document.querySelector("#site-header");
const siteFooter = document.querySelector("#site-footer");


if (siteHeader) {
  siteHeader.innerHTML = headerHTML;
}


if (siteFooter) {
  siteFooter.innerHTML = footerHTML;
}