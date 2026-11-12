/* site.js — sin dependencias. Todo con APIs nativas. */
(function () {
  "use strict";
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- 0. correctivos de contenido ---------- */
  /* El contador de repos públicos cambia con el tiempo (15 -> 22). Se corrige en
     los diccionarios antes de que i18n.js los aplique, así el arreglo sobrevive
     al botón ES/EN. Cuando el HTML y los diccionarios del repo estén al día, esto
     no encontrará nada que cambiar. */
  if (window.I18N) {
    ["es", "en"].forEach(function (lang) {
      var d = window.I18N[lang];
      if (!d || typeof d["hero.lead"] !== "string") return;
      d["hero.lead"] = d["hero.lead"]
        .replace("15 repositorios", "22 repositorios")
        .replace("15 public repositories", "22 public repositories");
    });
    /* i18n.js corre antes (los dos van con defer) y ya escribió el texto viejo
       en el DOM, así que aquí se corrige también lo que está en pantalla. */
    var lead = $(".hero__lead");
    if (lead) {
      lead.innerHTML = lead.innerHTML
        .replace(/15 repositorios/g, "22 repositorios")
        .replace(/15 public repositories/g, "22 public repositories");
    }
  }

  /* ---------- 1. barra de progreso + nav ---------- */
  var bar = $("#progress"), nav = $(".nav");
  function onScroll() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    if (bar) bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
    if (nav) nav.classList.toggle("is-stuck", h.scrollTop > 12);
  }
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- 2. reveal al entrar en viewport ---------- */
  var targets = $$(".reveal, .lang");
  if (!("IntersectionObserver" in window) || reduce) {
    targets.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var d = el.dataset.delay || 0;
        setTimeout(function () { el.classList.add("is-in"); }, d);
        io.unobserve(el);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    targets.forEach(function (el, i) {
      if (!el.dataset.delay) el.dataset.delay = (i % 6) * 70;
      io.observe(el);
    });
  }

  /* ---------- 3. rotador de roles ---------- */
  var rot = $("#rotator");
  if (rot) {
    var roles = JSON.parse(rot.dataset.roles || "[]");
    var b = rot.querySelector("b"), i = 0;
    if (roles.length > 1 && !reduce) {
      setInterval(function () {
        i = (i + 1) % roles.length;
        b.style.opacity = 0;
        setTimeout(function () {
          b.textContent = roles[i];
          b.style.transition = "opacity .35s";
          b.style.opacity = 1;
        }, 220);
      }, 3200);
    }
  }

  /* ---------- 4. contadores ---------- */
  function count(el) {
    var to = parseFloat(el.dataset.count), dec = (el.dataset.count.split(".")[1] || "").length;
    if (reduce || !to) { el.textContent = to.toFixed(dec); return; }
    var t0 = performance.now(), dur = 1100;
    function step(t) {
      var p = Math.min(1, (t - t0) / dur), eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (to * eased).toFixed(dec);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ("IntersectionObserver" in window) {
    var io2 = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { count(e.target); io2.unobserve(e.target); } });
    }, { threshold: 0.5 });
    $$("[data-count]").forEach(function (el) { io2.observe(el); });
  }

  /* ---------- 5. filtros de proyectos ---------- */
  var filters = $$(".filter"), cards = $$(".card[data-cat]");
  filters.forEach(function (f) {
    f.addEventListener("click", function () {
      var cat = f.dataset.filter;
      filters.forEach(function (o) { o.classList.toggle("is-on", o === f); });
      cards.forEach(function (c) {
        var cats = (c.dataset.cat || "").split(" ");
        var show = cat === "all" || cats.indexOf(cat) > -1;
        c.classList.toggle("is-hidden", !show);
      });
    });
  });

  /* ---------- 6. brillo que sigue al cursor ---------- */
  if (!reduce && matchMedia("(hover:hover)").matches) {
    cards.forEach(function (c) {
      c.addEventListener("pointermove", function (e) {
        var r = c.getBoundingClientRect();
        c.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
        c.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
      });
    });
  }

  /* ---------- 7. modal de certificados ---------- */
  var modal = $("#modal"), modalImg = $("#modalImg");
  $$(".cert").forEach(function (c) {
    c.addEventListener("click", function () {
      var img = c.querySelector("img");
      if (!modal || !img) return;
      modalImg.src = img.currentSrc || img.src;
      modalImg.alt = img.alt || "Certificado ampliado";
      modal.classList.add("is-open");
      modal.focus();
    });
  });
  function closeModal() { if (modal) modal.classList.remove("is-open"); }
  if (modal) {
    modal.addEventListener("click", closeModal);
    addEventListener("keydown", function (e) { if (e.key === "Escape") closeModal(); });
  }

  /* ---------- 8. marquee infinito (duplica sin coste extra en HTML) ---------- */
  var track = $(".marquee__track");
  if (track) track.innerHTML += track.innerHTML;

  /* ---------- 9. scrollspy ---------- */
  var links = $$(".nav__link[href^='#']");
  var sections = links.map(function (l) { return $(l.getAttribute("href")); }).filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    var io3 = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (l) {
          l.classList.toggle("is-active", l.getAttribute("href") === "#" + e.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { io3.observe(s); });
  }

  /* ---------- 10. año ---------- */
  var y = $("#year");
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- 11. notebooks: abrir en Colab ---------- */
  /* Solo los proyectos con notebook versionado. Colab abre el archivo tal como
     está en el repo: sin instalar nada y sin datos que no existan. */
  var COLAB = {
    "Crypto_Medallion_Analytics": "notebooks/crypto_medallion_colab.ipynb",
    "Tech_GlobalStore_Retail_Analysis-Fabric": "notebooks/globalstore_retail_colab.ipynb",
    "ETFbook-data-analytics-case-study": "notebooks/etfbook_flows_colab.ipynb",
    "ETL_Egatur_INE_Esp": "Egatur_Power_BI_project.ipynb",
    "Customer-Churn-Project": "Customer_Churn_Python%2BSQlite.ipynb",
    "Customer-Sentiment-Analysis-Product-Improvement-Drivers": "Sentiment_Analysis_and_Satisfaction_Drivers_in_E_commerce_Reviews.ipynb",
    "Online-Retail-Business-Analysis": "Online_Retail_Analysis.ipynb",
    "German_Credit_Scoring_Data": "German_Credit_Data.ipynb"
  };
  $$(".card").forEach(function (card) {
    var row = card.querySelector(".card__links");
    if (!row || row.querySelector('a[href*="colab.research.google.com"]')) return;
    /* el primer enlace a GitHub del repo no siempre es el del repo: muchas
       tarjetas empiezan por el informe (…/blob/main/docs/report.html). */
    var links = row.querySelectorAll('a[href^="https://github.com/Nicolenki7/"]');
    var repo = null;
    for (var k = 0; k < links.length; k++) {
      var seg = links[k].getAttribute("href")
        .replace(/^https:\/\/github\.com\/Nicolenki7\//, "").replace(/\/$/, "");
      if (seg && seg.indexOf("/") === -1) { repo = seg; break; }
    }
    var nb = repo && COLAB[repo];
    if (!nb) return;
    var a = document.createElement("a");
    a.className = "card__link";
    a.href = "https://colab.research.google.com/github/Nicolenki7/" + repo + "/blob/main/" + nb;
    a.target = "_blank";
    a.rel = "noopener";
    a.title = "Abrir en Colab";
    a.textContent = "Colab";
    a.appendChild(document.createTextNode(" ↗"));
    row.appendChild(a);
  });

  /* ---------- 12. datos desactualizados en el HTML ---------- */
  /* Se corrigen aquí mientras el HTML del repo no esté actualizado; cuando lo
     esté, estos selectores no encuentran nada y la sección no hace nada. */
  var kaggle = $('.social[href*="kaggle.com"]');
  if (kaggle) kaggle.remove();
  var ghRepos = $('.social[href="https://github.com/Nicolenki7"] small');
  if (ghRepos && /15 repos/.test(ghRepos.textContent)) {
    ghRepos.textContent = "Nicolenki7 · 22 repos públicos";
  }
  var kpiRepos = $('.kpi [data-count="15"]');
  if (kpiRepos) {
    kpiRepos.setAttribute("data-count", "22");
    kpiRepos.textContent = "22";
  }
  $$(".term__line").forEach(function (line) {
    if (line.textContent.indexOf("públicos") === -1) return;
    var k = line.querySelector(".k");
    if (k && k.textContent.trim() === "15") k.textContent = "22";
  });
})();
