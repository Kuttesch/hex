/**
 * This module contains the functions that are used to handle the generation of random colors, keep track of them and the calculation of the font color based on the background color.
 * 
 * @module color
 * 
 * @exports randomUniqueHexCodeColor
 * @exports randomHexCodeColor
 * @exports setFontColor
 * @exports initializeFontColors
 * @exports setBackgroundColorAndText
 * @exports calculateRGB
 * @exports calculateHSL
 */

/**
 * Set to keep track of the existing colors.
 */
let existingColors = new Set();

/**
 * Function to generate random hex colors using the randomHexCodeColor function and keep track of them using a Set.
 * 
 * @returns {HexColor} A random unique hex code color.
 * 
 */
const randomUniqueHexCodeColor = () => {
  while (true) {
    let color = randomHexCodeColor();
    if (!existingColors.has(color)) {
      existingColors.add(color);
      return color;
    }
    else {
      console.log('Color already exists:', color);
      randomUniqueHexCodeColor();
    }
  }
};

/**
 * Function to generate random hex colors.
 * 
 * @returns {HexColor} A random hex code color.
 */
const randomHexCodeColor = () => {
  let n = Math.floor(Math.random() * 0xffffff).toString(16);
  let color = '#' + n.padStart(6, '0');
  return color;
}

/**
 * Function to calculate the font color based on the background color.
 * 
 * @param {HexColor} color 
 * @returns {HexColor} The font color (black/white) based on the background color.
 */
function calculateFontColor(color) {
  const r = parseInt(color.substring(1, 3), 16);
  const g = parseInt(color.substring(3, 5), 16);
  const b = parseInt(color.substring(5, 7), 16);
  let brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness >= 128 ? '#000000' : '#ffffff';
}

/**
 * Function to set the font color of a div based on the background color using the calculateFontColor function to calculate the font color.
 * 
 * @param {Div} divname 
 * @param {HexColor} color 
 */
function setFontColor(divname, color) {
  divname.style.color = calculateFontColor(color);
}

/**
 * Function to set the border color of a div based on the background color using the calculateFontColor function to calculate the font color.
 * 
 * @param {Div} divname 
 * @param {HexColor} color 
 */
function setBorderColor(divname, color) {
  divname.style.borderColor = calculateFontColor(color);
}

/**
 * Function to initialize the font colors of the divs with the class 'switch-color'.
 */
function initializeFontAndBorderColors() {
  const divs = document.querySelectorAll('.switch-color');
  const backgroundColor = localStorage.getItem('darkMode') === 'true' ? '#141314' : '#f0f0f0';
  divs.forEach(div => {
    setFontColor(div, backgroundColor);
    setBorderColor(div, backgroundColor);
    
  });
}
/**
 * Function to set the background color and text of a div.
 * 
 * @param {DivId} div 
 * @param {HexColor} color 
 */
function setBackgroundColorAndText(div, color) {
  const divname = document.getElementById(div);
  divname.style.backgroundColor = color;
  divname.textContent = color;
  divname.dataset.value = color.slice(1);
}

/**
 * Function to convert a hex color to RGB color values.
 * 
 * @param {HexColor} color 
 * @returns {RGBColor} The RGB color values.
 */
function calculateRGB(color) {
  var r = parseInt(color.substring(1, 3), 16);
  var g = parseInt(color.substring(3, 5), 16);
  var b = parseInt(color.substring(5, 7), 16);
  return r + ', ' + g + ', ' + b;
}

/**
 * Function to convert a hex color to HSL color values.
 * 
 * @param {HexColor} color 
 * @returns {HSLColor} The HSL color values.
 */
function calculateHSL(color) {
  var r = parseInt(color.substring(1, 3), 16) / 255;
  var g = parseInt(color.substring(3, 5), 16) / 255;
  var b = parseInt(color.substring(5, 7), 16) / 255;

  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return h + ', ' + s + '%, ' + l + '%';
}

/**
 * Export the functions to be used in other modules.
 */
export { randomUniqueHexCodeColor, randomHexCodeColor, setFontColor, initializeFontAndBorderColors, setBackgroundColorAndText, calculateRGB, calculateHSL };