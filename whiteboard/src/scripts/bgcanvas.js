window.onload = function(){
  notebookBgbtn.addEventListener("click", function(e){
  if(isNotebookSelected){
    return;
  }
  ctxImage.clearRect(0, 0, canvasImage.width, canvasImage.height);
  ctxImage.drawImage(bgImg, 0, 0, canvasImage.width, canvasImage.height)
  isNotebookSelected = !isNotebookSelected;
  console.log(isNotebookSelected, "clicked")
})
}


  blackBgBtn.addEventListener("click", function(e){
    isNotebookSelected = false;
    isWhiteBtnSelected = false;
  if(isBlackBtnSelected){
    return;
  }
  isBlackBtnSelected = !isBlackBtnSelected;
  ctxImage.clearRect(0, 0, canvasImage.width, canvasImage.height);
  // changeBackgroundColor();
  ctxImage.fillStyle = "black";
  ctxImage.fillRect(0, 0, canvasImage.width, canvasImage.height);
})

whiteBgBtn.addEventListener("click", function(e){
  isBlackBtnSelected = false
  isNotebookSelected = false;
if(isBlackBtnSelected){
  return;
}
isWhiteBtnSelected = !isWhiteBtnSelected;
ctxImage.clearRect(0, 0, canvasImage.width, canvasImage.height);
ctxImage.fillStyle = "white";
  ctxImage.fillRect(0, 0, canvasImage.width, canvasImage.height);
})



  
  
//   window.onload = function(){
    
//     // Set the canvas size
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     // Paint the canvas black
//     ctx.fillStyle = "black";
//     ctx.fillRect(0, 0, canvas.width, canvas.height);
// }
