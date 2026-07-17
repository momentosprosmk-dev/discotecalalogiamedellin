document.addEventListener("DOMContentLoaded", () => {
  //const basecss   = "../../css/arquitectura/";
  const basemedia = "../../media/arquitectura/";

  const recursos = [
    //basecss   + "arquitectura.css",
    //basecss   + "espacios.css",

    basemedia + "arquitectura.avif",

    basemedia + "bnlobby1/1.avif",
    basemedia + "bnlobby1/2.avif",

    basemedia + "bntarima1/1.avif",
    basemedia + "bntarima1/2.avif",

    basemedia + "bnbalcon1/1.avif",
    basemedia + "bnbalcon1/2.avif",
    basemedia + "bnbalcon2/1.avif",
    basemedia + "bnbalcon2/2.avif",

    basemedia + "bnbarra1/1.avif",
    basemedia + "bnbarra1/2.avif",
    basemedia + "bnbarra2/1.avif",
    basemedia + "bnbarra2/2.avif",

    basemedia + "bnbarrac1/1.avif",
    basemedia + "bnbarrac1/2.avif",

    basemedia + "bnpalco1/1.avif",
    basemedia + "bnpalco1/2.avif",
    basemedia + "bnpalco2/1.avif",
    basemedia + "bnpalco2/2.avif",
    basemedia + "bnpalco3/1.avif",
    basemedia + "bnpalco3/2.avif",
    basemedia + "bnpalco4/1.avif",
    basemedia + "bnpalco4/2.avif",
    basemedia + "bnpalco5/1.avif",
    basemedia + "bnpalco5/2.avif",
    basemedia + "bnpalco6/1.avif",
    basemedia + "bnpalco6/2.avif",
    basemedia + "bnpalco7/1.avif",
    basemedia + "bnpalco7/2.avif",
    basemedia + "bnpalco8/1.avif",
    basemedia + "bnpalco8/2.avif",
    basemedia + "bnpalco9/1.avif",
    basemedia + "bnpalco9/2.avif",
    basemedia + "bnpalco10/1.avif",
    basemedia + "bnpalco10/2.avif",
    basemedia + "bnpalco11/1.avif",
    basemedia + "bnpalco11/2.avif",
    basemedia + "bnpalco12/1.avif",
    basemedia + "bnpalco12/2.avif",
    basemedia + "bnpalco13/1.avif",
    basemedia + "bnpalco13/2.avif",
    basemedia + "bnpalco14/1.avif",
    basemedia + "bnpalco14/2.avif",
    basemedia + "bnpalco15/1.avif",
    basemedia + "bnpalco15/2.avif",
    basemedia + "bnpalco16/1.avif",
    basemedia + "bnpalco16/2.avif",
    basemedia + "bnpalco17/1.avif",
    basemedia + "bnpalco17/2.avif",
    basemedia + "bnpalco18/1.avif",
    basemedia + "bnpalco18/2.avif",
    basemedia + "bnpalco19/1.avif",
    basemedia + "bnpalco19/2.avif",
    basemedia + "bnpalco20/1.avif",
    basemedia + "bnpalco20/2.avif",
    basemedia + "bnpalco21/1.avif",
    basemedia + "bnpalco21/2.avif",
    basemedia + "bnpalco22/1.avif",
    basemedia + "bnpalco22/2.avif",
    basemedia + "bnpalco23/1.avif",
    basemedia + "bnpalco23/2.avif",

    basemedia + "bnvip1/1.avif",
    basemedia + "bnvip1/2.avif",
    basemedia + "bnvip2/1.avif",
    basemedia + "bnvip2/2.avif",
    basemedia + "bnvip3/1.avif",
    basemedia + "bnvip3/2.avif",
    basemedia + "bnvip4/1.avif",
    basemedia + "bnvip4/2.avif",
    basemedia + "bnvip5/1.avif",
    basemedia + "bnvip5/2.avif",

    basemedia + "bngeneral1/1.avif",
    basemedia + "bngeneral1/2.avif",
    basemedia + "bngeneral2/1.avif",
    basemedia + "bngeneral2/2.avif",
    basemedia + "bngeneral3/1.avif",
    basemedia + "bngeneral3/2.avif",
    basemedia + "bngeneral4/1.avif",
    basemedia + "bngeneral4/2.avif",
    basemedia + "bngeneral5/1.avif",
    basemedia + "bngeneral5/2.avif",
    basemedia + "bngeneral6/1.avif",
    basemedia + "bngeneral6/2.avif",
    basemedia + "bngeneral7/1.avif",
    basemedia + "bngeneral7/2.avif",
    basemedia + "bngeneral8/1.avif",
    basemedia + "bngeneral8/2.avif",
    basemedia + "bngeneral9/1.avif",
    basemedia + "bngeneral9/2.avif",
    basemedia + "bngeneral10/1.avif",
    basemedia + "bngeneral10/2.avif"
  ];

  recursos.forEach(ruta => {
    const ext = ruta.split(".").pop();

    if (["avif","jpeg","png","gif","webp"].includes(ext)) {
      // Preload de imágenes
      const img = new Image();
      img.src = ruta;

    } else if (ext === "css") {
      // Preload del CSS
      const preload = document.createElement("link");
      preload.rel = "preload";
      preload.as = "style";
      preload.href = ruta;
      document.head.appendChild(preload);

      // Aplicar el CSS
      const stylesheet = document.createElement("link");
      stylesheet.rel = "stylesheet";
      stylesheet.href = ruta;
      document.head.appendChild(stylesheet);

    } else if (ext === "js") {
      // Preload de scripts
      const preloadScript = document.createElement("link");
      preloadScript.rel = "preload";
      preloadScript.as = "script";
      preloadScript.href = ruta;
      document.head.appendChild(preloadScript);

      // Cargar el script
      const script = document.createElement("script");
      script.src = ruta;
      document.head.appendChild(script);
    }
  });
});
