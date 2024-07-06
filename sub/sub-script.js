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
    throw new Error("Ungültige Eingabe: Farbe muss gültiges Hex (#rrggbb) sein, shadeCount eine Ganzzahl und stepMultiplier eine positive Zahl.");
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
  return (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function darkenColor(color, amount) {
  const num = parseInt(color.slice(1), 16);
  const r = Math.max(0, (num >> 16) - amount);
  const g = Math.max(0, ((num >> 8) & 0x00FF) - amount);
  const b = Math.max(0, (num & 0x0000FF) - amount);
  return (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
}



function setBackgroundColorAndText(div,color) {
  divname = document.getElementById(div);
  divname.style.backgroundColor = '#' + color;
  divname.textContent = '#' + color;
}

function setShades(){
  setBackgroundColorAndText('shade-4', calculateShade('#db16ed', -4));
  setBackgroundColorAndText('shade-3', calculateShade('#db16ed', -3));
  setBackgroundColorAndText('shade-2', calculateShade('#db16ed', -2));
  setBackgroundColorAndText('shade-1', calculateShade('#db16ed', -1));
  setBackgroundColorAndText('shade-0', getHashValue());
  setBackgroundColorAndText('shade1', calculateShade('#db16ed', 1));
  setBackgroundColorAndText('shade2', calculateShade('#db16ed', 2));
  setBackgroundColorAndText('shade3', calculateShade('#db16ed', 3));
  setBackgroundColorAndText('shade4', calculateShade('#db16ed', 4));
}

function setValues(){
  
}

function main() {
  setTitle();
  setShades();

}

main();