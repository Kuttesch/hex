/**
 * This module contains the functions that are used to handle the generation of shades of a color.
 * 
 * @module shades
 * 
 * @exports setShades
 * 
 */

import { setFontColor, setBackgroundColorAndText } from "./color.js";
import { getHashValue } from "./url.js";
import { shadesOnClick } from "./onClick.js";

/**
 * Function to calculate the shade of a color.
 * 
 * @param {HexColor} color 
 * @param {Number} shadeCount 
 * @param {PositiveNumber} stepMultiplier 
 * 
 * @returns {HexColor} The color with the calculated shade.
 */
function calculateShade(color, shadeCount, stepMultiplier = 0.6) {
    if (!isValidColor(color) || !Number.isInteger(shadeCount) || stepMultiplier <= 0) {
      throw new Error("Invalid input: color must be a valid hex (#rrggbb), shadeCount must be an integer, and stepMultiplier must be a positive number.");
    }
  
    const step = Math.round((255 * stepMultiplier) / (Math.abs(shadeCount) + 1));
    const amount = shadeCount * step;
  
    if (shadeCount > 0) {
      return lightenColor(color, amount);
    } else {
      return darkenColor(color, -amount);
    }
  }
  
  /**
   * Function to check if a color is a valid hex color.
   * 
   * @param {HexColor} color 
   * @returns {Boolean} True if the color is a valid hex color, false otherwise.
   */
  function isValidColor(color) {
    return /^#[0-9A-F]{6}$/i.test(color);
  }
  
  /**
   * Function to lighten a Hex Color.
   * 
   * @param {HexColor} color 
   * @param {Number} amount 
   * @returns {HexColor} The lightened color.
   */
  function lightenColor(color, amount) {
    const num = parseInt(color.slice(1), 16);
    const r = Math.min(255, (num >> 16) + amount);
    const g = Math.min(255, ((num >> 8) & 0x00FF) + amount);
    const b = Math.min(255, (num & 0x0000FF) + amount);
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
  }
  
  /**
   * Function to darken a Hex Color.
   * 
   * @param {HexColor} color 
   * @param {Number} amount 
   * @returns {HexColor} The darkened color.
   */
  function darkenColor(color, amount) {
    const num = parseInt(color.slice(1), 16);
    const r = Math.max(0, (num >> 16) - amount);
    const g = Math.max(0, ((num >> 8) & 0x00FF) - amount);
    const b = Math.max(0, (num & 0x0000FF) - amount);
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
  }

  /**
   * Function to set all shades of a color.
   */
  function setShades() {
    const baseColor = '#' + getHashValue();
    setBackgroundColorAndText('shade-4', calculateShade(baseColor, -4));
    setFontColor( document.getElementById('shade-4'), calculateShade(baseColor, -4));
    initializeShade('shade-4');
    setBackgroundColorAndText('shade-3', calculateShade(baseColor, -3));
    setFontColor(document.getElementById('shade-3'), calculateShade(baseColor, -3));
    initializeShade('shade-3');
    setBackgroundColorAndText('shade-2', calculateShade(baseColor, -2));
    setFontColor(document.getElementById('shade-2'), calculateShade(baseColor, -2));
    initializeShade('shade-2');
    setBackgroundColorAndText('shade-1', calculateShade(baseColor, -1));
    setFontColor(document.getElementById('shade-1'), calculateShade(baseColor, -1));
    initializeShade('shade-1');
    setBackgroundColorAndText('shade-0', baseColor);
    setFontColor(document.getElementById('shade-0'), baseColor);
    initializeShade('shade-0');
    setBackgroundColorAndText('shade1', calculateShade(baseColor, 1));
    setFontColor(document.getElementById('shade1'), calculateShade(baseColor, 1));
    initializeShade('shade1');
    setBackgroundColorAndText('shade2', calculateShade(baseColor, 2));
    setFontColor(document.getElementById('shade2'), calculateShade(baseColor, 2));
    initializeShade('shade2');
    setBackgroundColorAndText('shade3', calculateShade(baseColor, 3));
    setFontColor(document.getElementById('shade3'), calculateShade(baseColor, 3));
    initializeShade('shade3');
    setBackgroundColorAndText('shade4', calculateShade(baseColor, 4));
    setFontColor(document.getElementById('shade4'), calculateShade(baseColor, 4));
    initializeShade('shade4');
  }

  /**
   * Function to initialize a shade div.
  */
  function initializeShade(shade) {
    const div = document.getElementById(shade);
    div.onclick = function () {
      shadesOnClick(shade);
    }
    console.log('shade initialized: ' + shade);
  }

/**
 * Export the functions to be used in other modules.
 */
export { setShades };