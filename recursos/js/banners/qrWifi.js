// wifi_menu.js | Gestiona el banner Wi-Fi

function initWifiBanner() {
  const banner = document.getElementById("wifi-banner");
  if (!banner) return;

  const cerrar = document.getElementById("cerrar-wifi");
  const copiarBtn = document.getElementById("copiar-wifi");
  const passEl = document.getElementById("wifi-pass");
  const qrImg = document.getElementById("wifi-qr");
  if (qrImg) {
    qrImg.src = "/recursos/media/global/qr_wifi_discoteca_la_logia.avif";
  }

  // Abrir banner
  document.getElementById("btn-wifi")?.addEventListener("click", () => {
    banner.classList.add("visible");
  });

  // Copiar contraseña al portapapeles
  copiarBtn?.addEventListener("click", async () => {
    const pass = passEl ? passEl.textContent.trim() : "logia123";
    const textoOriginal = "Copiar contraseña";

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(pass);
      } else {
        const tempInput = document.createElement("input");
        tempInput.value = pass;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
      }

      copiarBtn.textContent = "¡Contraseña copiada!";
      copiarBtn.classList.add("copiado");
      setTimeout(() => {
        copiarBtn.textContent = textoOriginal;
        copiarBtn.classList.remove("copiado");
      }, 2000);
    } catch (err) {
      console.error("No se pudo copiar la contraseña:", err);
    }
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
