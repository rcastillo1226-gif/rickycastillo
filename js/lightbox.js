(function () {
  // ── Inject lightbox HTML into page ──
  var overlay = document.createElement('div');
  overlay.id = 'cs-lightbox';
  overlay.innerHTML =
    '<button id="cs-lightbox-close" aria-label="Close">\u2715</button>' +
    '<div id="cs-lightbox-inner">' +
      '<img id="cs-lightbox-img" src="" alt="" />' +
      '<div id="cs-lightbox-cap"></div>' +
    '</div>';
  document.body.appendChild(overlay);

  var lightbox    = document.getElementById('cs-lightbox');
  var lightboxImg = document.getElementById('cs-lightbox-img');
  var lightboxCap = document.getElementById('cs-lightbox-cap');

  function openLightbox(src, alt, caption) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightboxCap.textContent = caption || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }

  // ── Attach zoom-in behaviour to all content images ──
  // Targets images inside .cs-body (all case study content sections)
  // and .cs-hero-split-img (hero screenshot panels)
  var imgs = document.querySelectorAll(
    '.cs-body img, .cs-hero-split-img img'
  );

  imgs.forEach(function (img) {
    img.style.cursor = 'zoom-in';

    img.addEventListener('click', function (e) {
      e.stopPropagation();

      var caption = '';

      // 1. Prefer figcaption inside the nearest <figure>
      var figure = img.closest('figure');
      if (figure) {
        var figcap = figure.querySelector('figcaption');
        if (figcap) caption = figcap.textContent.trim();
      }

      // 2. Fall back to .cs-system-cell-label (system grid cells)
      if (!caption) {
        var cell = img.closest('.cs-system-cell');
        if (cell) {
          var label = cell.querySelector('.cs-system-cell-label');
          if (label) caption = label.textContent.trim();
        }
      }

      // 3. Fall back to alt text
      if (!caption) caption = img.alt || '';

      openLightbox(img.src, img.alt, caption);
    });
  });

  // ── Close on backdrop click or ✕ button ──
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox || e.target.id === 'cs-lightbox-close') {
      closeLightbox();
    }
  });

  // ── Close on Escape key ──
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });
})();
