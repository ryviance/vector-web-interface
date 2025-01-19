// asg0.js
function main() {
    // Retrieve <canvas> element
    var canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }

    // Get the rendering context for 2D
    var ctx = canvas.getContext('2d');

    // Set the canvas background to black
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Create the vector v1 using the Vector3 class (z = 0)
    var v1 = new Vector3([2.25, 2.25, 0]);

    // Draw the vector v1 in red
    drawVector(ctx, v1, "red");
}

function drawVector(ctx, v, color) {
    // Set the vector color
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    // Start drawing the vector from the center of the canvas
    ctx.beginPath();
    ctx.moveTo(200, 200); // Center of the canvas (400x400 resolution)

    // Scale vector coordinates by 20 for better visualization
    var scaledX = v.elements[0] * 20;
    var scaledY = v.elements[1] * 20;

    // Draw the vector to its scaled endpoint
    ctx.lineTo(200 + scaledX, 200 - scaledY); // Subtract Y to account for canvas inverted Y-axis
    ctx.stroke();
}
