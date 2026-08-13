// footer.js | Pie de pagina del menú desplegable

function initFooter() {
  const footer = document.getElementById("texto-footer");
  if (footer) {
    footer.innerHTML =
      '© 2026 · Discoteca La Logia <br> Powered by ' +
      '<a href="https://momentospro.com" target="_blank" style="color:inherit; text-decoration:underline;">Momentos Pro</a> · ' +
      `<a href="" id="footer-tyc" style="color:inherit; text-decoration:underline;">TyC</a>`;
  }

  const footerTyc = document.getElementById("footer-tyc");
  if (footerTyc) {
    footerTyc.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "smk/tyc/";
    });
  }
}

initFooter();

