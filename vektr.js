// Mouse over tooltip
$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();
});

// Variables
var stroke_color = 'black';

// Create a Fabric wrapper around native canvas element
var canvas = new fabric.Canvas('canvas', {
    backgroundColor:'white'
});

var circle1 = new fabric.Circle({
    radius: 20, fill: 'green', left: 100, top: 100
  });
  var triangle = new fabric.Triangle({
    width: 20, height: 30, fill: 'blue', left: 50, top: 50
  });
  
  canvas.add(circle1, triangle);

// Update Fabric canvas size to match browser window
//window.setInterval(() => {
//    canvas.setDimensions({
//        width: document.getElementById('canvas-div').clientWidth / 2,
//        height: document.getElementById('canvas-div').clientHeight
//    }, 1000);
//});

// Update zoom slider value
var zoom = document.getElementById("zoom");
zoom.addEventListener("input", function() {
    document.getElementById("outputVar").innerHTML = zoom.value;
    canvas.setZoom(zoom.value);
}) 

// Event Listeners //

// Erase Canvas
document.getElementById('erase').addEventListener('click', function(){
    canvas.clear();
    canvas.backgroundColor = 'white';
})

// Select
document.getElementById('select').addEventListener('click', function(){
    canvas.isDrawingMode = false;
})

// Free Draw
document.getElementById('draw').addEventListener('click', function(){
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.width = 5;
    canvas.freeDrawingBrush.color = stroke_color;
    canvas.isDrawingMode = true;
})

// Circle
document.getElementById('circle').addEventListener('click', function(){
    circle = new fabric.Circle({
        radius: 50, stroke: stroke_color, left: 100, top: 100 
    })
    canvas.add(circle);
    canvas.setActiveObject(circle);
})

// Function to get all objects on canvas
function serializeCanvas(c) {
    var canvasJson = JSON.stringify(c);
    console.log(canvasJson);
}
 serializeCanvas(canvas);