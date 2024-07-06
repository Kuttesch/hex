const randomHexColorCode = () => {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return '#' + n.slice(0, 6);
  };


  const randomUniqueHexColorCode = () => {
    const existingColors = new Set(); // Store generated colors
  
    while (true) {
      let n = Math.floor(Math.random() * 0xffffff).toString(16); // Generate hex number
      let color = '#' + n.padStart(6, '0'); // Pad with zeros and add #
  
      if (!existingColors.has(color)) {
        existingColors.add(color); 
        return color; 
      }
    }
  };
  

const gridContainer = document.querySelector('.grid-container');


const numDivs = 2000;


function createAndAppendDiv(container, index) {
  const newDiv = document.createElement('div');
  newDiv.classList.add('grid-item');

  let color = randomUniqueHexColorCode();


  newDiv.dataset.value = color;
  newDiv.style.backgroundColor = color;
  newDiv.onclick = function() {
    var url = new URL('/sub', window.location.href);
    url.hash = this.dataset.value;
    window.location.href = url.toString();
  };


  container.appendChild(newDiv);
}

// Generate the divs
for (let i = 0; i < numDivs; i++) {
  createAndAppendDiv(gridContainer, i);
}

