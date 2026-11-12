// menuLoader.js

document.addEventListener("DOMContentLoaded", () => {
  const menuContainer = document.getElementById("menu-container");
  if (!menuContainer) return;

  const activarMenu = (html) => {
    menuContainer.innerHTML = html;

    if (window.cargarCSS) {
      window.cargarCSS("/recursos/css/desplegable/menu.css");
    } else if (!document.querySelector('link[href="/recursos/css/desplegable/menu.css"]')) {
      const linkMenu = document.createElement("link");
      linkMenu.rel = "stylesheet";
      linkMenu.href = "/recursos/css/desplegable/menu.css";
      document.head.appendChild(linkMenu);
    }

    if (window.cargarJS) {
      window.cargarJS("/recursos/js/desplegable/menu.js", () => {
        if (typeof initMenu === "function") initMenu();
      });
      window.cargarJS("/recursos/js/desplegable/modulesMenu.js", () => {
        if (typeof initModulesNavigation === "function") initModulesNavigation();
      });
    }

    if (typeof initFooter === "function") initFooter();
  };

  const cacheKey = "html_cache_menu";
  const cachedHtml = sessionStorage.getItem(cacheKey);
  if (cachedHtml) {
    activarMenu(cachedHtml);
    return;
  }

  fetch("/recursos/html/desplegable/menu.html")
    .then((res) => res.text())
    .then((html) => {
      sessionStorage.setItem(cacheKey, html);
      activarMenu(html);
    })
    .catch((err) => console.error("Error cargando el menú:", err));
});
