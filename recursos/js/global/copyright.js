// copyright.js | Pie de página global y redes sociales

function initFooter() {
  const htmlCopyright =
    '© 2026 · Discoteca La Logia <br> Powered by ' +
    '<a href="https://momentospro.com/" target="_blank" rel="noopener" style="color:inherit; text-decoration:underline;">Momentos Pro</a> · ' +
    '<a href="/smk/tyc/" style="color:inherit; text-decoration:underline;">TyC</a>';

  document.querySelectorAll("#texto-footer, #texto-footer-pc, #texto-footer-menu, .js-texto-footer").forEach((el) => {
    el.innerHTML = htmlCopyright;
  });
}

// Botones de redes sociales
function initFooterSocial() {
  document.querySelectorAll(".footer-social a").forEach((el) => {
    const key = el.getAttribute("data-link");
    if (window.enlaces && window.enlaces[key]) {
      el.href = window.enlaces[key];
    }
  });
}

// Cargar footer-pc y luego inicializar
document.addEventListener("DOMContentLoaded", () => {
  const footerPc = document.getElementById("footer-pc");
  if (!footerPc) {
    initFooter();
    return;
  }

  const cacheKey = "html_cache_footer_pc";
  const cachedHtml = sessionStorage.getItem(cacheKey);
  if (cachedHtml) {
    footerPc.innerHTML = cachedHtml;
    initFooter();
    initFooterSocial();
    return;
  }

  fetch("/recursos/html/global/footer_pc.html")
    .then((response) => response.text())
    .then((data) => {
      sessionStorage.setItem(cacheKey, data);
      footerPc.innerHTML = data;
      initFooter();
      initFooterSocial();
    })
    .catch((err) => console.error("Error cargando footer-pc:", err));
});
