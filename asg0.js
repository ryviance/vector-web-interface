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
}

// Function to draw a vector on the canvas
function drawVector(ctx, v, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(200, 200); // Center of the canvas (400x400 resolution)

    // Scale vector coordinates by 20 for better visualization
    var scaledX = v.elements[0] * 20;
    var scaledY = v.elements[1] * 20;

    // Draw the vector to its scaled endpoint
    ctx.lineTo(200 + scaledX, 200 - scaledY); // Subtract Y to account for canvas inverted Y-axis
    ctx.stroke();
}

// Function to handle the draw vectors event
function handleDrawEvent() {
    var canvas = document.getElementById('example');
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    var x1 = parseFloat(document.getElementById('x1').value) || 0;
    var y1 = parseFloat(document.getElementById('y1').value) || 0;
    var v1 = new Vector3([x1, y1, 0]);

    var x2 = parseFloat(document.getElementById('x2').value) || 0;
    var y2 = parseFloat(document.getElementById('y2').value) || 0;
    var v2 = new Vector3([x2, y2, 0]);

    // Draw vectors
    drawVector(ctx, v1, "red");
    drawVector(ctx, v2, "blue");
}

// Function to handle the operation event
function handleDrawOperationEvent() {
    var canvas = document.getElementById('example');
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    // Get vector values
    var x1 = parseFloat(document.getElementById('x1').value) || 0;
    var y1 = parseFloat(document.getElementById('y1').value) || 0;
    var v1 = new Vector3([x1, y1, 0]);

    var x2 = parseFloat(document.getElementById('x2').value) || 0;
    var y2 = parseFloat(document.getElementById('y2').value) || 0;
    var v2 = new Vector3([x2, y2, 0]);

    // Draw the vectors
    drawVector(ctx, v1, "red");
    drawVector(ctx, v2, "blue");

    // Get operation type from selector
    var operation = document.getElementById('operationSelector').value;
    var scalar = parseFloat(document.getElementById('scalar').value) || 1;

    switch (operation) {
        case 'add':
            var v3 = new Vector3(v1.elements);
            v3.add(v2);
            drawVector(ctx, v3, "green");
            break;
        case 'sub':
            var v4 = new Vector3(v1.elements);
            v4.sub(v2);
            drawVector(ctx, v4, "green");
            break;
        case 'mul':
            var v5 = new Vector3(v1.elements);
            v5.mul(scalar);
            drawVector(ctx, v5, "green");

            var v6 = new Vector3(v2.elements);
            v6.mul(scalar);
            drawVector(ctx, v6, "green");
            break;
        case 'div':
            var v7 = new Vector3(v1.elements);
            v7.div(scalar);
            drawVector(ctx, v7, "green");

            var v8 = new Vector3(v2.elements);
            v8.div(scalar);
            drawVector(ctx, v8, "green");
            break;
        case 'magnitude':
            var mag1 = v1.magnitude();
            var mag2 = v2.magnitude();
            console.log("Magnitude of v1: " + mag1);
            console.log("Magnitude of v2: " + mag2);
            break;
        case 'normalize':
            var v9 = new Vector3(v1.elements);
            v9.normalize();
            drawVector(ctx, v9, "green");

            var v10 = new Vector3(v2.elements);
            v10.normalize();
            drawVector(ctx, v10, "green");
            break;
        case 'angleBetween':
            var angle = angleBetween(v1, v2);
            console.log("Angle between v1 and v2: " + angle + " degrees");
            break;
        case 'area':
            var area = areaTriangle(v1, v2);
            console.log("Area of the triangle: " + area);
            break;
    }
}

// Function to calculate the angle between two vectors
function angleBetween(v1, v2) {
    var dotProduct = Vector3.dot(v1, v2);
    var mag1 = v1.magnitude();
    var mag2 = v2.magnitude();
    var cosAlpha = dotProduct / (mag1 * mag2);
    var angleInRadians = Math.acos(cosAlpha);
    var angleInDegrees = angleInRadians * (180 / Math.PI); // Convert to degrees
    return angleInDegrees;
}

// Function to calculate the area of a triangle formed by two vectors
function areaTriangle(v1, v2) {
    var crossProd = Vector3.cross(v1, v2);
    return crossProd.magnitude() / 2; // Area of the triangle is half the area of the parallelogram
}