/**
  * @Kuttesch - 2024
  * This is the main script file for the HEX! main page.
  * It is the main entry point for the application and connects all the modules together.
  * 
  * @module script
  * 
*/

import { randomHexCodeColor } from './modules/color.js';
import { toggleSidebar } from './modules/onClick.js';
import { createAndAppendDiv, removeDiv } from './modules/gridItem.js';
import { setGridElementSize } from './modules/itemSelection.js';

/**
 * Number of divs to be appended to the page when the user scrolls to the bottom.
 * All the colors are unique and are stored in a Set to avoid duplicates.
 * 
 */
const numDivs = 2000;
let shownGridItemCounter = 0;

/** 
 * Event Listener for clicking the sidebar button.
 * When the sidebar button is clicked, the sidebar is toggled.
 * 
*/
window.addEventListener('click', function() {
  const sidebarButton = document.getElementById('sidebar-button');
  sidebarButton.onclick = toggleSidebar;
});

/**
 * Event Listener for scrolling.
 * When the user scrolls to the bottom of the page, more divs are appended to the page.
 * 
 */
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  if (scrollY + viewportHeight >= documentHeight - 100) {
    console.log('Bottom of the page ' + shownGridItemCounter);
    for (let i = 0; i < numDivs; i++) {
      createAndAppendDiv();
      deleteTopDivs();
      shownGridItemCounter++;
      
    }
  }
});

function deleteTopDivs() {
  if (shownGridItemCounter > numDivs * 2) {
    console.log('deleteTOpDivs ' + shownGridItemCounter);
    for (let i=0; i < numDivs; i++) {
      removeDiv();
      shownGridItemCounter--;
    }
  }
  

}

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
  for (let i = 0; i < numDivs; i++) {
    createAndAppendDiv();
    shownGridItemCounter++;
  }
  switchColorTitle();
  setGridElementSize();
}

/**
 * Event Listener for the DOMContentLoaded event.
 * When the DOM is loaded, the main function is called.
 * It assures that the main function is called when the DOM is ready.
 */

document.addEventListener('DOMContentLoaded', main);