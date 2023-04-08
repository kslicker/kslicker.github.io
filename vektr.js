// Mouse over tooltip
$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();
});

// Create a Fabric wrapper around native canvas element
var canvas = new fabric.Canvas('canvas', {
    backgroundColor:'white'
});

var circle = new fabric.Circle({
    radius: 20, fill: 'green', left: 100, top: 100
  });
  var triangle = new fabric.Triangle({
    width: 20, height: 30, fill: 'blue', left: 50, top: 50
  });
var line = new fabric.Line((20,20,50,50),{
    strokeWidth: 4, stroke: 'black'
  });
  
canvas.add(circle, triangle, line);

// Update Fabric canvas size
//   window.setInterval(() => {
//    canvas.setDimensions({
//        width: document.getElementById('canvas-div').clientWidth - 70,
//        height: document.getElementById('canvas-div').clientHeight
//    }, 1000);
//});
