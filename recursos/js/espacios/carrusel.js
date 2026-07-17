// carrusel.js | Gestionar movimiento de imagenes de espacios

document.addEventListener("DOMContentLoaded", () => {
  // Inicializa todos los carruseles
  const carruseles = document.querySelectorAll(".carrusel");
  carruseles.forEach((carrusel) => {
    let indice = 0;
    const contenedor = carrusel.querySelector(".imagen-contenedor");
    if (!contenedor) return;

    const imagenes = contenedor.querySelectorAll("img");
    if (imagenes.length === 0) return;

    // Función para mostrar la imagen activa
    const mostrarImagen = (i) => {
      imagenes.forEach((img) => img.classList.remove("imagen-activa"));
      imagenes[i].classList.add("imagen-activa");
    };

    // Flechas de navegación
    const flechaIzq = carrusel.querySelector(".flecha.izquierda");
    const flechaDer = carrusel.querySelector(".flecha.derecha");

    if (flechaIzq) {
      flechaIzq.addEventListener("click", () => {
        indice = (indice - 1 + imagenes.length) % imagenes.length;
        mostrarImagen(indice);
      });
    }

    if (flechaDer) {
      flechaDer.addEventListener("click", () => {
        indice = (indice + 1) % imagenes.length;
        mostrarImagen(indice);
      });
    }
  });

  // Overlay para banners
  const overlay = document.getElementById("banner-overlay");
  if (overlay) {
    overlay.addEventListener("click", (e) => {
      const activeBanner = overlay.querySelector(".banner-fotos.visible");
      if (activeBanner && !activeBanner.contains(e.target)) {
        activeBanner.classList.remove("visible");
        overlay.classList.remove("visible");
      }
    });
  }

  // Funciones globales para abrir/cerrar banners
  window.abrirBanner = function (id) {
    const overlay = document.getElementById("banner-overlay");
    const banner = document.getElementById(id);
    if (overlay && banner) {
      overlay.classList.add("visible");
      banner.classList.add("visible");
    }
  };

  window.cerrarBanner = function (id) {
    const overlay = document.getElementById("banner-overlay");
    const banner = document.getElementById(id);
    if (overlay && banner) {
      banner.classList.remove("visible");
      overlay.classList.remove("visible");
    }
  };

  // Botones de reserva dentro de banners
  document.querySelectorAll(".reservar-banner").forEach((boton) => {
    boton.addEventListener("click", () => {
      const banner = boton.closest(".banner-fotos");
      if (!banner) return;
      const titulo = banner.querySelector(".titulo-banner")?.textContent || "";
      localStorage.setItem("zonaSeleccionada", titulo);
      window.open("../../formularios/reservar.html", "_blank");
    });
  });
});
