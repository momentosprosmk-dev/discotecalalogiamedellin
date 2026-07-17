// badgeStartIndex.js | Descarga y procesa TSV de badge

async function loadUserPage() {
  const username = localStorage.getItem("badge_user");
  const path = typeof basePath !== "undefined" ? basePath : "";

  if (!username || username.trim() === "") {
    console.log("No hay usuario en cache → redirigiendo");
    window.location.href = path + "servicio/";
    return;
  }

  try {
    const response = await fetch(window.enlaces.badge_link);
    const text = await response.text();
    const rows = text.split("\n").map(r => r.split("\t"));
    const headers = rows[0].map(h => h.trim());
    const data = rows.slice(1).map(r => {
      let obj = {};
      headers.forEach((h, i) => obj[h] = r[i] ? r[i].trim() : "");
      return obj;
    });

    const activos = data.filter(u => u.estado === "a");
    const userData = activos.find(u => u.usr === username);

    if (userData) {
      localStorage.setItem("badge_userData", JSON.stringify({
        usr: userData.usr,
        nombre: userData.nombre,
        cargo: userData.cargo,
        nota_ppal: userData.nota_ppal,
        nota_maps: userData.nota_maps,
        imagenurl: userData.imagenurl || ""
      }));
      console.log("Usuario válido, cache actualizado:", userData);
    } else {
      localStorage.removeItem("badge_userData");
      localStorage.setItem("badge_user", "");
      console.log("Usuario no encontrado o inactivo .Cache limpiado");
    }

    window.location.href = path + "servicio/";
  } catch (err) {
    console.error("Error cargando TSV:", err);
    window.location.href = path + "servicio/";
  }
}
