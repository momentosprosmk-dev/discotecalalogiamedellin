//numPersonas.js

document.addEventListener("DOMContentLoaded", () => {
  const cumpleField = document.getElementById("cumpleField");
  const personasInput = document.getElementById("personas");

  function verificarCumple() {
    const valor = parseInt(personasInput.value, 10);

    if (!isNaN(valor) && valor >= window.enlaces.reservarnpersonas) {
      cumpleField.style.display = "flex";
    } else {
      cumpleField.style.display = "none";
    }
  }

  // Inicialmente oculto
  cumpleField.style.display = "none";

  // Escucha cambios en el input
  personasInput.addEventListener("input", verificarCumple);
});
