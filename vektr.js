$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();
});

// Create a Fabric wrapper around native canvas element and query selector for canvas dimensions
var canvas = document.querySelector('canvas');
var canvas = new fabric.Canvas('canvas', {
});

var circle = new fabric.Circle({
    radius: 20, fill: 'green', left: 100, top: 100
  });
  var triangle = new fabric.Triangle({
    width: 20, height: 30, fill: 'blue', left: 50, top: 50
  });
  
  canvas.add(circle, triangle);