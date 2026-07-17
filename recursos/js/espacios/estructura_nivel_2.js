// estructura_nivel_2.js | Diseña los espacios de Nivel 2

// Crea la tabla
const tabla = document.getElementById('tabla');
for (let i = 0; i < 2362; i++) {
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
    abrirBanner(idDestino); // activa el overlay y muestra el banner
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
  filas: '88 / span 11',
});

// Botón: Lobby - Parte central
crearBoton({
  idDestino: 'bnlobby1',
  texto: 'Lobby',
  clase: 'cu-l',
  columna: '8 / span 15',
  filas: '88 / span 14'
});


// Relleno: Lobby - Parte izquierda
crearRellenoEstructural({
  clase: 'cu-rg',
  columna: '6 / span 3',
  filas: '88 / span 11',
});

// Relleno: Lobby - Parte central
crearRellenoEstructural({
  clase: 'cu-rg',
  columna: '8 / span 15',
  filas: '88 / span 14',
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

// Botón: Barra - Segundo piso
crearBoton({
  idDestino: 'bnbarra2',
  texto: 'Barra - Segundo Piso',
  clase: 'cu-b',
  columna: '29 / span 7',
  filas: '1 / span 11' 
});


//=============== Palcos ===============

// Botón: Palco 10 - Parte principal
crearBoton({
  idDestino: 'bnpalco10',
  texto: 'Palco 10',
  clase: 'cu-p',
  columna: '29 / span 7',
  filas: '63 / span 16'
});

// Botón: Palco 10 - Parte bocado
crearBoton({
  idDestino: 'bnpalco10',
  clase: 'cu-rg',
  columna: '34 / span 2',
  filas: '63 / span 3'
});

// Botón: Palco 11
crearBoton({
  idDestino: 'bnpalco11',
  texto: 'Palco 11',
  clase: 'cu-p',
  columna: '21 / span 8',
  filas: '63 / span 16'
});

// Botón: Palco 12
crearBoton({
  idDestino: 'bnpalco12',
  texto: 'Palco 12',
  clase: 'cu-p',
  columna: '11 / span 8',
  filas: '63 / span 9'
});

// Botón: Palco 13
crearBoton({
  idDestino: 'bnpalco13',
  texto: 'Palco 13',
  clase: 'cu-p',
  columna: '4 / span 7',
  filas: '64 / span 8'
});

// Botón: Palco 14
crearBoton({
  idDestino: 'bnpalco14',
  texto: 'Palco 14',
  clase: 'cu-p',
  columna: '4 / span 7',
  filas: '57 / span 7'
});

// Botón: Palco 15
crearBoton({
  idDestino: 'bnpalco15',
  texto: 'Palco 15',
  clase: 'cu-p',
  columna: '4 / span 7',
  filas: '51 / span 6'
});

// Botón: Palco 16
crearBoton({
  idDestino: 'bnpalco16',
  texto: 'Palco 16',
  clase: 'cu-p',
  columna: '4 / span 7',
  filas: '44 / span 7'
});

// Botón: Palco 17
crearBoton({
  idDestino: 'bnpalco17',
  texto: 'Palco 17',
  clase: 'cu-p',
  columna: '4 / span 7',
  filas: '37 / span 7'
});

// Botón: Palco 18
crearBoton({
  idDestino: 'bnpalco18',
  texto: 'Palco 18',
  clase: 'cu-p',
  columna: '4 / span 7',
  filas: '30 / span 7'
});

// Botón: Palco 19
crearBoton({
  idDestino: 'bnpalco19',
  texto: 'Palco 19',
  clase: 'cu-p',
  columna: '4 / span 7',
  filas: '23 / span 7'
});

// Botón: Palco 20
crearBoton({
  idDestino: 'bnpalco20',
  texto: 'Palco 20',
  clase: 'cu-p',
  columna: '4 / span 8',
  filas: '16 / span 7'
});

// Botón: Palco 21
crearBoton({
  idDestino: 'bnpalco21',
  texto: 'Palco 21',
  clase: 'cu-p',
  columna: '12 / span 7',
  filas: '16 / span 7'
});

// Botón: Palco 22
crearBoton({
  idDestino: 'bnpalco22',
  texto: 'Palco 22',
  clase: 'cu-p',
  columna: '19 / span 7',
  filas: '16 / span 7'
});

// Botón: Palco 23
crearBoton({
  idDestino: 'bnpalco23',
  texto: 'Palco 23',
  clase: 'cu-p',
  columna: '26 / span 7',
  filas: '16 / span 7'
});


//=============== VIP ===============

// Botón: VIP 1
crearBoton({
  idDestino: 'bnvip1',
  texto: 'VIP 1',
  clase: 'cu-g',
  columna: '6 / span 8',
  filas: '82 / span 6'
});

// Botón: VIP 2
crearBoton({
  idDestino: 'bnvip2',
  texto: 'VIP 2',
  clase: 'cu-g',
  columna: '14 / span 8',
  filas: '82 / span 6'
});

// Botón: VIP 3
crearBoton({
  idDestino: 'bnvip3',
  texto: 'VIP 3',
  clase: 'cu-g',
  columna: '13 / span 8',
  filas: '72 / span 6'
});

// Botón: VIP 4
crearBoton({
  idDestino: 'bnvip4',
  texto: 'VIP 4',
  clase: 'cu-g',
  columna: '6 / span 8',
  filas: '5 / span 6'
});

// Botón: VIP 5
crearBoton({
  idDestino: 'bnvip5',
  texto: 'VIP 5',
  clase: 'cu-g',
  columna: '14 / span 8',
  filas: '5 / span 6'
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


//=============== Relleno ===============

// Relleno: Escaleras balcón 1
crearRellenoEstructural({
  clase: 'cu-rn',
  columna: '35 / span 1',
  filas: '49 / span 6',
});

// Relleno: Escaleras balcón 2
crearRellenoEstructural({
  clase: 'cu-rn',
  columna: '35 / span 1',
  filas: '31 / span 6',
});

// Relleno: Escaleras lobby - Parte vertical
crearRellenoEstructural({
  clase: 'cu-bphm',
  columna: '1 / span 1',
  filas: '88 / span 14',
});

// Relleno: Escaleras lobby - Parte horizontal
crearRellenoEstructural({
  clase: 'cu-bphm',
  columna: '2 / span 7',
  filas: '101 / span 1',
});

// Relleno: Palco 12 - Palco 11
crearRellenoEstructural({
  clase: 'cu-rn',
  columna: '19 / span 2',
  filas: '64 / span 7',
});

// Relleno: Primero piso - Parte 1
crearRellenoEstructural({
  clase: 'cu-rg',
  columna: '11 / span 21',
  filas: '23 / span 5',
});

// Relleno: Primero piso - Parte 2
crearRellenoEstructural({
  clase: 'cu-rg',
  columna: '11 / span 17',
  filas: '28 / span 27',
});

// Relleno: Primero piso - Parte 3
crearRellenoEstructural({
  clase: 'cu-rg',
  columna: '11 / span 21',
  filas: '55 / span 8',
});

// Relleno: Primero piso - Parte 4
crearRellenoEstructural({
  clase: 'cu-rg',
  columna: '19 / span 2',
  filas: '63 / span 1',
});

//=============== Baños ===============

// Baños Hombres
crearRellenoEstructural({
  clase: 'cu-bphm',
  columna: '23 / span 6',
  filas: '88 / span 14',
  texto: 'Baños Hombres'
});

// Baños Mujeres
crearRellenoEstructural({
  clase: 'cu-bphm',
  columna: '29 / span 7',
  filas: '88 / span 14',
  texto: 'Baños Mujeres'
});