const canvas = document.getElementById("noteCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");
ctx.lineWidth = 4;

let prevX = null;
let prevY = null;

let draw = false;
let penColor = "rgba(255, 0, 0, 1)"; // Default color is light red
let points = [];

// Get the clear button element
const clearButton = document.getElementById("clearButton");

// Add event listener to the clear button
clearButton.addEventListener("click", clearCanvas);

// Get the save button element
const saveButton = document.getElementById("saveButton");

// Add event listener to the save button
saveButton.addEventListener("click", savePoints);

// Set draw to true when mouse is pressed or touch starts
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("touchstart", startDrawing);

// Set draw to false when mouse is released or touch ends
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("touchend", stopDrawing);

canvas.addEventListener("mousemove", drawLine);
canvas.addEventListener("touchmove", drawLine);

// Disable right-click context menu
canvas.addEventListener("contextmenu", function(e) {
    e.preventDefault();
});

window.addEventListener("resize", resizeCanvas);

function startDrawing(e) {
    draw = true;
    if (e.button === 0) {
        penColor = "rgba(255, 64, 64, 1)"; // Left click - light red
    } else if (e.button === 2) {
        penColor = "rgba(0, 255, 255, 1)"; // Right click - light blue
    }
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

    ctx.strokeStyle = penColor; // Set the pen color
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();

    // Save the points if the pen color is red
    if (penColor === "rgba(255, 64, 64, 1)") {
        points.push({ x: prevX, y: prevY });
        points.push({ x: currentX, y: currentY });
    }

    prevX = currentX;
    prevY = currentY;
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    points = []; // Clear the points array
}

function savePoints() {
    let cppArray = "std::vector<std::pair<int, int>> points = {\n";
    for (let i = 0; i < points.length; i++) {
        cppArray += `    {${points[i].x}, ${points[i].y}}`;
        if (i < points.length - 1) {
            cppArray += ",\n";
        }
    }
    cppArray += "\n};";

    // Create a Blob with the C++ array
    const blob = new Blob([cppArray], { type: "text/plain" });

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "points.txt";

    // Simulate a click on the link to trigger the download
    link.click();
}