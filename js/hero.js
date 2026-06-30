// Hero carousel — auto-rotates the 4 slides and syncs the dots.
(function () {
  const slides = Array.from(document.querySelectorAll(".hero__slide"));
  const dots = Array.from(document.querySelectorAll(".hero__dot"));
  if (!slides.length) return;
  let i = 0;
  function go(n) {
    slides[i].classList.remove("is-active");
    dots[i]?.classList.remove("is-active");
    i = (n + slides.length) % slides.length;
    slides[i].classList.add("is-active");
    dots[i]?.classList.add("is-active");
  }
  dots.forEach((d, n) => d.addEventListener("click", () => go(n)));
  setInterval(() => go(i + 1), 5000);
})();

// Mobile nav toggle
(function () {
  const header = document.getElementById("siteHeader");
  const toggle = document.getElementById("navToggle");
  const panel = document.getElementById("navPanel");
  if (!header || !toggle) return;
  toggle.addEventListener("click", () => {
    const open = header.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  // close when a link is tapped
  panel?.addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      header.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
})();
