// enlaces.js

document.addEventListener("DOMContentLoaded", () => {
  const enlaceWeb = document.getElementById("urlsmk");
  const enlaceWhats = document.getElementById("wasmk");

  if (enlaceWeb && window.urlsmk) enlaceWeb.href = window.urlsmk;
  if (enlaceWhats && window.wasmk) enlaceWhats.href = window.wasmk;

  const enlaceWebSocio = document.getElementById("urlsmk2");
  const enlaceWhatsSocio = document.getElementById("wasmk2");

  if (enlaceWebSocio && window.urlsmk2) enlaceWebSocio.href = window.urlsmk2;
  if (enlaceWhatsSocio && window.wasmk2) enlaceWhatsSocio.href = window.wasmk2;

  const fechaElemento = document.getElementById("fecha-tyc");
  if (fechaElemento && window.tyc_fecha) {
    fechaElemento.innerHTML = "<strong>Última actualización:</strong> " + window.tyc_fecha;
  }
});
