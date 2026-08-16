document.addEventListener("DOMContentLoaded", () => {

  const nav = document.querySelector("#productStickyNav");

  if (!nav || nav.dataset.initialized === "true") {
    return;
  }

  nav.dataset.initialized = "true";

  const menuButton =
    nav.querySelector("#stickyMobileMenuToggle");

  const menuPanel =
    nav.querySelector("#stickyMobileMenu");

  if (!menuButton || !menuPanel) {
    return;
  }

  const menuIcon =
    menuButton.querySelector("i");

  let navStart = 0;


  /* =========================================
     COPY MAIN MENU
  ========================================== */

  function copyMainMenu() {

    const mainMenu =
      document.querySelector(".nav-menu");

    if (!mainMenu) {
      return false;
    }

    menuPanel.innerHTML =
      mainMenu.innerHTML;

    return true;
  }


  function waitForMainMenu(attempt = 0) {

    if (copyMainMenu()) {
      return;
    }

    if (attempt < 30) {

      setTimeout(() => {
        waitForMainMenu(attempt + 1);
      }, 50);

    }
  }


  /* =========================================
     ICON
  ========================================== */

  function setMenuIcon(open) {

    if (!menuIcon) {
      return;
    }

    menuIcon.classList.toggle(
      "fa-bars",
      !open
    );

    menuIcon.classList.toggle(
      "fa-xmark",
      open
    );
  }


  /* =========================================
     CLOSE COMPACT MENU
  ========================================== */

  function closeMenu() {

    nav.classList.remove("menu-open");

    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );

    setMenuIcon(false);
  }


  /* =========================================
     CLOSE NORMAL HEADER MENU
  ========================================== */

  function closeHeaderMenu() {

    const headerMenu =
      document.querySelector(".nav-menu");

    const headerButton =
      document.querySelector(".menu-toggle");

    if (headerMenu) {
      headerMenu.classList.remove("active");
    }

    if (headerButton) {

      headerButton.classList.remove("active");

      headerButton.setAttribute(
        "aria-expanded",
        "false"
      );
    }
  }


  /* =========================================
     CALCULATE POSITION
  ========================================== */

  function calculateNavStart() {

    navStart =
      nav.getBoundingClientRect().top +
      window.scrollY;
  }


  /* =========================================
     UPDATE COMPACT STATE
  ========================================== */

  function updateNav() {

    const mobile =
      window.matchMedia(
        "(max-width: 820px)"
      ).matches;

    if (!mobile) {

      nav.classList.remove("is-compact");

      closeMenu();

      return;
    }

    const compact =
      window.scrollY >= navStart - 1;

    nav.classList.toggle(
      "is-compact",
      compact
    );

    if (compact) {

      closeHeaderMenu();

    } else {

      closeMenu();

    }
  }


  /* =========================================
     HAMBURGER
  ========================================== */

  menuButton.addEventListener(
    "click",
    (event) => {

      event.preventDefault();
      event.stopPropagation();

      const open =
        nav.classList.toggle(
          "menu-open"
        );

      menuButton.setAttribute(
        "aria-expanded",
        open ? "true" : "false"
      );

      setMenuIcon(open);
    }
  );


  /* =========================================
     MENU LINK
  ========================================== */

  menuPanel.addEventListener(
    "click",
    (event) => {

      if (event.target.closest("a")) {
        closeMenu();
      }
    }
  );


  /* =========================================
     CLICK OUTSIDE
  ========================================== */

  document.addEventListener(
    "click",
    (event) => {

      if (!nav.contains(event.target)) {
        closeMenu();
      }
    }
  );


  /* =========================================
     ESC
  ========================================== */

  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Escape") {
        closeMenu();
      }
    }
  );


  /* =========================================
     SCROLL
  ========================================== */

  window.addEventListener(
    "scroll",
    updateNav,
    { passive: true }
  );


  /* =========================================
     RESIZE
  ========================================== */

  window.addEventListener(
    "resize",
    () => {

      nav.classList.remove("is-compact");

      closeMenu();

      calculateNavStart();

      updateNav();
    }
  );


  /* =========================================
     INIT
  ========================================== */

  waitForMainMenu();

  setTimeout(() => {

    calculateNavStart();

    updateNav();

  }, 100);

});