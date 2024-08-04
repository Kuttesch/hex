/**
 * This module contains the functions that are used to handle the values of a color.
 * 
 * @module values
 * 
 * @exports setValues
 * @exports initializeValues
 * 
 */

import { calculateRGB, calculateHSL } from './color.js';
import {valueOnClick} from './onClick.js';

/**
 * Function to set the values of a color.
 * 
 * @param {HexColor} color 
 */
function setValues(color) {
    const valueHEX = document.getElementById('value-hex');
    const textHEX = document.getElementById('text-hex');
    const valueRGB = document.getElementById('value-rgb');
    const textRGB = document.getElementById('text-rgb');
    const valueHSL = document.getElementById('value-hsl');
    const textHSL = document.getElementById('text-hsl');
  if (window.innerWidth > 600){
    textHEX.textContent = 'HEX: ' + color;
    valueHEX.dataset.value = color;
    textRGB.textContent = 'RGB(' + calculateRGB(color) + ')';
    valueRGB.dataset.value = 'rgb(' + calculateRGB(color) + ')';
    textHSL.textContent = 'HSL(' + calculateHSL(color) + ')';
    valueHSL.dataset.value = 'hsl(' + calculateHSL(color) + ')';
  } else {
    console.log('innerWidth:', window.innerWidth);
    
    textHEX.textContent = color.toUpperCase();
    valueHEX.dataset.value = color;
    textRGB.textContent = 'rgb(' + calculateRGB(color) + ')';
    valueRGB.dataset.value = 'rgb(' + calculateRGB(color) + ')';
    textHSL.textContent = 'hsl(' + calculateHSL(color) + ')';
    valueHSL.dataset.value = 'hsl(' + calculateHSL(color) + ')';
  }
  }

  /**
   * Function to initialize the value of a color depending on the screen size.
   * 
   * @param {HexColor} value 
   * @param {DivId} copyIcon
   *  
   */
  function initializeValue(value, copyIcon) {
    const div = document.getElementById(copyIcon);
    const divMobile = document.getElementById(value);
    
    if (window.innerWidth < 600){
      divMobile.onclick = function () {
        valueOnClick(value);
      }
    } else {
    div.onclick = function () {
      valueOnClick(value);
    }
  }
    console.log('value initialized: ' + value);
  }
  
  /**
   * Function to start the initialization of the values.
   * 
   */
  function initializeValues() {
    initializeValue('value-hex', 'copy-hex');
    initializeValue('value-rgb', 'copy-rgb');
    initializeValue('value-hsl', 'copy-hsl');
  }

  /**
 * Export the functions to be used in other modules.
 */
  export { setValues, initializeValues };