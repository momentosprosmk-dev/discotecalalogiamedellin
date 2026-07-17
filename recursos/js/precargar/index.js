document.addEventListener("DOMContentLoaded", () => {
  //const basecss   = "../../css/barra/";
  const basemedia = "media/barra/";

  const recursos = [
    //basecss   + "licores.css",
    //basecss   + "ver_carta_completa.css",

    basemedia + "bebidas/agua.avif",
    basemedia + "bebidas/agua_tonica_mil976_cero_calorias.avif",
    basemedia + "bebidas/agua_tonica_mil976_indi.avif",
    basemedia + "bebidas/agua_tonica_mil976_ocean.avif",
    basemedia + "bebidas/agua_tonica_mil976_pink.avif",
    basemedia + "bebidas/canada_dry.avif",
    basemedia + "bebidas/cerveza_corona.avif",
    basemedia + "bebidas/cerveza_heineken.avif",
    basemedia + "bebidas/cerveza_sol.avif",
    basemedia + "bebidas/cerveza_stella_artois.avif",
    basemedia + "bebidas/drinko_mora_azul.avif",
    basemedia + "bebidas/drinko_naranja.avif",
    basemedia + "bebidas/drinko_water_melon.avif",
    basemedia + "bebidas/electrolit_fresa.avif",
    basemedia + "bebidas/electrolit_fresa_kiwi.avif",
    basemedia + "bebidas/electrolit_maracuya.avif",
    basemedia + "bebidas/electrolit_mora_azul.avif",
    basemedia + "bebidas/electrolit_ponche_frutas.avif",
    basemedia + "bebidas/electrolit_uva.avif",
    basemedia + "bebidas/gatorade_blue_ice.avif",
    basemedia + "bebidas/gatorade_frutas_tropicales.avif",
    basemedia + "bebidas/gatorade_mandarina.avif",
    basemedia + "bebidas/gatorade_maracuya.avif",
    basemedia + "bebidas/gatorade_sin_azucar_fresa_kiwi.avif",
    basemedia + "bebidas/gatorade_sin_azucar_naranja.avif",
    basemedia + "bebidas/jarra_de_arandano.avif",
    basemedia + "bebidas/jarra_de_naranja.avif",
    basemedia + "bebidas/pepsi.avif",
    basemedia + "bebidas/red_bull_energy_drink.avif",
    basemedia + "bebidas/red_bull_sugarfree.avif",
    basemedia + "bebidas/red_bull_zero.avif",
    basemedia + "bebidas/smirnoff_ice_green_apple_personal.avif",
    basemedia + "bebidas/smirnoff_ice_original_personal.avif",

    basemedia + "bitter/jagermeister.avif",

    basemedia + "champagne/dom_perignon.avif",
    basemedia + "champagne/krug_grande_cuvee_box.avif",
    basemedia + "champagne/veuve_clicquot_brut.avif",
    basemedia + "champagne/veuve_clicquot_rich.avif",
    basemedia + "champagne/veuve_clicquot_rose.avif",

    basemedia + "cocteles/cuba_libre.avif",
    basemedia + "cocteles/daiquiri_de_fresa.avif",
    basemedia + "cocteles/gin_and_tonic.avif",
    basemedia + "cocteles/margarita.avif",
    basemedia + "cocteles/mojito.avif",
    basemedia + "cocteles/moscow_mule.avif",
    basemedia + "cocteles/paloma.avif",
    basemedia + "cocteles/pina_colada.avif",
    basemedia + "cocteles/tequila_sunrise.avif",

    basemedia + "cognac/hennessy_vs_cognac.avif",

    basemedia + "ginebra/tanqueray_london_dry_gin.avif",

    basemedia + "hookah/hookah_premium.avif",
    basemedia + "hookah/hookah_vip.avif",
    basemedia + "hookah/recarga_de_carbon.avif",
    basemedia + "hookah/blueberry.avif",
    basemedia + "hookah/cereza.avif",
    basemedia + "hookah/doble_manzana.avif",
    basemedia + "hookah/fresa.avif",
    basemedia + "hookah/guayaba_melon.avif",
    basemedia + "hookah/lady_killer.avif",
    basemedia + "hookah/love_66.avif",
    basemedia + "hookah/magic_love.avif",
    basemedia + "hookah/maracuya.avif",
    basemedia + "hookah/menta.avif",
    basemedia + "hookah/menta_blueberry.avif",
    basemedia + "hookah/menta_lima.avif",
    basemedia + "hookah/sandia.avif",
    basemedia + "hookah/tropical.avif",
    basemedia + "hookah/uva.avif",

    basemedia + "mezcal/400_conejos.avif",

    basemedia + "nacional/aguardiente_amarillo_botella.avif",
    basemedia + "nacional/aguardiente_amarillo_garrafa.avif",
    basemedia + "nacional/aguardiente_antioqueno_tapa_azul_botella.avif",
    basemedia + "nacional/aguardiente_antioqueno_tapa_azul_garrafa.avif",
    basemedia + "nacional/aguardiente_antioqueno_tapa_verde_botella.avif",
    basemedia + "nacional/aguardiente_antioqueno_tapa_verde_garrafa.avif",
    basemedia + "nacional/ron_viejo_de_caldas_15_anos_botella.avif",
    basemedia + "nacional/ron_viejo_de_caldas_3_anos_botella.avif",
    basemedia + "nacional/ron_viejo_de_caldas_8_anos_botella.avif",
    basemedia + "nacional/ron_viejo_de_caldas_esencial_botella.avif",
    basemedia + "nacional/ron_viejo_de_caldas_esencial_garrafa.avif",
    basemedia + "nacional/ron_viejo_de_caldas_tradicional_garrafa.avif",

    basemedia + "ron_premium/zacapa_centenario_23_anos.avif",

    basemedia + "shots/shot_de_aguardiente.avif",
    basemedia + "shots/shot_de_ron.avif",
    basemedia + "shots/shot_de_tequila.avif",
    basemedia + "shots/shot_de_whisky.avif",

    basemedia + "tequila/1800_anejo.avif",
    basemedia + "tequila/1800_cristalino_anejo.avif",
    basemedia + "tequila/1800_reposado.avif",
    basemedia + "tequila/clase_azul_reposado.avif",
    basemedia + "tequila/don_julio_1942.avif",
    basemedia + "tequila/don_julio_70.avif",
    basemedia + "tequila/don_julio_anejo.avif",
    basemedia + "tequila/don_julio_blanco.avif",
    basemedia + "tequila/don_julio_reposado.avif",
    basemedia + "tequila/jose_cuervo_especial_reposado.avif",
    basemedia + "tequila/jose_cuervo_tradicional_tapa_corcho.avif",
    basemedia + "tequila/maestro_dobel_diamante.avif",
  
    basemedia + "vino_espumoso/chandon_brut.avif",
    basemedia + "vino_espumoso/chandon_delice.avif",
    basemedia + "vino_espumoso/chandon_rose.avif",
    basemedia + "vino_espumoso/jp_chenet_ice_rose.avif",

    basemedia + "vodka/belvedere_pure.avif",
    basemedia + "vodka/smirnoff_no_21_red.avif",
    basemedia + "vodka/smirnoff_spicy_tamarind.avif",

    basemedia + "whisky/buchanans_12_anos.avif",
    basemedia + "whisky/buchanans_18_anos.avif",
    basemedia + "whisky/buchanans_master.avif",
    basemedia + "whisky/glenmorangie_original.avif",
    basemedia + "whisky/glenmorangie_quinta_ruban.avif",
    basemedia + "whisky/jack_daniels.avif",
    basemedia + "whisky/johnnie_walker_black_label.avif",
    basemedia + "whisky/johnnie_walker_blue_label.avif",
    basemedia + "whisky/johnnie_walker_red_label.avif",
    basemedia + "whisky/old_parr_12_anos.avif"
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
