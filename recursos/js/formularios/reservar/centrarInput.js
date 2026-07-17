// centrasInput.js | Ajuste visual en móviles

document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll("input, select, textarea");

  inputs.forEach(input => {
    input.addEventListener("focus", () => {
      setTimeout(() => {
        input.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }, 300);
    });
  });
});
