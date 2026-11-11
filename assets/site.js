/* site.js — sin dependencias. Todo con APIs nativas. */
(function () {
  "use strict";
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

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
})();
