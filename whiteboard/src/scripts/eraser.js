const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isErasing = false;

toolbar.addEventListener('click', (e) => {
  if (e.target.id === 'clear') {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  } else if (e.target.id === 'eraser') {
    isErasing = !isErasing;
    e.target.classList.toggle('active'); // Toggle active class for visual indication
  }
});

const erase = (e) => {
  if (isErasing) {
    const startX = e.clientX - canvasOffsetX;
    const startY = e.clientY - canvasOffsetY;

    ctx.lineWidth = 25; // Set a fixed width for the eraser
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    ctx.strokeStyle = 'white'; // Set the color to white for erasing
    ctx.lineTo(startX, startY);
    ctx.stroke();
  }
};

canvas.addEventListener('mousedown', (e) => {
    isErasing = true;
    startX = e.clientX;
    startY = e.clientY;
});
canvas.addEventListener('mouseup', e => {
    isErasing = false;
    ctx.stroke();
    ctx.beginPath();
    
});


canvas.addEventListener('mousemove', erase);
