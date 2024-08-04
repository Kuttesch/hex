/**
 * This module contains functions that are used to handle the grid items, including the creation and removal of the inner divs.
 *  
 * @module gridItem
 * 
 * @exports createAndAppendDiv
 * @exports appendInnerDiv
 * @exports removeInnerDiv
 * @exports getGridElementSize
 * 
*/

import { copyToClipboard, redirect } from './onClick.js';
import { randomUniqueHexCodeColor, setFontColor } from './color.js';
import { clickColorCard } from './itemSelection.js';
import { getLoadingStatus } from './progressBar.js';

/**
 * Variable to keep track of the number of grid items.
 */
let gridItemCounter = 0;


/**
 * Function to create a new div element and append it to the color grid.
 * 
 */
function createAndAppendDiv() {
  const container = document.querySelector('.color-grid');
  const newDiv = document.createElement('div');
  gridItemCounter++;
  newDiv.classList.add('grid-item');
  newDiv.id = 'grid-item-' + gridItemCounter;
  newDiv.dataset.number = gridItemCounter;
  newDiv.onclick = clickColorCard;
  let color = randomUniqueHexCodeColor();
  newDiv.dataset.value = color;
  newDiv.style.backgroundColor = color;

  /* newDiv.innerHTML = gridItemCounter; */

  container.appendChild(newDiv);
  getLoadingStatus();
}

function removeDiv(DivNumber) {
  const container = document.querySelector('.color-grid');
  const div = document.getElementById('grid-item-' + DivNumber);
  container.removeChild(div);
}

/**
 * Function to create the inner elements of the grid item when it is expanded.
 * 
 * @param {DivId} div 
 * @param {HexColor} color 
 */
function appendInnerDiv(div,color) {

    const existingDiv = document.getElementById(div);
    const newDivContent = document.createElement('div');
    const newDivTopContent = document.createElement('div');
    const newDivBottomContent = document.createElement('div');
    const newDivText = document.createElement('div');
    const newDivExpandButton = document.createElement('div');
  
    newDivContent.classList.add('grid-item-content');
  
    newDivTopContent.classList.add('grid-item-top-content');
  
    newDivBottomContent.classList.add('grid-item-bottom-content');
    newDivBottomContent.onclick = copyToClipboard;
  
    newDivText.classList.add('grid-item-text');
    newDivText.id = 'grid-item-text';
    newDivText.innerHTML = color.toString().toUpperCase();
    newDivText.style.color = setFontColor(newDivText, color);
  
    newDivExpandButton.classList.add('grid-item-expand-button');
    newDivExpandButton.classList.add('material-symbols-outlined');
    newDivExpandButton.id = 'grid-item-expand-button';
    newDivExpandButton.innerHTML = 'open_in_new';
    newDivExpandButton.style.color = setFontColor(newDivExpandButton,color);
    newDivExpandButton.onclick = redirect;
  
  
    newDivTopContent.appendChild(newDivExpandButton);
    newDivBottomContent.appendChild(newDivText);
    newDivContent.appendChild(newDivTopContent);
    newDivContent.appendChild(newDivBottomContent);
    existingDiv.appendChild(newDivContent);
  }

  /**
   * Function to remove the inner elements of the grid item when it is collapsed.
   * 
   */
  function removeInnerDiv(div) {
    const existingDiv = document.getElementById(div);
    const existingDivContent = existingDiv.querySelector('.grid-item-content');
    existingDiv.removeChild(existingDivContent);
  }

  /**
   * Function to get the size of the grid element based on the viewport width used for mobile responsiveness.
   * 
   * @returns {Number} The size of the grid element.
   */
  function getGridElementSize() {
    const viewportWidth = window.innerWidth;
    const gridElementWidth = viewportWidth / 5;
    console.log(gridElementWidth);
    return gridElementWidth;
}

/**
 * Export the functions to be used in other modules.
 */
export { appendInnerDiv, removeDiv, removeInnerDiv, createAndAppendDiv, getGridElementSize};