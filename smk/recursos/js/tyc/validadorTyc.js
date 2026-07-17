const tycValue = localStorage.getItem("tyc");

// Si ya aceptó y coincide con la fecha actual, eliminar el contenedor
if (tycValue && tycValue === window.tyc_fecha) {
  document.getElementById("tyc-container")?.remove();
} else {
  // Si no aceptó o la fecha cambió, cargar bannerTyc.js
  const script = document.createElement("script");
  script.src = basePath + "smk/recursos/js/tyc/bannerTyc.js";
  document.head.appendChild(script);
}
