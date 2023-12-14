toolbar.addEventListener("click", (e) => {
  if (e.target.id === "clear") {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    curves.length = 0; // Clear the curves array when canvas is cleared
  }
});

toolbar.addEventListener("change", (e) => {
  if (e.target.id === "color-picker") {
    selectedColor = e.target.value;
    ctx.strokeStyle = selectedColor;
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
  curves.push({id: Date.now(), currentCurve, minX, minY, maxX, maxY, lineWidth, selectedColor});

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
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      redrawCanvas();
    }
  }
});

function redrawCanvas() {
  curves.forEach((curve) => {
    ctx.beginPath();
    console.log(curve)
    // 
    curve.currentCurve.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });
    ctx.lineWidth = curve.lineWidth;
    ctx.strokeStyle = curve.selectedColor;
    ctx.stroke();
  });
}

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

// to save the canvas in png format
function saveCanvas() {
  const dataURL = canvas.toDataURL("image/png");  // Convert the canvas content to an image data URL
  const link = document.createElement("a");
  link.download = "canvas_image.png"; // Set the file name
  link.href = dataURL; // Set the data URL as the href attribute
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link); // Remove the link from the body
}


// changing background
// window.onload = function(){
//   const bgImg = document.getElementById("bg-image")
//   ctx.drawImage(bgImg, 0, 0)
// }
// function changeBackgroundColor(color) {
//   document.body.style.backgroundColor = color;
// }