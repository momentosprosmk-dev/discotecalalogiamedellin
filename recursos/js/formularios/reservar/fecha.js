// fecha.js

document.addEventListener("DOMContentLoaded", () => {
  const fechaInput = document.getElementById("fecha");
  if (!fechaInput) return;

  // Establecer fecha mínima como hoy (hora local)
  const hoy = new Date();
  const yyyy = hoy.getFullYear();
  const mm = String(hoy.getMonth() + 1).padStart(2, "0");
  const dd = String(hoy.getDate()).padStart(2, "0");
  fechaInput.min = `${yyyy}-${mm}-${dd}`;

  // Al enfocar el input, abrir el calendario
  fechaInput.addEventListener("focus", () => {
    if (fechaInput.showPicker) {
      try {
        fechaInput.showPicker();
      } catch (e) {}
    }
  });
});
