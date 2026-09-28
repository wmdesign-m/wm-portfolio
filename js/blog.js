(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const page = document.querySelector(".magazine-page");
    if (!page) return;

    const revealItems = Array.from(page.querySelectorAll(".magazine-reveal"));
    if (!revealItems.length) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer = null;

    const revealAllImmediately = () => {
      observer?.disconnect();
      observer = null;
      revealItems.forEach((item) => {
        item.classList.remove("is-reveal-ready");
        item.classList.add("is-visible");
      });
    };

    if (motionQuery.matches || !("IntersectionObserver" in window)) {
      revealAllImmediately();
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -10%", threshold: 0.1 },
      );

      revealItems.forEach((item) => {
        observer.observe(item);
        item.classList.add("is-reveal-ready");
      });
    }

    motionQuery.addEventListener("change", (event) => {
      if (event.matches) {
        revealAllImmediately();
      }
    });
  });
})();
