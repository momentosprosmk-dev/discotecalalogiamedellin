// banner.js | Se encarga de inyectar html y CSS del Marketing

async function cargarBanner() {
  const rutaImagen = localStorage.getItem("avisoPatch");
  const rutaHtml   = localStorage.getItem("avisoHtml");
  const contenedor = document.getElementById("marketing-container");

  if (!rutaImagen || !rutaHtml) {
    contenedor.style.display = "none";
    return;
  }

  try {
    const resp = await fetch(rutaHtml);
    if (!resp.ok) throw new Error("No se pudo cargar el HTML del banner");
    const htmlContenido = await resp.text();

    contenedor.innerHTML = htmlContenido;

    // Insertar imagen en #logo-banner
    const logoBanner = contenedor.querySelector("#banner-image");
    if (logoBanner) {
      const img = document.createElement("img");
      img.src = rutaImagen;
      img.alt = "Publicidad";
      logoBanner.appendChild(img);
    }

    // Cargar siempre base.css
    const baseCss = `${basePath}recursos/css/marketing/base.css`;
    if (!document.querySelector(`link[href="${baseCss}"]`)) {
      const linkBase = document.createElement("link");
      linkBase.rel = "stylesheet";
      linkBase.href = baseCss;
      document.head.appendChild(linkBase);
    }

    // Determinar CSS específico según HTML
    let cssRuta = "";
    if (rutaHtml.includes("informacion.html")) {
      cssRuta = `${basePath}recursos/css/marketing/informacion.css`;
    } else if (rutaHtml.includes("reservar.html")) {
      cssRuta = `${basePath}recursos/css/marketing/reservar.css`;
    }

    if (cssRuta && !document.querySelector(`link[href="${cssRuta}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = cssRuta;
      document.head.appendChild(link);
    }

    // Mostrar banner
    const banner = contenedor.querySelector(".bn-info");
    if (banner) {
      banner.classList.add("visible");

      // Botón de cierre
      const btnCerrar = document.createElement("button");
      btnCerrar.className = "btn-cerrar-banner";
      btnCerrar.innerHTML = "&times;";
      banner.appendChild(btnCerrar);

      btnCerrar.addEventListener("click", () => {
        banner.classList.remove("visible");
      });

      // Cerrar al hacer clic fuera del contenido
      banner.addEventListener("click", (e) => {
        if (e.target === banner) {
          banner.classList.remove("visible");
        }
      });
    }

  } catch (error) {
    console.error("Error cargando banner:", error);
    contenedor.style.display = "none";
  }
}

cargarBanner();
