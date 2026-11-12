// licores.js

// Parseador de fila CSV/TSV que respeta comas dentro de comillas "..."
function dividirFilaCSV(linea, separador = ",") {
  if (separador === "\t") {
    return linea.split("\t").map((c) => c.replace(/^\s*"?|"?\s*$/g, "").replace(/\r/g, ""));
  }
  const resultado = [];
  let actual = "";
  let dentroDeComillas = false;

  for (let i = 0; i < linea.length; i++) {
    const char = linea[i];
    if (char === '"') {
      dentroDeComillas = !dentroDeComillas;
    } else if (char === separador && !dentroDeComillas) {
      resultado.push(actual.trim().replace(/\r/g, ""));
      actual = "";
    } else {
      actual += char;
    }
  }
  resultado.push(actual.trim().replace(/\r/g, ""));
  return resultado;
}

function procesarRespuestaSheet(texto) {
  const lines = texto.split("\n").filter((l) => l.trim().length > 0);
  if (lines.length === 0) return [];

  const usaTab = lines[0].includes("\t");
  const separador = usaTab ? "\t" : ",";

  const headers = dividirFilaCSV(lines[0], separador).map((h) => h.toLowerCase());

  const iTipo = headers.indexOf("tipo");
  const iNombre = headers.indexOf("nombre");
  const iDesc = headers.indexOf("descripcion");
  const iPrecio = headers.indexOf("precio");
  const iImagen = headers.indexOf("imagenurl");
  const iEstado = headers.indexOf("estado");

  const items = [];

  lines.slice(1).forEach((line) => {
    const cols = dividirFilaCSV(line, separador);
    const estado = (cols[iEstado] || "").toLowerCase();

    if (estado === "d") {
      items.push({
        tipo: cols[iTipo] || "",
        nombre: cols[iNombre] || "",
        descripcion: cols[iDesc] || "",
        precio: cols[iPrecio] || "",
        imagen: cols[iImagen] || "",
        estado: estado
      });
    }
  });

  return items;
}

// Patrón de carga rápida con caché (Stale-While-Revalidate)
async function cargarDatosDesdeSheetConCache(urlSheet, claveCache, renderCallback) {
  const guardado = sessionStorage.getItem(claveCache);

  if (guardado) {
    try {
      const datosCache = JSON.parse(guardado);
      renderCallback(datosCache);
    } catch (e) {
      sessionStorage.removeItem(claveCache);
    }
  }

  try {
    const res = await fetch(urlSheet, { cache: "no-store" });
    const texto = await res.text();
    const datosFrescos = procesarRespuestaSheet(texto);

    const serializado = JSON.stringify(datosFrescos);
    if (serializado !== guardado) {
      sessionStorage.setItem(claveCache, serializado);
      renderCallback(datosFrescos);
    }
  } catch (err) {
    console.error("Error actualizando datos desde Google Sheets:", err);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  if (!window.enlaces || !window.enlaces.hasOwnProperty(baseIndex)) {
    console.error(`El baseIndex "${baseIndex}" no existe dentro de las claves de window.enlaces`);
    alert(`Error: El baseIndex "${baseIndex}" no existe en la configuración`);
    return;
  }

  const url = window.enlaces[baseIndex];
  const claveCache = `carta_cache_${baseIndex}`;

  const formatearPrecio = (valor) => {
    const numero = parseFloat(valor);
    if (isNaN(numero)) return valor;
    return numero.toLocaleString("es-CO");
  };

  const obtenerImagen = (imagen) => {
    const base = "https://momentosprosmk-dev.github.io/discotecalalogiamedellin-media/recursos/media/carta/";

    if (window.innerWidth <= 1024) {
      return `${base}${imagen}.avif`;
    }

    return `${base}${imagen}_pc.avif`;
  };

  const renderizarMenu = (items) => {
    const menu = document.getElementById("menu");
    if (!menu) return;

    menu.innerHTML = "";
    const fragment = document.createDocumentFragment();

    items.forEach((prod) => {
      const item = document.createElement("div");
      item.className = "item";

      const urlImagenMedia = obtenerImagen(prod.imagen);

      item.innerHTML = `
        <h3>${prod.nombre}</h3>

        <div class="tipo">${prod.tipo}</div>

        <div class="item-body">

          <div class="item-left">

            <img
              src="${urlImagenMedia}"
              alt="${prod.nombre}"
              loading="lazy"
              decoding="async"
              onerror="this.onerror=null;this.src='/recursos/media/carta/nohayimagen.avif';"
            />

          </div>

          <div class="item-right">

            <div class="descripcion">
              <p>${prod.descripcion}</p>
            </div>

            <div class="price">
              COP $ ${formatearPrecio(prod.precio)}
            </div>

          </div>

        </div>
      `;

      fragment.appendChild(item);
    });

    menu.appendChild(fragment);
  };

  cargarDatosDesdeSheetConCache(url, claveCache, renderizarMenu);
});
