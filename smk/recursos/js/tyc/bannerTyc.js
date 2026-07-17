// banner_tyc.js | Cargador de banner de TyC

(function () {
  // Cargar links.js primero
  const scriptLinks = document.createElement("script");
  scriptLinks.src = basePath + "smk/recursos/js/global/gateway.js";
  scriptLinks.onload = () => {
    iniciarBannerTyCLoad();
  };
  document.head.appendChild(scriptLinks);

  function iniciarBannerTyCLoad() {
    // Configuración del banner TyC (rutas centralizadas)
    window.bannerConfig = {
      cssRuta: basePath + "smk/recursos/css/tyc/banner.css",
      linkRuta: basePath + "smk/tyc/",
      rechazarRuta: basePath,
      logoRuta: basePath + "smk/recursos/media/tyc/logo_momentos_pro.avif"
    };


    // Carga el HTML del banner y lo inserta en el contenedor
    fetch(basePath + "smk/recursos/html/tyc/banner.html")
      .then(res => res.text())
      .then(html => {
        const container = document.getElementById("tyc-container");
        if (!container) return;
        container.innerHTML = html;

        // Agrega logo del banner
        const containerLogo = document.getElementById("logo-banner");
        if (containerLogo && window.bannerConfig?.logoRuta) {
          const logoImg = document.createElement("img");
          logoImg.src = window.bannerConfig.logoRuta;
          logoImg.alt = "MomentosPro";
          containerLogo.appendChild(logoImg);
        }

        // Agrega el CSS del banner
        const css = document.createElement("link");
        css.rel = "stylesheet";
        css.href = window.bannerConfig.cssRuta;
        document.head.appendChild(css);

        // Agrega el JS del banner y lo inicializa
        const script = document.createElement("script");
        script.src = basePath + "smk/recursos/js/tyc/banner.js";
        script.onload = () => {
          if (typeof iniciarBannerTyC === "function") {
            iniciarBannerTyC(window.tyc_fecha);
          }
        };
        document.body.appendChild(script);
      })
      .catch(err => console.error("Error cargando banner TyC:", err));
  }
})();
