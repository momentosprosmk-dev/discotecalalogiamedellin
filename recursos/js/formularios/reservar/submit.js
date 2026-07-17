// submit.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reservaForm");
  const submitBtn = document.getElementById("submitBtn");

  form.addEventListener("submit", e => {
    e.preventDefault();

    if (!submitBtn.classList.contains("activo")) {
      console.log("Formulario incompleto, botón bloqueado");
      return;
    }

    // Capturar valores
    const fecha = document.getElementById("fecha").value.trim();

    // Texto visible de la zona seleccionada
    const zonaSelect = document.getElementById("zonaSeleccionada");
    const zonaTexto = zonaSelect.options[zonaSelect.selectedIndex].text;

    const nombre = document.getElementById("nombre").value.trim();
    const indicativoPais = document.getElementById("indicativoPais").value.trim();
    const contacto = document.getElementById("contacto").value.trim();
    const personas = document.getElementById("personas").value.trim();
    const cumple = document.getElementById("cumple").value.trim() || "No aplica";

    // Construir mensaje con dos saltos de línea después de la fecha
    const mensaje =
      `*Fecha:* ${fecha}\n\n` +
      `*Zona:* ${zonaTexto}\n` +
      `*Nombre:* ${nombre}\n` +
      `*No. Contacto:* +${indicativoPais}${contacto}\n` +
      `*No. Personas:* ${personas}\n` +
      `*Cumpleaños:* ${cumple}`;

    // 1. Revisar si en la URL viene un número de destino
    const urlParams = new URLSearchParams(window.location.search);
    const numeroAsesor = urlParams.get("whatsapp");

    // 2. Si existe, usarlo; si no, usar el número local por defecto
    const numeroDestino = numeroAsesor || window.enlaces["numero-local"];

    if (!numeroDestino) {
      console.error("No se encontró número de destino ni número local");
      return;
    }

    // Crear link con encodeURIComponent
    const url = `https://wa.me/${numeroDestino}?text=${encodeURIComponent(mensaje)}`;

    // Abrir WhatsApp
    window.open(url, "_blank");
  });
});

