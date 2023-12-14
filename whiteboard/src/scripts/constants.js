const canvas = document.getElementById("drawing-board");
const ctx = canvas.getContext("2d");

const canvasImage = document.getElementById("image-board");
const ctxImage = canvasImage.getContext("2d");

canvasImage.width = window.innerWidth 
canvasImage.height = window.innerHeight

// document.body.style.backgroundColor = "red";

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
const bgImg = document.getElementById("bg-image")


slider.style.display = "none";

const canvasOffsetX = 0;
const canvasOffsetY = 0;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

canvasImage.width = window.innerWidth - canvasOffsetX;
canvasImage.height = window.innerHeight - canvasOffsetY;

let isHandSelected = false;
let isTextToolSelected = false;
let isPainting = false;
let isErasing = false;
let isPenActive = false;
let isNotebookSelected = false;
let isBlackBtnSelected = false;
let isWhiteBtnSelected = false;
let selectedColor = "#000"
let isResizing;

let lineWidth = 5;
let eraserWidth = 5;

let startX;
let startY;

let currentCurve = []; // To store points of the current curve

const curves = []; // To store all curves drawn

// Initial scale and translation values
let scale = 1;
let offsetX = 0;
let offsetY = 0;