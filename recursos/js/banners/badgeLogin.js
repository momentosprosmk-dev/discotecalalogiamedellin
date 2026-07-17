// badge_login.js | Gestiona el banner de Badge

// Definir rutas de scripts
var badgeStartIndexPath = basePath + "recursos/js/servicio/badgeStartIndex.js";

function initBadgeLoginBanner() {
  const banner = document.getElementById("badge-login-banner");
  if (!banner) return;

  const form = document.getElementById("badge-login-form");

  // Abrir banner desde algún botón externo
  document.getElementById("btn-login")?.addEventListener("click", () => {
    banner.classList.add("visible");
  });

  // Cerrar banner al hacer clic fuera del contenido
  banner.addEventListener("click", (e) => {
    if (!e.target.closest(".banner-content")) {
      banner.classList.remove("visible");
    }
  });

  // Manejo del formulario
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("badge-username")?.value.trim();

    if (!username) {
      console.log("No se ingresó usuario");
      return;
    }

    // Guardar usuario en variable global y cache
    window.badge_user = username;
    localStorage.setItem("badge_user", username);

    console.log("Usuario guardado en badge_user:", window.badge_user);

    banner.classList.remove("visible");

    // Inyectar badgeStartIndex.js directamente
    const startIndexScript = document.createElement("script");
    startIndexScript.src = badgeStartIndexPath;
    startIndexScript.onload = () => {
      if (typeof loadUserPage === "function") {
        loadUserPage();
      } else {
        console.error("No se encontró la función loadUserPage en badgeStartIndex.js");
      }
    };
    document.body.appendChild(startIndexScript);
  });
}

initBadgeLoginBanner();

