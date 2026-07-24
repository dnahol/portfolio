(function () {
  "use strict";

  /* ------------------------------------------------------------------ */
  /* Theme toggle                                                       */
  /* ------------------------------------------------------------------ */
  var html = document.documentElement;
  var themeBtn = document.querySelector("[data-theme-toggle]");
  var a11yBtn = document.querySelector("[data-a11y-toggle]");

  function setTheme(theme) {
    if (theme === "light") {
      html.setAttribute("data-theme", "light");
    } else {
      html.removeAttribute("data-theme");
    }
    try {
      window.localStorage.setItem("theme", theme);
    } catch (e) {
      /* localStorage unavailable (private mode / disabled) -- theme just won't persist */
    }
    if (themeBtn) {
      var isLight = theme === "light";
      themeBtn.setAttribute("aria-pressed", String(isLight));
      var label = themeBtn.querySelector("[data-theme-label]");
      if (label) label.textContent = isLight ? "Dark mode" : "Light mode";
    }
  }

  function setA11y(enabled) {
    if (enabled) {
      html.setAttribute("data-a11y", "true");
    } else {
      html.removeAttribute("data-a11y");
    }
    try {
      window.localStorage.setItem("a11y", enabled ? "true" : "false");
    } catch (e) {
      /* ignore */
    }
    if (a11yBtn) {
      a11yBtn.setAttribute("aria-pressed", String(enabled));
    }
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var current = html.getAttribute("data-theme") === "light" ? "light" : "dark";
      setTheme(current === "light" ? "dark" : "light");
    });
  }

  if (a11yBtn) {
    a11yBtn.addEventListener("click", function () {
      setA11y(html.getAttribute("data-a11y") !== "true");
    });
  }

  /* Reflect whatever the pre-paint inline script already applied to html[]
     into the correct initial button label/state (inline script runs before
     this file loads, to avoid a flash of the wrong theme). */
  setTheme(html.getAttribute("data-theme") === "light" ? "light" : "dark");
  if (html.getAttribute("data-a11y") === "true" && a11yBtn) {
    a11yBtn.setAttribute("aria-pressed", "true");
  }

  /* ------------------------------------------------------------------ */
  /* Mobile nav                                                          */
  /* ------------------------------------------------------------------ */
  var navToggle = document.querySelector("[data-nav-toggle]");
  var mainNav = document.querySelector("[data-main-nav]");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mainNav.addEventListener("click", function (e) {
      if (e.target.tagName === "A" && mainNav.classList.contains("is-open")) {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /* Scroll reveal                                                       */
  /* ------------------------------------------------------------------ */
  var revealEls = document.querySelectorAll(".reveal");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if ("IntersectionObserver" in window && !reduceMotion) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px 100px 0px" }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ------------------------------------------------------------------ */
  /* Smooth in-page anchor navigation with focus management for a11y     */
  /* ------------------------------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href").slice(1);
      var target = id && document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  });

  /* ------------------------------------------------------------------ */
  /* Modal / lightbox                                                    */
  /* ------------------------------------------------------------------ */
  var overlay = document.querySelector("[data-modal-overlay]");
  var modalBody = document.querySelector("[data-modal-body]");
  var modalCloseBtn = document.querySelector("[data-modal-close]");
  var lastTrigger = null;

  function getFocusable(container) {
    return Array.prototype.slice.call(
      container.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      )
    );
  }

  function openModal(trigger) {
    var templateId = trigger.getAttribute("data-modal-content");
    var template = document.getElementById(templateId);
    if (!overlay || !modalBody || !template) return;

    lastTrigger = trigger;
    modalBody.innerHTML = "";
    modalBody.appendChild(template.content.cloneNode(true));
    overlay.hidden = false;
    // Force reflow so the transition class change actually animates.
    void overlay.offsetWidth;
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";

    var focusables = getFocusable(overlay);
    if (focusables.length) focusables[0].focus();
  }

  function closeModal() {
    if (!overlay) return;
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";
    window.setTimeout(
      function () {
        overlay.hidden = true;
        if (lastTrigger) lastTrigger.focus();
      },
      reduceMotion ? 0 : 260
    );
  }

  document.querySelectorAll("[data-modal-content]").forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      openModal(trigger);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeModal);
  }

  if (overlay) {
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closeModal();
    });

    overlay.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeModal();
        return;
      }
      if (e.key === "Tab") {
        var focusables = getFocusable(overlay);
        if (!focusables.length) return;
        var first = focusables[0];
        var last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }
})();
