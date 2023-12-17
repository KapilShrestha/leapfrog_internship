const canvas = document.getElementById("drawing-board");
const ctx = canvas.getContext("2d");

const canvasImage = document.getElementById("image-board");
const ctxImage = canvasImage.getContext("2d");

const canvasOffsetX = 0;
const canvasOffsetY = 0;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

canvasImage.width = window.innerWidth;
canvasImage.height = window.innerHeight;

const uploadImage = document.getElementById("upload-image");
const blackBgBtn = document.getElementById("black-bg");
const whiteBgBtn = document.getElementById("white-bg");
const notebookBgbtn = document.getElementById("notebook-bg")
const toolbar = document.getElementById("toolbar");
const eraserButton = document.getElementById("eraser");
const penTool = document.getElementById("pen");
const handTool = document.getElementById("hand");
const colorPickerTool = document.getElementById("color-picker");
const slider = document.getElementById("sliderRange");
const textBoxTool = document.getElementById("text-box");
const bgImg = document.getElementById("bg-image");
const circleTool = document.getElementById("add-circle");
const rectangleTool = document.getElementById("add-rectangle");



slider.style.display = "none";

let white = "#fff";
let black = "#000";
let primaryColor = "#595959";


let isHandSelected = false;
let isTextToolSelected = false;
let isPainting = false;
let isErasing = false;
let isPenActive = false;
let isNotebookSelected = false;
let isBlackBtnSelected = false;
let isWhiteBtnSelected = false;
let selectedColor = "#000";
let isResizing;
let selectedCurve = null;

let isDragging = false;

let lineWidth = 5;
let eraserWidth = 5;

let startX;
let startY;

let currentCurve = []; // To store points of the current curve

let curves = []; // To store all curves drawn
let shapes = []; // Array to store shapes (rectangles and circles)
let selectedShape = null; // Currently selected shape

// Initial scale and translation values
let scale = 1;
let offsetX = 0;
let offsetY = 0;
let img;

