//zona.js

function normalizar(str) {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

async function cargarIndicativos() {
  try {
    const response = await fetch("../../recursos/json/formularios/paises.json"); 
    const paises = await response.json();

    console.log("JSON cargado:", paises); // debug

    const inputPais = document.getElementById("codigoPais");
    const inputIndicativo = document.getElementById("indicativoPais");
    const banderaSpan = document.getElementById("banderaPais");
    const sugerencias = document.getElementById("sugerencias");

    inputPais.addEventListener("input", () => {
      const valor = normalizar(inputPais.value);
      sugerencias.innerHTML = "";

      if (valor.length > 0) {
        const filtrados = paises.filter(p => {
          const nombre = normalizar(p.nombre);
          const aliases = Array.isArray(p.aliases) ? p.aliases.map(a => normalizar(a)) : [];

          const nombreCoincide = nombre.startsWith(valor) || nombre.includes(valor);
          const aliasCoincide = aliases.some(a => a.startsWith(valor) || a.includes(valor));

          console.log("Buscando:", valor, "en", nombre, aliases, "=>", nombreCoincide || aliasCoincide);

          return nombreCoincide || aliasCoincide;
        });

        filtrados.forEach(p => {
          const div = document.createElement("div");
          div.className = "opcion";
          div.textContent = `${p.bandera} ${p.nombre}`;
          div.addEventListener("click", () => {
            inputPais.value = p.nombre;
            banderaSpan.textContent = p.bandera;
            inputIndicativo.value = p.codigo;
            sugerencias.innerHTML = "";
          });
          sugerencias.appendChild(div);
        });
      }
    });
  } catch (error) {
    console.error("Error cargando paises:", error);
  }
}
cargarIndicativos();


// Diseño visual de número de contácto
document.addEventListener("DOMContentLoaded", () => {
  const contactoInput = document.getElementById("contacto");

  contactoInput.addEventListener("input", function(e) {
    let valor = e.target.value.replace(/\D/g, ""); // solo dígitos

    if (valor.length > 0) {
      if (valor.length <= 3) {
        valor = "(" + valor;
      } else if (valor.length <= 6) {
        valor = "(" + valor.substring(0,3) + ") " + valor.substring(3);
      } else if (valor.length <= 10) {
        valor = "(" + valor.substring(0,3) + ") " + valor.substring(3,6) + "-" + valor.substring(6);
      } else {
        valor = "(" + valor.substring(0,3) + ") " + valor.substring(3,6) + "-" + valor.substring(6,10) + " " + valor.substring(10);
      }
    }

    e.target.value = valor;
  });
});


