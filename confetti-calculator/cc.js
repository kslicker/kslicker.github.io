//// Confetti Effect ////
var myCanvas = document.createElement('canvas');
myCanvas.style.position = 'absolute';
myCanvas.style.top = 0;
myCanvas.style.left = 0;
myCanvas.style.width = '100%';
myCanvas.style.height = '100%';
myCanvas.style.pointerEvents = 'none';
myCanvas.style.zIndex = 9999;
document.body.appendChild(myCanvas);


var myConfetti = confetti.create(myCanvas, {
  resize: true,
  useWorker: true
});

// This function is called everytime a button is pressed
function makeConfetti(e) {
    myConfetti({
        particleCount: 50,
        startVelocity: 30,
        spread: 50,
        origin: {
            x: e.clientX / window.innerWidth,
            // since they fall down, start a bit higher than random
            y: e.clientY / window.innerHeight
            }
        });
}


//// Button listeners ////
document.getElementById('C').addEventListener('click', function(e) {
    document.getElementById('display').innerText = "";
    makeConfetti(e);
});

document.getElementById('/').addEventListener('click', function(e) {
    document.getElementById('display').innerText += "/";
    makeConfetti(e);
});

document.getElementById('7').addEventListener('click', function(e) {
    document.getElementById('display').innerText += "7";
    makeConfetti(e);
});

document.getElementById('8').addEventListener('click', function(e) {
    document.getElementById('display').innerText += "8";
    makeConfetti(e);
});

document.getElementById('9').addEventListener('click', function(e) {
    document.getElementById('display').innerText += "9";
    makeConfetti(e);
});

document.getElementById('x').addEventListener('click', function(e) {
    document.getElementById('display').innerText += "*";
    makeConfetti(e);
});

document.getElementById('4').addEventListener('click', function(e) {
    document.getElementById('display').innerText += "4";
    makeConfetti(e);
});

document.getElementById('5').addEventListener('click', function(e) {
    document.getElementById('display').innerText += "5";
    makeConfetti(e);
});

document.getElementById('6').addEventListener('click', function(e) {
    document.getElementById('display').innerText += "6";
    makeConfetti(e);
});

document.getElementById('-').addEventListener('click', function(e) {
    document.getElementById('display').innerText += "-";
    makeConfetti(e);
});

document.getElementById('1').addEventListener('click', function(e) {
    document.getElementById('display').innerText += "1";
    makeConfetti(e);
});

document.getElementById('2').addEventListener('click', function(e) {
    document.getElementById('display').innerText += "2";
    makeConfetti(e);
});

document.getElementById('3').addEventListener('click', function(e) {
    document.getElementById('display').innerText += "3";
    makeConfetti(e);
});

document.getElementById('+').addEventListener('click', function(e) {
    document.getElementById('display').innerText += "+";
    makeConfetti(e);
});

document.getElementById('0').addEventListener('click', function(e) {
    document.getElementById('display').innerText += "0";
    makeConfetti(e);
});

document.getElementById('.').addEventListener('click', function(e) {
    document.getElementById('display').innerText += ".";
    makeConfetti(e);
});

document.getElementById('=').addEventListener('click', function(e) {
    const result = math.evaluate(document.getElementById('display').textContent);
    makeConfetti(e);

    if (result == undefined) {
        document.getElementById('display').innerText = " ";
    } else if (result != undefined) {
        document.getElementById('display').innerText = result;
    } else {
        document.getElementById('display').innerText = "invalid";
    }
    
});

