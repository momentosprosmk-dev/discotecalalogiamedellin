// fecha.js

document.addEventListener("DOMContentLoaded", () => {
  const fechaInput = document.getElementById("fecha");
  // Al enfocar el input, abrir el calendario
  fechaInput.addEventListener("focus", () => {
    if (fechaInput.showPicker) {
      fechaInput.showPicker();
    }
  });
});
