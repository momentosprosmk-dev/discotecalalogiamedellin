// wifi_menu.js | Gestiona el banner Wi-Fi

function initWifiBanner() {
  const banner = document.getElementById("wifi-banner");
  const cerrar = document.getElementById("cerrar-wifi");
  const qrImg = document.getElementById("wifi-qr");
  qrImg.src = "/recursos/media/global/qr_wifi_discoteca_la_logia.avif";
  // Abrir banner
  document.getElementById("btn-wifi")?.addEventListener("click", () => {
    banner.classList.add("visible");
  });
  // Cerrar banner
  cerrar?.addEventListener("click", () => {
    banner.classList.remove("visible");
  });
  // Cerrar si se hace clic fuera del cuadro
  banner.addEventListener("click", (e) => {
    if (!e.target.closest(".banner-content")) {
      banner.classList.remove("visible");
    }
  });
}
initWifiBanner();
