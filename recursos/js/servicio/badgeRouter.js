//badgeRouter.js | Define que html carga y parcea el json

function loadBadgeContent() {
  const container = document.getElementById("badge-container");
  if (!container) return;

  const userDataRaw = localStorage.getItem("badge_userData");
  let userData = null;

  try {
    userData = userDataRaw ? JSON.parse(userDataRaw) : null;
  } catch {
    userData = null;
  }

  if (userData && userData.usr) {
    fetch("/recursos/html/servicio/badgeuser.html")
      .then(res => res.text())
      .then(html => {
        container.innerHTML = html;

        // Se organizan los datos después de parcear
        if (userData.nombre) {
          const nameEl = container.querySelector("#badge_nombre");
          if (nameEl) nameEl.textContent = userData.nombre;
        }
        if (userData.cargo) {
          const cargoEl = container.querySelector("#badge_cargo");
          if (cargoEl) cargoEl.textContent = userData.cargo;
        }
        if (userData.nota_ppal) {
          const descppalEl = container.querySelector("#badge_ppal");
          if (descppalEl) descppalEl.textContent = userData.nota_ppal;
        }
        if (userData.nota_maps) {
          const descmapsEl = container.querySelector("#badge_maps");
          if (descmapsEl) descmapsEl.textContent = userData.nota_maps;
        }
        if (userData.imagenurl) {
          const photoEl = container.querySelector("#badge_imagenurl");
          if (photoEl) {
            photoEl.src = media + userData.imagenurl;

            photoEl.onerror = function() {
              photoEl.src = "/recursos/media/servicio/prueba.avif";
            };
          }
        }
      });

  } else {
    fetch("/recursos/html/servicio/badgenn.html")
      .then(res => res.text())
      .then(html => container.innerHTML = html);
  }
}

loadBadgeContent();
