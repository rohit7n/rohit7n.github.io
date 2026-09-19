document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     FOOTER YEAR
  ========================================================= */

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* =========================================================
     MOBILE NAVIGATION
  ========================================================= */

  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (menuToggle && nav) {

    menuToggle.addEventListener("click", () => {

      const isOpen = nav.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

    });


    // Close menu when a navigation link is clicked

    nav.querySelectorAll("a").forEach((link) => {

      link.addEventListener("click", () => {

        nav.classList.remove("open");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });


    // Close menu when clicking outside

    document.addEventListener("click", (event) => {

      const clickedInsideNav =
        nav.contains(event.target);

      const clickedToggle =
        menuToggle.contains(event.target);

      if (!clickedInsideNav && !clickedToggle) {

        nav.classList.remove("open");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    });

  }


  /* =========================================================
     ESCAPE KEY — CLOSE MOBILE MENU
  ========================================================= */

  document.addEventListener("keydown", (event) => {

    if (
      event.key === "Escape" &&
      nav &&
      menuToggle
    ) {

      nav.classList.remove("open");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      menuToggle.focus();

    }

  });


  /* =========================================================
     SCROLL REVEAL
  ========================================================= */

  const revealElements =
    document.querySelectorAll(".reveal");


  if (
    "IntersectionObserver" in window &&
    revealElements.length
  ) {

    const revealObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "is-visible"
              );

              revealObserver.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -40px 0px"
        }
      );


    revealElements.forEach((element) => {

      revealObserver.observe(element);

    });

  } else {

    revealElements.forEach((element) => {

      element.classList.add("is-visible");

    });

  }


  /* =========================================================
     NAVIGATION LINKS
  ========================================================= */

  const navLinks =
    document.querySelectorAll(
      ".nav a[href^='#']"
    );


  /* =========================================================
     VALID NAVIGATION SECTIONS
  ========================================================= */

  const validSectionIds =
    Array.from(navLinks)
      .map((link) => link.getAttribute("href"))
      .filter(Boolean);


  const sections =
    document.querySelectorAll(
      "main section[id]"
    );


  const observedSections =
    Array.from(sections).filter((section) => {

      return validSectionIds.includes(
        `#${section.id}`
      );

    });


  /* =========================================================
     ACTIVE NAVIGATION
  ========================================================= */

  if (
    "IntersectionObserver" in window &&
    observedSections.length &&
    navLinks.length
  ) {

    const sectionObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }

            const id =
              entry.target.getAttribute("id");


            navLinks.forEach((link) => {

              const href =
                link.getAttribute("href");

              link.classList.toggle(
                "active",
                href === `#${id}`
              );

            });

          });

        },
        {
          rootMargin: "-25% 0px -65% 0px",
          threshold: 0
        }
      );


    observedSections.forEach((section) => {

      sectionObserver.observe(section);

    });

  }


  /* =========================================================
     SMOOTH SCROLL
  ========================================================= */

  navLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

      const href =
        link.getAttribute("href");


      if (
        !href ||
        !href.startsWith("#") ||
        href === "#"
      ) {
        return;
      }


      const target =
        document.querySelector(href);


      if (!target) {
        return;
      }


      event.preventDefault();


      const header =
        document.querySelector(".site-header");


      const headerHeight =
        header
          ? header.offsetHeight
          : 0;


      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight -
        12;


      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });


      /*
        Update URL without jumping.
      */

      if (
        window.history &&
        window.history.replaceState
      ) {

        window.history.replaceState(
          null,
          "",
          href
        );

      }

    });

  });


  /* =========================================================
     BACK TO TOP
  ========================================================= */

  const backToTop =
    document.querySelector(
      ".footer-links a[href='#home']"
    );


  if (backToTop) {

    backToTop.addEventListener(
      "click",
      (event) => {

        const home =
          document.querySelector("#home");


        if (!home) {
          return;
        }


        event.preventDefault();


        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });


        if (
          window.history &&
          window.history.replaceState
        ) {

          window.history.replaceState(
            null,
            "",
            "#home"
          );

        }

      }
    );

  }


  /* =========================================================
     CURRENT YEAR
  ========================================================= */

  const currentYear =
    new Date().getFullYear();


  if (year) {

    year.textContent =
      currentYear;

  }

});
