colorPickerTool.addEventListener("click", function (e) {
  document.body.classList.remove("eraser__default");
  document.body.classList.remove("text__default");
  document.body.classList.add("pen__default");
  isPenActive = true;
  isErasing = false;
  isHandSelected = false;
  slider.style.display = "block"; //displays when color is selected
});

penTool.addEventListener("click", function (e) {
  e.stopPropagation();
  isErasing = false;
  isHandSelected = false;
  isTextToolSelected = false;
  console.log(isTextToolSelected);
  document.body.classList.remove("eraser__default");
  document.body.classList.remove("text__default");
  document.body.classList.add("pen__default");

  slider.style.display = "block"; //displays only when penTool is selected

  if (isPenActive) {
    return;
  }
  slider.value = lineWidth;

  isPenActive = !isPenActive;
});

// eraserButton
eraserButton.addEventListener("click", function () {
  isPenActive = false;
  isHandSelected = false;
  isTextToolSelected = false;
  document.body.classList.remove("hand__default");
  document.body.classList.remove("pen__default");
  document.body.classList.add("eraser__default");
  document.body.classList.remove("text__default");
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

// slider for pen and eraser tool
slider.oninput = function () {
  if (isPenActive) {
    lineWidth = this.value;
  }
  if (isErasing) {
    eraserWidth = this.value;
  }
};

handTool.addEventListener("click", function (e) {
  isPenActive = false;
  isErasing = false;
  isTextToolSelected = false;

  document.body.classList.remove("pen__default");
  document.body.classList.remove("eraser__default");
  document.body.classList.remove("text__default");
  document.body.classList.add("hand__default");
  if (isHandSelected) {
    return;
  }
  canvas.addEventListener("wheel", zoom);

  canvas.addEventListener("click", function (e) {
    selectedCurve = curves.find(c => c.minX < e.clientX < c.maxX && c.minY < e.clientY < c.maxY);
    curves.map((c) => {
      if (c.id === selectedCurve.id) {
        console.log(c.id, "checking id")
        drawBoundingBox(c.minX, c.minY, c.maxX, c.maxY);
        document.body.classList.add("hand__grabbing");
      }
    });
  });
  isHandSelected = !isHandSelected;
});
canvas.addEventListener("mousedown", function(e){
  isDragging = true;
})

canvas.addEventListener("mousemove", function(e){
  if(isDragging && selectedCurve){
      let mouseX = e.clientX;
      let mouseY = e.clientY;
      
      let curveWidth = selectedCurve.maxX - selectedCurve.minX;
      let curveHeight = selectedCurve.maxY - selectedCurve.minY;

      // Update curve position based on mouse movement
      selectedCurve.minX = mouseX;
      selectedCurve.minY = mouseY;
      selectedCurve.maxX = mouseX + curveWidth;
      selectedCurve.maxY = mouseY + curveHeight;

      // Update each point's position within the curve
      selectedCurve.currentCurve.forEach((point) => {
          point.x += e.clientX - mouseX;
          point.y += e.clientY - mouseY;
      });

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      redrawCanvas(); 
  }
});

canvas.addEventListener("mouseup", function () {
  isDragging = false;
  selectedCurve = null;
});






















// textboxtool

textBoxTool.addEventListener("click", function (e) {
  isPenActive = false;
  isErasing = false;
  isHandSelected = false;

  document.body.classList.remove("pen__default");
  document.body.classList.remove("eraser__default");
  document.body.classList.remove("hand__default");
  document.body.classList.add("text__default");
  if (isTextToolSelected) {
    return;
  }
  isTextToolSelected = !isTextToolSelected;
});

function createTextBox() {
  canvas.addEventListener("click", function (event) {
    let x = event.clientX;
    let y = event.clientY;
    let input = document.createElement("input");
    input.type = "text";
    input.style.position = "absolute";
    input.style.left = x + "px";
    input.style.top = y + "px";
    input.style.minWidth = "10px"; // Set a minimum width
    document.body.appendChild(input);
    
    input.addEventListener("input", function () {
      let text = input.value;
      ctx.font = window.getComputedStyle(input).getPropertyValue("font");
      let textWidth = ctx.measureText(text).width + 5; // To add some extra space
      input.style.width = textWidth + "px"; // To adjust width based on text content
    });
    
    input.addEventListener("blur", function() {
      if (input.value.trim() === '') {
        document.body.removeChild(input);
      }
    });

    input.focus(); // Set focus to the newly created text box
  });
}

