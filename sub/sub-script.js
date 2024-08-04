/**
  * @Kuttesch - 2024
  * This is the main script file for the HEX! sub page.
  * It is the main entry point for the sub page and connects all it's modules together.
  * 
  * @module sub-script
  * 
*/

import { getHashValue } from '../modules/url.js';
import { setShades } from '../modules/shades.js';
import { setSizeOnClick } from '../modules/onClick.js';
import { setValues, initializeValues } from '../modules/values.js';
import { reloadSubSite } from '../modules/onClick.js';
import { initializeTheme, toggleTheme } from '../modules/darkmode.js';
import { loadingBarSubSite } from '../modules/progressBar.js';

function setTitle(){
  const title = document.getElementById('shade-0');
  const name = getHashValue();
  title.textContent = name;
}

function initReload() {
  const reload = document.getElementById('reload');
  reload.onclick = function () {
    reloadSubSite();
  }
}

window.addEventListener('click', function() {
  const themeButton = document.getElementById('theme-button');
  themeButton.onclick = toggleTheme;
});

function main() {
  loadingBarSubSite();
  initializeTheme();
  setTitle();
  setShades();
  setValues('#' + getHashValue());
  setSizeOnClick('shade-0');
  initializeValues();
  initReload();
}

if (window.location.pathname.includes('/sub')) {
  addEventListener('DOMContentLoaded', main);
}

export { main };