/**
 * 
 * This module contains functions that are used to handle the progress bar that appears at the top of the page while loading.
 * This is purely asthetic and does not affect the functionality of the page.
 * 
 * @module progressBar
 * 
 * @exports getLoadingStatus
 * @exports initializeLoadingBar
 * 
 */

import { randomHexCodeColor } from "./color.js";

/**
 * Variable to keep track of the loading status.
 */
var loading = 0;

/**
 * Function to initialize the loading bar by setting the background color to a random color.
 * 
 */
function initializeLoadingBar() {
    var loadingBar = document.getElementById('loading-bar');
    loadingBar.style.backgroundColor = randomHexCodeColor();
}

/**
 * Function to increment the loading status. It is called when a new div is created because this is the easiest way to keep track of the loading status.
 * 
 */
function getLoadingStatus() {
    loading++;
    setLoadingStatus();
}

/**
 * Function to set the width of the loading bar based on the loading status.
 * 
 */
function setLoadingStatus() {
    var loadingBar = document.getElementById('loading-bar');
    loadingBar.style.width = (loading / 2000) * 100 + 'vw';
    loadingBar.style.width = (loading / 2000) * 100 + 'vw';

    if (loading === 2000) {
        loading = 0;
        setTimeout(() => {
            loadingBar.style.left = '100vw';
        }, 1000);
    }
}

/**
 * Exporting the functions to be used in other modules.
 * 
 */
export { getLoadingStatus, initializeLoadingBar };