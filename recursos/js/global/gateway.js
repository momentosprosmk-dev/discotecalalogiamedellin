// gateway.js | Link de acceso

(function () {
  window.enlaces = {
    "btn-ubicacion": "https://www.google.com/search?sca_esv=3e9255132db96e7e&biw=1389&bih=767&q=opiniones+de+la+logia&uds=AOm0WdH0Fh5jirSqMpT7r_0aV5pkDRnvi4aNH4TcH0lQ4RuR10YHMBLyvLWcz-qQs-XwSUaMjqG2JuwdmJWaROVgf4ajnzvrQJ7tnbaT-F9IEwJBd0hdv_ljztSfs9lutPMZ-bqIi_Ld3EFoMmY6pYU8yuiGPVVr3I4lw95CjhgU3TWSKpyv8SaURsr474D_hFCyybAMdd_JTE7Qnx7RdfUTzp1SglrjezhMuKZuxUsJjx2JwGz3soQENAeDzYj3PQVkvVuRKuAddlIcL_fsr8Gobahp4nnqj_78u8vSxCF81_GsJkjo4mYY8xIT9uiIbvW0O5sfeAIFtyr5JPY8Cfu0r5dkZ3X9_9dKF5RLStOEAfDFHCgYLYvgAE7opzJyOv2cNTrEprRLWRf3PokHAEapN0hZuEysog&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E2iKrXtZR4_RQPvQbrtoDZRpd7DnIVt14OmUvGymkMgDQe2piggSOMe7NOsIsdrAf6dwmCsx8EjQuYwTvumpeAL_re54&sa=X&ved=2ahUKEwji2sqsuviRAxXqSTABHV-ON1YQk8gLegQIGRAB&ictx=1&stq=1&cs=1&lei=2s5daeKFE-qTwbkP35zesQU#ebo=2",
    "btn-whatsapp": "https://wa.me/573202877325?text=Hola.%20Quiero%20vivir%20una%20experiencia%20en%20La%20Logia.%20%C2%BFMe%20pueden%20orientar%3F",
    "btn-instagram": "https://www.instagram.com/lalogia.med/?hl=es",
    "btn-facebook": "https://www.facebook.com/LaLogiaDiscoteca/?locale=es_LA",
    "media": "https://momentosprosmk-dev.github.io/discotecalalogia-med-media/recursos/media/",
    "numero-local": "573202877325",
  };

  const dominiosExternos = new Set();
  Object.values(window.enlaces).forEach(valor => {
    if (typeof valor === "string" && valor.startsWith("https")) {
      try {
        const url = new URL(valor);
        dominiosExternos.add(url.origin);
      } catch (e) {}
    }
  });

  dominiosExternos.forEach(href => {
    ["preconnect", "dns-prefetch"].forEach(rel => {
      const link = document.createElement("link");
      link.rel = rel;
      link.href = href;
      document.head.appendChild(link);
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
    Object.keys(window.enlaces).forEach(id => {
      const valor = window.enlaces[id];
      const elemento = document.getElementById(id);

      if (!elemento || !valor) return;

      if (elemento.tagName === "A") {
        elemento.setAttribute("href", valor);
      } else {
        elemento.addEventListener("click", () => {
          window.location.href = valor;
        });
      }
    });
  });
})();

