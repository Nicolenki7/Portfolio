/* i18n.js — aplica el idioma sin frameworks.
   El HTML trae el español escrito: si este script no corre, el sitio sigue completo. */
(function () {
  "use strict";
  var KEY = "portfolio-lang";
  var html = document.documentElement;

  function dict(lang) {
    return (window.I18N && window.I18N[lang]) || null;
  }

  function apply(lang) {
    var d = dict(lang);
    if (!d) return false;

    html.setAttribute("lang", lang);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var v = d[el.getAttribute("data-i18n")];
      if (v != null) el.textContent = v;
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var v = d[el.getAttribute("data-i18n-html")];
      if (v != null) el.innerHTML = v;
    });

    // el rotador guarda sus opciones en data-roles y lee la primera al cargar
    var rot = document.getElementById("rotator");
    if (rot && d["hero.roles"]) {
      rot.setAttribute("data-roles", JSON.stringify(d["hero.roles"]));
      var b = rot.querySelector("b");
      if (b) b.textContent = d["hero.roles"][0];
    }

    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      var on = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("is-on", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });

    try { localStorage.setItem(KEY, lang); } catch (e) { /* modo privado */ }
    return true;
  }

  function init() {
    var saved = null;
    try { saved = localStorage.getItem(KEY); } catch (e) { /* noop */ }

    // ?lang=en permite compartir un enlace ya traducido
    var param = new URLSearchParams(location.search).get("lang");
    var lang = param || saved || "es";
    apply(lang);

    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        apply(btn.getAttribute("data-lang"));
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
