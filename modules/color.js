/**
 * This module contains the functions that are used to handle the generation of random colors, keep track of them and the calculation of the font color based on the background color.
 * 
 * @module color
 * 
 * @exports randomUniqueHexCodeColor
 * @exports randomHexCodeColor
 * @exports setFontColor
 */

/**
 * Function to generate random hex colors using the randomHexCodeColor function and keep track of them using a Set.
 * 
 * @returns {HexColor} A random unique hex code color.
 * 
 */
const randomUniqueHexCodeColor = () => {
    const existingColors = new Set();
  
    while (true) {
      let color = randomHexCodeColor();
  
      if (!existingColors.has(color)) {
        existingColors.add(color);
        return color;
      }
      else {
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
 * Export the functions to be used in other modules.
 */  
export { randomUniqueHexCodeColor, randomHexCodeColor, setFontColor };