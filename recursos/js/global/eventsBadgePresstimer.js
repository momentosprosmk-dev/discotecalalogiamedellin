// badge_presstimer.js | Gestiona el tiempo de pulseo sobre el botón opciones

var badge_timePage = 1000;
var badge_timeLogin = 3000;

var gatewayPath = "/recursos/js/servicio/gateway.js";
var badge_startIndexPath = "/recursos/js/servicio/badgeStartIndex.js";

function initOpcionesButton() {
  const btn = document.getElementById("btn-menu");
  if (!btn) return;

  let pressStart;

  // --- Pulsación prolongada (PC) ---
  btn.addEventListener("mousedown", () => {
    pressStart = Date.now();
  });

  btn.addEventListener("mouseup", () => {
    const pressDuration = Date.now() - pressStart;
    if (pressDuration >= badge_timeLogin) {
      // Pulsación larga → gateway + banner
      loadGateway(() => {
        const loginBanner = document.getElementById("badge-login-banner");
        if (loginBanner) {
          loginBanner.classList.add("visible");
        }
      });
    } else if (pressDuration >= badge_timePage) {
      // Pulsación corta → gateway + badgeStartIndex
      loadGateway(() => {
        loadBadgeStartIndex();
      });
    }
  });

  // --- Pulsación prolongada (Smartphone) ---
  btn.addEventListener("touchstart", () => {
    pressStart = Date.now();
  });

  btn.addEventListener("touchend", () => {
    const pressDuration = Date.now() - pressStart;
    if (pressDuration >= badge_timeLogin) {
      loadGateway(() => {
        const loginBanner = document.getElementById("badge-login-banner");
        if (loginBanner) {
          loginBanner.classList.add("visible");
        }
      });
    } else if (pressDuration >= badge_timePage) {
      loadGateway(() => {
        loadBadgeStartIndex();
      });
    }
  });
}

function loadGateway(callback) {
  const gatewayScript = document.createElement("script");
  gatewayScript.src = gatewayPath;
  gatewayScript.onload = () => {
    if (typeof callback === "function") callback();
  };
  document.body.appendChild(gatewayScript);
}

function loadBadgeStartIndex() {
  const startIndexScript = document.createElement("script");
  startIndexScript.src = badge_startIndexPath;
  startIndexScript.onload = () => {
    if (typeof loadUserPage === "function") {
      loadUserPage();
    } else {
      console.error("badgeStartIndex.js cargado, pero no definió loadUserPage");
    }
  };
  document.body.appendChild(startIndexScript);
}

initOpcionesButton();
