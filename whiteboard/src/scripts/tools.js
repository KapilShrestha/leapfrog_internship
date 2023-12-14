colorPickerTool.addEventListener("click", function (e) {
  document.body.classList.remove("eraser__default");
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
  document.body.classList.remove("eraser__default");
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