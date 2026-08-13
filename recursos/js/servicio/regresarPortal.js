//regresar_portal.js | Regresa al portal

document.addEventListener("click", e => {
  if (e.target && e.target.id === "btn-menu") {
    window.location.href = "/";
  }
});
