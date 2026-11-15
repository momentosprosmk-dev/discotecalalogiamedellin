// zoomCarta.js | Zoom táctil aislado exclusivamente para la imagen de la carta móvil

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".zoom-container");
  const img = container ? container.querySelector(".imagen-zoom") : null;
  if (!container || !img) return;

  // Bloquear gestos de zoom nativos del navegador sobre toda la interfaz web (Safari iOS / móviles)
  ["gesturestart", "gesturechange", "gestureend"].forEach((evt) => {
    document.addEventListener(
      evt,
      (e) => {
        e.preventDefault();
      },
      { passive: false }
    );
  });

  // Evitar que pellizcar con 2 dedos fuera de .zoom-container haga zoom a toda la web
  document.addEventListener(
    "touchmove",
    (e) => {
      if (e.touches.length > 1 && !e.target.closest(".zoom-container")) {
        e.preventDefault();
      }
    },
    { passive: false }
  );

  let scale = 1;
  let tx = 0;
  let ty = 0;
  const MIN_SCALE = 1;
  const MAX_SCALE = 3.5;

  let isPinching = false;
  let startDist = 0;
  let startScale = 1;
  let pinchImgX = 0;
  let pinchImgY = 0;

  let isPanning = false;
  let panStartX = 0;
  let panStartY = 0;
  let startTx = 0;
  let startTy = 0;

  let lastTapTime = 0;
  let lastTapX = 0;
  let lastTapY = 0;

  function clamp(val, min, max) {
    return Math.min(max, Math.max(min, val));
  }

  function applyTransform(withTransition) {
    const w = img.offsetWidth || container.clientWidth;
    const h = img.offsetHeight || container.clientHeight;

    if (scale <= 1.01) {
      scale = 1;
      tx = 0;
      ty = 0;
      img.classList.remove("zoomed");
    } else {
      const minTx = w * (1 - scale);
      const minTy = h * (1 - scale);
      tx = clamp(tx, minTx, 0);
      ty = clamp(ty, minTy, 0);
      img.classList.add("zoomed");
    }

    img.style.transition = withTransition ? "transform 0.25s ease-out" : "none";
    img.style.transform =
      scale === 1 ? "none" : `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`;
  }

  function getTouchDistance(t1, t2) {
    const dx = t1.clientX - t2.clientX;
    const dy = t1.clientY - t2.clientY;
    return Math.hypot(dx, dy);
  }

  function getTouchMidpoint(t1, t2, rect) {
    return {
      x: (t1.clientX + t2.clientX) / 2 - rect.left,
      y: (t1.clientY + t2.clientY) / 2 - rect.top,
    };
  }

  function toggleDoubleTapZoom(clientX, clientY) {
    const rect = container.getBoundingClientRect();
    const cx = clientX - rect.left;
    const cy = clientY - rect.top;

    if (scale > 1.05) {
      scale = 1;
      tx = 0;
      ty = 0;
    } else {
      const nextScale = 2.2;
      tx = cx - cx * nextScale;
      ty = cy - cy * nextScale;
      scale = nextScale;
    }
    applyTransform(true);
  }

  container.addEventListener(
    "touchstart",
    (e) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        isPinching = true;
        isPanning = false;
        startDist = getTouchDistance(e.touches[0], e.touches[1]);
        startScale = scale;

        const rect = container.getBoundingClientRect();
        const mid = getTouchMidpoint(e.touches[0], e.touches[1], rect);
        pinchImgX = (mid.x - tx) / scale;
        pinchImgY = (mid.y - ty) / scale;
      } else if (e.touches.length === 1) {
        const now = Date.now();
        const touch = e.touches[0];
        const dt = now - lastTapTime;
        const distTap = Math.hypot(touch.clientX - lastTapX, touch.clientY - lastTapY);

        if (dt > 0 && dt < 300 && distTap < 35) {
          e.preventDefault();
          toggleDoubleTapZoom(touch.clientX, touch.clientY);
          lastTapTime = 0;
          return;
        }

        lastTapTime = now;
        lastTapX = touch.clientX;
        lastTapY = touch.clientY;

        if (scale > 1) {
          isPanning = true;
          panStartX = touch.clientX;
          panStartY = touch.clientY;
          startTx = tx;
          startTy = ty;
        }
      }
    },
    { passive: false }
  );

  container.addEventListener(
    "touchmove",
    (e) => {
      if (isPinching && e.touches.length === 2) {
        e.preventDefault();
        const currDist = getTouchDistance(e.touches[0], e.touches[1]);
        if (startDist <= 0) return;

        scale = clamp(startScale * (currDist / startDist), MIN_SCALE, MAX_SCALE);
        const rect = container.getBoundingClientRect();
        const mid = getTouchMidpoint(e.touches[0], e.touches[1], rect);

        tx = mid.x - pinchImgX * scale;
        ty = mid.y - pinchImgY * scale;
        applyTransform(false);
      } else if (isPanning && e.touches.length === 1 && scale > 1) {
        const touch = e.touches[0];
        const dx = touch.clientX - panStartX;
        const dy = touch.clientY - panStartY;

        const w = img.offsetWidth || container.clientWidth;
        const h = img.offsetHeight || container.clientHeight;
        const minTx = w * (1 - scale);
        const minTy = h * (1 - scale);

        const nextTx = startTx + dx;
        const nextTy = startTy + dy;

        const enBordeSuperior = startTy >= 0 && dy > 0 && Math.abs(dy) > Math.abs(dx);
        const enBordeInferior = startTy <= minTy && dy < 0 && Math.abs(dy) > Math.abs(dx);

        if (!enBordeSuperior && !enBordeInferior) {
          e.preventDefault();
        }

        tx = clamp(nextTx, minTx, 0);
        ty = clamp(nextTy, minTy, 0);
        applyTransform(false);
      }
    },
    { passive: false }
  );

  container.addEventListener("touchend", (e) => {
    if (e.touches.length < 2) {
      isPinching = false;
    }
    if (e.touches.length === 1 && scale > 1) {
      isPanning = true;
      panStartX = e.touches[0].clientX;
      panStartY = e.touches[0].clientY;
      startTx = tx;
      startTy = ty;
    } else if (e.touches.length === 0) {
      isPanning = false;
      if (scale <= 1.02) {
        scale = 1;
        tx = 0;
        ty = 0;
        applyTransform(true);
      }
    }
  });

  // Soporte de doble clic en pruebas desde PC
  container.addEventListener("dblclick", (e) => {
    e.preventDefault();
    toggleDoubleTapZoom(e.clientX, e.clientY);
  });
});
