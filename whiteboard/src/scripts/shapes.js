const shapesTool = getElementById("shapes")
let shapes = []; // Array to store shapes (rectangles and circles)
let selectedShape = null; // Currently selected shape
let isDragging = false; // Flag to check if dragging
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < shapes.length; i++) {
        let shape = shapes[i];
        ctx.beginPath();
        if (shape.type === "rectangle") {
            ctx.rect(shape.x, shape.y, shape.width, shape.height);
        } else if (shape.type === "circle") {
            ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
        }
        ctx.fillStyle = shape.color;
        ctx.fill();
        ctx.closePath();
    }
}
function isMouseInsideShape(mouseX, mouseY, shape) {
    if (shape.type === "rectangle") {
        return (
            mouseX > shape.x &&
            mouseX < shape.x + shape.width &&
            mouseY > shape.y &&
            mouseY < shape.y + shape.height
        );
    } else if (shape.type === "circle") {
        let dx = mouseX - shape.x;
        let dy = mouseY - shape.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        return distance < shape.radius;
    }
    return false;
}

canvas.addEventListener("mousedown", function (e) {
    let mouseX = e.clientX - canvas.getBoundingClientRect().left;
    let mouseY = e.clientY - canvas.getBoundingClientRect().top;

    selectedShape = null;
    for (let i = shapes.length - 1; i >= 0; i--) {
        if (isMouseInsideShape(mouseX, mouseY, shapes[i])) {
            selectedShape = shapes[i];
            isDragging = true;
            break;
        }
    }
});

canvas.addEventListener("mousemove", function (e) {
    if (isDragging && selectedShape) {
        let mouseX = e.clientX - canvas.getBoundingClientRect().left;
        let mouseY = e.clientY - canvas.getBoundingClientRect().top;

        selectedShape.x = mouseX;
        selectedShape.y = mouseY;

        draw();
    }
});

canvas.addEventListener("mouseup", function () {
    isDragging = false;
});

// Add rectangle
document
    .getElementById("addRectangle")
    .addEventListener("click", function () {
        let rectangle = {
            type: "rectangle",
            x: 50,
            y: 50,
            width: 80,
            height: 60,
            color: "blue",
        };
        shapes.push(rectangle);
        draw();
    });

// Add circle
document
    .getElementById("addCircle")
    .addEventListener("click", function () {
        let circle = {
            type: "circle",
            x: 150,
            y: 150,
            radius: 40,
            color: "red",
        };
        shapes.push(circle);
        draw();
    });
// Previous code remains unchanged

let resizeHandleRadius = 5; // Radius of the resize handles

function isMouseOnResizeHandle(mouseX, mouseY, shape) {
    if (shape.type === 'rectangle') {
        return (
            (mouseX > shape.x + shape.width - resizeHandleRadius &&
                mouseX < shape.x + shape.width + resizeHandleRadius &&
                mouseY > shape.y + shape.height - resizeHandleRadius &&
                mouseY < shape.y + shape.height + resizeHandleRadius)
        );
    } else if (shape.type === 'circle') {
        let dx = mouseX - shape.x;
        let dy = mouseY - shape.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        return distance > shape.radius - resizeHandleRadius && distance < shape.radius + resizeHandleRadius;
    }
    return false;
}

shapesTool.addEventListener('mousedown', function (e) {
    let mouseX = e.clientX - canvas.getBoundingClientRect().left;
    let mouseY = e.clientY - canvas.getBoundingClientRect().top;

    selectedShape = null;
    for (let i = shapes.length - 1; i >= 0; i--) {
        if (isMouseInsideShape(mouseX, mouseY, shapes[i])) {
            selectedShape = shapes[i];
            if (isMouseOnResizeHandle(mouseX, mouseY, selectedShape)) {
                isDragging = false;
                isResizing = true;
                break;
            }
            isDragging = true;
            isResizing = false;
            break;
        }
    }
});

shapesTool.addEventListener('mousemove', function (e) {
    if (isDragging && selectedShape && !isResizing) {
        let mouseX = e.clientX - canvas.getBoundingClientRect().left;
        let mouseY = e.clientY - canvas.getBoundingClientRect().top;

        selectedShape.x = mouseX;
        selectedShape.y = mouseY;

        draw();
    } else if (isResizing && selectedShape) {
        let mouseX = e.clientX - canvas.getBoundingClientRect().left;
        let mouseY = e.clientY - canvas.getBoundingClientRect().top;

        if (selectedShape.type === 'rectangle') {
            selectedShape.width = mouseX - selectedShape.x;
            selectedShape.height = mouseY - selectedShape.y;
        } else if (selectedShape.type === 'circle') {
            let dx = mouseX - selectedShape.x;
            let dy = mouseY - selectedShape.y;
            selectedShape.radius = Math.sqrt(dx * dx + dy * dy);
        }

        draw();
    }
});

canvas.addEventListener('mouseup', function () {
    isDragging = false;
    isResizing = false;
});