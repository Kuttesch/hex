//  ### Define Variables ### //

const numDivs = 2000;
let number = 0;
let selectionStatus = false;

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
        console.log('Duplicate color found: ' + color);
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



  newDiv.dataset.value = color;
  newDiv.style.backgroundColor = color;
 /*  newDiv.onclick = function() {
    let url = window.location.href;
     if (url.includes('index.html')) {
      url = url.replace('index.html', `sub${this.dataset.value}`);
    } else {
      url = url + `sub${this.dataset.value}`;
    }
    console.log(url);
    window.location.href = url;
    }; */


  container.appendChild(newDiv);
  
}

//  ### Function to change title color ### //

function titleColor() {
  const title = document.getElementById('title');

  console.log('titleColor() called');

  title.style.color = randomUniqueHexColorCode();
}

//

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const main = document.getElementById('main');
  const colorGrid = document.getElementById('color-grid');

  console.log('toggleSidebar() called');

  sidebar.classList.toggle('expanded');
  main.classList.toggle('expanded');
  colorGrid.classList.toggle('expanded');
}

function clickColorCard() {
  const selectedDiv = document.getElementById(this.id);
  selectedDiv.classList.toggle('selected');
  
  console.log(selectedDiv.dataset.value);
  if (selectionStatus === false) {
    selectionStatus = true;
    console.log('true');
    selectedDiv.style.backgroundColor = '#f0f0f0';
    console.log('BackgroundColor:' + selectedDiv.style.backgroundColor);
    selectedDiv.style.border = '0.5vh solid' + selectedDiv.dataset.value;
    console.log('BorderColor:' + selectedDiv.style.borderColor);
    selectedDiv.style.marginLeft = '0.25vh';
    selectedDiv.style.marginTop = '0.25vh';
    setGridPosition(this.id);

  }
  else if (selectionStatus === true){
    selectionStatus = false;
    console.log('false');
    selectedDiv.style.backgroundColor = selectedDiv.dataset.value;
    console.log('BackgroundColor:' + selectedDiv.style.backgroundColor);
    selectedDiv.style.border = '0px solid' + selectedDiv.dataset.value;
    console.log('BorderColor:' + selectedDiv.style.borderColor);
    selectedDiv.style.marginLeft = '0';
    selectedDiv.style.marginTop = '0';
    selectedDiv.style.gridColumn = 'auto';
    
  }

}

function setGridPosition(div) {
  const gridContainer = document.getElementById('color-grid');
  const Viewport = window.innerWidth;
  const gridItem = document.getElementById(div);
  const gap = 0.005 * Viewport;

  const ContainerWidth = gridContainer.offsetWidth;
  console.log('ContainerWidth:' + ContainerWidth);

  const ItemWidth = gridItem.offsetWidth + gap;
  console.log('DivWidth:' + ItemWidth);

  const ItemNumber = gridItem.dataset.number;
  console.log('DivNumber:' + ItemNumber);

  const RowLenght = Math.round(ContainerWidth / ItemWidth);
  console.log('RowLenght:' + RowLenght);

  let ItemPosition = 0;

  if (ItemNumber % RowLenght === 0) {
    ItemPosition = RowLenght;
    console.log('ItemPosition is Rowlenght:' + ItemPosition);
  } else {
    ItemPosition = ItemNumber % RowLenght;
    console.log('ItemPosition:' + ItemPosition);
  }

  if (ItemPosition < RowLenght - 3) {
    gridItem.style.gridColumn = ItemPosition + '/' + (ItemPosition + 4);
    console.log('gridColumn:' + gridItem.style.gridColumn);
    } else {
      gridItem.style.gridColumn = (ItemPosition - 4) + '/' + ItemPosition;
      console.log('gridColumn:' + gridItem.style.gridColumn);
    }
  

}

//  ### Main function ### //

function main() {
  for (let i = 0; i < numDivs; i++) {
    createAndAppendDiv();
  }
  console.log(number);
  titleColor();
}

//  ### Run main function ### //

window.onload = main;



// ### Event listener to append more divs when scrolling ### //

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  if (scrollY + viewportHeight >= documentHeight - 100) {
    
    console.log('EventListener() scroll event called');
    for (let i = 0; i < numDivs; i++) {
      createAndAppendDiv();
    }
    console.log(number);
  }
});

