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
    ctxImage.drawImage(bgImg, 0, 0, canvasImage.width, canvasImage.height);
    isNotebookSelected = !isNotebookSelected;
  });
};

blackBgBtn.addEventListener("click", function (e) {
  isNotebookSelected = false;
  isWhiteBtnSelected = false;
  ctx.strokeStyle = "white";
  if (isBlackBtnSelected) {
    return;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctxImage.clearRect(0, 0, canvasImage.width, canvasImage.height);
  // changeBackgroundColor();
  ctxImage.fillStyle = "black";
  ctxImage.fillRect(0, 0, canvasImage.width, canvasImage.height);
  isBlackBtnSelected = !isBlackBtnSelected;
});

whiteBgBtn.addEventListener("click", function (e) {
  isBlackBtnSelected = false;
  isNotebookSelected = false;
  ctx.strokeStyle = selectedColor;
  if (isBlackBtnSelected) {
    return;
  }
  isWhiteBtnSelected = !isWhiteBtnSelected;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctxImage.clearRect(0, 0, canvasImage.width, canvasImage.height);
  ctxImage.fillStyle = "white";
  ctxImage.fillRect(0, 0, canvasImage.width, canvasImage.height);
});