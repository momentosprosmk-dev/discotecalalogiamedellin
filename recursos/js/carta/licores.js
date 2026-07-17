//licores.js

document.addEventListener("DOMContentLoaded", function () {
  
  if (!window.enlaces.hasOwnProperty(baseLicor)) {
    console.error(`El baseLicor "${baseLicor}" no existe dentro de las claves de window.enlaces`);
    alert(`Error: El baseLicor "${baseLicor}" no existe en la configuración`);
    return; // detener ejecución
  }

  const url = window.enlaces[baseLicor];

  const clean = (v) => v.replace(/^\s*"?|"?\s*$/g, "").replace(/\r/g, "");
  const formatearPrecio = (valor) => {
    const numero = parseFloat(valor);
    if (isNaN(numero)) return valor;
    return numero.toLocaleString('es-CO');
  };

  fetch(url, { cache: "no-store" })
    .then(res => res.text())
    .then(text => {
      const lines = text.split("\n").filter(l => l.trim().length > 0);
      const headers = lines[0].split("\t").map(h => clean(h).toLowerCase());
      const iTipo = headers.indexOf("tipo");
      const iNombre = headers.indexOf("nombre");
      const iDesc = headers.indexOf("descripcion");
      const iPrecio = headers.indexOf("precio");
      const iImagen = headers.indexOf("imagenurl");
      const iEstado = headers.indexOf("estado");
      const menu = document.getElementById("menu");

      lines.slice(1).forEach(line => {
        const cols = line.split("\t").map(c => clean(c));
        const tipo = cols[iTipo] || "";
        const nombre = cols[iNombre] || "";
        const descripcion = cols[iDesc] || "";
        const precio = cols[iPrecio] || "";
        const imagen = cols[iImagen] || "";
        const estado = (cols[iEstado] || "").toLowerCase();

        if (estado === "d") {
          const item = document.createElement("div");
          item.className = "item";
          item.innerHTML = `
            <h3>${nombre}</h3>
            <div class="tipo">${tipo}</div>
            <div class="item-body">
              <div class="item-left">
                <img src="https://momentosprosmk-dev.github.io/discotecalalogia-med-media/recursos/media/carta/${imagen}" alt="${nombre}" 
                     onerror="this.src='../../recursos/media/carta/nohayimagen.avif'">
              </div>
              <div class="item-right">
                <div class="descripcion"><p>${descripcion}</p></div>
                <div class="price">COP $ ${formatearPrecio(precio)}</div>
              </div>
            </div>
          `;
          menu.appendChild(item);
        }
      });
    })
    .catch(err => console.error("Error al cargar datos:", err));
});
