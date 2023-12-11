const canvas = document.getElementById("drawing-board");
const toolbar = document.getElementById("toolbar");
const ctx = canvas.getContext("2d");
let eraserButton = document.getElementById("eraser");
const penTool = document.getElementById("pen");
const handTool = document.getElementById("hand");
const colorPickerTool = document.getElementById("color-picker");
const slider = document.getElementById("sliderRange");

slider.style.display = "none"; 



const canvasOffsetX = 0;
const canvasOffsetY = 0;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let isErasing = false;
let isPenActive = false;


let lineWidth = 5;
let eraserWidth = 5;

let startX;
let startY;

let currentCurve = []; // To store points of the current curve

const curves = []; // To store all curves drawn

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

toolbar.addEventListener("click", (e) => {
  if (e.target.id === "clear") {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    curves.length = 0; // Clear the curves array when canvas is cleared
  }
});

toolbar.addEventListener("change", (e) => {
  if (e.target.id === "color-picker") {
    ctx.strokeStyle = e.target.value;
  }

  if (e.target.id === "linewidth") {
    lineWidth = parseInt(e.target.value);
  }
});

function startDraw(e) {
  if (!isPenActive && !isErasing) return;
  isPainting = true;
  const { clientX, clientY } = e.touches ? e.touches[0] : e;
  startX = e.clientX;
  startY = e.clientY;
  currentCurve = [];
  currentCurve.push({
    x: startX - canvasOffsetX,
    y: startY - canvasOffsetY,
  });
  console.log("startdraw");
  console.log(e.touches);
}

const draw = (e) => {
  if (!isPainting) {
    return;
  }
  if (isErasing) {
    const { clientX, clientY } = e.touches ? e.touches[0] : e;
    ctx.globalCompositeOperation = "destination-out"; // Set the composite operation for erasing
    ctx.beginPath();
    ctx.arc(
      clientX - canvasOffsetX,
      clientY - canvasOffsetY,
      eraserWidth / 2,
      0,
      Math.PI * 2,
      false
    );
    ctx.fill();
  } else {
    const { clientX, clientY } = e.touches ? e.touches[0] : e;
    ctx.globalCompositeOperation = "source-over";
    ctx.lineWidth = lineWidth;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(startX - canvasOffsetX, startY - canvasOffsetY);
    ctx.bezierCurveTo(
      startX - canvasOffsetX + 0.25,
      startY - canvasOffsetY + 0.25,
      clientX - canvasOffsetX - 0.25,
      clientY - canvasOffsetY - 0.25,
      clientX - canvasOffsetX,
      clientY - canvasOffsetY
    );
    ctx.stroke();

    currentCurve.push({
      x: clientX - canvasOffsetX,
      y: clientY - canvasOffsetY,
    });

    startX = clientX - canvasOffsetX;
    startY = clientY - canvasOffsetY;
  }
  console.log("drawing");
};

function endDraw(e) {
  if (!isPenActive && !isErasing) return;
  isPainting = false;
  curves.push(currentCurve);
  console.log(curves);
  console.log("enddraw");
}
canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("touchstart", startDraw);

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("touchmove", draw);
canvas.addEventListener("mouseup", endDraw);
canvas.addEventListener("touchend", endDraw);

// to remove last drawn element
document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.key === "z") {
    event.preventDefault();
    if (curves.length > 0) {
      curves.pop();
      redrawCanvas();
    }
  }
});

function redrawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  curves.forEach((curve) => {
    ctx.beginPath();
    curve.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });
    ctx.stroke();
  });
}

penTool.addEventListener("click", function (e) {
  e.stopPropagation();
  isErasing = false;
  document.body.classList.remove("eraser__default");
  document.body.classList.add("pen__default");

  slider.style.display = "block"; //displays only when penTool is selected
  

  if (isPenActive) {
    
    console.log(isPenActive)
    
    
    return;
  }
  slider.value = lineWidth;

  isPenActive = !isPenActive;
});

colorPickerTool.addEventListener("click", function (e) {
  document.body.classList.remove("eraser__default");
  document.body.classList.add("pen__default");
  isPenActive = true;
  isErasing = false;
  slider.style.display = "block"; //displays when color is selected
});

eraserButton.addEventListener("click", function () {
  isPenActive = false;
  document.body.classList.remove("pen__default");
  document.body.classList.add("eraser__default");
  slider.style.display = "block"; //displays only when eraserTool is selected
  if (isErasing) {
    
    return;
  }
  slider.value=eraserWidth
  isErasing = !isErasing;
});

// change the linewidth using mouse scroll wheel
canvas.onwheel = (e) => {
  if (isPenActive) {
    console.log(e);
    if (e.deltaY >= 0) {
      lineWidth = Math.max(1, lineWidth - 5);
      
    } else {
      lineWidth = Math.min(80, lineWidth + 5);
    }
    slider.value = lineWidth
  }
  if (isErasing) {
    console.log(e);
    if (e.deltaY >= 0) {
      eraserWidth = Math.max(1, eraserWidth - 5);
    } else {
      eraserWidth = Math.min(80, eraserWidth + 5);
    }
    slider.value = eraserWidth
  }
};

// to save the canvas in png format
function saveCanvas() {
  // Convert the canvas content to an image data URL
  const dataURL = canvas.toDataURL("image/png");

  // Create a temporary link element
  const link = document.createElement("a");
  link.download = "canvas_image.png"; // Set the file name
  link.href = dataURL; // Set the data URL as the href attribute

  // Append the link to the body
  document.body.appendChild(link);

  // Simulate a click on the link to trigger the download
  link.click();

  // Remove the link from the body
  document.body.removeChild(link);
}


// slider js


slider.oninput = function() {
  if (isPenActive){
    lineWidth = this.value
  
  }
  if(isErasing){
    eraserWidth = this.value
  }
};