//zona.js

document.getElementById("zonaSeleccionada").addEventListener("change", function() {
  const nota = document.getElementById("notaZona");
  let lineas = [];

  switch (this.value) {
    case "Palco1":
    case "Palco2":
      lineas = [
        "Máximo 10 personas",
        "Consumo de dos botellas de licor importado de $ 600.000"
      ];
      break;

    case "Palco1x2":
    case "Palco2x2":
      lineas = [
        "Máximo 20 personas",
        "Consumo de cuatro botellas de licor importado de $ 600.000"
      ];
      break;

    case "Palco1x3":
    case "Palco2x3":
      lineas = [
        "Máximo 30 personas",
        "Consumo de seis botellas de licor importado de $ 600.000"
      ];
      break;

    case "VIP":
      lineas = [
        "Consumo de dos botellas de licor importado de $ 600.000 por cada 10 personas"
      ];
      break;
    case "Mesa":
      lineas = [
        "Botella por cada 4 personas",
        "Garrafa por cada 6 personas"
      ];
      break;
      
    default:
      lineas = [];
  }

  if (lineas.length > 0) {
    nota.innerHTML = "<strong>Notas:</strong><ul>" + lineas.map(l => `<li>${l}</li>`).join("") + "</ul>";
  } else {
    nota.innerHTML = "";
  }
});

