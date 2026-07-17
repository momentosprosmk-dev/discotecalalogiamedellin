// validarForm.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reservaForm");
  const submitBtn = document.getElementById("submitBtn");

  function validarFormulario() {
    const zona = document.getElementById("zonaSeleccionada").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const codigoPais = document.getElementById("codigoPais").value.trim();
    const contacto = document.getElementById("contacto").value.trim();
    const personas = document.getElementById("personas").value.trim();
    const fecha = document.getElementById("fecha").value.trim();

    // Todos los campos obligatorios deben estar llenos
    const valido = zona && nombre && codigoPais && contacto && personas && fecha;

    if (valido) {
      submitBtn.classList.remove("inactivo");
      submitBtn.classList.add("activo");
    } else {
      submitBtn.classList.remove("activo");
      submitBtn.classList.add("inactivo");
    }
  }

  // Escuchar cambios en los campos
  form.addEventListener("input", validarFormulario);
  form.addEventListener("change", validarFormulario);

  // Validación inicial al cargar
  validarFormulario();
});
