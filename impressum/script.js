import { initializeTheme, toggleTheme } from '../modules/darkmode.js';
import { loadingBarSubSite } from '../modules/progressBar.js';


window.addEventListener('click', function() {
    const themeButton = document.getElementById('theme-button');
    themeButton.onclick = toggleTheme;
  });

function main() {
    loadingBarSubSite();
    initializeTheme();
}

if (window.location.pathname.includes('/impressum')) {
    addEventListener('DOMContentLoaded', main);
  }