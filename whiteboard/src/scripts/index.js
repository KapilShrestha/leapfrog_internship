const canvas = document.getElementById("drawing-board");
const toolbar = document.getElementById("toolbar");
const ctx = canvas.getContext("2d");
let eraserButton = document.getElementById("eraser");
const penTool = document.getElementById("pen");
const handTool = document.getElementById("hand");

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let isErasing = false;
let isPenActive = false;

// let lineWidthInput = document.getElementById("linewidth");
// let lineWidth = parseInt(lineWidthInput.value);

let lineWidth = 5;
let eraserWidth = 5;

let startX;
let startY;

let currentCurve = []; // To store points of the current curve

const curves = []; // To store all curves drawn

toolbar.addEventListener("click", (e) => {
  if (e.target.id === "clear") {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    curves.length = 0; // Clear the curves array when canvas is cleared
  }
});

toolbar.addEventListener("change", (e) => {
  if (e.target.id === "color-picker") {
    isErasing = false;
    ctx.strokeStyle = e.target.value;
  }

  if (e.target.id === "linewidth") {
    lineWidth = parseInt(e.target.value);
  }
});

const draw = (e) => {
  if (!isPainting) {
    return;
  }
  if (isErasing) {
    ctx.globalCompositeOperation = "destination-out"; // Set the composite operation for erasing
    ctx.beginPath();
    ctx.arc(
      e.clientX - canvasOffsetX,
      e.clientY - canvasOffsetY,
      eraserWidth / 2,
      0,
      Math.PI * 2,
      false
    );
    ctx.fill();
  } else {
    ctx.globalCompositeOperation = "source-over";
    ctx.lineWidth = lineWidth;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(startX - canvasOffsetX, startY - canvasOffsetY);
    ctx.bezierCurveTo(
      startX - canvasOffsetX + 0.25,
      startY - canvasOffsetY + 0.25,
      e.clientX - canvasOffsetX - 0.25,
      e.clientY - canvasOffsetY - 0.25,
      e.clientX - canvasOffsetX,
      e.clientY - canvasOffsetY
    );
    ctx.stroke();

    currentCurve.push({
      x: e.clientX - canvasOffsetX,
      y: e.clientY - canvasOffsetY,
    });

    startX = e.clientX;
    startY = e.clientY;
  }
};

function startDraw(e) {
  if (!isPenActive && !isErasing) return;
  isPainting = true;
  startX = e.clientX;
  startY = e.clientY;
  currentCurve = [];
  currentCurve.push({
    x: startX - canvasOffsetX,
    y: startY - canvasOffsetY,
  });
}

function endDraw(e) {
  if (!isPenActive && !isErasing) return;
  isPainting = false;
  curves.push(currentCurve);
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

penTool.addEventListener("click", function (e) {
  e.stopPropagation();
  isErasing = false;
  document.body.classList.remove("eraser__default");
  document.body.classList.add("pen__default");
  if (isPenActive) {
    return;
  }

  isPenActive = !isPenActive;
});

eraserButton.addEventListener("click", function () {
  // lineWidth += 20; //makes the eraser more wider than the current lineWidth
  isPenActive = false;
  document.body.classList.remove("pen__default");
  document.body.classList.add("eraser__default");
  if (isErasing) {
    return;
  }
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
  }
  if (isErasing) {
    console.log(e);
    if (e.deltaY >= 0) {
      eraserWidth = Math.max(1, eraserWidth - 5);
    } else {
      eraserWidth = Math.min(80, eraserWidth + 5);
    }
  }
};

// zoom in zoom out

// const container = document.getElementById("container");
// let scale = 1;

// document.addEventListener("wheel", (e) => {
//   e.preventDefault(); // Prevent default scrolling behavior

//   // Calculate the new scale based on scroll direction
//   scale += e.deltaY * -0.01;

//   // Limit scale to avoid zooming too much in or out
//   scale = Math.min(Math.max(0.5, scale), 3);

//   // Apply the scale transformation to the container
//   container.style.transform = `scale(${scale})`;
// });
