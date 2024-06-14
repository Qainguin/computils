const canvas = document.getElementById("noteCanvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight


const ctx = canvas.getContext("2d")
ctx.strokeStyle = "red";

let prevX = null;
let prevY = null;

let draw = false;

// Set draw to true when mouse is pressed
window.addEventListener("mousedown", (e) => {
    if (e.button == 0) {
        draw = true
    } else if (e.button == 2) {
        ctx.clearRect(0,0, canvas.width, canvas.height);
    }
})
// Set draw to false when mouse is released
window.addEventListener("mouseup", (e) => {
    if (e.button == 0) {
        draw = false
    }
})

window.addEventListener("mousemove", (e) => {
    // if draw is false then we won't draw
    if(prevX == null || prevY == null || !draw){
        prevX = e.clientX;
        prevY = e.clientY;
        console.log("Cannot Draw.")
        return
    }

    let currentX = e.clientX;
    let currentY = e.clientY;

    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();

    prevX = currentX;
    prevY = currentY;
    console.log("Drawing...")
})

window.addEventListener("resize", (e) => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    ctx = canvas.getContext("2d")

    ctx.lineWidth = 5;
    ctx.strokeStyle = "red";
})