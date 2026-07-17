// estructura_nivel_1.js | Diseña los espacios de Nivel 1

// Crea la tabla
const tabla = document.getElementById('tabla');
for (let i = 0; i < 1364; i++) {
  const celda = document.createElement('div');
  celda.className = 'celda';
  tabla.appendChild(celda);
}

// Función genérica para crear botones en la tabla usando grid-area
function crearBoton({ idDestino, texto, clase, columna, filas }) {
  const contenedor = document.createElement('div');
  contenedor.className = clase;

  // Extraer coordenadas para grid-area
  const [colStart, colSpan] = columna.split(' / span ').map(Number);
  const [rowStart, rowSpan] = filas.split(' / span ').map(Number);
  const colEnd = colStart + colSpan;
  const rowEnd = rowStart + rowSpan;

  contenedor.style.gridArea = `${rowStart} / ${colStart} / ${rowEnd} / ${colEnd}`;

  const enlace = document.createElement('a');
  enlace.textContent = texto;
  enlace.href = '#';

  // Usar sistema modular de banners
  enlace.addEventListener('click', (event) => {
    event.preventDefault();
    abrirBanner(idDestino);
  });

  contenedor.appendChild(enlace);
  if (tabla) tabla.appendChild(contenedor);
}


// Función genérica para crear rellenos estructurales usando grid-area
function crearRellenoEstructural({ clase, columna, filas, color = '#a6c9ec', texto = '' }) {
  const contenedor = document.createElement('div');
  contenedor.className = clase;

  const [colStart, colSpan] = columna.split(' / span ').map(Number);
  const [rowStart, rowSpan] = filas.split(' / span ').map(Number);
  const colEnd = colStart + colSpan;
  const rowEnd = rowStart + rowSpan;

  contenedor.style.gridArea = `${rowStart} / ${colStart} / ${rowEnd} / ${colEnd}`;
  contenedor.style.backgroundColor = color;
  contenedor.style.opacity = '1';
  contenedor.style.display = 'flex';
  contenedor.style.alignItems = 'center';
  contenedor.style.justifyContent = 'center';
  contenedor.style.textAlign = 'center';

  const enlace = document.createElement('a');
  enlace.textContent = texto;
  enlace.href = '#';
  enlace.style.pointerEvents = 'none';

  contenedor.appendChild(enlace);
  tabla.appendChild(contenedor);
}


//=============== Lobby ===============

// Botón: Lobby - Parte izquierda
crearBoton({
  idDestino: 'bnlobby1',
  texto: '',
  clase: 'cu-l',
  columna: '6 / span 3',
  filas: '86 / span 11'
});

// Botón: Lobby - Parte superior
crearBoton({
  idDestino: 'bnlobby1',
  texto: '',
  clase: 'cu-l',
  columna: '8 / span 11',
  filas: '86 / span 3'
});

// Botón: Lobby - Parte central
crearBoton({
  idDestino: 'bnlobby1',
  texto: 'Lobby',
  clase: 'cu-l',
  columna: '8 / span 15',
  filas: '88 / span 14'
});

// Botón: Lobby - Parte derecha
crearBoton({
  idDestino: 'bnlobby1',
  texto: '',
  clase: 'cu-l',
  columna: '21 / span 7',
  filas: '86 / span 2'
});


//=============== Tarima ===============

// Botón: Tarima - Parte superior
crearBoton({
  idDestino: 'bntarima1',
  texto: '',
  clase: 'cu-t',
  columna: '28 / span 4',
  filas: '31 / span 6'
});

// Botón: Tarima- Parte central
crearBoton({
  idDestino: 'bntarima1',
  texto: 'Tarima',
  clase: 'cu-t',
  columna: '28 / span 7',
  filas: '36 / span 14'
});

// Botón: Tarima- Parte inferior
crearBoton({
  idDestino: 'bntarima1',
  texto: '',
  clase: 'cu-t',
  columna: '28 / span 4',
  filas: '49 / span 6'
});

// Botón: Tarima- Parte derecha
crearBoton({
  idDestino: 'bntarima1',
  texto: '',
  clase: 'cu-t',
  columna: '34 / span 2',
  filas: '37 / span 12'
});


//=============== Balcónes ===============

// Botón: Balcón 1 - Parte principal
crearBoton({
  idDestino: 'bnbalcon1',
  texto: 'Balcón 1',
  clase: 'cu-bl',
  columna: '32 / span 4',
  filas: '56 / span 7'
});

// Botón: Balcón 1 - Parte bocado
crearBoton({
  idDestino: 'bnbalcon1',
  texto: '',
  clase: 'cu-bl',
  columna: '35 / span 1',
  filas: '55 / span 2'
});

// Botón: Balcón 2 - Parte principal
crearBoton({
  idDestino: 'bnbalcon2',
  texto: 'Balcón 2',
  clase: 'cu-bl',
  columna: '32 / span 4',
  filas: '23 / span 7'
});

// Botón: Balcón 2 - Parte bocado
crearBoton({
  idDestino: 'bnbalcon2',
  texto: '',
  clase: 'cu-bl',
  columna: '35 / span 1',
  filas: '29 / span 2'
});


//=============== Barra ===============

// Botón: Barra - Primer piso
crearBoton({
  idDestino: 'bnbarra1',
  texto: 'Barra - Primer Piso',
  clase: 'cu-b',
  columna: '28 / span 8',
  filas: '67 / span 21' 
});

// Botón: Barra de consumo - Parte superior
crearBoton({
  idDestino: 'bnbarrac1',
  texto: 'Barra',
  clase: 'cu-bc',
  columna: '18 / span 4',
  filas: '65 / span 7'
});


//=============== Palcos ===============

// Botón: Palco 1
crearBoton({
  idDestino: 'bnpalco1',
  texto: 'Palco 1',
  clase: 'cu-p',
  columna: '1 / span 9',
  filas: '69 / span 7'
});

// Botón: Palco 2
crearBoton({
  idDestino: 'bnpalco2',
  texto: 'Palco 2',
  clase: 'cu-p',
  columna: '1 / span 9',
  filas: '62 / span 7'
});

// Botón: Palco 3
crearBoton({
  idDestino: 'bnpalco3',
  texto: 'Palco 3',
  clase: 'cu-p',
  columna: '1 / span 9',
  filas: '55 / span 7'
});

// Botón: Palco 4
crearBoton({
  idDestino: 'bnpalco4',
  texto: 'Palco 4',
  clase: 'cu-p',
  columna: '1 / span 9',
  filas: '48 / span 7'
});

// Botón: Palco 5
crearBoton({
  idDestino: 'bnpalco5',
  texto: 'Palco 5',
  clase: 'cu-p',
  columna: '1 / span 9',
  filas: '41 / span 7'
});

// Botón: Palco 6
crearBoton({
  idDestino: 'bnpalco6',
  texto: 'Palco 6',
  clase: 'cu-p',
  columna: '1 / span 9',
  filas: '34 / span 7'
});

// Botón: Palco 7
crearBoton({
  idDestino: 'bnpalco7',
  texto: 'Palco 7',
  clase: 'cu-p',
  columna: '1 / span 9',
  filas: '27 / span 7'
});

// Botón: Palco 8
crearBoton({
  idDestino: 'bnpalco8',
  texto: 'Palco 8',
  clase: 'cu-p',
  columna: '1 / span 9',
  filas: '20 / span 7'
});

// Botón: Palco 9
crearBoton({
  idDestino: 'bnpalco9',
  texto: 'Palco 9',
  clase: 'cu-p',
  columna: '1 / span 9',
  filas: '13 / span 7'
});


//=============== Mesas de general ===============

// Botón: Mesas de general 1-1
crearBoton({
  idDestino: 'bngeneral1',
  texto: '',
  clase: 'cu-g',
  columna: '7 / span 2',
  filas: '82 / span 2'
});

// Botón: Mesas de general 1-2
crearBoton({
  idDestino: 'bngeneral1',
  texto: '',
  clase: 'cu-g',
  columna: '10 / span 2',
  filas: '82 / span 2'
});

// Botón: Mesas de general 1-5
crearBoton({
  idDestino: 'bngeneral1',
  texto: '',
  clase: 'cu-g',
  columna: '10 / span 2',
  filas: '78 / span 2'
});

// Botón: Mesas de general 1-8
crearBoton({
  idDestino: 'bngeneral1',
  texto: '',
  clase: 'cu-g',
  columna: '7 / span 2',
  filas: '76 / span 2'
});

// Botón: Mesas de general 1-9
crearBoton({
  idDestino: 'bngeneral1',
  texto: '',
  clase: 'cu-g',
  columna: '10 / span 2',
  filas: '  74 / span 2'
});

// Botón: Mesas de general 1-12
crearBoton({
  idDestino: 'bngeneral1',
  texto: '',
  clase: 'cu-g',
  columna: '10 / span 2',
  filas: '70 / span 2'
});

// Botón: Mesas de general 2-3
crearBoton({
  idDestino: 'bngeneral2',
  texto: '',
  clase: 'cu-g',
  columna: '18 / span 2',
  filas: '82 / span 2'
});

// Botón: Mesas de general 2-4
crearBoton({
  idDestino: 'bngeneral2',
  texto: '',
  clase: 'cu-g',
  columna: '23 / span 2',
  filas: '82 / span 2'
});

// Botón: Mesas de general 2-6
crearBoton({
  idDestino: 'bngeneral2',
  texto: '',
  clase: 'cu-g',
  columna: '18 / span 2',
  filas: '78 / span 2'
});

// Botón: Mesas de general 2-7
crearBoton({
  idDestino: 'bngeneral2',
  texto: '',
  clase: 'cu-g',
  columna: '23 / span 2',
  filas: '78 / span 2'
});

// Botón: Mesas de general 2-10
crearBoton({
  idDestino: 'bngeneral2',
  texto: '',
  clase: 'cu-g',
  columna: '18 / span 2',
  filas: '74 / span 2'
});

// Botón: Mesas de general 2-11
crearBoton({
  idDestino: 'bngeneral2',
  texto: '',
  clase: 'cu-g',
  columna: '23 / span 2',
  filas: '74 / span 2'
});

// Botón: Mesas de general 3-13
crearBoton({
  idDestino: 'bngeneral3',
  texto: '',
  clase: 'cu-g',
  columna: '10 / span 2',
  filas: '65 / span 2'
});

// Botón: Mesas de general 3-14
crearBoton({
  idDestino: 'bngeneral3',
  texto: '',
  clase: 'cu-g',
  columna: '10 / span 2',
  filas: '61 / span 2'
});

// Botón: Mesas de general 3-18
crearBoton({
  idDestino: 'bngeneral3',
  texto: '',
  clase: 'cu-g',
  columna: '10 / span 2',
  filas: '56 / span 2'
});

// Botón: Mesas de general 3-23
crearBoton({
  idDestino: 'bngeneral3',
  texto: '',
  clase: 'cu-g',
  columna: '10 / span 2',
  filas: '51 / span 2'
});

// Botón: Mesas de general 4-15
crearBoton({
  idDestino: 'bngeneral4',
  texto: '',
  clase: 'cu-g',
  columna: '18 / span 2',
  filas: '61 / span 2'
});

// Botón: Mesas de general 4-16
crearBoton({
  idDestino: 'bngeneral4',
  texto: '',
  clase: 'cu-g',
  columna: '22 / span 2',
  filas: '61 / span 2'
});

// Botón: Mesas de general 4-17
crearBoton({
  idDestino: 'bngeneral4',
  texto: '',
  clase: 'cu-g',
  columna: '26 / span 2',
  filas: '61 / span 2'
});

// Botón: Mesas de general 4-19
crearBoton({
  idDestino: 'bngeneral4',
  texto: '',
  clase: 'cu-g',
  columna: '18 / span 2',
  filas: '56 / span 2'
});

// Botón: Mesas de general 4-20
crearBoton({
  idDestino: 'bngeneral4',
  texto: '',
  clase: 'cu-g',
  columna: '22 / span 2',
  filas: '56 / span 2'
});

// Botón: Mesas de general 4-21
crearBoton({
  idDestino: 'bngeneral4',
  texto: '',
  clase: 'cu-g',
  columna: '26 / span 2',
  filas: '56 / span 2'
});

// Botón: Mesas de general 4-22
crearBoton({
  idDestino: 'bngeneral4',
  texto: '',
  clase: 'cu-g',
  columna: '29 / span 2',
  filas: '56 / span 2'
});

// Botón: Mesas de general 4-24
crearBoton({
  idDestino: 'bngeneral4',
  texto: '',
  clase: 'cu-g',
  columna: '18 / span 2',
  filas: '51 / span 2'
});

// Botón: Mesas de general 4-25
crearBoton({
  idDestino: 'bngeneral4',
  texto: '',
  clase: 'cu-g',
  columna: '22 / span 2',
  filas: '51 / span 2'
});

// Botón: Mesas de general 4-26
crearBoton({
  idDestino: 'bngeneral4',
  texto: '',
  clase: 'cu-g',
  columna: '26 / span 2',
  filas: '51 / span 2'
});

// Botón: Mesas de general 5-27
crearBoton({
  idDestino: 'bngeneral5',
  texto: '',
  clase: 'cu-g',
  columna: '10 / span 2',
  filas: '47 / span 2'
});

// Botón: Mesas de general 5-31
crearBoton({
  idDestino: 'bngeneral5',
  texto: '',
  clase: 'cu-g',
  columna: '10 / span 2',
  filas: '43 / span 2'
});

// Botón: Mesas de general 5-35
crearBoton({
  idDestino: 'bngeneral5',
  texto: '',
  clase: 'cu-g',
  columna: '10 / span 2',
  filas: '38 / span 2'
});

// Botón: Mesas de general 5-39
crearBoton({
  idDestino: 'bngeneral5',
  texto: '',
  clase: 'cu-g',
  columna: '10 / span 2',
  filas: '34 / span 2'
});

// Botón: Mesas de general 6-28
crearBoton({
  idDestino: 'bngeneral6',
  texto: '',
  clase: 'cu-g',
  columna: '18 / span 2',
  filas: '47 / span 2'
});

// Botón: Mesas de general 6-29
crearBoton({
  idDestino: 'bngeneral6',
  texto: '',
  clase: 'cu-g',
  columna: '22 / span 2',
  filas: '47 / span 2'
});

// Botón: Mesas de general 6-30
crearBoton({
  idDestino: 'bngeneral6',
  texto: '',
  clase: 'cu-g',
  columna: '26 / span 2',
  filas: '47 / span 2'
});

// Botón: Mesas de general 6-32
crearBoton({
  idDestino: 'bngeneral6',
  texto: '',
  clase: 'cu-g',
  columna: '18 / span 2',
  filas: '43 / span 2'
});

// Botón: Mesas de general 6-33
crearBoton({
  idDestino: 'bngeneral6',
  texto: '',
  clase: 'cu-g',
  columna: '22 / span 2',
  filas: '43 / span 2'
});

// Botón: Mesas de general 6-34
crearBoton({
  idDestino: 'bngeneral6',
  texto: '',
  clase: 'cu-g',
  columna: '26 / span 2',
  filas: '43 / span 2'
});

// Botón: Mesas de general 6-36
crearBoton({
  idDestino: 'bngeneral6',
  texto: '',
  clase: 'cu-g',
  columna: '18 / span 2',
  filas: '38 / span 2'
});

// Botón: Mesas de general 6-37
crearBoton({
  idDestino: 'bngeneral6',
  texto: '',
  clase: 'cu-g',
  columna: '22 / span 2',
  filas: '38 / span 2'
});

// Botón: Mesas de general 6-38
crearBoton({
  idDestino: 'bngeneral6',
  texto: '',
  clase: 'cu-g',
  columna: '26 / span 2',
  filas: '38 / span 2'
});

// Botón: Mesas de general 6-40
crearBoton({
  idDestino: 'bngeneral6',
  texto: '',
  clase: 'cu-g',
  columna: '18 / span 2',
  filas: '34 / span 2'
});

// Botón: Mesas de general 6-41
crearBoton({
  idDestino: 'bngeneral6',
  texto: '',
  clase: 'cu-g',
  columna: '22 / span 2',
  filas: '34 / span 2'
});

// Botón: Mesas de general 6-42
crearBoton({
  idDestino: 'bngeneral6',
  texto: '',
  clase: 'cu-g',
  columna: '26 / span 2',
  filas: '34 / span 2'
});

// Botón: Mesas de general 7-43
crearBoton({
  idDestino: 'bngeneral7',
  texto: '',
  clase: 'cu-g',
  columna: '10 / span 2',
  filas: '29 / span 2'
});

// Botón: Mesas de general 7-47
crearBoton({
  idDestino: 'bngeneral7',
  texto: '',
  clase: 'cu-g',
  columna: '10 / span 2',
  filas: '24 / span 2'
});

// Botón: Mesas de general 7-52
crearBoton({
  idDestino: 'bngeneral7',
  texto: '',
  clase: 'cu-g',
  columna: '10 / span 2',
  filas: '20 / span 2'
});

// Botón: Mesas de general 7-58
crearBoton({
  idDestino: 'bngeneral7',
  texto: '',
  clase: 'cu-g',
  columna: '10 / span 2',
  filas: '16 / span 2'
});

// Botón: Mesas de general 8-44
crearBoton({
  idDestino: 'bngeneral8',
  texto: '',
  clase: 'cu-g',
  columna: '18 / span 2',
  filas: '29 / span 2'
});

// Botón: Mesas de general 8-45
crearBoton({
  idDestino: 'bngeneral8',
  texto: '',
  clase: 'cu-g',
  columna: '22 / span 2',
  filas: '29 / span 2'
});

// Botón: Mesas de general 8-48
crearBoton({
  idDestino: 'bngeneral8',
  texto: '',
  clase: 'cu-g',
  columna: '18 / span 2',
  filas: '24 / span 2'
});

// Botón: Mesas de general 8-49
crearBoton({
  idDestino: 'bngeneral8',
  texto: '',
  clase: 'cu-g',
  columna: '22 / span 2',
  filas: '24 / span 2'
});

// Botón: Mesas de general 8-53
crearBoton({
  idDestino: 'bngeneral8',
  texto: '',
  clase: 'cu-g',
  columna: '18 / span 2',
  filas: '20 / span 2'
});

// Botón: Mesas de general 8-54
crearBoton({
  idDestino: 'bngeneral8',
  texto: '',
  clase: 'cu-g',
  columna: '22 / span 2',
  filas: '20 / span 2'
});

// Botón: Mesas de general 8-59
crearBoton({
  idDestino: 'bngeneral8',
  texto: '',
  clase: 'cu-g',
  columna: '18 / span 2',
  filas: '16 / span 2'
});

// Botón: Mesas de general 8-60
crearBoton({
  idDestino: 'bngeneral8',
  texto: '',
  clase: 'cu-g',
  columna: '22 / span 2',
  filas: '16 / span 2'
});

// Botón: Mesas de general 8-62
crearBoton({
  idDestino: 'bngeneral8',
  texto: '',
  clase: 'cu-g',
  columna: '18 / span 2',
  filas: '12 / span 2'
});

// Botón: Mesas de general 9-46
crearBoton({
  idDestino: 'bngeneral9',
  texto: '',
  clase: 'cu-g',
  columna: '26 / span 2',
  filas: '29 / span 2'
});

// Botón: Mesas de general 9-50
crearBoton({
  idDestino: 'bngeneral9',
  texto: '',
  clase: 'cu-g',
  columna: '26 / span 2',
  filas: '24 / span 2'
});


// Botón: Mesas de general 9-51
crearBoton({
  idDestino: 'bngeneral9',
  texto: '',
  clase: 'cu-g',
  columna: '30 / span 2',
  filas: '24 / span 2'
});

// Botón: Mesas de general 9-55
crearBoton({
  idDestino: 'bngeneral9',
  texto: '',
  clase: 'cu-g',
  columna: '26 / span 2',
  filas: '20 / span 2'
});

// Botón: Mesas de general 9-56
crearBoton({
  idDestino: 'bngeneral9',
  texto: '',
  clase: 'cu-g',
  columna: '30 / span 2',
  filas: '20 / span 2'
});

// Botón: Mesas de general 9-57
crearBoton({
  idDestino: 'bngeneral9',
  texto: '',
  clase: 'cu-g',
  columna: '33 / span 2',
  filas: '20 / span 2'
});

// Botón: Mesas de general 10-61
crearBoton({
  idDestino: 'bngeneral10',
  texto: '',
  clase: 'cu-g',
  columna: '10 / span 2',
  filas: '12 / span 2'
});

// Botón: Mesas de general 10-63
crearBoton({
  idDestino: 'bngeneral10',
  texto: '',
  clase: 'cu-g',
  columna: '1 / span 2',
  filas: '11 / span 2'
});

// Botón: Mesas de general 10-64
crearBoton({
  idDestino: 'bngeneral10',
  texto: '',
  clase: 'cu-g',
  columna: '7 / span 2',
  filas: '11 / span 2'
});

// Botón: Mesas de general 10-65
crearBoton({
  idDestino: 'bngeneral10',
  texto: '',
  clase: 'cu-g',
  columna: '1 / span 2',
  filas: '8 / span 2'
});

// Botón: Mesas de general 10-66
crearBoton({
  idDestino: 'bngeneral10',
  texto: '',
  clase: 'cu-g',
  columna: '7 / span 2',
  filas: '8 / span 2'
});

// Botón: Mesas de general 10-67
crearBoton({
  idDestino: 'bngeneral10',
  texto: '',
  clase: 'cu-g',
  columna: '14 / span 2',
  filas: '8 / span 2'
});

// Botón: Mesas de general 10-68
crearBoton({
  idDestino: 'bngeneral10',
  texto: '',
  clase: 'cu-g',
  columna: '14 / span 2',
  filas: '5 / span 2'
});


//=============== Escaleras ===============

// Escaleras: Tarima
for (let i = 0; i < 4; i++) {
  crearRellenoEstructural({
    clase: 'cu-esc-l',
    columna: `${28 + i} / span 1`, 
    filas: '28 / span 3',
  });
}

// Escaleras: Balcón 1
for (let i = 0; i < 6; i++) {
  crearRellenoEstructural({
    clase: 'cu-esc-u',
    columna: '32 / span 3',
    filas: `${50 + i} / span 1`,
  });
}

// Escaleras: Balcón 2
for (let i = 0; i < 6; i++) {
  crearRellenoEstructural({
    clase: 'cu-esc-d',
    columna: '32 / span 3',
    filas: `${30 + i} / span 1`,
  });
}

// Escaleras: Segundo piso - Parte horizontal
for (let i = 0; i < 17; i++) {
  crearRellenoEstructural({
    clase: 'cu-esc-l',
    columna: `${5 + i} / span 1`, 
    filas: '1 / span 4',
  });
}

// Escaleras: Segundo piso - Parte vertical
for (let i = 0; i < 2; i++) {
  crearRellenoEstructural({
    clase: 'cu-esc-d',
    columna: '1 / span 4',
    filas: `${5 + i} / span 1`,
  });
}

// Escaleras: Segundo piso - Descanso
crearRellenoEstructural({
  clase: 'cu-esc-descanso',
  columna: '1 / span 4',
  filas: '1 / span 4',
});

// Escaleras: Lobby - Parte horizontal
for (let i = 0; i < 3; i++) {
  crearRellenoEstructural({
    clase: 'cu-esc-r',
    columna: `${6 + i} / span 1`, 
    filas: '97 / span 4',
  });
}

// Escaleras: Lobby - Parte vertical
for (let i = 0; i < 9; i++) {
  crearRellenoEstructural({
    clase: 'cu-esc-d',
    columna: '2 / span 4',
    filas: `${88 + i} / span 1`,
  });
}

// Escaleras: Lobby - Descanso
crearRellenoEstructural({
  clase: 'cu-esc-descanso',
  columna: '2 / span 4',
  filas: '97 / span 4',
});

// Escaleras: Barra - Primer piso
for (let i = 0; i < 1; i++) {
  crearRellenoEstructural({
    clase: 'cu-esc-u',
    columna: '6 / span 22',
    filas: `${85 + i} / span 1`,
  });
}

//=============== Relleno ===============

// Relleno: Escaleras balcón 2
crearRellenoEstructural({
  clase: 'cu-rn',
  columna: '35 / span 1',
  filas: '31 / span 6',
});

// Relleno: Escaleras balcón 1
crearRellenoEstructural({
  clase: 'cu-rn',
  columna: '35 / span 1',
  filas: '49 / span 6',
});

// Relleno: Cover
crearRellenoEstructural({
  clase: 'cu-rn',
  columna: '1 / span 5',
  filas: '76 / span 12',
});

// Relleno: Columna Lobby
crearRellenoEstructural({
  clase: 'cu-rn',
  columna: '19 / span 2',
  filas: '86 / span 2',
});

// Relleno: Bodega principal
crearRellenoEstructural({
  clase: 'cu-rn',
  columna: '23 / span 13',
  filas: '88 / span 14',
});

// Relleno: Escaleras lobby - Parte vertical
crearRellenoEstructural({
  clase: 'cu-rg',
  columna: '1 / span 1',
  filas: '88 / span 14',
});

// Relleno: Escaleras lobby - Parte horizontal
crearRellenoEstructural({
  clase: 'cu-rg',
  columna: '2 / span 7',
  filas: '101 / span 1',
});


//=============== Baños ===============

// Baños Hombres
crearRellenoEstructural({
  clase: 'cu-bphm',
  columna: '22 / span 9',
  filas: '1 / span 4',
  texto: 'Baños Hombres'
});

// Baños Mujeres
crearRellenoEstructural({
  clase: 'cu-bphm',
  columna: '27 / span 9',
  filas: '1 / span 18',
  texto: 'Baños Mujeres'
});

// Función para dibujar el polígono SVG
window.addEventListener('load', () => {
  const svg = document.getElementById('overlay');
  const tablaRect = tabla.getBoundingClientRect();
  const width = tablaRect.width;
  const height = tablaRect.height;

  const columnas = 35;
  const filas = 101;

  const xA = (17 / columnas) * width;
  const yA = (6 / filas) * height;
  const xB = (26 / columnas) * width;
  const yB = (18 / filas) * height;
  const xC = xA;
  const yC = (4 / filas) * height;
  const xD = xB;
  const yD = (4 / filas) * height;

  const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  polygon.setAttribute("points", `${xC},${yC} ${xD},${yD} ${xB},${yB} ${xA},${yA}`);
  polygon.setAttribute("fill", "#555555");
  polygon.setAttribute("opacity", "1");
  svg.appendChild(polygon);
});


