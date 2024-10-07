/**
 * This module is responsible for managing the dark mode theme.
 * 
 * @module darkmode
 */

import { initializeFontAndBorderColors, setBackgroundColorAndText } from "./color.js";

/**
 * Variable to keep track of the current theme.
 */
let darkMode = false;

/**
 * Function to initialize the theme based on the stored value in localStorage.
 * If no value is stored, the default value is light mode.
 * 
 */
function initializeTheme() {
    try {
        const storedDarkMode = localStorage.getItem('darkMode');
        darkMode = storedDarkMode === 'true'; 
    } catch (error) {
        darkMode = false;
        console.error("Error accessing localStorage:", error);
    }
    if (darkMode) {
        switchToDarkMode();
    } else {
        switchToLightMode();
    }
    initializeFontAndBorderColors();
}

/**
 * Function to save the current theme in localStorage.
 * 
 */
function saveTheme() {
    localStorage.setItem('darkMode', darkMode); 
}

/**
 * Function to switch to light mode.
 * 
 */
function switchToLightMode(){
    const button = document.getElementById('theme-button');
    const body = document.body;
    darkMode = false;
    button.innerText = 'dark_mode';
    body.style.backgroundColor = '#f0f0f0';
    elementSwitchTheme();
    console.log('Light Mode');
}

/**
 * Function to switch to dark mode.
 * 
 */
function switchToDarkMode(){
    const button = document.getElementById('theme-button');
    const body = document.body;
    darkMode = true;
    button.innerText = 'light_mode';
    body.style.backgroundColor = '#141314';
    elementSwitchTheme();
    console.log('Dark Mode');
}

/**
 * Function to toggle the theme and reinitalize the font colors.
 * 
 */
function toggleTheme() {
    if (darkMode) {
        switchToLightMode();
    } else {
        switchToDarkMode();
    }
    saveTheme();
    initializeFontAndBorderColors();
}

function elementSwitchTheme() {
    const divs = document.querySelectorAll('.switch-backgroundcolor');
    divs.forEach(div => {
        div.style.backgroundColor = darkMode ? '#141314' : '#f0f0f0';
      });
    console.log('Element Switch Themeto', darkMode ? 'Dark Mode' : 'Light Mode');
}

/**
 * Export the functions to be used in other modules.
 * 
 */
export { initializeTheme, toggleTheme }; 