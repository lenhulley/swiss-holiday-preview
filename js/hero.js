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

// Desktop mega-menu — hover intent, swaps column set per nav item
(function () {
  const header = document.getElementById("siteHeader");
  const wrap = document.getElementById("megaWrap");
  const items = Array.from(document.querySelectorAll(".has-menu[data-mega]"));
  const colsets = Array.from(document.querySelectorAll(".mega__cols"));
  if (!header || !wrap || !items.length) return;
  let closeTimer;
  function open(key) {
    clearTimeout(closeTimer);
    colsets.forEach((c) => c.classList.toggle("is-active", c.dataset.cols === key));
    items.forEach((i) => i.classList.toggle("is-open", i.dataset.mega === key));
    header.classList.add("mega-open");
  }
  function scheduleClose() {
    closeTimer = setTimeout(() => {
      header.classList.remove("mega-open");
      items.forEach((i) => i.classList.remove("is-open"));
    }, 140);
  }
  items.forEach((li) => {
    li.addEventListener("mouseenter", () => open(li.dataset.mega));
    li.addEventListener("mouseleave", scheduleClose);
    li.querySelector("a")?.addEventListener("focus", () => open(li.dataset.mega));
  });
  wrap.addEventListener("mouseenter", () => clearTimeout(closeTimer));
  wrap.addEventListener("mouseleave", scheduleClose);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { header.classList.remove("mega-open"); items.forEach((i) => i.classList.remove("is-open")); }
  });
})();

// Mobile nav accordion — reuse mega column content under each nav item
(function () {
  const items = Array.from(document.querySelectorAll(".has-menu[data-mega]"));
  items.forEach((li) => {
    const cols = document.querySelector(`.mega__cols[data-cols="${li.dataset.mega}"]`);
    if (!cols) return;
    const body = document.createElement("div");
    body.className = "nav-acc__body";
    body.innerHTML = cols.innerHTML;
    li.appendChild(body);
    // 2nd-level: each column group (Signature Holidays…) collapses to its links
    body.querySelectorAll(".mega__col-title").forEach((t) => {
      t.addEventListener("click", () => t.parentElement.classList.toggle("acc-open"));
    });
    const link = li.querySelector("a");
    link.setAttribute("aria-expanded", "false");
    link.addEventListener("click", (e) => {
      if (window.matchMedia("(max-width: 900px)").matches) {
        e.preventDefault();
        e.stopPropagation();   // expand only — don't trigger the menu-close handler
        const open = li.classList.toggle("is-expanded");
        link.setAttribute("aria-expanded", open ? "true" : "false");
      }
    });
  });
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
