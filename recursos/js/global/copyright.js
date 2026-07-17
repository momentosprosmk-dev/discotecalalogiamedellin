// footer-pc.js

// Pie de página
function initFooter() {
  const footer = document.getElementById("texto-footer");
  if (footer) {
    footer.innerHTML =
      '© 2026 · Discoteca La Logia <br> Powered by ' +
      '<a href="https://momentospro.com/" target="_blank" style="color:inherit; text-decoration:underline;">Momentos Pro</a> · ' +
      `<a href="" id="footer-tyc" style="color:inherit; text-decoration:underline;">TyC</a>`;
  }

  const footerTyc = document.getElementById("footer-tyc");
  if (footerTyc) {
    footerTyc.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = basePath + "smk/tyc/";
    });
  }
}
// Botones de redes sociales
function initFooterSocial() {
  document.querySelectorAll(".footer-social a").forEach(el => {
    const key = el.getAttribute("data-link");
    if (window.enlaces && window.enlaces[key]) {
      el.href = window.enlaces[key];
    }
  });
}

// Ejecutar ambas inicializaciones al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
  initFooter();
  initFooterSocial();
});

