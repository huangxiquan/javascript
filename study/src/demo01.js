

var temp = document.getElementById('demo');
var canvas = temp.getContext('2d');

drawBorder();


function drawBorder() {
    canvas.beginPath();

    canvas.rect(0,0,200,100);
    canvas.stroke();
}