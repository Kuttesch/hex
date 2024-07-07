//  ### Define Variables ### //

const numDivs = 2000;

//  ### Function to generate random unique hex color code ### //

  const randomUniqueHexColorCode = () => {
    const existingColors = new Set();
  
    while (true) {
      let n = Math.floor(Math.random() * 0xffffff).toString(16);
      let color = '#' + n.padStart(6, '0');
  
      if (!existingColors.has(color)) {
        existingColors.add(color);
        return color; 
      }
      else {
        console.log('Duplicate color found: ' + color);
      }
    }
    
  };
  
//  ### Function to create and append divs ### //

function createAndAppendDiv() {
  const container = document.querySelector('.grid-container');
  const newDiv = document.createElement('div');
    newDiv.classList.add('grid-item');
  let color = randomUniqueHexColorCode();



  newDiv.dataset.value = color;
  newDiv.style.backgroundColor = color;
  newDiv.onclick = function() {
    let url = window.location.href;
     if (url.includes('index.html')) {
      url = url.replace('index.html', `sub${this.dataset.value}`);
    } else {
      url = url + `sub${this.dataset.value}`;
    }
    console.log(url);
    window.location.href = url;
    };


  container.appendChild(newDiv);
}

//  ### Main function ### //

function main() {
  for (let i = 0; i < numDivs; i++) {
    createAndAppendDiv();
  }
}

//  ### Run main function ### //

window.onload = main;

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