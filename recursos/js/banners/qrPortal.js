// share_menu.js | Gestiona el banner Compartir Portal

function initShareBanner() {
  const banner = document.getElementById("share-banner");
  if (!banner) return;

  const cerrar = document.getElementById("cerrar-share");
  const compartirBtn = document.getElementById("compartir-enlace");
  const qrImg = document.getElementById("share-qr");
  if (qrImg) {
    qrImg.src = "/recursos/media/global/qr_portal_discoteca_la_logia.avif";
  }

  // Abrir banner
  document.getElementById("btn-share")?.addEventListener("click", () => {
    banner.classList.add("visible");
  });

  // Compartir enlace con navigator.share nativo o fallback a copiar URL
  compartirBtn?.addEventListener("click", async () => {
    const urlCompartir = window.location.origin;
    const datosCompartir = {
      title: "Discoteca La Logia Medellín",
      text: "Explora nuestra carta de licores y reserva tu mesa en Discoteca La Logia Medellín:",
      url: urlCompartir
    };

    if (navigator.share) {
      try {
        await navigator.share(datosCompartir);
        return;
      } catch (err) {
        if (err && err.name === "AbortError") return;
      }
    }

    // Fallback en caso de que el navegador no soporte navigator.share (ej. en PC)
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(urlCompartir);
      } else {
        const tempInput = document.createElement("input");
        tempInput.value = urlCompartir;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
      }

      const textoOriginal = "Compartir enlace";
      compartirBtn.textContent = "¡Enlace copiado!";
      compartirBtn.classList.add("copiado");
      setTimeout(() => {
        compartirBtn.textContent = textoOriginal;
        compartirBtn.classList.remove("copiado");
      }, 2000);
    } catch (err) {
      console.error("Error al compartir o copiar el enlace:", err);
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
initShareBanner();
