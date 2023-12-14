window.onload = function(){
  notebookBgbtn.addEventListener("click", function(e){
  if(isNotebookSelected){
    return;
  }
  isNotebookSelected = !isNotebookSelected;
  console.log(isNotebookSelected, "clicked")
  ctxImage.drawImage(bgImg, 0, 0, canvasImage.width, canvasImage.height)
})
}


  blackBgBtn.addEventListener("click", function(e){
    isNotebookSelected = false;
  if(isBlackBtnSelected){
    return;
  }
  isBlackBtnSelected = !isBlackBtnSelected;
  changeBackgroundColor();
  // ctxImage.drawImage(bgImg, 0, 0)
})
function changeBackgroundColor(color) {
  document.body.style.backgroundColor = color;
}




  
  
//   window.onload = function(){
    
//     // Set the canvas size
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     // Paint the canvas black
//     ctx.fillStyle = "black";
//     ctx.fillRect(0, 0, canvas.width, canvas.height);
// }
