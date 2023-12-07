const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let lineWidthInput = document.getElementById('linewidth');
let lineWidth = parseInt(lineWidthInput.value);

let startX;
let startY;

let currentCurve = []; // To store points of the current curve
const curves = []; // To store all curves drawn

toolbar.addEventListener('click', e => {
    if (e.target.id === 'clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        curves.length = 0; // Clear the curves array when canvas is cleared
    }
});

toolbar.addEventListener('change', e => {
    if (e.target.id === 'color-picker') {
        ctx.strokeStyle = e.target.value;
    }

    if (e.target.id === 'linewidth') {
        lineWidth = parseInt(e.target.value);
    }
});

const draw = (e) => {
    if (!isPainting) {
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

    currentCurve.push({
        x: e.clientX - canvasOffsetX,
        y: e.clientY - canvasOffsetY
    });

    startX = e.clientX;
    startY = e.clientY;
}

canvas.addEventListener('mousedown', (e) => {
    isPainting = true;
    startX = e.clientX;
    startY = e.clientY;
    currentCurve = [];
    currentCurve.push({
        x: startX - canvasOffsetX,
        y: startY - canvasOffsetY
    });
});

canvas.addEventListener('mouseup', e => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();

    curves.push(currentCurve);
});

canvas.addEventListener('mousemove', draw);

document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 'z') {
        event.preventDefault();
        if (curves.length > 0) {
            curves.pop();
            redrawCanvas();
        }
    }
});

function redrawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    curves.forEach(curve => {
        ctx.beginPath();
        curve.forEach((point, index) => {
            if (index === 0) {
                ctx.moveTo(point.x, point.y);
            } else {
                ctx.lineTo(point.x, point.y);
            }
        });
        ctx.stroke();
    });
}

let eraserButton = document.getElementById("eraser")
eraserButton.addEventListener("click", function () {
    isErasing = !isErasing;
    if (isErasing) {
        eraserButton.style.backgroundColor = "red";
    } else {
        eraserButton.style.backgroundColor = "blue";
    }
});
