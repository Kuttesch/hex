import { initializeTheme, toggleTheme } from '../modules/darkmode.js';

window.addEventListener('click', function() {
    const themeButton = document.getElementById('theme-button');
    themeButton.onclick = toggleTheme;
  });

function main() {
    initializeTheme();
}

if (window.location.pathname.includes('/impressum')) {
    addEventListener('DOMContentLoaded', main);
  }