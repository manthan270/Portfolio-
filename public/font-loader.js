const fontStylesheet = document.querySelector('#site-fonts');

if (fontStylesheet) {
  fontStylesheet.addEventListener('load', () => {
    fontStylesheet.media = 'all';
  }, { once: true });
}
