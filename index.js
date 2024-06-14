const canvas = document.getElementById("noteCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");
ctx.strokeStyle = "red";
ctx.lineWidth = 4;

let prevX = null;
let prevY = null;

let draw = false;

// Get the clear button element
const clearButton = document.getElementById("clearButton");

// Add event listener to the clear button
clearButton.addEventListener("click", clearCanvas);

// Set draw to true when mouse is pressed or touch starts
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("touchstart", startDrawing);

// Set draw to false when mouse is released or touch ends
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("touchend", stopDrawing);

canvas.addEventListener("mousemove", drawLine);
canvas.addEventListener("touchmove", drawLine);

window.addEventListener("resize", resizeCanvas);

function startDrawing(e) {
    draw = true;
}

function stopDrawing(e) {
    draw = false;
    prevX = null;
    prevY = null;
}

function drawLine(e) {
    if (!draw) return;

    let currentX, currentY;

    if (e.type === "mousemove") {
        currentX = e.clientX;
        currentY = e.clientY;
    } else if (e.type === "touchmove") {
        currentX = e.touches[0].clientX;
        currentY = e.touches[0].clientY;
    }

    if (prevX === null || prevY === null) {
        prevX = currentX;
        prevY = currentY;
        return;
    }

    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();

    prevX = currentX;
    prevY = currentY;
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx = canvas.getContext("2d");
    ctx.lineWidth = 5;
    ctx.strokeStyle = "red";
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}