// Mouse over tooltip
$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();
});

// Variables
var stroke_color = 'black';
var counter = 0;

// Create a Fabric wrapper around native canvas element
var canvas = new fabric.Canvas('canvas', {
    backgroundColor:'white'
});

// Add shape for testing purposes 
var circle1 = new fabric.Circle({
    radius: 20, fill: 'green', left: 100, top: 100
  });

var circle2 = new fabric.Circle({
radius: 20, fill: 'blue', left: 200, top: 200
});

var tri = new fabric.Triangle({
    width: 20, height: 30, fill: 'blue', left: 50, top: 50
});

canvas.add(circle1, circle2, tri);

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

//// Event Listeners ////

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
document.getElementById('circle').addEventListener('click touchstart', function(){

    // Check if there is already a circle at this location to avoid overlapping
    //c_objects = canvas.toObject();
    //for (let i = 0; i < c_objects.objects.length; i++) {
    //    if (c_objects.objects[i]['type'] == 'circle' && c_objects.objects[i]['top'] == 100 && c_objects.objects[i]['left'] == 100) {
    //        console.log('gotcha!');
    //    }
    //}

    // Counters to shift circle positioning to avoid overlapping

    circle = new fabric.Circle({
        radius: 50, stroke: stroke_color, fill: 'transparent', left: 100 + counter, top: 100 + counter
    })
    canvas.add(circle);
    canvas.setActiveObject(circle);
    counter += 10;
})
