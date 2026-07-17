// contacto_menu.js | Gestiona el banner Contacto

function initContactoBanner() {
  const banner = document.getElementById("contacto-banner");
  if (!banner) return;

  const cerrar = document.getElementById("cerrar-contacto");

  document.getElementById("btn-contacto")?.addEventListener("click", () => {
    banner.classList.add("visible");
  });

  cerrar?.addEventListener("click", () => {
    banner.classList.remove("visible");
  });

  banner.addEventListener("click", (e) => {
    if (!e.target.closest(".banner-content")) {
      banner.classList.remove("visible");
    }
  });

  // Botones de acción usando window.enlaces
  document.getElementById("btn-whatsapp")?.addEventListener("click", () => {
    console.log("WhatsApp:", window.enlaces?.["btn-whatsapp"]);
    if (window.enlaces?.["btn-whatsapp"]) location.href = window.enlaces["btn-whatsapp"];
  });

  document.getElementById("btn-facebook")?.addEventListener("click", () => {
    console.log("Facebook:", window.enlaces?.["btn-facebook"]);
    if (window.enlaces?.["btn-facebook"]) location.href = window.enlaces["btn-facebook"];
  });

  document.getElementById("btn-instagram")?.addEventListener("click", () => {
    console.log("Instagram:", window.enlaces?.["btn-instagram"]);
    if (window.enlaces?.["btn-instagram"]) location.href = window.enlaces["btn-instagram"];
  });
}

initContactoBanner();
