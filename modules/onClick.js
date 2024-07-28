/**
 * This module contains functions that are used to handle click events.
 * 
 * @module onClick
 * 
 * @exports redirect
 * @exports copyToClipboard
 * @exports toggleSidebar
 * 
 */

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
 * Export the functions to be used in other modules.
 * 
 */
export { redirect, copyToClipboard, toggleSidebar };