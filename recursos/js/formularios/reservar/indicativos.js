// indicativos.js

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
    let paises = null;
    const cachePaises = sessionStorage.getItem("cache_paises_json");
    if (cachePaises) {
      try {
        paises = JSON.parse(cachePaises);
      } catch (e) {
        sessionStorage.removeItem("cache_paises_json");
      }
    }

    if (!paises) {
      const response = await fetch("/recursos/json/formularios/paises.json");
      paises = await response.json();
      sessionStorage.setItem("cache_paises_json", JSON.stringify(paises));
    }

    const inputPais = document.getElementById("codigoPais");
    const inputIndicativo = document.getElementById("indicativoPais");
    const banderaSpan = document.getElementById("banderaPais");
    const sugerencias = document.getElementById("sugerencias");

    if (!inputPais || !inputIndicativo || !banderaSpan || !sugerencias) return;

    const seleccionarPais = (p) => {
      inputPais.value = p.nombre;
      banderaSpan.textContent = p.bandera;
      inputIndicativo.value = p.codigo;
      sugerencias.innerHTML = "";
      inputPais.dispatchEvent(new Event("change", { bubbles: true }));
    };

    inputPais.addEventListener("input", () => {
      const valor = normalizar(inputPais.value);
      sugerencias.innerHTML = "";

      if (valor.length > 0) {
        // Si coincide exactamente con un país o alias, asignar su indicativo automáticamente
        const exacto = paises.find((p) => {
          const nombre = normalizar(p.nombre);
          const aliases = Array.isArray(p.aliases) ? p.aliases.map((a) => normalizar(a)) : [];
          return nombre === valor || aliases.includes(valor);
        });
        if (exacto) {
          banderaSpan.textContent = exacto.bandera;
          inputIndicativo.value = exacto.codigo;
        } else {
          banderaSpan.textContent = "";
          inputIndicativo.value = "";
        }

        const filtrados = paises.filter((p) => {
          const nombre = normalizar(p.nombre);
          const aliases = Array.isArray(p.aliases) ? p.aliases.map((a) => normalizar(a)) : [];
          return (
            nombre.startsWith(valor) ||
            nombre.includes(valor) ||
            aliases.some((a) => a.startsWith(valor) || a.includes(valor))
          );
        });

        filtrados.forEach((p) => {
          const div = document.createElement("div");
          div.className = "opcion";
          div.textContent = `${p.bandera} ${p.nombre} (+${p.codigo})`;
          div.addEventListener("click", () => seleccionarPais(p));
          sugerencias.appendChild(div);
        });
      } else {
        banderaSpan.textContent = "";
        inputIndicativo.value = "";
      }
    });

    document.addEventListener("click", (e) => {
      if (!sugerencias.contains(e.target) && e.target !== inputPais) {
        sugerencias.innerHTML = "";
      }
    });
  } catch (error) {
    console.error("Error cargando paises:", error);
  }
}
cargarIndicativos();

// Diseño visual de número de contacto
document.addEventListener("DOMContentLoaded", () => {
  const contactoInput = document.getElementById("contacto");
  if (!contactoInput) return;

  contactoInput.addEventListener("input", function (e) {
    let valor = e.target.value.replace(/\D/g, ""); // solo dígitos

    if (valor.length > 0) {
      if (valor.length <= 3) {
        valor = "(" + valor;
      } else if (valor.length <= 6) {
        valor = "(" + valor.substring(0, 3) + ") " + valor.substring(3);
      } else if (valor.length <= 10) {
        valor = "(" + valor.substring(0, 3) + ") " + valor.substring(3, 6) + "-" + valor.substring(6);
      } else {
        valor =
          "(" +
          valor.substring(0, 3) +
          ") " +
          valor.substring(3, 6) +
          "-" +
          valor.substring(6, 10) +
          " " +
          valor.substring(10);
      }
    }

    e.target.value = valor;
  });
});


