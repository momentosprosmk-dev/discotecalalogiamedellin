// menuLoader.js

document.addEventListener("DOMContentLoaded", () => {
  fetch("/recursos/html/desplegable/menu.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("menu-container").innerHTML = html;
      // Inyectar CSS del menú
      const linkMenu = document.createElement("link");
      linkMenu.rel = "stylesheet";
      linkMenu.href = "/recursos/css/desplegable/menu.css";
      document.head.appendChild(linkMenu);
      // Cargar script del menú
      const scriptMenu = document.createElement("script");
      scriptMenu.src = "/recursos/js/desplegable/menu.js";
      document.body.appendChild(scriptMenu);
      scriptMenu.onload = () => {
        if (typeof initMenu === "function") {
          initMenu();
        }
      };
      // Cargar script de navegación de módulos
      const scriptModules = document.createElement("script");
      scriptModules.src = "/recursos/js/desplegable/modulesMenu.js";
      document.body.appendChild(scriptModules);
      scriptModules.onload = () => {
        if (typeof initModulesNavigation === "function") {
          initModulesNavigation();
        }
      };
      // Cargar script de copyright
      const scriptCopyright = document.createElement("script");
      scriptCopyright.src = "/recursos/js/global/copyright.js";
      document.body.appendChild(scriptCopyright);
      // Cargar script del footer personalizado
      const scriptFooterPc = document.createElement("script");
      scriptFooterPc.src = "/recursos/js/global/copyright.js";
      document.body.appendChild(scriptFooterPc);
      scriptFooterPc.onload = () => {
        if (typeof initFooter === "function") {
          initFooter();
        }
        if (typeof initFooterSocial === "function") {
          initFooterSocial();
        }
      };
    })
    .catch(err => console.error("Error cargando el menú:", err));
});
