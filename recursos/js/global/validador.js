// validador.js

document.addEventListener("DOMContentLoaded", () => {
  const scriptGateway = document.createElement("script");
  scriptGateway.src = "/smk/recursos/js/global/gateway.js";

  scriptGateway.onload = () => {
    console.log("gateway.js cargado, tyc_fecha:", window.tyc_fecha);

    const tycValue = localStorage.getItem("tyc");
    console.log("tycValue:", tycValue);

    if (tycValue && typeof window.tyc_fecha !== "undefined" && tycValue === window.tyc_fecha) {
      document.getElementById("tyc-container")?.remove();

      validarMarketing()
    } else {
      iniciarBannerTyCLoad()
    }
  };

  scriptGateway.onerror = () => {
    console.error("Error al cargar gateway.js, no se puede validar TyC");
  };

  document.head.appendChild(scriptGateway);
});

// Función para Banner de Marketing
async function validarMarketing() {
  const archivos = [
    `https://momentosprosmk-dev.github.io/discotecalalogiamedellin-media/recursos/media/marketing/${baseIndex}.1.avif`,
    `https://momentosprosmk-dev.github.io/discotecalalogiamedellin-media/recursos/media/marketing/${baseIndex}.2.avif`
  ];

  let encontrado = null;

  for (const archivo of archivos) {
    try {
      const resp = await fetch(archivo, { method: 'HEAD' });
      if (resp.ok) {
        encontrado = archivo;
        break;
      }
    } catch (e) {
    }
  }

  if (encontrado) {
    localStorage.setItem("avisoPatch", encontrado);

    const nombreArchivo = encontrado.split("/").pop();
    let htmlRuta = "";

    if (nombreArchivo.endsWith(".1.avif")) {
      htmlRuta = `/recursos/html/marketing/informacion.html`;
    } else if (nombreArchivo.endsWith(".2.avif")) {
      htmlRuta = `/recursos/html/marketing/reservar.html`;
    }

    localStorage.setItem("avisoHtml", htmlRuta);

    const script = document.createElement("script");
    script.src = `/recursos/js/marketing/banner.js`;
    document.body.appendChild(script);
  } else {
    document.getElementById("marketing-container").style.display = "none";
  }
}

// Función de TYC
function iniciarBannerTyCLoad() {
  window.bannerConfig = {
    cssRuta: "/smk/recursos/css/tyc/banner.css",
    linkRuta: "/smk/tyc/",
    rechazarRuta: "/",
    logoRuta: "/smk/recursos/media/tyc/logo_momentos_pro.avif"
  };

  fetch("/smk/recursos/html/tyc/banner.html")
    .then(res => res.text())
    .then(html => {
      const container = document.getElementById("tyc-container");
      if (!container) return;
      container.innerHTML = html;

      const containerLogo = document.getElementById("logo-banner");
      if (containerLogo && window.bannerConfig?.logoRuta) {
        const logoImg = document.createElement("img");
        logoImg.src = window.bannerConfig.logoRuta;
        logoImg.alt = "MomentosPro";
        containerLogo.appendChild(logoImg);
      }

      const css = document.createElement("link");
      css.rel = "stylesheet";
      css.href = window.bannerConfig.cssRuta;
      document.head.appendChild(css);

      const script = document.createElement("script");
      script.src = "/smk/recursos/js/tyc/banner.js";
      script.onload = () => {
        if (typeof iniciarBannerTyC === "function") {
          iniciarBannerTyC(window.tyc_fecha);
        }
      };
      document.body.appendChild(script);
    })
    .catch(err => console.error("Error cargando banner TyC:", err));
}