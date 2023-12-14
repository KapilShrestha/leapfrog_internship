// Function to handle zoom in/out
function zoom(e) {
    const zoomFactor = 0.1;
    const wheel = e.deltaY < 0 ? 1 : -1; // Check scroll direction
  
    // Zoom in or out based on wheel direction
    if (wheel === 1) {
      scale += zoomFactor;
    } else {
      scale -= zoomFactor;
    }
  
    // Limit scale to a minimum value to avoid inversion
    scale = Math.max(0.1, scale);
    const mouseX = e.clientX;
    const mouseY = e.clientY;
  
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Save the current transformation matrix
    ctx.save();
  
    // Translate to the center of the canvas
    // ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.translate(mouseX, mouseY);
  
    // Apply the scale transformation
    ctx.scale(scale, scale);
  
    // Reverse the earlier translation
    // ctx.translate(-canvas.width / 2, -canvas.height / 2);
    ctx.translate(-mouseX, -mouseY);
  
    // Redraw the content
    // Replace this with your drawing logic
    redrawCanvas();
  
  
  
  
    // ctx.fillStyle = 'blue';
    // ctx.fillRect(100, 100, 200, 150);
  
    // Restore the original transformation matrix
    ctx.restore();
  }