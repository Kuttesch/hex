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

 // console.log('createAndAppendDiv() called');

    number++;
    newDiv.classList.add('grid-item');
    newDiv.id = 'grid-item-' + number;
    newDiv.dataset.number = number;
    newDiv.onclick = clickColorCard;
  let color = randomUniqueHexColorCode();

    newDiv.innerHTML = `${number}`;

  newDiv.dataset.value = color;
  newDiv.style.backgroundColor = color;
  container.appendChild(newDiv);
  
}

//  ### Function to change title color ### //

function titleColor() {
  const title = document.getElementById('title');
  title.style.color = randomUniqueHexColorCode();
}

//

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const main = document.getElementById('main');
  const colorGrid = document.getElementById('color-grid');

  sidebar.classList.toggle('expanded');
  main.classList.toggle('expanded');
  colorGrid.classList.toggle('expanded');
}

async function clickColorCard() {
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
  selectedDiv.style.backgroundColor = '#f0f0f0';
  selectedDiv.style.border = '0.5vh solid ' + selectedDiv.dataset.value; // Add space for readability
  selectedDiv.style.marginLeft = '0.25vh';
  selectedDiv.style.marginTop = '0.25vh';
  setGridPosition(selectedDiv.id);
}

function deselectItem(selectionStat) {
  selectedDiv = document.getElementById(selectionStat);
  selectionStatus = null;
  selectedDiv.classList.remove('selected');
  selectedDiv.style.backgroundColor = selectedDiv.dataset.value;
  selectedDiv.style.border = '0px solid ' + selectedDiv.dataset.value;
  selectedDiv.style.marginLeft = '0';
  selectedDiv.style.marginTop = '0';
  resetGridPosition(selectedDiv.id);
}


  function setGridPosition(div) {
    const gridContainer = document.getElementById('color-grid');
    const Viewport = window.innerWidth;
    const gridItem = document.getElementById(div);
    const gap = 0.005 * Viewport; // Consider using CSS for this
    const gridItemSize = 0.05 * Viewport; 
    const ItemExpanded = gridItemSize * 6 + gap * 4; 
  
    // Calculate grid properties dynamically
    const ContainerWidth = gridContainer.clientWidth; // Use clientWidth
    const ItemWidth = gridItemSize + gap;
    const ItemNumber = parseInt(gridItem.dataset.number); // Ensure numeric
  
    const itemsPerRow = Math.floor(ContainerWidth / ItemWidth);
    const ItemPositionRow = (ItemNumber - 1) % itemsPerRow + 1; // 1-indexed
    const ItemPositionColumn = Math.floor((ItemNumber - 1) / itemsPerRow) + 1; 
  
    // Move if near the end of the row
    if (ItemPositionRow > itemsPerRow - 5) {
      const start = document.getElementById('grid-item-' + ((itemsPerRow * ItemPositionColumn) - 5));
      if (start) { // Check if the starting element exists
        gridContainer.insertBefore(gridItem, start);
      } 
    }
  
    // Apply expanded styling
    gridItem.style.gridColumn = 'span 6';
    gridItem.style.width = ItemExpanded + 'px';
    gridItem.style.height = ItemExpanded + 'px';
  }

    function resetGridPosition(div) {
      const gridContainer = document.getElementById('color-grid');
      const gridItem = document.getElementById(div);
      const divNumber = gridItem.dataset.number;
      const followingDiv = document.getElementById('grid-item-' + (parseInt(divNumber) + 1));
      gridContainer.insertBefore(gridItem, followingDiv);
    
      gridItem.style.gridColumn = 'span 1';
      gridItem.style.width = 'calc(var(--grid-item-size) * 1)';
      gridItem.style.height = 'calc(var(--grid-item-size) * 1)';
    }

//  ### Main function ### //

function main() {
  for (let i = 0; i < numDivs; i++) {
    createAndAppendDiv();
  }
  titleColor();
}

//  ### Run main function ### //

window.onload = main;



// ### Event listener to append more divs when scrolling ### //

/* window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  if (scrollY + viewportHeight >= documentHeight - 100) {
    
    for (let i = 0; i < numDivs; i++) {
      createAndAppendDiv();
    }
  }
}); */

