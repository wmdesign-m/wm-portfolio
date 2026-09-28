/* === WM Design — Works Filter === */

document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter__btn[data-filter]");
  const workCards = document.querySelectorAll(".wcard[data-cat]");
  const emptyMessage = document.querySelector("#works-empty");

  if (!filterButtons.length || !workCards.length) return;

  const updateActiveButton = (selectedButton) => {
    filterButtons.forEach((button) => {
      const isActive = button === selectedButton;

      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  };

  const filterWorks = (filter) => {
    let visibleCount = 0;

    workCards.forEach((card) => {
      const categories = (card.dataset.cat || "").split(/\s+/).filter(Boolean);
      const shouldShow = filter === "all" || categories.includes(filter);

      card.hidden = !shouldShow;

      if (shouldShow) {
        visibleCount += 1;
      }
    });

    if (emptyMessage) {
      emptyMessage.hidden = visibleCount > 0;
    }
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter || "all";

      updateActiveButton(button);
      filterWorks(filter);
    });
  });
});
