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
    // Do something with the hashValue (e.g., store it in localStorage, use it in your logic)
  }


function setTitle(){
    const title = document.getElementById('title');
    const name = getHashValue();
    title.textContent = name;
}


function main() {
  setTitle();
}

main();