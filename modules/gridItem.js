/**
 * This module contains functions that are used to handle the grid items, including the creation and removal of the inner divs.
 *  
 * @module gridItem
 * 
 * @exports appendDivsOnScroll
 * @exports createNumOfDivs
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
 * Number of divs to be appended to the page when the user scrolls to the bottom.
 * Counter to keep track of the number of divs appended to the page.
 * 
 */
let gridItemCounter = 0;
const numDivs = 2000;
let numDivCounter = 0;

function appendDivsOnScroll() {
  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  if (scrollY + viewportHeight >= documentHeight - 100) {
    numDivCounter++;
    console.log(numDivCounter);
    console.log('Bottom of the page ' + (numDivCounter * numDivs));
    for (let i = 0; i < numDivs; i++) {
        createAndAppendDiv();
      }
      deleteTopDivs(); 
    }
}
/**
 * Function to create a specified number of divs using the createAndAppendDiv function.
 */
function createNumOfDivs() {
  for (let i = 0; i < numDivs; i++) {
    createAndAppendDiv();
  }
}

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
  // newDiv.innerHTML = gridItemCounter;

  /* newDiv.innerHTML = gridItemCounter; */

  container.appendChild(newDiv);
  getLoadingStatus();
}

/**
 * Function to delete the top 2000 divs when the user scrolls to the bottom of the page.
 * 
 */
function deleteTopDivs() {
  if ((numDivCounter * numDivs) >= numDivs * 2) {
    let divsToDeleteFrom = (numDivCounter * numDivs) - (numDivs * 2) + 1;
    let divsToDeleteTo = ((numDivCounter * numDivs) - numDivs) + 1;
    for (let i = divsToDeleteFrom; i < divsToDeleteTo; i++) {
      removeDiv(i);
    }
  } else {
    console.log('No divs to delete');
  }

}

function removeDiv(DivNumber) {
  const container = document.querySelector('.color-grid');
  const div = document.getElementById('grid-item-' + DivNumber);
  container.removeChild(div);
}

function removeAndRememberDiv(DivNumber1, DivNumber2) {
  const container = document.querySelector('.color-grid');
  const div1 = document.getElementById('grid-item-' + DivNumber1);
  const div2 = document.getElementById('grid-item-' + DivNumber2);

  localStorage.setItem('removedDiv1Number', div1.dataset.number);
  localStorage.setItem('removedDiv1Color', div1.dataset.value);

  localStorage.setItem('removedDiv2Number', div2.dataset.number);
  localStorage.setItem('removedDiv2Color', div2.dataset.value);

  container.removeChild(div1);
  container.removeChild(div2);
}

function appendRemeberedDivs() {
  const container = document.querySelector('.color-grid');
  console.log("appendRememberedDivs");
  const nextExistingDiv = document.getElementById('grid-item-' + parseInt(parseInt(localStorage.getItem('removedDiv2Number')) + 1));

  const newDiv1 = document.createElement('div');
  newDiv1.classList.add('grid-item');
  newDiv1.id = 'grid-item-' + parseInt(localStorage.getItem('removedDiv1Number'));
  newDiv1.dataset.number = parseInt(localStorage.getItem('removedDiv1Number'));
  newDiv1.onclick = clickColorCard;
  let color = localStorage.getItem('removedDiv1Color');
  newDiv1.dataset.value = color;
  newDiv1.style.backgroundColor = color;
  // newDiv1.innerHTML = parseInt(localStorage.getItem('removedDiv1Number'));

  const newDiv2 = document.createElement('div');
  newDiv2.classList.add('grid-item');
  newDiv2.id = 'grid-item-' + parseInt(localStorage.getItem('removedDiv2Number'));
  newDiv2.dataset.number = parseInt(localStorage.getItem('removedDiv2Number'));
  newDiv2.onclick = clickColorCard;
  color = localStorage.getItem('removedDiv2Color');
  newDiv2.dataset.value = color;
  newDiv2.style.backgroundColor = color;
  // newDiv2.innerHTML = parseInt(localStorage.getItem('removedDiv2Number'));
  
  container.insertBefore(newDiv2, nextExistingDiv);
  console.log(newDiv2, nextExistingDiv);
  container.insertBefore(newDiv1, newDiv2);
  console.log(newDiv1, newDiv2);
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
export { appendDivsOnScroll, createNumOfDivs, appendInnerDiv, removeInnerDiv, getGridElementSize, removeAndRememberDiv, appendRemeberedDivs};