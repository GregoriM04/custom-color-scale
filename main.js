/* Dark/Light mode */
const body = document.querySelector("body");
const modeToggle = document.getElementById("light-dark-mode");

let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark") {
  body.classList.toggle("dark");
  modeToggle.setAttribute("src", "./assets/images/sun.svg");
}

modeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    localStorage.setItem("mode", "dark");
    modeToggle.setAttribute("src", "./assets/images/sun.svg");
    closeButton.setAttribute("src", "./assets/images/cross-white.svg");
  } else {
    localStorage.setItem("mode", "light");
    modeToggle.setAttribute("src", "./assets/images/moon.svg");
    closeButton.setAttribute("src", "./assets/images/cross-black.svg");
  }
});

/* Main Functionality */
const exampleColorContainer = document.getElementById("example-colors");
const exampleColors = document.getElementsByClassName("example");
const userInput = document.getElementById("input");
const userColorSelected = document.getElementById("color-selected");
const randomColorsButton = document.getElementById("new-colors");
const colorContainer = document.getElementsByClassName("color-container");
const getScaleSection = document.getElementById("get-scale-section");
const getActualScale = document.getElementById("get-scale");
const closeButton = document.getElementById("close-section");
const shadesContainer = document.getElementById("shades-container");
const cssOption = document.getElementById("css-option");
const tailwindOption = document.getElementById("tailwind-option");
const colorWheelContainer = document.querySelector("#color-wheel-container");
const colorWheelBoxContainer = document.querySelector(
  "#selected-color-box-container"
);
const selectedColorBoxContainer = document.querySelector(
  "#selected-color-box-container"
);
const selectedColorBox = document.querySelector("#selected-color-box");
const selectedColorText = document.querySelector("#selected-color-text");
const colorSelected = document.querySelector("#color-selected");
const copyResult = document.getElementById("copy-result");

// function to generate 64 random vivid colors
function generateVividColors(count = 64) {
  let colors = [];
  let step = 360 / count; // Evenly distribute hues

  for (let i = 0; i < count; i++) {
    let hue = (i * step) % 360; // Ensure hues wrap around
    let hex = hslToHex(hue, 100, 50); // 100% saturation, 50% lightness
    colors.push(hex);
  }

  return colors;
}

// store all the 64 generated
const sixtyFourRandomColors = generateVividColors(64);

// function to get the 64 color options on blocks of 8 and then get a random index from each one
function getRandomIds() {
  let ids = [];

  let counter = 8;
  let start = 0;
  let factor = 8;
  for (let j = 0; j < counter; j += 1) {
    let chunkOfDigits = [];
    for (let i = start; i < factor; i += 1) {
      chunkOfDigits.push(i);
    }

    let randomId = Math.floor(Math.random() * chunkOfDigits.length);
    ids.push(chunkOfDigits[randomId]);

    while (chunkOfDigits.length > 0) {
      chunkOfDigits.pop();
    }
    start = start + 8;
    factor = factor + 8;
  }

  ids = shuffleArray(ids);

  return ids;
}

// function to shuffle the getRandomIds array result
function shuffleArray(array) {
  let curId = array.length;
  // There remain elements to shuffle
  while (0 !== curId) {
    // Pick a remaining element
    let randId = Math.floor(Math.random() * curId);
    curId -= 1;
    // Swap it with the current element.
    let tmp = array[curId];
    array[curId] = array[randId];
    array[randId] = tmp;
  }
  return array;
}

// storing the current opton on display
const currentMoreOptionColor = [];

// Set random colors in "more options" section
function setRandomColors() {
  // removed all previous colors before storing new ones
  while (currentMoreOptionColor.length > 0) {
    currentMoreOptionColor.pop();
  }

  let newIdsToUse = getRandomIds();
  for (let i = 0; i < exampleColors.length; i += 1) {
    let colorToSet = sixtyFourRandomColors[newIdsToUse[i]];
    let colorName = colorToSet.slice(1);
    let textColor = setContrast(hexToRgb(colorToSet));
    exampleColors[i].style.backgroundColor = colorToSet;
    exampleColors[i].innerText = colorName;
    exampleColors[i].style.color = textColor;

    //save all new options externally
    currentMoreOptionColor.push(colorToSet);
  }
}

// function to convert hexcode to rgb code
function hexToRgb(hex) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  let r;
  let g;
  let b;
  if (result) {
    r = parseInt(result[1], 16);
    g = parseInt(result[2], 16);
    b = parseInt(result[3], 16);
  }
  let rgbResult = [r, g, b];

  return rgbResult;
}

// function to change text color based on color brightness
function setContrast(str) {
  let textColor;

  const brightness = Math.round(
    (parseInt(str[0]) * 299 + parseInt(str[1]) * 587 + parseInt(str[2]) * 114) /
      1000
  );

  if (brightness > 125) {
    textColor = "#000000";
  } else {
    textColor = "#FFFFFF";
  }

  return textColor;
}

// function to convert hexcodes to HSL
function hexToHSL(hex) {
  let r = parseInt(hex.substring(1, 3), 16) / 255;
  let g = parseInt(hex.substring(3, 5), 16) / 255;
  let b = parseInt(hex.substring(5, 7), 16) / 255;

  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // No saturation
  } else {
    let d = max - min;
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
    h *= 60;
  }
  return { h, s: s * 100, l: l * 100 };
}

// function to convert HSL to hexcode
function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;
  let c = (1 - Math.abs(2 * l - 1)) * s;
  let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  let m = l - c / 2,
    r,
    g,
    b;

  if (h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

// function to generate the scale with the given color (hexcode)
function generateColorScale(hex, steps = 7) {
  // 7 steps is the sweet spot
  let hsl = hexToHSL(hex);
  let scale = [];

  for (let i = 0; i < steps; i++) {
    let newL = Math.max(
      5,
      Math.min(95, hsl.l + (i - Math.floor(steps / 2)) * 15)
    );
    scale.push(hslToHex(hsl.h, hsl.s, newL));
  }

  return scale;
}

// function to get lighter scale from the given color (hexcode)
function generateLightScale(hex, steps = 5) {
  let hsl = hexToHSL(hex);
  let scale = [];

  // Start from the original lightness and progressively increase it
  let stepSize = (95 - hsl.l) / (steps - 1); // Avoid reaching 100% lightness

  for (let i = 0; i < steps; i++) {
    let newL = Math.min(95, hsl.l + i * stepSize); // Ensure it stays within 95%
    scale.push(hslToHex(hsl.h, hsl.s, newL));
  }

  return scale;
}

// function get darker scale from the given color (hexcode)
function generateDarkScale(hex, steps = 5) {
  let hsl = hexToHSL(hex);
  let scale = [];

  // Start from the original lightness and progressively decrease it
  let stepSize = (hsl.l - 5) / (steps - 1); // Avoid reaching 0% lightness

  for (let i = 0; i < steps; i++) {
    let newL = Math.max(5, hsl.l - i * stepSize); // Ensure it stays within 5%
    scale.push(hslToHex(hsl.h, hsl.s, newL));
  }

  return scale;
}

// function to get all the scales to set
function getAllScales(input) {
  let allScales = [];

  let mainScale = generateColorScale(input, 7);
  let lightScale = generateLightScale(input, 7);
  let darkScale = generateDarkScale(input, 7);
  allScales.push(mainScale, lightScale, darkScale);

  return allScales;
}

// function to set all scales generated
function setAllScales() {
  let scaleToSet = getAllScales(userInput.value);
  let index = 0; // 0-2
  const loop = 3;

  for (let i = 0; i < loop; i += 1) {
    let colorContainerChildren = colorContainer[index].children;
    let divColor = colorContainerChildren;
    for (let j = 0; j < colorContainerChildren.length; j += 1) {
      let colorToUse = scaleToSet[index][j];
      let name = colorToUse.slice(1);
      let textColor = setContrast(hexToRgb(colorToUse));
      divColor[j].style.background = colorToUse;
      divColor[j].innerText = name;
      divColor[j].style.color = textColor;
    }
    index += 1;
  }
}
setAllScales();

// needed to close colorWheel / Canvas when click away
const userSelectionSection = document.querySelector("#user-input");
let tagElements = userSelectionSection.getElementsByTagName("*");
let colorWheelTagNames = ["color-selected"];
for (let i = 0; i < tagElements.length; i += 1) {
  colorWheelTagNames.push(tagElements[i].className);
}

body.addEventListener("click", (e) => {
  let clickTarget = e.target.className;

  let found = colorWheelTagNames.find((element) => element == clickTarget);
  if (found == undefined) {
    colorWheelContainer.style.display = "none";
    selectedColorBoxContainer.style.display = "none";
  }
});

// open the canvas
colorSelected.addEventListener("click", () => {
  colorWheelContainer.style.display = "flex";
  selectedColorBoxContainer.style.display = "flex";
});

// ColorWheel / Canvas
const canvas = document.querySelector("#color-wheel");
const ctx = canvas.getContext("2d");

function drawColorWheel() {
  const radius = canvas.width / 2;
  const image = ctx.createImageData(canvas.width, canvas.height);
  const data = image.data;

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const dx = x - radius;
      const dy = y - radius;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance <= radius) {
        const angle = Math.atan2(dy, dx) + Math.PI;
        const hue = (angle / (2 * Math.PI)) * 360;
        const saturation = distance / radius;
        const rgb = hslToRgb(hue, saturation, 0.5);

        const index = (y * canvas.width + x) * 4;
        data[index] = rgb[0]; // Red
        data[index + 1] = rgb[1]; // Green
        data[index + 2] = rgb[2]; // Blue
        data[index + 3] = 255; // Alpha
      }
    }
  }

  ctx.putImageData(image, 0, 0);
}

// call it to draw the colorWheel before is needed
drawColorWheel();

function hslToRgb(h, s, l) {
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // Achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h / 360 + 1 / 3);
    g = hue2rgb(p, q, h / 360);
    b = hue2rgb(p, q, h / 360 - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function getColorAtPosition(x, y) {
  const pixel = ctx.getImageData(x, y, 1, 1).data;
  return `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
}

function rgbToHex(rgb) {
  const result = rgb
    .match(/\d+/g)
    .map((num) => parseInt(num).toString(16).padStart(2, "0"));
  return `#${result.join("")}`;
}

//storing current color before selecting any new one
let currentDisplayedColor = userInput.value;

canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const color = getColorAtPosition(x, y);

  const newColor = rgbToHex(color);
  userInput.value = newColor;
  colorSelected.style.background = newColor;
  setAllScales();

  // close colorWheel when color is selected
  colorWheelContainer.style.display = "none";
  selectedColorBoxContainer.style.display = "none";

  // Avoid clicking outside the wheel
  if (color !== "rgb(0, 0, 0)") {
    selectedColorBox.style.backgroundColor = color;
    selectedColorText.value = rgbToHex(color);
  }
});

// event to set new colors while hovering the colorWheel
canvas.addEventListener("mousemove", (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const color = getColorAtPosition(x, y);

  // Avoid clicking outside the wheel
  if (color !== "rgb(0, 0, 0)") {
    const newColor = rgbToHex(color);
    selectedColorBox.style.backgroundColor = newColor;
    colorSelected.style.backgroundColor = newColor;
    selectedColorText.innerText = newColor;
  }
});

// set new color examples in 'more options' section
document.addEventListener("DOMContentLoaded", () => {
  setRandomColors();
  userColorSelected.style.background = userInput.value;
});

randomColorsButton.addEventListener("click", () => {
  setRandomColors();
});

// set selected example option to the scale
exampleColorContainer.addEventListener("click", (event) => {
  if (event.target.id != "example-colors") {
    // prevent invalid selection
    let colorSelected = event.target.id;
    let index = colorSelected.slice(-1);

    userInput.value = currentMoreOptionColor[index - 1];
    userColorSelected.style.background = currentMoreOptionColor[index - 1];
    selectedColorText.innerText = currentMoreOptionColor[index - 1];
    setAllScales();
  }
});

// set manual color added via the input
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    userColorSelected.style.background = userInput.value;
    selectedColorText.innerText = userInput.value;
    setAllScales();
  }
});

// get new scale from random color when 'Spacebar' is press
window.addEventListener("keypress", (e) => {
  let randomId = Math.floor(Math.random() * 64);
  let newRandomColorToSet = sixtyFourRandomColors[randomId];

  if (e.key === " " || e.key === "Spacebar") {
    e.preventDefault();
    userInput.value = newRandomColorToSet;
    userColorSelected.style.background = newRandomColorToSet;
    setAllScales();
  }
});

// adding event listener to each color of the scales
for (let i = 0; i < colorContainer.length; i += 1) {
  for (let j = 0; j < 7; j += 1) {
    let variable = colorContainer[i].children[j];
    variable.addEventListener("click", (e) => {
      let name = "#" + e.target.innerText;
      navigator.clipboard.writeText(name); // copy target color to the clipboard

      // set a "copied" feedback text when clicked
      let colorText = e.target.innerText;
      e.target.innerText = "Copied!";
      setTimeout(() => {
        e.target.innerText = colorText;
      }, 1500);
    });
  }
}

// close the copy modal when click outside of it
getScaleSection.addEventListener("click", (e) => {
  if (e.target.classList == "get-scale-section") {
    getScaleSection.style.visibility = "hidden";
  }
});

// show the copy modal
getActualScale.addEventListener("click", () => {
  getScaleSection.style.visibility = "visible";
  printOptionSelected("css");
});

// close the copy modal click the x
closeButton.addEventListener("click", () => {
  getScaleSection.style.visibility = "hidden";
});

// showing the option selected (css default)
cssOption.addEventListener("click", () => {
  if (!cssOption.classList.contains("active-option")) {
    cssOption.classList.add("active-option");
    tailwindOption.classList.remove("active-option");
  }
  printOptionSelected("css");
});

// print the tailwind option when requested
tailwindOption.addEventListener("click", () => {
  if (!tailwindOption.classList.contains("active-option")) {
    tailwindOption.classList.add("active-option");
    cssOption.classList.remove("active-option");
  }
  printOptionSelected("tailwind");
});

copyResult.addEventListener("click", () => {
  let allScalesGenerated = getToCopy();

  if (cssOption.classList.contains("active-option")) {
    navigator.clipboard.writeText(allScalesGenerated[0].join(""));
  } else {
    navigator.clipboard.writeText(allScalesGenerated[1].join(""));
  }
  copyResult.innerText = "Done!";
  setTimeout(() => {
    copyResult.innerText = "Copy Result";
  }, 2000);
});

// function to print the scale to copy
function getToCopy() {
  let allScalesGenerated = getAllScales(userInput.value);
  let mainScaleGenerated = allScalesGenerated[0];
  let css = [];
  let tailwind = [];
  let scales = [];
  let shade = 700;

  mainScaleGenerated.forEach((color) => {
    css.push(`.color-shade-${shade} {background-color: ${color};}`);
    tailwind.push(`--color-shade-${shade}: ${color};`);
    shade = shade - 100;
  });

  scales.push(css, tailwind);

  return scales;
}

// function to print option (css and tailwind) types
function printOptionSelected(type = "str") {
  while (shadesContainer.childNodes.length > 0) {
    shadesContainer.removeChild(shadesContainer.firstChild);
  }

  let shadesToPrint = getToCopy();
  let allCssPrint;
  if (type === "css") {
    allCssPrint = shadesToPrint[0];
  } else if (type === "tailwind") {
    allCssPrint = shadesToPrint[1];
  }

  allCssPrint.forEach((shade) => {
    let pTag = document.createElement("p");
    pTag.innerText = shade;
    pTag.classList.add("shades-container-p");
    shadesContainer.prepend(pTag);
  });
}
