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

let isHandSelected = false;
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
};

function endDraw(e) {
  if (!isPenActive && !isErasing) return;
  isPainting = false;

  const { minX, minY, maxX, maxY } = calcBoundary(currentCurve);
  console.log(minX, minY, maxX, maxY);
  curves.push({ id: Date.now(), currentCurve, minX, minY, maxX, maxY });

  console.log(curves);
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

handTool.addEventListener("click", function (e) {
  isPenActive = false;
  isErasing = false;
  if (isHandSelected) {
    return;
  }
  canvas.addEventListener("click", function (e) {
    console.log(e.clientX, e.clientY);
    curves.map((c) => {
      console.log(c)
      if (c.minX < e.clientX < c.maxX && c.minY < e.clientY < c.maxY) {
        drawBoundingBox(c.minX, c.minY, c.maxX, c.maxY);
      }
    });
  });

  isHandSelected = !isHandSelected;
  handTool.style.backgroundColor = "red";
});

function calcBoundary(curve) {
  let minX = Math.min(...curve.map((c) => c.x));
  let minY = Math.min(...curve.map((c) => c.y));
  let maxX = Math.max(...curve.map((c) => c.x));
  let maxY = Math.max(...curve.map((c) => c.y));
  return { minX, minY, maxX, maxY };
}
function drawBoundingBox( minX, minY, maxX, maxY ) {  
  ctx.strokeStyle = "red";
  ctx.lineWidth = 2;
  ctx.strokeRect(minX, minY, maxX - minX, maxY - minY);
  ctx.strokeStyle = "black"; // Reset to default
}

// penTool
penTool.addEventListener("click", function (e) {
  e.stopPropagation();
  isErasing = false;
  isHandSelected = false;
  document.body.classList.remove("eraser__default");
  document.body.classList.add("pen__default");

  slider.style.display = "block"; //displays only when penTool is selected

  if (isPenActive) {
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
  isHandSelected = false;
  slider.style.display = "block"; //displays when color is selected
});

// eraserButton
eraserButton.addEventListener("click", function () {
  isPenActive = false;
  isHandSelected = false;
  document.body.classList.remove("pen__default");
  document.body.classList.add("eraser__default");
  slider.style.display = "block"; //displays only when eraserTool is selected
  if (isErasing) {
    return;
  }
  slider.value = eraserWidth;
  isErasing = !isErasing;
});

// change the linewidth using mouse scroll wheel
canvas.onwheel = (e) => {
  if (isPenActive) {
    if (e.deltaY >= 0) {
      lineWidth = Math.max(1, lineWidth - 5);
    } else {
      lineWidth = Math.min(80, lineWidth + 5);
    }
    slider.value = lineWidth;
  }
  if (isErasing) {
    if (e.deltaY >= 0) {
      eraserWidth = Math.max(1, eraserWidth - 5);
    } else {
      eraserWidth = Math.min(80, eraserWidth + 5);
    }
    slider.value = eraserWidth;
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

slider.oninput = function () {
  if (isPenActive) {
    lineWidth = this.value;
  }
  if (isErasing) {
    eraserWidth = this.value;
  }
};
