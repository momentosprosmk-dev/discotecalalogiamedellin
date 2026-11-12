// eventsLoader.js | Gestiona el cargue de los banners y otros escript

document.addEventListener("DOMContentLoaded", () => {
  // Inyectar CSS general (una sola vez)
  if (window.cargarCSS) {
    window.cargarCSS("/recursos/css/banners/base.css");
  } else if (!document.querySelector('link[href="/recursos/css/banners/base.css"]')) {
    const generalCSS = document.createElement("link");
    generalCSS.rel = "stylesheet";
    generalCSS.href = "/recursos/css/banners/base.css";
    document.head.appendChild(generalCSS);
  }

  // Lista modular de banners con sus recursos
  const banners = [
    { html: "banners/badgeLogin.html", css: "banners/badgeLogin.css", js: "banners/badgeLogin.js" },
    { html: "banners/contacto.html", css: "banners/contacto.css", js: "banners/contacto.js" },
    { html: "banners/qrWifi.html", css: "banners/qrWifiPortal.css", js: "banners/qrWifi.js" },
    { html: "banners/qrPortal.html", css: "banners/qrWifiPortal.css", js: "banners/qrPortal.js" }
  ];

  banners.forEach((banner) => {
    // Cargar HTML
    fetch("/recursos/html/" + banner.html)
      .then((res) => res.text())
      .then((html) => {
        const container = document.createElement("div");
        container.innerHTML = html;
        document.body.appendChild(container);

        // Inyectar CSS específico (sin duplicar qrWifiPortal.css)
        const cssHref = "/recursos/css/" + banner.css;
        if (window.cargarCSS) {
          window.cargarCSS(cssHref);
        } else if (!document.querySelector(`link[href="${cssHref}"]`)) {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = cssHref;
          document.head.appendChild(link);
        }

        // Inyectar JS específico (sin duplicar)
        const jsSrc = "/recursos/js/" + banner.js;
        if (window.cargarJS) {
          window.cargarJS(jsSrc);
        } else if (!document.querySelector(`script[src="${jsSrc}"]`)) {
          const script = document.createElement("script");
          script.src = jsSrc;
          document.body.appendChild(script);
        }
      })
      .catch((err) => console.error("Error cargando banner:", banner.html, err));
  });

  // Script global
  const globalScriptSrc = "/recursos/js/global/eventsBadgePresstimer.js";
  if (window.cargarJS) {
    window.cargarJS(globalScriptSrc);
  } else if (!document.querySelector(`script[src="${globalScriptSrc}"]`)) {
    const globalScript = document.createElement("script");
    globalScript.src = globalScriptSrc;
    document.body.appendChild(globalScript);
  }

  document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "btn-aviso-reservar") {
      const prefix = typeof basePath !== "undefined" ? basePath : "/";
      window.location.href = prefix + "formularios/reservar/";
    }
  });
});
