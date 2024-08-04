/**
 * This module contains functions that are used to handle click events.
 * 
 * @module onClick
 * 
 * @exports redirect
 * @exports copyToClipboard
 * @exports toggleSidebar
 * @exports shadesOnClick
 * @exports setSizeOnClick
 * @exports valueOnClick
 * @exports reloadSubSite
 * 
 */

import { setValues, initializeValues } from "./values.js";
import { initializeFontAndBorderColors, randomHexCodeColor, setFontColor } from "./color.js";
import { main } from "../sub/sub-script.js";

/**
 * Function to redirect the user to the subpage of the color.
 * 
 */
function redirect() {
    event.stopPropagation();
    let url = window.location.href;
    let color = this.parentElement.parentElement.parentElement.dataset.value;
    console.log(color);
      /* Check if the URL contains the part 'index.html'.
         If yes, replace it with the subpage of the color.
         If not, append the subpage of the color to the URL.*/
       if (url.includes('index.html')) {
        url = url.replace('index.html', `sub${color}`);
      } else {
        url = url + `sub${color}`;
      }
      console.log(url);
      window.location.href = url;
  }

/**
 * Function to copy the color code to the clipboard.
 * 
 */
function copyToClipboard() {
    event.stopPropagation();
    const div = this;
    const innerDiv = div.querySelector('.grid-item-text');
    navigator.clipboard.writeText(innerDiv.innerHTML);
    console.log('Copied: ' + innerDiv.innerHTML);
  }

/**
 * Function to toggle the sidebar.
 * 
 */
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const main = document.getElementById('main');
  const colorGrid = document.getElementById('color-grid');

  sidebar.classList.toggle('expanded');
  main.classList.toggle('expanded');
  colorGrid.classList.toggle('expanded');
}

/**
 * Function to resize the shade divs on click so the selected shade is the largest.
 * 
 * @param {DivId} divname 
 */
function setSizeOnClick(divname) {
  const focus = document.getElementById(divname);
  focus.position = focus.dataset.position;

  console.log('focus: ' + focus.position);

  for (let i = 1; i < 10; i++) {
    const div = document.getElementsByClassName('shade--' + i)[0];
    div.position = div.dataset.position;
    div.style.width = 45 - Math.abs(div.position - focus.position) + 'vw';

    if (Math.abs(focus.position - div.position) !== 0) {
      div.style.height = '9vh';
      console.log('height: ' + div.style.height);
    } else {
      div.style.height = '10vh';
      console.log('height: ' + div.style.height);
    }

    console.log('position: ' + div.position);
    console.log(Math.abs(div.position - focus.position));
    console.log('width: ' + div.style.width);
  }
}

/**
 * Function that handles the click event on a shade div.
 * 
 * @param {DivId} divname 
 */
function shadesOnClick(divname) {
  const div = document.getElementById(divname);
  setValues('#' + div.dataset.value);
  console.log('onClick for ' + div.dataset.value);
  initializeValues();
  setSizeOnClick(divname);
}

/**
 * Function to set the behavior of the color value divs when clicked.
 * 
 * @param {DIvId} divname 
 */
function valueOnClick(divname) {
  const div = document.getElementById(divname);
  navigator.clipboard.writeText(div.dataset.value);
  console.log('Copied: ' + div.dataset.value);
  const value = div.dataset.value;

  // Change the color of the div or the button depending on the screen size.
  if (window.innerWidth < 600){
    div.style.color = value;
    setTimeout(() => {
        initializeFontAndBorderColors();
    }, 1000);
  } else {  
    const button = div.getElementsByClassName('copy-icon')[0];
    button.style.color = value;
    setTimeout(() => {
      button.style.color = "";
    }, 1000);
  }
}

/**
 * Function to reload the subpage with a new random color on click.
 * 
 */
function reloadSubSite() {
  const url = window.location.href;
  const baseUrl = url.split('#')[0];
  const newUrl = baseUrl + randomHexCodeColor();
  console.log('url:', newUrl);
  window.location.href = newUrl;

  main();
}



/**
 * Export the functions to be used in other modules.
 * 
 */
export { redirect, copyToClipboard, toggleSidebar, shadesOnClick, setSizeOnClick, valueOnClick, reloadSubSite };