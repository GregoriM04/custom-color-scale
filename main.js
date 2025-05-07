/* Main Functionality */
const exampleColorContainer = document.getElementById("example-colors");
const exampleColors = document.getElementsByClassName("example");
const userInput = document.getElementById("input");
const moreColors = document.getElementById("more-colors");
const userColorSelected = document.getElementById("color-selected");
const newColorsButton = document.getElementById("new-colors");
const colorContainerDivs = document.querySelectorAll(".color-container div");
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
const copyScaleContainer = document.querySelector(".copy-scale-container");
const shadeContainer = document.querySelector(".shades-container");
const shadeContainerPtags = document.querySelectorAll(".shades-container p");
const pictureGradient = document.querySelector(".picture-gradient");
const demoPersonName = document.querySelector(".demo-person-name");
const gamepadGradient = document.querySelector(".gamepad-gradient");
const gpGd = document.querySelector(".gp-gd");
const demoGamepadText = document.querySelector(".demo-gamepad-text");
const shopBtn = document.querySelector(".shop-btn");
const demoCardThree = document.querySelector(".demo-card-3");
const demoDate = document.querySelector(".demo-date");
const timelines = document.querySelectorAll(".timelines");
const timelinesInfoPtags = document.querySelectorAll(".info p");
const timelinesInfoDivtags = document.querySelectorAll(".options div");
const demoUserProfile = document.querySelector(".demo-user-profile");
const demoCardFour = document.querySelector(".demo-card-4");
const demoUserBanner = document.querySelector(".demo-user-banner");
const profilePictureImg = document.querySelector(".profile-picture-img");
const profilePictureP = document.querySelectorAll(".profile-information p");
const userFollowBtn = document.querySelector(".user-follow-btn");
const demoExpense = document.querySelector(".demo-expense");
const chart = document.querySelector(".chart");
const centerText = document.querySelector(".center-text");
const circle = document.querySelector(".circle");
const legendColor = document.querySelector(".legend-color");
const tech = document.querySelector(".tech");
const household = document.querySelector(".household");
const travel = document.querySelector(".travel");
const demoCardSix = document.querySelector(".demo-card-6");
const demoBtn1 = document.querySelector(".btn-1");
const demoBtn2 = document.querySelector(".btn-2");
const demoBtn3 = document.querySelector(".btn-3");
const demoBtn4 = document.querySelector(".btn-4");
const demoBtn5 = document.querySelector(".btn-5");
const demoCardSeven = document.querySelector(".demo-card-7");
const demoCareerSelector = document.querySelector(".demo-career-selector");
const radioInputLabel = document.querySelectorAll(".radio-input label");
const careerWrapperP = document.querySelectorAll(".career-wrapper p");
const careerName = document.querySelector(".career-name");
const careerDescription = document.querySelector(".career-description");
const demoPlanCard = document.querySelector(".demo-plan-card");
const planTitle = document.querySelector(".plan-title");
const planPrice = document.querySelector(".plan-price");
const planDescription = document.querySelector(".plan-description");
const planBtn = document.querySelector(".plan-btn");
const footerSectionWrapper = document.querySelector(".footer-section-wrapper");
const heartIcon = document.querySelector(".heart-icon");
const footerText = document.querySelectorAll(".footer-text *");
const githubIcon = document.querySelector("#github-icon");

/* Dark/Light mode */
const body = document.querySelector("body");
const modeToggle = document.getElementById("light-dark-mode");
let getMode = localStorage.getItem("mode");

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

  let numberOfNewColors = 8;

  let newIdsToUse = getRandomIds();
  for (let i = 0; i < numberOfNewColors; i += 1) {
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
  let hsl = hexToHSL(hex);
  let start = [];
  let finish = [];
  let scale = [];

  // Start from the original lightness and progressively increase it
  let stepSizeTop = (95 - hsl.l) / (steps - 1); // Avoid reaching 100% lightness

  for (let i = 0; i < steps; i++) {
    let newL = Math.min(95, hsl.l + i * stepSizeTop); // Ensure it stays within 95%
    start.unshift(hslToHex(hsl.h, hsl.s, newL));
  }

  // Start from the original lightness and progressively decrease it
  let stepSizeBottom = (hsl.l - 5) / (steps - 1); // Avoid reaching 0% lightness

  for (let i = 0; i < steps; i++) {
    let newL = Math.max(5, hsl.l - i * stepSizeBottom); // Ensure it stays within 5%
    finish.push(hslToHex(hsl.h, hsl.s, newL));
  }

  // removed last element to avoid having the same value twice
  start.pop();

  // store both arrays in a single
  start.forEach((element) => {
    scale.push(element);
  });

  finish.forEach((element) => {
    scale.push(element);
  });

  return scale;
}

// THIS IS THE LINE THAT GENERATE SCALE WITH THE GIVEN INPUT
let currentPalette;

// function to set all scales generated
function setAllScales() {
  let scaleToSet = generateColorScale(userInput.value, 7);
  currentPalette = scaleToSet.slice(); // external storage
  for (let i = 0; i < scaleToSet.length; i += 1) {
    let divColor = colorContainerDivs[i];
    let bgColor = scaleToSet[i];
    let divName = bgColor.substring(1);
    let textColor = setContrast(hexToRgb(bgColor));
    divColor.style.background = bgColor;
    divColor.innerText = divName;
    divColor.style.color = textColor;
  }

  if (body.className === "dark") {
    setDemoColors("dark");
  } else {
    setDemoColors("light");
  }
}
setAllScales();

// function to set colors on demo section
function setDemoColors(str) {
  if (str === "light") {
    gamepadGradient.style.backgroundColor = `${currentPalette[0]}`;
    gpGd.style.background = `radial-gradient(circle farthest-corner at 60px 45px,${currentPalette[6]}, ${currentPalette[0]} 80%)`;
    demoGamepadText.style.color = `${currentPalette[12]}`;
    shopBtn.style.color = `${currentPalette[0]}`;
    shopBtn.style.backgroundColor = `${currentPalette[12]}`;
    demoCardThree.style.border = `1px solid ${currentPalette[11]}`;
    demoCardThree.style.backgroundColor = `${currentPalette[10]}`;
    demoDate.style.color = `${currentPalette[0]}`;
    timelines.forEach((element) => {
      element.style.borderLeft = `8px solid ${currentPalette[6]}`;
      element.style.backgroundColor = `${currentPalette[1]}`;
    });
    timelinesInfoPtags.forEach((element) => {
      element.style.color = `${currentPalette[12]}`;
    });
    timelinesInfoDivtags.forEach((element) => {
      element.style.color = `${currentPalette[12]}`;
    });
    demoCardFour.style.border = `1px solid ${currentPalette[1]}`;
    demoUserBanner.style.background = `linear-gradient(135deg, #0000 18.75%, ${currentPalette[4]} 0 31.25%, #0000 0), repeating-linear-gradient(45deg, ${currentPalette[4]} -6.25% 6.25%, ${currentPalette[8]} 0 18.75%)`;
    demoUserBanner.style.backgroundSize = `66px 66px`;
    profilePictureImg.style.border = `5px solid #fff`;
    profilePictureP.forEach((element) => {
      element.style.color = `${currentPalette[11]}`;
    });
    userFollowBtn.style.backgroundColor = `${currentPalette[11]}`;
    userFollowBtn.style.color = `${currentPalette[0]}`;
    demoExpense.style.backgroundColor = `${currentPalette[0]}`;
    centerText.style.color = `${currentPalette[11]}`;
    chart.style.setProperty("--bg-color", `${currentPalette[0]}`);
    circle.style.background = ` conic-gradient(
    ${currentPalette[2]} 0% 33.33%,
    ${currentPalette[7]} 33.33% 66.66%,
    ${currentPalette[10]} 66.66% 100%
    )`;
    legendColor.style.color = `${currentPalette[12]}`;
    tech.style.backgroundColor = `${currentPalette[2]}`;
    household.style.backgroundColor = `${currentPalette[7]}`;
    travel.style.backgroundColor = `${currentPalette[10]}`;
    demoCardSix.style.border = `1px solid ${currentPalette[0]}`;
    demoCardSix.style.backgroundColor = `${currentPalette[0]}`;
    demoBtn1.style.backgroundColor = `${currentPalette[4]}`;
    demoBtn1.style.color = `${currentPalette[0]}`;
    demoBtn2.style.backgroundColor = `${currentPalette[6]}`;
    demoBtn2.style.color = `${currentPalette[0]}`;
    demoBtn3.style.backgroundColor = `${currentPalette[7]}`;
    demoBtn3.style.color = `${currentPalette[0]}`;
    demoBtn4.style.backgroundColor = `${currentPalette[0]}`;
    demoBtn4.style.color = `${currentPalette[8]}`;
    demoBtn4.style.border = `2px solid ${currentPalette[8]}`;
    demoBtn5.style.backgroundColor = `${currentPalette[1]}`;
    demoBtn5.style.color = `${currentPalette[4]}`;
    demoCardSeven.style.border = `1px solid ${currentPalette[1]}`;
    demoCardSeven.style.backgroundColor = `#ffffff`;
    demoCareerSelector.style.backgroundColor = "#ffffff";
    radioInputLabel.forEach((element) => {
      element.style.setProperty("--b-color", `${currentPalette[4]}`);
      element.style.setProperty("--bh-color", `${currentPalette[1]}`);
      element.style.setProperty("--bgc-color", `${currentPalette[0]}`);
      element.style.setProperty("--bc-color", `${currentPalette[6]}`);
    });
    footerSectionWrapper.style.border = `2px solid ${currentPalette[6]}`;
    footerSectionWrapper.style.backgroundColor = `${currentPalette[0]}`;
    heartIcon.style.backgroundColor = `${currentPalette[6]}`;
    footerText.forEach((element) => {
      element.style.color = `${currentPalette[12]}`;
    });

    careerWrapperP.forEach((element) => {
      element.style.color = `${currentPalette[12]}`;
    });
    githubIcon.style.backgroundColor = "transparent";
    copyScaleContainer.style.border = `1px solid ${currentPalette[12]}`;
    shadeContainer.style.backgroundColor =  `${currentPalette[0]}`;
    shadeContainerPtags.forEach(element => {
      element.style.color = `${currentPalette[12]}`;
    });
    copyResult.style.color = `${currentPalette[12]}`;
    copyResult.style.backgroundColor = `${currentPalette[2]}`;

  } else if (str === "dark") {
    gamepadGradient.style.backgroundColor = `${currentPalette[10]}`;
    gpGd.style.background = `radial-gradient(circle farthest-corner at 60px 45px,${currentPalette[3]}, ${currentPalette[10]} 80%)`;
    demoGamepadText.style.color = `${currentPalette[0]}`;
    shopBtn.style.color = `${currentPalette[11]}`;
    shopBtn.style.backgroundColor = `${currentPalette[1]}`;
    demoCardThree.style.border = `1px solid ${currentPalette[10]}`;
    demoCardThree.style.backgroundColor = `${currentPalette[12]}`;
    demoDate.style.color = `${currentPalette[0]}`;
    timelines.forEach((element) => {
      element.style.borderLeft = `8px solid ${currentPalette[6]}`;
      element.style.backgroundColor = `${currentPalette[10]}`;
    });
    timelinesInfoPtags.forEach((element) => {
      element.style.color = `${currentPalette[0]}`;
    });
    timelinesInfoDivtags.forEach((element) => {
      element.style.color = `${currentPalette[1]}`;
    });
    demoCardFour.style.border = `1px solid ${currentPalette[10]}`;
    demoUserBanner.style.background = `linear-gradient(135deg, #0000 18.75%, ${currentPalette[8]} 0 31.25%, #0000 0), repeating-linear-gradient(45deg, ${currentPalette[8]} -6.25% 6.25%, ${currentPalette[4]} 0 18.75%)`;
    demoUserBanner.style.backgroundSize = `66px 66px`;
    profilePictureImg.style.border = `5px solid ${currentPalette[12]}`;
    profilePictureP.forEach((element) => {
      element.style.color = `${currentPalette[0]}`;
    });
    userFollowBtn.style.backgroundColor = `${currentPalette[8]}`;
    userFollowBtn.style.color = `${currentPalette[0]}`;
    demoExpense.style.backgroundColor = `${currentPalette[10]}`;
    centerText.style.color = `${currentPalette[0]}`;
    chart.style.setProperty("--bg-color", `${currentPalette[10]}`);
    circle.style.background = ` conic-gradient(
    ${currentPalette[4]} 0% 33.33%,
    ${currentPalette[8]} 33.33% 66.66%,
    ${currentPalette[2]} 66.66% 100%
    )`;
    legendColor.style.color = `${currentPalette[0]}`;
    tech.style.backgroundColor = `${currentPalette[4]}`;
    household.style.backgroundColor = `${currentPalette[8]}`;
    travel.style.backgroundColor = `${currentPalette[2]}`;
    demoCardSix.style.border = `1px solid ${currentPalette[2]}`;
    demoCardSix.style.backgroundColor = `${currentPalette[12]}`;
    demoBtn1.style.backgroundColor = `${currentPalette[4]}`;
    demoBtn1.style.color = `${currentPalette[0]}`;
    demoBtn2.style.backgroundColor = `${currentPalette[6]}`;
    demoBtn2.style.color = `${currentPalette[0]}`;
    demoBtn3.style.backgroundColor = `${currentPalette[8]}`;
    demoBtn3.style.color = `${currentPalette[0]}`;
    demoBtn4.style.backgroundColor = `${currentPalette[12]}`;
    demoBtn4.style.color = `${currentPalette[8]}`;
    demoBtn4.style.border = `2px solid ${currentPalette[8]}`;
    demoBtn5.style.backgroundColor = `${currentPalette[9]}`;
    demoBtn5.style.color = `${currentPalette[4]}`;
    demoCardSeven.style.border = `1px solid ${currentPalette[10]}`;
    demoCardSeven.style.backgroundColor = `${currentPalette[12]}`;
    demoCareerSelector.style.backgroundColor = `${currentPalette[12]}`;
    radioInputLabel.forEach((element) => {
      element.style.setProperty("--b-color", `${currentPalette[10]}`);
      element.style.setProperty("--bh-color", `${currentPalette[9]}`);
      element.style.setProperty("--bgc-color", `${currentPalette[12]}`);
      element.style.setProperty("--bc-color", `${currentPalette[6]}`);
    });
    careerWrapperP.forEach((element) => {
      element.style.color = `${currentPalette[0]}`;
    });
    footerSectionWrapper.style.border = `2px solid ${currentPalette[4]}`;
    footerSectionWrapper.style.backgroundColor = `${currentPalette[12]}`;
    heartIcon.style.backgroundColor = `${currentPalette[6]}`;
    footerText.forEach((element) => {
      element.style.color = `${currentPalette[0]}`;
    });
    githubIcon.style.backgroundColor = `${currentPalette[0]}`;
    copyScaleContainer.style.border = `1px solid ${currentPalette[2]}`;
    shadeContainer.style.backgroundColor =  `${currentPalette[11]}`;
    shadeContainerPtags.forEach(element => {
      element.style.color = `${currentPalette[0]}`;
    });
    copyResult.style.color = `${currentPalette[0]}`;
    copyResult.style.backgroundColor = `${currentPalette[12]}`;
  }
  userInput.style.border = `1px solid ${currentPalette[6]}`;
  userInput.style.setProperty("--outline-focus", `${currentPalette[6]}`);
  pictureGradient.style.backgroundImage = `linear-gradient(to top, ${currentPalette[11]} 0%, transparent)`;
  demoPersonName.style.color = `${currentPalette[0]}`;

  demoPlanCard.style.background = `linear-gradient(45deg, ${currentPalette[11]} 0%, ${currentPalette[8]} 100%)`;
  planTitle.style.color = `${currentPalette[0]}`;
  planDescription.style.color = `${currentPalette[1]}`;
  planBtn.style.backgroundColor = `${currentPalette[5]}`;
  planBtn.style.color = `${currentPalette[0]}`;
}

// needed to close colorWheel / Canvas when click away
const userSelectionSection = document.querySelector("#user-input");
let tagElements = userSelectionSection.getElementsByTagName("*");
let colorWheelTagNames = ["color-selected"];
for (let i = 0; i < tagElements.length; i += 1) {
  colorWheelTagNames.push(tagElements[i].className);
}

body.addEventListener("click", (element) => {
  let clickTarget = element.target.className;

  let found = colorWheelTagNames.find((tag) => tag == clickTarget);
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
  let startColor = currentMoreOptionColor[0];
  userColorSelected.style.background = startColor;
  userInput.value = startColor;
  setAllScales();
});

newColorsButton.addEventListener("click", () => {
  setRandomColors();
});

// set selected example option to the scale
exampleColorContainer.addEventListener("click", (event) => {
  if (event.target.id != "example-colors" && event.target.id != "new-colors") {
    // prevent invalid selection
    let colorSelected = event.target.id;
    let index = colorSelected.slice(-1);

    userInput.value = currentMoreOptionColor[index - 1];
    userColorSelected.style.background = currentMoreOptionColor[index - 1];
    selectedColorText.innerText = currentMoreOptionColor[index - 1];
    exampleColorContainer.style.visibility = "hidden";
    setAllScales();
  }
});

// set manual color added via the input
userInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    userColorSelected.style.background = userInput.value;
    selectedColorText.innerText = userInput.value;
    setAllScales();
  }
});

// get new scale from random color when 'Spacebar' is press
window.addEventListener("keypress", (event) => {
  let randomId = Math.floor(Math.random() * 64);
  let newRandomColorToSet = sixtyFourRandomColors[randomId];

  if (event.key === " " || event.key === "Spacebar") {
    event.preventDefault();
    userInput.value = newRandomColorToSet;
    userColorSelected.style.background = newRandomColorToSet;
    setAllScales();
  }
});

// open modeColors modal
moreColors.addEventListener("click", () => {
  exampleColorContainer.style.visibility = "visible";
});

// close moreColors modal when click away
body.addEventListener("click", (e) => {
  if (e.target.id === "more-colors" || e.target.id === "new-colors") {
    exampleColorContainer.style.visibility = "visible";
  } else if (e.target.id !== "example-colors") {
    exampleColorContainer.style.visibility = "hidden";
  }
});

// adding event listener to each color of the scales to copy the color text
colorContainerDivs.forEach((element) => {
  element.addEventListener("click", () => {
    let colorName = element.innerText;
    let hex = "#" + colorName;
    navigator.clipboard.writeText(hex);

    // set feedback text and scale
    element.innerText = "Copied!";
    element.style.scale = "0.92";

    setTimeout(() => {
      element.style.removeProperty("scale");
    }, 400);
    setTimeout(() => {
      element.innerText = colorName;
    }, 1500);
  });
});

// show get-scale/copy modal
getActualScale.addEventListener("click", () => {
  getScaleSection.style.visibility = "visible";
  body.classList.add("stop-scrolling");
  printOptionSelected("css");
});

// close the copy modal when click outside of it
getScaleSection.addEventListener("click", (element) => {
  if (element.target.classList == "get-scale-section") {
    getScaleSection.style.visibility = "hidden";
  }
  body.classList.remove("stop-scrolling");
});

// close the copy modal click the x
closeButton.addEventListener("click", () => {
  getScaleSection.style.visibility = "hidden";
  body.classList.remove("stop-scrolling");
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
  let allScalesGenerated = getColorShades();

  if (cssOption.classList.contains("active-option")) {
    navigator.clipboard.writeText(allScalesGenerated[0].join(""));
  } else {
    navigator.clipboard.writeText(allScalesGenerated[1].join(""));
  }
  copyResult.innerText = "Done!";
  setTimeout(() => {
    copyResult.innerText = "Copy Scale";
  }, 2000);
});

// function to get all color shades from the palette
function getColorShades() {
  let allColorShade = [];
  let tailwind = [];
  let css = [];
  let increment = 50;

  currentPalette.forEach((element) => {
    let cssColorShade = `.color-shade-${increment} {background-color: ${element};}`;
    let tailwindColorShade = `--color-shade-${increment}: ${element};`;
    css.push(cssColorShade);
    tailwind.push(tailwindColorShade);
    increment = increment + 50;
  });

  allColorShade.push(css, tailwind);

  return allColorShade;
}


// function to print option (css and tailwind) types
function printOptionSelected(type = "str") {
  while (shadesContainer.childNodes.length > 0) {
    shadesContainer.removeChild(shadesContainer.firstChild);
  }

  let shadesToPrint = getColorShades();
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
    shadesContainer.append(pTag);
  });
}

// if (getMode && getMode === "dark") {
//   body.classList.toggle("dark");
//   modeToggle.setAttribute("src", "./assets/images/sun.svg");
// }

modeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    localStorage.setItem("mode", "dark");
    modeToggle.setAttribute("src", "./assets/images/sun.svg");
    closeButton.setAttribute("src", "./assets/images/cross-white.svg");
    heartIcon.setAttribute("src", "./assets/images/heart-check-white.svg");
    setDemoColors("dark");
  } else {
    localStorage.setItem("mode", "light");
    modeToggle.setAttribute("src", "./assets/images/moon.svg");
    closeButton.setAttribute("src", "./assets/images/cross-black.svg");
    heartIcon.setAttribute("src", "./assets/images/heart-check-black.svg");
    setDemoColors("light");
  }
});
