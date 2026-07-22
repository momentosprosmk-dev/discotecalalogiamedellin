// banner.js | Gestión del banner TyC

function iniciarBannerTyC(tycFechaActual) {
  const bannerTyc  = document.getElementById("banner-tyc");
  const btnAceptar = document.getElementById("btn-aceptar-tyc");
  const btnRechazar = document.getElementById("btn-rechazar-tyc");
  const linkTyc = document.getElementById("link-tyc");

  if (!bannerTyc || !btnAceptar || !linkTyc) return;

  const tycEstado = localStorage.getItem("tyc");

  if (tycEstado !== tycFechaActual) {
    bannerTyc.classList.add("visible");
    document.body.classList.add("no-scroll");
  }

  // Acción al aceptar
  btnAceptar.addEventListener("click", () => {
    localStorage.setItem("tyc", tycFechaActual);
    bannerTyc.classList.remove("visible");
    document.body.classList.remove("no-scroll");
    // Ejecutar inmediatamente el Banner de Marketing
    if (typeof validarMarketing === "function") {
      validarMarketing();
    }
  });

  // Acción al rechazar
  if (btnRechazar && window.bannerConfig?.rechazarRuta) {
    btnRechazar.addEventListener("click", () => {
      localStorage.setItem("tyc", "0");
      window.location.href = window.bannerConfig.rechazarRuta;
    });
  }

  // Acción al hacer clic en el enlace TyC
  linkTyc.addEventListener("click", (e) => {
    e.preventDefault();
    if (window.bannerConfig?.linkRuta) {
      window.location.href = window.bannerConfig.linkRuta;
    }
  });
}
