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
