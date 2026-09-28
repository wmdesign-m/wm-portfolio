/* === WM Design — Global JS === */

document.addEventListener("DOMContentLoaded", () => {
  /* --- Mobile menu --- */
  const hamburger = document.querySelector(".nav__hamburger");
  const mobileMenu = document.querySelector(".nav__mobile");

  if (hamburger && mobileMenu) {
    const mobileBreakpoint = window.matchMedia("(max-width: 768px)");
    const backgroundContent = document.querySelectorAll("main, .footer");
    const navLogo = document.querySelector(".nav__logo");
    const isMenuOpen = () => mobileMenu.classList.contains("open");

    const setBackgroundInert = (isInert) => {
      backgroundContent.forEach((element) => {
        element.inert = isInert;
      });
    };

    const openMenu = () => {
      hamburger.classList.add("open");
      mobileMenu.classList.add("open");
      hamburger.setAttribute("aria-expanded", "true");
      hamburger.setAttribute("aria-label", "メニューを閉じる");
      document.body.classList.add("menu-open");
      setBackgroundInert(true);
    };

    const closeMenu = ({ restoreFocus = false } = {}) => {
      hamburger.classList.remove("open");
      mobileMenu.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
      hamburger.setAttribute("aria-label", "メニューを開く");
      document.body.classList.remove("menu-open");
      setBackgroundInert(false);

      if (restoreFocus && mobileBreakpoint.matches) {
        hamburger.focus();
      }
    };

    hamburger.addEventListener("click", () => {
      if (isMenuOpen()) {
        closeMenu({ restoreFocus: true });
      } else {
        openMenu();
      }
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && isMenuOpen()) {
        closeMenu({ restoreFocus: true });
      }
    });

    mobileBreakpoint.addEventListener("change", (event) => {
      if (event.matches || !isMenuOpen()) return;

      const hadMobileFocus =
        document.activeElement === hamburger ||
        mobileMenu.contains(document.activeElement);

      closeMenu();

      if (hadMobileFocus && navLogo) {
        navLogo.focus();
      }
    });
  }

  /* --- TOP nav background on scroll --- */
  const topPage = document.body.classList.contains("top-page");
  const nav = document.querySelector(".nav");

  if (topPage && nav) {
    const updateTopNav = () => {
      nav.classList.toggle("scrolled", window.scrollY > 60);
    };

    updateTopNav();

    window.addEventListener("scroll", updateTopNav, {
      passive: true,
    });
  }

  /* --- Hero video playback control --- */
  const heroVideo = document.querySelector(".hero__video");
  const heroVideoToggle = document.querySelector(".hero__video-toggle");

  if (heroVideo && heroVideoToggle) {
    const heroMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let userVideoPreference = null;

    const updateHeroVideoControl = () => {
      const isPaused = heroVideo.paused;

      heroVideoToggle.classList.toggle("is-paused", isPaused);
      heroVideoToggle.setAttribute(
        "aria-label",
        isPaused ? "背景動画を再生" : "背景動画を一時停止",
      );
    };

    const playHeroVideo = () => {
      const playPromise = heroVideo.play();

      if (playPromise) {
        playPromise.catch(updateHeroVideoControl);
      }
    };

    const syncHeroVideoWithMotionPreference = () => {
      if (userVideoPreference !== null) return;

      if (heroMotionQuery.matches) {
        heroVideo.pause();
      } else {
        playHeroVideo();
      }

      updateHeroVideoControl();
    };

    heroVideoToggle.addEventListener("click", () => {
      if (heroVideo.paused) {
        userVideoPreference = "play";
        playHeroVideo();
      } else {
        userVideoPreference = "pause";
        heroVideo.pause();
      }

      updateHeroVideoControl();
    });

    heroVideo.addEventListener("play", updateHeroVideoControl);
    heroVideo.addEventListener("pause", updateHeroVideoControl);
    heroMotionQuery.addEventListener(
      "change",
      syncHeroVideoWithMotionPreference,
    );

    syncHeroVideoWithMotionPreference();
  }

  /* --- Fade-up on scroll --- */
  const fadeEls = document.querySelectorAll(".fade-up");

  if (fadeEls.length) {
    const fadeMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let fadeObserver = null;
    const fadeTimers = new Map();

    const revealElement = (element) => {
      element.classList.add("visible");
      fadeTimers.delete(element);
    };

    const revealAllImmediately = () => {
      fadeObserver?.disconnect();
      fadeObserver = null;

      fadeTimers.forEach((timerId) => {
        window.clearTimeout(timerId);
      });
      fadeTimers.clear();

      fadeEls.forEach((element) => {
        element.classList.remove("is-fade-ready");
        revealElement(element);
      });
    };

    if (fadeMotionQuery.matches || !("IntersectionObserver" in window)) {
      revealAllImmediately();
    } else {
      fadeObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const delay = Number(entry.target.dataset.delay) || 0;

            if (delay > 0) {
              const timerId = window.setTimeout(() => {
                revealElement(entry.target);
              }, delay);
              fadeTimers.set(entry.target, timerId);
            } else {
              revealElement(entry.target);
            }

            fadeObserver.unobserve(entry.target);
          });
        },
        {
          threshold: 0.12,
        },
      );

      fadeEls.forEach((element) => {
        fadeObserver.observe(element);
        element.classList.add("is-fade-ready");
      });
    }

    fadeMotionQuery.addEventListener("change", (event) => {
      if (event.matches) {
        revealAllImmediately();
      }
    });
  }

  /* --- For Whom: a quiet, reversible reading guide --- */
  const story = document.querySelector(".forwhom__story");

  if (story) {
    const items = Array.from(story.querySelectorAll(".forwhom__item"));
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let stopMotion = () => {};

    const syncMotion = () => {
      stopMotion();
      // No animation observers, scroll listeners or frames in reduced motion.
      if (motionQuery.matches || items.length < 2) return;

      let frame = 0;
      let needsMeasure = true;
      let positions = [];
      let previousCursor = null;
      let previousScrollY = window.scrollY;
      const update = () => {
        frame = 0;
        const storyTop = story.getBoundingClientRect().top;
        const remeasured = needsMeasure;
        if (needsMeasure) {
          // Cache dot centres; read all geometry before writing styles.
          positions = items.map((item) => {
            const rect = item.getBoundingClientRect();
            return rect.top - storyTop + parseFloat(getComputedStyle(item).lineHeight) / 2;
          });
          needsMeasure = false;
        }
        const cursor = window.innerHeight * 0.62 - storyTop;
        const scrollingDown = window.scrollY > previousScrollY;
        items.forEach((item, index) => {
          const start = positions[index];
          const end = positions[index + 1];
          const active = cursor >= start - 0.5;
          // Only animate a downward crossing, never initial layout or remeasurement.
          if (
            !remeasured && scrollingDown && previousCursor !== null &&
            previousCursor < start - 0.5 && active
          ) {
            item.classList.add("is-lit");
          } else if (!active) {
            // Reset immediately above the dot, including quick reverse passes.
            item.classList.remove("is-lit");
          }
          item.classList.toggle("is-active", active);
          if (end !== undefined) {
            const progress = Math.max(0, Math.min(1, (cursor - start) / (end - start)));
            item.style.setProperty("--forwhom-progress", String(progress));
          }
        });
        previousCursor = cursor;
        previousScrollY = window.scrollY;
      };
      const schedule = () => {
        if (!frame) frame = window.requestAnimationFrame(update);
      };
      const measure = () => {
        needsMeasure = true;
        schedule();
      };

      const clearGlow = (event) => {
        if (event.animationName === "forwhom-glow" && items.includes(event.target)) {
          event.target.classList.remove("is-lit");
        }
      };

      story.addEventListener("animationend", clearGlow);
      update();
      story.classList.add("is-enhanced");
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", measure);
      // Covers font loading, wrapping and content-size changes without polling.
      const resizeObserver = "ResizeObserver" in window ? new ResizeObserver(measure) : null;
      if (resizeObserver) resizeObserver.observe(story);

      stopMotion = () => {
        story.removeEventListener("animationend", clearGlow);
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", measure);
        if (resizeObserver) resizeObserver.disconnect();
        window.cancelAnimationFrame(frame);
        story.classList.remove("is-enhanced");
        items.forEach((item) => {
          item.classList.remove("is-active", "is-lit");
          item.style.removeProperty("--forwhom-progress");
        });
      };
    };

    syncMotion();
    motionQuery.addEventListener("change", syncMotion);
  }

  /* --- Active nav link --- */
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav__link").forEach((link) => {
    const href = link.getAttribute("href");

    if (href === currentPage) {
      link.classList.add("active");
    }
  });
});
