// footer.js | Pie de pagina del menú desplegable

function initFooter() {
  const htmlCopyright =
    '© 2026 · Discoteca La Logia <br> Powered by ' +
    '<a href="https://momentospro.com/" target="_blank" rel="noopener" style="color:inherit; text-decoration:underline;">Momentos Pro</a> · ' +
    '<a href="/smk/tyc/" style="color:inherit; text-decoration:underline;">TyC</a>';

  document.querySelectorAll("#texto-footer, #texto-footer-pc, #texto-footer-menu, .js-texto-footer").forEach((el) => {
    el.innerHTML = htmlCopyright;
  });
}

initFooter();

