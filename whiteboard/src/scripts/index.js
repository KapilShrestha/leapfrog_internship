const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let isErasing = false
let lineWidthInput = document.getElementById('linewidth'); // Updated to capture the input element
let lineWidth = parseInt(lineWidthInput.value);

let startX;
let startY;

const curves = [];

toolbar.addEventListener('click', e => {
    if (e.target.id === 'clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});

toolbar.addEventListener('change', e => {
    if(e.target.id === 'color-picker') {
        ctx.strokeStyle = e.target.value;
    }

    if(e.target.id === 'linewidth') {
        lineWidth = parseInt(e.target.value);
    }  
});

const draw = (e) => {
    if(!isPainting) {
        return;
    }

    ctx.lineWidth = lineWidth;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';


    ctx.beginPath();
    ctx.moveTo(startX - canvasOffsetX, startY - canvasOffsetY);
    ctx.bezierCurveTo(
        startX - canvasOffsetX + 0.25, startY - canvasOffsetY + 0.25,
        e.clientX - canvasOffsetX - 0.25, e.clientY - canvasOffsetY - 0.25,
        e.clientX - canvasOffsetX, e.clientY - canvasOffsetY
    );
    ctx.stroke();

    curves.push({
        startX: startX - canvasOffsetX,
        startY: startY - canvasOffsetY,
        endX: e.clientX - canvasOffsetX,
        endY: e.clientY - canvasOffsetY
    }); 
    startX = e.clientX;
    startY = e.clientY;
}

canvas.addEventListener('mousedown', (e) => {
    isPainting = true;
    startX = e.clientX;
    startY = e.clientY;
});

canvas.addEventListener('mouseup', e => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
    
});


let eraserButton = document.getElementById("eraser")
eraserButton.addEventListener("click", function() {
    isErasing = !isErasing;
    if (isErasing) {
        eraserButton.style.backgroundColor = "red";
        // erase();

    }
    else {
      eraserButton.style.backgroundColor = "blue";
    }
    
  });

canvas.addEventListener('mousemove', draw);


