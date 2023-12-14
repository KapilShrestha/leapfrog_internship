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


handTool.addEventListener("click", function (e) {
  isPenActive = false;
  isErasing = false;
  if (isHandSelected) {
    return;
  }
  canvas.addEventListener('wheel', zoom);
  canvas.addEventListener("click", function (e) {
    console.log(e, "retest")
    // console.log(e.clientX, e.clientY);
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

// to save the canvas in png format
function saveCanvas() {
  // Convert the canvas content to an image data URL
  const dataURL = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.download = "canvas_image.png"; // Set the file name
  link.href = dataURL; // Set the data URL as the href attribute
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link); // Remove the link from the body
}

// slider js

// slider.oninput = function () {
//   if (isPenActive) {
//     lineWidth = this.value;
//   }
//   if (isErasing) {
//     eraserWidth = this.value;
//   }
// };


// changing background
// window.onload = function(){
//   const bgImg = document.getElementById("bg-image")
//   ctx.drawImage(bgImg, 0, 0)
// }
// function changeBackgroundColor(color) {
//   document.body.style.backgroundColor = color;
// }




// // shapes js
// let shapes = []; // Array to store shapes (rectangles and circles)
//         let selectedShape = null; // Currently selected shape
//         let isDragging = false; // Flag to check if dragging

//         function drawShapes() {
//             ctx.clearRect(0, 0, canvas.width, canvas.height);

//             for (let i = 0; i < shapes.length; i++) {
//                 let shape = shapes[i];
//                 ctx.beginPath();
//                 if (shape.type === "rectangle") {
//                     ctx.rect(shape.x, shape.y, shape.width, shape.height);
//                 } else if (shape.type === "circle") {
//                     ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
//                 }
//                 ctx.fillStyle = shape.color;
//                 ctx.fill();
//                 ctx.closePath();
//             }
//         }

//         function isMouseInsideShape(mouseX, mouseY, shape) {
//             if (shape.type === "rectangle") {
//                 return (
//                     mouseX > shape.x &&
//                     mouseX < shape.x + shape.width &&
//                     mouseY > shape.y &&
//                     mouseY < shape.y + shape.height
//                 );
//             } else if (shape.type === "circle") {
//                 let dx = mouseX - shape.x;
//                 let dy = mouseY - shape.y;
//                 let distance = Math.sqrt(dx * dx + dy * dy);
//                 return distance < shape.radius;
//             }
//             return false;
//         }

//         canvas.addEventListener("mousedown", function (e) {
//             let mouseX = e.clientX - canvas.getBoundingClientRect().left;
//             let mouseY = e.clientY - canvas.getBoundingClientRect().top;

//             selectedShape = null;
//             for (let i = shapes.length - 1; i >= 0; i--) {
//                 if (isMouseInsideShape(mouseX, mouseY, shapes[i])) {
//                     selectedShape = shapes[i];
//                     isDragging = true;
//                     break;
//                 }
//             }
//         });

//         canvas.addEventListener("mousemove", function (e) {
//             if (isDragging && selectedShape) {
//                 let mouseX = e.clientX - canvas.getBoundingClientRect().left;
//                 let mouseY = e.clientY - canvas.getBoundingClientRect().top;

//                 selectedShape.x = mouseX;
//                 selectedShape.y = mouseY;

//                 drawShapes();
//             }
//         });

//         canvas.addEventListener("mouseup", function () {
//             isDragging = false;
//         });

//         // Add rectangle
//         document
//             .getElementById("addRectangle")
//             .addEventListener("click", function () {
//                 let rectangle = {
//                     type: "rectangle",
//                     x: 50,
//                     y: 50,
//                     width: 80,
//                     height: 60,
//                     color: "blue",
//                 };
//                 shapes.push(rectangle);
//                 drawShapes();
//             });

//         // Add circle
//         document
//             .getElementById("addCircle")
//             .addEventListener("click", function () {
//                 let circle = {
//                     type: "circle",
//                     x: 150,
//                     y: 150,
//                     radius: 40,
//                     color: "red",
//                 };
//                 shapes.push(circle);
//                 drawShapes();
//             });
 

//         let resizeHandleRadius = 5; // Radius of the resize handles

//         function isMouseOnResizeHandle(mouseX, mouseY, shape) {
//             if (shape.type === 'rectangle') {
//                 return (
//                     (mouseX > shape.x + shape.width - resizeHandleRadius &&
//                         mouseX < shape.x + shape.width + resizeHandleRadius &&
//                         mouseY > shape.y + shape.height - resizeHandleRadius &&
//                         mouseY < shape.y + shape.height + resizeHandleRadius)
//                 );
//             } else if (shape.type === 'circle') {
//                 let dx = mouseX - shape.x;
//                 let dy = mouseY - shape.y;
//                 let distance = Math.sqrt(dx * dx + dy * dy);
//                 return distance > shape.radius - resizeHandleRadius && distance < shape.radius + resizeHandleRadius;
//             }
//             return false;
//         }

//         canvas.addEventListener('mousedown', function (e) {
//             let mouseX = e.clientX - canvas.getBoundingClientRect().left;
//             let mouseY = e.clientY - canvas.getBoundingClientRect().top;

//             selectedShape = null;
//             for (let i = shapes.length - 1; i >= 0; i--) {
//                 if (isMouseInsideShape(mouseX, mouseY, shapes[i])) {
//                     selectedShape = shapes[i];
//                     if (isMouseOnResizeHandle(mouseX, mouseY, selectedShape)) {
//                         isDragging = false;
//                         isResizing = true;
//                         break;
//                     }
//                     isDragging = true;
//                     isResizing = false;
//                     break;
//                 }
//             }
//         });

//         canvas.addEventListener('mousemove', function (e) {
//             if (isDragging && selectedShape && !isResizing) {
//                 let mouseX = e.clientX - canvas.getBoundingClientRect().left;
//                 let mouseY = e.clientY - canvas.getBoundingClientRect().top;

//                 selectedShape.x = mouseX;
//                 selectedShape.y = mouseY;

//                 drawShapes();
//             } else if (isResizing && selectedShape) {
//                 let mouseX = e.clientX - canvas.getBoundingClientRect().left;
//                 let mouseY = e.clientY - canvas.getBoundingClientRect().top;

//                 if (selectedShape.type === 'rectangle') {
//                     selectedShape.width = mouseX - selectedShape.x;
//                     selectedShape.height = mouseY - selectedShape.y;
//                 } else if (selectedShape.type === 'circle') {
//                     let dx = mouseX - selectedShape.x;
//                     let dy = mouseY - selectedShape.y;
//                     selectedShape.radius = Math.sqrt(dx * dx + dy * dy);
//                 }

//                 drawShapes();
//             }
//         });

//         canvas.addEventListener('mouseup', function () {
//             isDragging = false;
//             isResizing = false;
// 

// });
