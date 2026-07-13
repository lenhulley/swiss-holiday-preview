// Holiday search form — tabs, guests stepper popover, submit summary.
(function () {
  const form = document.getElementById("holidaySearch");
  if (!form) return;

  /* --- Tabs --- */
  const tabs = Array.from(form.querySelectorAll(".hsearch__tab"));
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => { t.classList.remove("is-active"); t.setAttribute("aria-selected", "false"); });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
    });
  });

  /* --- Duration select colour state --- */
  const nights = document.getElementById("fldNights");
  nights?.addEventListener("change", () => { nights.style.color = "var(--navy-500)"; });

  /* --- Guests stepper popover --- */
  const guestsBtn = document.getElementById("fldGuests");
  const pop = document.getElementById("guestsPop");
  const ph = guestsBtn?.querySelector(".hinput__btn-ph");
  const counts = { adults: 2, children: 0 };
  const limits = { adults: [1, 9], children: [0, 8] };

  function renderCounts() {
    pop.querySelectorAll("[data-count]").forEach((el) => { el.textContent = counts[el.dataset.count]; });
    pop.querySelectorAll("[data-step]").forEach((btn) => {
      const [min, max] = limits[btn.dataset.step];
      const v = counts[btn.dataset.step];
      btn.disabled = btn.dataset.dir === "-1" ? v <= min : v >= max;
    });
  }
  function labelGuests() {
    const parts = [`${counts.adults} adult${counts.adults !== 1 ? "s" : ""}`];
    if (counts.children) parts.push(`${counts.children} child${counts.children !== 1 ? "ren" : ""}`);
    ph.textContent = parts.join(", ");
    guestsBtn.classList.add("has-value");
  }
  function openPop(open) {
    pop.hidden = !open;
    guestsBtn.setAttribute("aria-expanded", open ? "true" : "false");
  }

  if (guestsBtn && pop) {
    renderCounts();
    guestsBtn.addEventListener("click", (e) => { e.stopPropagation(); openPop(pop.hidden); });
    pop.addEventListener("click", (e) => e.stopPropagation());
    pop.querySelectorAll("[data-step]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.dataset.step, dir = +btn.dataset.dir;
        const [min, max] = limits[key];
        counts[key] = Math.max(min, Math.min(max, counts[key] + dir));
        renderCounts();
      });
    });
    document.getElementById("guestsApply").addEventListener("click", () => { labelGuests(); openPop(false); });
    document.addEventListener("click", () => openPop(false));
  }

  /* --- Filter tab groups (Summer / Rail / Winter collections) --- */
  document.querySelectorAll(".filter-tabs").forEach((group) => {
    const gtabs = Array.from(group.querySelectorAll(".filter-tab"));
    gtabs.forEach((t) => t.addEventListener("click", () => {
      gtabs.forEach((x) => x.classList.remove("is-active"));
      t.classList.add("is-active");
      // reset the collection scroll position for feedback
      const track = group.parentElement.querySelector(".scroll-cards");
      track?.scrollTo({ left: 0, behavior: "smooth" });
    }));
  });

  /* --- Submit --- */
  const result = document.getElementById("searchResult");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const airport = document.getElementById("fldAirport").value.trim();
    const dest = document.getElementById("fldDest").value.trim();
    const activeTab = form.querySelector(".hsearch__tab.is-active")?.textContent.trim();
    const summary = [];
    if (dest) summary.push(dest);
    if (airport) summary.push(`from ${airport}`);
    if (nights?.value) summary.push(nights.value);
    summary.push(`${counts.adults + counts.children} guest${counts.adults + counts.children !== 1 ? "s" : ""}`);
    result.hidden = false;
    result.textContent = `Searching ${activeTab} — ${summary.join(" · ")}. (Demo: results would load here.)`;
  });

  /* --- Newsletter signup with validation --- */
  const news = document.getElementById("newsletterForm");
  const newsMsg = document.getElementById("newsletterMsg");
  news?.addEventListener("submit", (e) => {
    e.preventDefault();
    const first = news.first.value.trim();
    const email = news.email.value.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    news.querySelectorAll("input").forEach((i) => i.classList.remove("is-invalid"));
    if (!first) { news.first.classList.add("is-invalid"); }
    if (!emailOk) { news.email.classList.add("is-invalid"); }
    newsMsg.hidden = false;
    if (!first || !emailOk) {
      newsMsg.textContent = "Please enter your name and a valid email address.";
      newsMsg.className = "footer-news__msg is-error";
      return;
    }
    newsMsg.textContent = `Thanks ${first} — you're on the list! Check ${email} to confirm.`;
    newsMsg.className = "footer-news__msg is-ok";
    news.reset();
  });
})();
