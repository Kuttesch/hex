import { setFontColor } from './modules/fontColor.js';

//  ### Define Variables ### //

const numDivs = 2000;
let number = 0;
let selectionStatus = null;

//  ### Function to generate random unique hex color code ### //

const randomUniqueHexColorCode = () => {
  const existingColors = new Set();

  //console.log('randomUniqueHexColorCode() called');

  while (true) {
    let color = randomHexCodeColor();

    if (!existingColors.has(color)) {
      existingColors.add(color);
      return color;
    }
    else {
      //console.log('Duplicate color found: ' + color);
      randomUniqueHexColorCode();
    }
  }

};

const randomHexCodeColor = () => {

  //console.log('randomHexCodeColor() called');

  let n = Math.floor(Math.random() * 0xffffff).toString(16);
  let color = '#' + n.padStart(6, '0');
  return color;
}

//  ### Function to create and append divs ### //
function createAndAppendDiv() {
  const container = document.querySelector('.color-grid');
  const newDiv = document.createElement('div');

  number++;

  // ## Create new parent div ## //
  newDiv.classList.add('grid-item');
  newDiv.id = 'grid-item-' + number;
  newDiv.dataset.number = number;
  newDiv.onclick = clickColorCard;
  let color = randomUniqueHexColorCode();
  newDiv.dataset.value = color;
  newDiv.style.backgroundColor = color;

  // ## Append parent div to container ## //
  container.appendChild(newDiv);

}

function appendInnerDiv(div,color) {

  const existingDiv = document.getElementById(div);
  const newDivContent = document.createElement('div');
  const newDivTopContent = document.createElement('div');
  const newDivBottomContent = document.createElement('div');
  const newDivText = document.createElement('div');
  const newDivExpandButton = document.createElement('div');

  // ## Create new content div ## //
  newDivContent.classList.add('grid-item-content');

  // ## Create new top content div ## //
  newDivTopContent.classList.add('grid-item-top-content');

  // ## Create new bottom content div ## //
  newDivBottomContent.classList.add('grid-item-bottom-content');
  newDivBottomContent.onclick = copyToClipboard;

  // ## Create new text div ## //
  newDivText.classList.add('grid-item-text');
  newDivText.id = 'grid-item-text';
  newDivText.innerHTML = color.toString().toUpperCase();
  newDivText.style.color = setFontColor(newDivText, color);

  // ## Create new expand button ## //
  newDivExpandButton.classList.add('grid-item-expand-button');
  newDivExpandButton.classList.add('material-symbols-outlined');
  newDivExpandButton.id = 'grid-item-expand-button';
  newDivExpandButton.innerHTML = 'open_in_new';
  newDivExpandButton.style.color = setFontColor(newDivExpandButton,color);
  newDivExpandButton.onclick = redirect;


  // ## Append text div to parent div ## //
  newDivTopContent.appendChild(newDivExpandButton);
  newDivBottomContent.appendChild(newDivText);
  newDivContent.appendChild(newDivTopContent);
  newDivContent.appendChild(newDivBottomContent);
  existingDiv.appendChild(newDivContent);
}

function removeInnerDiv(div) {
  const existingDiv = document.getElementById(div);
  const existingDivContent = existingDiv.querySelector('.grid-item-content');
  existingDiv.removeChild(existingDivContent);
}
//  ### Function to change title color ### //

function titleColor() {
  const title = document.getElementById('title');
  title.style.color = randomUniqueHexColorCode();
}

// ### EventListener to toggle sidebar ### //
window.addEventListener('click', function() {
  const sidebarButton = document.getElementById('sidebar-button');
  sidebarButton.onclick = toggleSidebar;
});

// ### EventListener to redirect to Subsite ### //
function redirect() {
  event.stopPropagation();
  let url = window.location.href;
  let color = this.parentElement.parentElement.parentElement.dataset.value;
  console.log(color);
     if (url.includes('index.html')) {
      url = url.replace('index.html', `sub${color}`);
    } else {
      url = url + `sub${color}`;
    }
    console.log(url);
    window.location.href = url;
 /*  window.location.href = "https://www.google.com"; */
}

// ### EventListener to copy color code to clipboard ### //
function copyToClipboard() {
    event.stopPropagation();
    const div = this;
    const innerDiv = div.querySelector('.grid-item-text');
    navigator.clipboard.writeText(innerDiv.innerHTML);
    console.log('Copied: ' + innerDiv.innerHTML);
  }

// ### Function to toggle sidebar ### //
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const main = document.getElementById('main');
  const colorGrid = document.getElementById('color-grid');

  sidebar.classList.toggle('expanded');
  main.classList.toggle('expanded');
  colorGrid.classList.toggle('expanded');
}

function clickColorCard() {
  const selectedDiv = this;
  const selectedDivId = selectedDiv.id;

  console.log('SelectionStatus: ' + selectionStatus);
  if (selectionStatus === null) {
    selectItem(selectedDiv);
  } else if (selectionStatus === selectedDivId) {
    deselectItem(selectedDivId);
  } else {
    deselectItem(selectionStatus);
    /* await new Promise(r => setTimeout(r, 500)); */
    selectItem(selectedDiv);
  }
}

function selectItem(selectedDiv) {
  selectionStatus = selectedDiv.id;
  selectedDiv.classList.add('selected');
  /* selectedDiv.style.backgroundColor = '#f0f0f0'; */
  selectedDiv.style.border = '0.5vh solid ' + selectedDiv.dataset.value; // Add space for readability
  selectedDiv.style.marginLeft = '0.25vh';
  selectedDiv.style.marginTop = '0.25vh';
  setGridPosition(selectedDiv.id);
  appendInnerDiv(selectedDiv.id,selectedDiv.dataset.value);
}

function deselectItem(selectionStat) {
  const selectedDiv = document.getElementById(selectionStat);
  selectionStatus = null;
  selectedDiv.classList.remove('selected');
  selectedDiv.style.backgroundColor = selectedDiv.dataset.value;
  selectedDiv.style.border = '0px solid ' + selectedDiv.dataset.value;
  selectedDiv.style.marginLeft = '0';
  selectedDiv.style.marginTop = '0';
  resetGridPosition(selectedDiv.id);
  removeInnerDiv(selectedDiv.id);
}

var ItemSpanColumn = 2;
var ItemSpanRow = 2;

function setGridPosition(div) {
  const gridContainer = document.getElementById('color-grid');
  const Viewport = window.innerWidth;
  const gridItem = document.getElementById(div);
  const gap = 0.005 * Viewport; // Consider using CSS for this
  const gridItemSize = 0.05 * Viewport;
  const ItemExpandedColumn = gridItemSize * ItemSpanColumn + gap * (ItemSpanColumn - 2);
  const ItemExpandedRow = gridItemSize * ItemSpanRow + gap * (ItemSpanRow - 2);

  // Calculate grid properties dynamically
  const ContainerWidth = gridContainer.clientWidth; // Use clientWidth
  const ItemWidth = gridItemSize + gap;
  const ItemNumber = parseInt(gridItem.dataset.number); // Ensure numeric

  const itemsPerRow = Math.floor(ContainerWidth / ItemWidth);
  const ItemPositionRow = (ItemNumber - 1) % itemsPerRow + 1; // 1-indexed
  const ItemPositionColumn = Math.floor((ItemNumber - 1) / itemsPerRow) + 1;

  // Move if near the end of the row
  if (ItemPositionRow > itemsPerRow - ItemSpanColumn + 1) {
    const start = document.getElementById('grid-item-' + ((itemsPerRow * ItemPositionColumn) - (ItemSpanColumn - 1)));
    if (start) { // Check if the starting element exists
      gridContainer.insertBefore(gridItem, start);
    }
  }

  // Apply expanded styling
  gridItem.style.gridColumn = 'span ' + ItemSpanColumn;
  gridItem.style.gridRow = 'span ' + ItemSpanRow;
  gridItem.style.width = ItemExpandedColumn + 'px';
  gridItem.style.height = ItemExpandedRow + 'px';
}

function resetGridPosition(div) {
  const gridContainer = document.getElementById('color-grid');
  const gridItem = document.getElementById(div);
  const divNumber = gridItem.dataset.number;
  const followingDiv = document.getElementById('grid-item-' + (parseInt(divNumber) + 1));
  gridContainer.insertBefore(gridItem, followingDiv);

  gridItem.style.gridColumn = 'span 1';
  gridItem.style.gridRow = 'span 1';
  gridItem.style.width = 'calc(var(--grid-item-size) * 1)';
  gridItem.style.height = 'calc(var(--grid-item-size) * 1)';
}

async function switchColorTitle() {
  titleColor();
  await new Promise(r => setTimeout(r, 2000));
  switchColorTitle();
}
//  ### Main function ### //

function main() {
  for (let i = 0; i < numDivs; i++) {
    createAndAppendDiv();
  }
  /* titleColor(); */
  switchColorTitle();
}

//  ### Run main function ### //

document.addEventListener('DOMContentLoaded', main);



// ### Event listener to append more divs when scrolling ### //

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  if (scrollY + viewportHeight >= documentHeight - 100) {
    
    for (let i = 0; i < numDivs; i++) {
      createAndAppendDiv();
    }
  }
});


