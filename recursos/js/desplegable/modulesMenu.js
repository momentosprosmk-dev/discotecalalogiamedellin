// modulesMenu.js

function initModulesNavigation() {
  if (window.enlaces && typeof window.enlaces === "object") {
    Object.keys(window.enlaces).forEach((btnId) => {
      const btn = document.getElementById(btnId);
      if (btn && !btn.dataset.navBound) {
        btn.dataset.navBound = "1";
        btn.addEventListener("click", () => {
          window.location.href = window.enlaces[btnId];
        });
      }
    });
  }
}
initModulesNavigation();

