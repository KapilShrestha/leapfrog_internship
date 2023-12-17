// Function to handle zoom in/out
function zoom(e) {
  console.log(isPenActive, isErasing, isHandSelected, "latest check")
    const zoomFactor = 0.1;
    const wheel = e.deltaY < 0 ? 1 : -1; // Check scroll direction
    if (wheel === 1) {
      scale += zoomFactor;
    } else {
      scale -= zoomFactor;
    }
    scale = Math.max(0.1, scale);
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(mouseX, mouseY);
    ctx.scale(scale, scale);
    ctx.translate(-mouseX, -mouseY);
    // redrawCanvas();
    drawShapes();
    ctx.restore();
  }