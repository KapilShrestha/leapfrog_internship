window.onload = function () {
  notebookBgbtn.addEventListener("click", function (e) {
    isBlackBtnSelected = false;
    isWhiteBtnSelected = false;
    
    ctx.strokeStyle = selectedColor;

    if (isNotebookSelected) {
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctxImage.clearRect(0, 0, canvasImage.width, canvasImage.height);
    shapes = [];
    curves = [];
    ctxImage.drawImage(bgImg, 0, 0, canvasImage.width, canvasImage.height);
    isNotebookSelected = !isNotebookSelected;
  });
};

blackBgBtn.addEventListener("click", function (e) {
  isNotebookSelected = false;
  isWhiteBtnSelected = false;
  selectedColor = "#fff";
  ctx.strokeStyle = selectedColor;
  if (isBlackBtnSelected) {
    return;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctxImage.clearRect(0, 0, canvasImage.width, canvasImage.height);
  shapes = [];
    curves = [];
  // changeBackgroundColor();
  ctxImage.fillStyle = "black";
  ctxImage.fillRect(0, 0, canvasImage.width, canvasImage.height);
  isBlackBtnSelected = !isBlackBtnSelected;
});

whiteBgBtn.addEventListener("click", function (e) {
  isBlackBtnSelected = false;
  isNotebookSelected = false;
  selectedColor ="#000";
  ctx.strokeStyle = selectedColor;
  if (isBlackBtnSelected) {
    return;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctxImage.clearRect(0, 0, canvasImage.width, canvasImage.height);
  shapes = [];
    curves = [];
  ctxImage.fillStyle = "white";
  ctxImage.fillRect(0, 0, canvasImage.width, canvasImage.height);
  isWhiteBtnSelected = !isWhiteBtnSelected;
});

