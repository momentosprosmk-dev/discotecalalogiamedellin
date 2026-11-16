// hookah.js | Lógica de renderizado y filtrado en tiempo real para /carta/hookah/

function dividirFilaHookah(linea, separador = ",") {
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

function normalizarClave(texto) {
  return (texto || "")
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function procesarRespuestaHookah(texto) {
  const lines = texto.split("\n").filter((l) => l.trim().length > 0);
  if (lines.length === 0) return [];

  const usaTab = lines[0].includes("\t");
  const separador = usaTab ? "\t" : ",";

  const headers = dividirFilaHookah(lines[0], separador).map((h) => normalizarClave(h));

  const iTipo = headers.indexOf("tipo");
  const iNombre = headers.indexOf("nombre");
  const iPrecio = headers.indexOf("precio");
  const iImagen = headers.indexOf("imagenurl");
  const iEstado = headers.indexOf("estado");

  const items = [];

  lines.slice(1).forEach((line) => {
    const cols = dividirFilaHookah(line, separador);
    const estado = normalizarClave(cols[iEstado]);

    // Condición estricta: solo existe visualmente lo que tenga estado === "d"
    if (estado === "d") {
      items.push({
        tipo: iTipo !== -1 ? (cols[iTipo] || "").trim() : "",
        nombre: iNombre !== -1 ? (cols[iNombre] || "").trim() : "",
        precio: iPrecio !== -1 ? (cols[iPrecio] || "").trim() : "",
        imagen: iImagen !== -1 ? (cols[iImagen] || "").trim() : "",
        estado: estado
      });
    }
  });

  return items;
}

async function cargarHookahConCache(urlSheet, claveCache, renderCallback) {
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
    const datosFrescos = procesarRespuestaHookah(texto);

    const serializado = JSON.stringify(datosFrescos);
    if (serializado !== guardado) {
      sessionStorage.setItem(claveCache, serializado);
      renderCallback(datosFrescos);
    }
  } catch (err) {
    console.error("Error actualizando datos de Hookah desde Google Sheets:", err);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const claveHookah = typeof baseIndex !== "undefined" ? baseIndex : "hookah";

  if (!window.enlaces || !window.enlaces.hasOwnProperty(claveHookah)) {
    console.error(`El baseIndex "${claveHookah}" no existe dentro de window.enlaces`);
    return;
  }

  const url = window.enlaces[claveHookah];
  const claveCache = `carta_cache_${claveHookah}_v2`;
  const baseMedia = "https://momentosprosmk-dev.github.io/discotecalalogiamedellin-media/recursos/media/carta/";

  const formatearPrecio = (valor) => {
    const limpio = (valor || "").toString().replace(/[^\d.]/g, "");
    const numero = parseFloat(limpio);
    if (isNaN(numero) || numero <= 0) return "";
    return numero.toLocaleString("es-CO");
  };

  const obtenerRutasImagen = (imagen) => {
    const limpia = (imagen || "").trim();
    if (!limpia) {
      return {
        principal: "/recursos/media/carta/nohayimagen.avif",
        respaldoMovil: "/recursos/media/carta/nohayimagen.avif"
      };
    }
    const urlMovil = `${baseMedia}${limpia}.avif`;
    const urlPc = `${baseMedia}${limpia}_pc.avif`;
    return {
      principal: window.innerWidth <= 1024 ? urlMovil : urlPc,
      respaldoMovil: urlMovil
    };
  };

  const clasificarProducto = (prod) => {
    const tipoNorm = normalizarClave(prod.tipo);
    const nombreNorm = normalizarClave(prod.nombre);
    const precioNum = parseFloat((prod.precio || "").toString().replace(/[^\d.]/g, ""));

    // 1. Si el tipo en el Sheet indica explícitamente una columna de sabor
    if (tipoNorm.includes("frut")) return "frutal";
    if (tipoNorm.includes("ment") || tipoNorm.includes("fresc")) return "mentolado";
    if (tipoNorm.includes("espec") || tipoNorm.includes("mix") || tipoNorm.includes("dulc")) return "especial";

    // 2. Si el tipo es "opcion" / "servicio" / "equipo" o tiene precio > 0
    if (
      tipoNorm.includes("opcion") ||
      tipoNorm.includes("servicio") ||
      tipoNorm.includes("equipo") ||
      (!isNaN(precioNum) && precioNum > 0) ||
      nombreNorm.includes("hookah") ||
      nombreNorm.includes("recarga") ||
      nombreNorm.includes("cambio")
    ) {
      return "opcion";
    }

    // 3. Respaldo inteligente por nombre del sabor
    if (nombreNorm.includes("menta") || nombreNorm.includes("ice")) return "mentolado";
    if (nombreNorm.includes("love") || nombreNorm.includes("lady") || nombreNorm.includes("killer") || nombreNorm.includes("magic")) {
      return "especial";
    }
    return "frutal";
  };

  const obtenerMetaOpcion = (prod) => {
    const nombreNorm = normalizarClave(prod.nombre);

    if (nombreNorm.includes("vip")) {
      return {
        claseTema: "tema-vip",
        tituloCorto: "VIP",
        subtitulo: prod.nombre
      };
    }
    if (nombreNorm.includes("premium")) {
      return {
        claseTema: "tema-premium",
        tituloCorto: "PREMIUM",
        subtitulo: prod.nombre
      };
    }
    if (nombreNorm.includes("recarga")) {
      return {
        claseTema: "tema-recarga",
        tituloCorto: "RECARGA",
        subtitulo: prod.nombre
      };
    }

    return {
      claseTema: "tema-extra",
      tituloCorto: prod.nombre,
      subtitulo: "Servicio Hookah"
    };
  };

  let opcionSeleccionada = null;
  let saboresSeleccionados = [];

  const renderizarHookah = (items) => {
    const menu = document.getElementById("menu");
    if (!menu) return;

    const opciones = [];
    const sabores = {
      frutal: [],
      mentolado: [],
      especial: []
    };

    items.forEach((prod) => {
      const categoria = clasificarProducto(prod);
      if (categoria === "opcion") {
        opciones.push(prod);
      } else if (sabores[categoria]) {
        sabores[categoria].push(prod);
      }
    });

    menu.innerHTML = "";
    const fragment = document.createDocumentFragment();

    // ==================== BLOQUE 1: OPCIONES DE HOOKAH ====================
    if (opciones.length > 0) {
      const headerOpciones = document.createElement("div");
      headerOpciones.className = "hookah-titulo-seccion";
      headerOpciones.innerHTML = `<h2><span class="dorado">OPCIONES</span> DE HOOKAH</h2>`;
      fragment.appendChild(headerOpciones);

      const gridOpciones = document.createElement("div");
      gridOpciones.className = "hookah-opciones-grid";

      opciones.forEach((opc) => {
        const meta = obtenerMetaOpcion(opc);
        const rutasImg = obtenerRutasImagen(opc.imagen);
        const precioFormateado = formatearPrecio(opc.precio);

        const card = document.createElement("article");
        card.className = `hookah-card ${meta.claseTema}`;
        card.dataset.nombre = opc.nombre;

        card.innerHTML = `
          <div class="hookah-card-media">
            <img
              src="${rutasImg.principal}"
              alt="${opc.nombre}"
              loading="lazy"
              decoding="async"
              data-fallback="${rutasImg.respaldoMovil}"
              onerror="if(this.src !== this.dataset.fallback){this.src=this.dataset.fallback;}else{this.onerror=null;this.src='/recursos/media/carta/nohayimagen.avif';}"
            />
          </div>
          <div class="hookah-card-divider"></div>
          <h3 class="hookah-card-titulo">${meta.tituloCorto}</h3>
          ${
            precioFormateado
              ? `<div class="hookah-card-precio"><span class="moneda">$</span>${precioFormateado}</div>`
              : ""
          }
          <p class="hookah-card-subtitulo">${meta.subtitulo}</p>
        `;

        card.addEventListener("click", () => {
          if (opcionSeleccionada === opc.nombre) {
            opcionSeleccionada = null;
          } else {
            opcionSeleccionada = opc.nombre;
          }
          actualizarEstadoVisualSeleccion(menu);
        });

        gridOpciones.appendChild(card);
      });

      fragment.appendChild(gridOpciones);
    }

    // ==================== BLOQUE 2: SABORES DISPONIBLES ====================
    const totalSabores =
      sabores.frutal.length + sabores.mentolado.length + sabores.especial.length;

    if (totalSabores > 0) {
      const headerSabores = document.createElement("div");
      headerSabores.className = "hookah-titulo-seccion";
      headerSabores.innerHTML = `<h2><span class="dorado">SABORES</span> DISPONIBLES</h2>`;
      fragment.appendChild(headerSabores);

      // Grid de 3 columnas: FRUTALES | MENTOLADOS | ESPECIALES
      const gridSabores = document.createElement("div");
      gridSabores.className = "hookah-sabores-grid";

      const columnasDefinicion = [
        { clave: "frutal", titulo: "FRUTALES", claseCol: "col-frutales" },
        { clave: "mentolado", titulo: "MENTOLADOS", claseCol: "col-mentolados" },
        { clave: "especial", titulo: "ESPECIALES", claseCol: "col-especiales" }
      ];

      columnasDefinicion.forEach((colDef) => {
        const colEl = document.createElement("div");
        colEl.className = `hookah-col-sabor ${colDef.claseCol}`;

        const headerCol = document.createElement("div");
        headerCol.className = "hookah-col-header";
        headerCol.innerHTML = `<h3>${colDef.titulo}</h3>`;
        colEl.appendChild(headerCol);

        const listaEl = document.createElement("div");
        listaEl.className = "hookah-lista-sabores";

        sabores[colDef.clave].forEach((sabor) => {
          const rutasImg = obtenerRutasImagen(sabor.imagen);
          const itemEl = document.createElement("div");
          itemEl.className = "hookah-sabor-item";
          itemEl.dataset.sabor = sabor.nombre;

          itemEl.innerHTML = `
            <img
              class="hookah-sabor-img"
              src="${rutasImg.principal}"
              alt="${sabor.nombre}"
              loading="lazy"
              decoding="async"
              data-fallback="${rutasImg.respaldoMovil}"
              onerror="if(this.src !== this.dataset.fallback){this.src=this.dataset.fallback;}else{this.onerror=null;this.src='/recursos/media/carta/nohayimagen.avif';}"
            />
            <span class="hookah-sabor-nombre">${sabor.nombre}</span>
          `;

          itemEl.addEventListener("click", () => {
            const idx = saboresSeleccionados.indexOf(sabor.nombre);
            if (idx !== -1) {
              saboresSeleccionados.splice(idx, 1);
            } else {
              if (saboresSeleccionados.length >= 2) {
                saboresSeleccionados.shift();
              }
              saboresSeleccionados.push(sabor.nombre);
            }
            actualizarEstadoVisualSeleccion(menu);
          });

          listaEl.appendChild(itemEl);
        });

        colEl.appendChild(listaEl);
        gridSabores.appendChild(colEl);
      });

      fragment.appendChild(gridSabores);
    }

    // ==================== BARRA FIJA INFERIOR (GUÍA INICIAL ↔ RESUMEN DE SELECCIÓN) ====================
    if (opciones.length > 0 || totalSabores > 0) {
      const guiaMezcla = document.createElement("div");
      guiaMezcla.id = "hookah-guia-mezcla";
      guiaMezcla.className = "hookah-guia-mezcla visible";
      guiaMezcla.innerHTML =
        `💨 Pide <strong>1 sabor puro</strong> o combina hasta <strong>2 sabores disponibles</strong> ` +
        `<em>(Ej: Sandía + Menta = Sandía Mentolada)</em>`;
      fragment.appendChild(guiaMezcla);

      const barraResumen = document.createElement("div");
      barraResumen.id = "hookah-resumen-seleccion";
      barraResumen.className = "hookah-resumen-seleccion";
      barraResumen.innerHTML = `
        <div id="hookah-resumen-texto" class="hookah-resumen-texto"></div>
        <button type="button" id="hookah-resumen-limpiar" class="hookah-resumen-limpiar">Limpiar</button>
      `;
      barraResumen.querySelector("#hookah-resumen-limpiar").addEventListener("click", () => {
        opcionSeleccionada = null;
        saboresSeleccionados = [];
        actualizarEstadoVisualSeleccion(menu);
      });
      fragment.appendChild(barraResumen);
    }

    menu.appendChild(fragment);
    actualizarEstadoVisualSeleccion(menu);
  };

  function actualizarEstadoVisualSeleccion(contenedor) {
    contenedor.querySelectorAll(".hookah-card").forEach((card) => {
      const activo = card.dataset.nombre === opcionSeleccionada;
      card.classList.toggle("seleccionada", activo);
    });

    contenedor.querySelectorAll(".hookah-sabor-item").forEach((item) => {
      const activo = saboresSeleccionados.includes(item.dataset.sabor);
      item.classList.toggle("seleccionado", activo);
    });

    const guiaMezcla = contenedor.querySelector("#hookah-guia-mezcla");
    const barraResumen = contenedor.querySelector("#hookah-resumen-seleccion");
    const textoResumen = contenedor.querySelector("#hookah-resumen-texto");
    if (!barraResumen || !textoResumen) return;

    const haySeleccion = Boolean(opcionSeleccionada) || saboresSeleccionados.length > 0;

    if (!haySeleccion) {
      barraResumen.classList.remove("visible");
      if (guiaMezcla) guiaMezcla.classList.add("visible");
      return;
    }

    if (guiaMezcla) guiaMezcla.classList.remove("visible");

    const partes = [];
    if (opcionSeleccionada) {
      partes.push(`<strong>${opcionSeleccionada}</strong>`);
    }
    if (saboresSeleccionados.length > 0) {
      partes.push(`Sabor: <strong>${saboresSeleccionados.join(" + ")}</strong>`);
    }

    textoResumen.innerHTML = `Tu elección: ${partes.join(" · ")}`;
    barraResumen.classList.add("visible");
  }

  cargarHookahConCache(url, claveCache, renderizarHookah);
});
