/**
 * This module contains the functions that are used to handle the URL.
 * 
 * @module url
 * 
 * @exports getHashValue
 */

/**
 * Function to get the hash value at the end of the URL.
 * 
 * @example /sub/#hashValue -> hashValue
 * 
 * @returns {String} The hash value of the URL.
 */
function getHashValue() {
    const fullUrl = window.location.href; // Get the entire URL
    const hashIndex = fullUrl.indexOf('#'); // Find the position of "#"
  
    if (hashIndex !== -1) {
      const hashValue = fullUrl.substring(hashIndex + 1); // Extract the part after "#"
      return hashValue;
    } else {
      return null; // Return null if there's no hash value
    }
  }

/**
 * Export the functions to be used in other modules.
 */
export { getHashValue };