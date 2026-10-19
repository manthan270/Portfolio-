const fontStylesheet = document.querySelector('#site-fonts');

if (fontStylesheet) {
  const activateFonts = () => {
    fontStylesheet.media = 'all';
  };

  if (fontStylesheet.sheet) {
    activateFonts();
  } else {
    fontStylesheet.addEventListener('load', activateFonts, { once: true });
  }
}
