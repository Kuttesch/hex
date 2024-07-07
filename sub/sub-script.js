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

const hashValue = getHashValue();

if (hashValue) {
  console.log("Extracted hash value:", hashValue); 
}

function setTitle(){
  const title = document.getElementById('shade-0');
  const name = getHashValue();
  title.textContent = name;
}

function calculateShade(color, shadeCount, stepMultiplier = 0.6) {
  // Input Validation
  if (!isValidColor(color) || !Number.isInteger(shadeCount) || stepMultiplier <= 0) {
    throw new Error("Invalid input: color must be a valid hex (#rrggbb), shadeCount must be an integer, and stepMultiplier must be a positive number.");
  }

  const step = Math.round((255 * stepMultiplier) / (Math.abs(shadeCount) + 1));
  const amount = shadeCount * step;

  if (shadeCount > 0) {
    return lightenColor(color, amount);
  } else {
    return darkenColor(color, -amount);
  }
}

function isValidColor(color) {
  return /^#[0-9A-F]{6}$/i.test(color);
}

function lightenColor(color, amount) {
  const num = parseInt(color.slice(1), 16);
  const r = Math.min(255, (num >> 16) + amount);
  const g = Math.min(255, ((num >> 8) & 0x00FF) + amount);
  const b = Math.min(255, (num & 0x0000FF) + amount);
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

function darkenColor(color, amount) {
  const num = parseInt(color.slice(1), 16);
  const r = Math.max(0, (num >> 16) - amount);
  const g = Math.max(0, ((num >> 8) & 0x00FF) - amount);
  const b = Math.max(0, (num & 0x0000FF) - amount);
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

function setBackgroundColorAndText(div, color) {
  const divname = document.getElementById(div);
  divname.style.backgroundColor = color;
  divname.textContent = color;
  divname.dataset.value = color.slice(1); // Store the color without the '#'
}

function setShades() {
  const baseColor = '#' + getHashValue();
  setBackgroundColorAndText('shade-4', calculateShade(baseColor, -4));
  setFontColor('shade-4', calculateShade(baseColor, -4));
  setBackgroundColorAndText('shade-3', calculateShade(baseColor, -3));
  setFontColor('shade-3', calculateShade(baseColor, -3));
  setBackgroundColorAndText('shade-2', calculateShade(baseColor, -2));
  setFontColor('shade-2', calculateShade(baseColor, -2));
  setBackgroundColorAndText('shade-1', calculateShade(baseColor, -1));
  setFontColor('shade-1', calculateShade(baseColor, -1));
  setBackgroundColorAndText('shade-0', baseColor);
  setFontColor('shade-0', baseColor);
  setBackgroundColorAndText('shade1', calculateShade(baseColor, 1));
  setFontColor('shade1', calculateShade(baseColor, 1));
  setBackgroundColorAndText('shade2', calculateShade(baseColor, 2));
  setFontColor('shade2', calculateShade(baseColor, 2));
  setBackgroundColorAndText('shade3', calculateShade(baseColor, 3));
  setFontColor('shade3', calculateShade(baseColor, 3));
  setBackgroundColorAndText('shade4', calculateShade(baseColor, 4));
  setFontColor('shade4', calculateShade(baseColor, 4));
}

function calculateRGB(color) {
  var r = parseInt(color.substring(1, 3), 16);
  var g = parseInt(color.substring(3, 5), 16);
  var b = parseInt(color.substring(5, 7), 16);
  return r + ', ' + g + ', ' + b;
}

function calculateHSL(color) {
  // Parse the RGB values from the hex color string
  var r = parseInt(color.substring(1, 3), 16) / 255;
  var g = parseInt(color.substring(3, 5), 16) / 255;
  var b = parseInt(color.substring(5, 7), 16) / 255;

  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // Achromatic (grey)
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  // Convert h, s, l to the appropriate scale
  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return h + ', ' + s + '%, ' + l + '%';
}

function setValues(color) {
  const valueHEX = document.getElementById('value-hex');
  const textHEX = document.getElementById('text-hex');
  const valueRGB = document.getElementById('value-rgb');
  const textRGB = document.getElementById('text-rgb');
  const valueHSL = document.getElementById('value-hsl');
  const textHSL = document.getElementById('text-hsl');

  textHEX.textContent = 'HEX: ' + color;
  valueHEX.dataset.value = color;
  textRGB.textContent = 'RGB(' + calculateRGB(color) + ')';
  valueRGB.dataset.value = 'rgb(' + calculateRGB(color) + ')';
  textHSL.textContent = 'HSL(' + calculateHSL(color) + ')';
  valueHSL.dataset.value = 'hsl(' + calculateHSL(color) + ')';
}

function shadesOnClick(divname) {
  const div = document.getElementById(divname);
  setValues('#' + div.dataset.value);
  console.log('onClick for ' + div.dataset.value);

  setSizeOnClick(divname);
}

function valueOnClick(divname, buttonname) {
  const div = document.getElementById(divname);
  const button = document.getElementById(buttonname);

  navigator.clipboard.writeText(div.dataset.value);

  const value = div.dataset.value;
  button.style.color = value;
  setTimeout(() => {
    button.style.color = "";
  }, 1000);
}

function calculateFontColor(color) {
  const r = parseInt(color.substring(1, 3), 16);
  const g = parseInt(color.substring(3, 5), 16);
  const b = parseInt(color.substring(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness >= 128 ? '#000000' : '#ffffff';
}

function setFontColor(divname, color) {
  const div = document.getElementById(divname);
  div.style.color = calculateFontColor(color);
}

function setSizeOnClick(divname) {
  const focus = document.getElementById(divname);
  focus.position = focus.dataset.position;

  console.log('focus: ' + focus.position);

  for (let i = 1; i < 10; i++) {
    const div = document.getElementsByClassName('shade--' + i)[0];
    div.position = div.dataset.position;
    div.style.width = 45 - Math.abs(div.position - focus.position) + 'vw';

    if (Math.abs(focus.position - div.position) !== 0) {
      div.style.height = '9vh';
      console.log('height: ' + div.style.height);
    } else {
      div.style.height = '10vh';
      console.log('height: ' + div.style.height);
    }

    console.log('position: ' + div.position);
    console.log(Math.abs(div.position - focus.position));
    console.log('width: ' + div.style.width);
  }

  
}

function main() {
  setTitle();
  setShades();
  setValues('#' + getHashValue());
}

main();
