(() => {
  let theme;

  try {
    theme = localStorage.getItem('theme');
  } catch {
    // Continue with the operating-system preference when storage is blocked.
  }

  if (theme !== 'light' && theme !== 'dark') {
    theme = window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ? 'dark' : 'light';
  }

  document.documentElement.classList.toggle('dark', theme === 'dark');
  const themeColor = document.querySelector('meta[name="theme-color"]');
  themeColor?.setAttribute('content', theme === 'dark' ? '#09090b' : '#f7f7f7');
})();
