(() => {
  const html = document.documentElement;
  const btn  = document.getElementById('btn-theme-toggle');

  function isDark() { return html.classList.contains('dark'); }

  function applyTheme(dark) {
    html.classList.toggle('dark', dark);
    html.classList.toggle('light', !dark);
    btn.textContent = dark ? 'light_mode' : 'dark_mode';
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }

  applyTheme(isDark());

  btn.addEventListener('click', () => applyTheme(!isDark()));
})();
