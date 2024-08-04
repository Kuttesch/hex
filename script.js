/**
  * @Kuttesch - 2024
  * This is the main script file for the HEX! main page.
  * It is the main entry point for the application and connects all the modules together.
  * 
  * @module script
  * 
*/

import { randomHexCodeColor } from './modules/color.js';
/* import { toggleSidebar } from './modules/onClick.js'; */
import { appendDivsOnScroll, createNumOfDivs} from './modules/gridItem.js';
import { setGridElementSize } from './modules/itemSelection.js';
import { initializeLoadingBar} from './modules/progressBar.js';
import { initializeTheme, toggleTheme } from './modules/darkmode.js';

/** 
 * Event Listener for clicking the sidebar button.
 * When the sidebar button is clicked, the sidebar is toggled.
 * 
*/
window.addEventListener('click', function() {
  const sidebarButton = document.getElementById('sidebar-button');
  sidebarButton.onclick = toggleSidebar;
});

window.addEventListener('click', function() {
  const themeButton = document.getElementById('theme-button');
  themeButton.onclick = toggleTheme;
});

/**
 * Event Listener for scrolling.
 * When the user scrolls to the bottom of the page, more divs are appended to the page.
 * 
 */
window.addEventListener('scroll', () => {
  appendDivsOnScroll();
  });
  
/**
 * Function to switch the color of the title.
 * The title color is switched every 2 seconds.
 *
 */
async function switchColorTitle() {
  const title = document.getElementById('title');
  title.style.color = randomHexCodeColor();
  await new Promise(r => setTimeout(r, 2000));
  switchColorTitle();
}

/**
 * Main function to run the application.
 * This function creates the initial divs and switches the color of the title.
 * 
 */
function main() {
  initializeLoadingBar();
  initializeTheme();
  createNumOfDivs();
  switchColorTitle();
  setGridElementSize();
}

/**
 * Event Listener for the DOMContentLoaded event.
 * When the DOM is loaded, the main function is called.
 * It assures that the main function is called when the DOM is ready.
 */

document.addEventListener('DOMContentLoaded', main);