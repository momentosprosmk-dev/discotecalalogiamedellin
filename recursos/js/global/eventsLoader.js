// eventsLoader.js | Gestiona el cargue de los banners y otros escript

document.addEventListener("DOMContentLoaded", () => {
  // Inyectar CSS general (una sola vez)
  const generalCSS = document.createElement("link");
  generalCSS.rel = "stylesheet";
  generalCSS.href = "/recursos/css/banners/base.css";
  document.head.appendChild(generalCSS);

  // Lista modular de banners con sus recursos
  const banners = [
    { html: "banners/badgeLogin.html", css: "banners/badgeLogin.css", js: "banners/badgeLogin.js" },
    { html: "banners/contacto.html", css: "banners/contacto.css", js: "banners/contacto.js" },
    { html: "banners/qrWifi.html", css: "banners/qrWifiPortal.css", js: "banners/qrWifi.js" },
    { html: "banners/qrPortal.html", css: "banners/qrWifiPortal.css", js: "banners/qrPortal.js" }
  ];

  banners.forEach(banner => {
    // Cargar HTML
    fetch("/recursos/html/" + banner.html)
      .then(res => res.text())
      .then(html => {
        const container = document.createElement("div");
        container.innerHTML = html;
        document.body.appendChild(container);

        // Inyectar CSS específico
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "/recursos/css/" + banner.css;
        document.head.appendChild(link);

        // Inyectar JS específico
        const script = document.createElement("script");
        script.src = "/recursos/js/" + banner.js;
        document.body.appendChild(script);
      })
      .catch(err => console.error("Error cargando banner:", banner.html, err));
  });

  // Script global
  const globalScript = document.createElement("script");
  globalScript.src = "/recursos/js/global/eventsBadgePresstimer.js";
  document.body.appendChild(globalScript);

  document.addEventListener("click", function(e) {
    if (e.target && e.target.id === "btn-aviso-reservar") {
      window.location.href = basePath + "formularios/reservar/";
    }
  });
});
