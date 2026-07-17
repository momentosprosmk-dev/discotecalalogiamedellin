// control.js

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn-aceptar").addEventListener("click", function() {
    localStorage.setItem("tyc", window.tyc_fecha);
    window.location.href = pathSmk; // usa la variable definida en el HTML
  });

  document.getElementById("btn-rechazar").addEventListener("click", function() {
    localStorage.setItem("tyc", "0");
    window.location.href = pathSmk; // igual aquí
  });
});
