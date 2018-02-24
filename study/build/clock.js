/**
 * Created by huangxiquan on 17/4/1.
 */

console.log('hahah');

var clock = document.getElementById('clock');
var canvas = clock.getContext('2d');
var width = clock.width;
var radius = width / 2;
var rem = width / 200;



setInterval(start,1000)

function start() {
    canvas.clearRect(0,0,width,width);
    canvas.save()
    drawBg();
    drawNumber();
    drawScales();
    var now = new Date();
    var hour = now.getHours();
    var min = now.getMinutes();
    var sec = now.getSeconds();
    drawHour(hour,min);
    drawMin(min);
    drawSec(sec);
    canvas.restore()
}

function drawSec(sec) {
    canvas.save();
    var rad = 2 * Math.PI / 60 * sec;
    canvas.rotate(rad);
    canvas.fillStyle = "#c14543"
    canvas.moveTo(-2 * rem,10 * rem);
    canvas.lineWidth = 1 * rem;
    canvas.lineTo(-1 * rem,-80 * rem);
    canvas.lineTo(1 * rem,-80 * rem);
    canvas.lineTo(2 * rem,10 * rem);
    canvas.lineTo(-2 * rem,10 * rem);
    canvas.fill()
    canvas.restore();
}

function drawMin(min) {
    canvas.save();
    var rad = 2 * Math.PI / 60 * min;
    canvas.rotate(rad);
    canvas.beginPath();
    canvas.moveTo(0,10 * rem);
    canvas.lineWidth = 3 * rem;
    canvas.lineTo(0,-70 * rem);
    canvas.stroke();
    canvas.restore();
}

function drawHour(hour,min) {
    canvas.save();
    var rad = 2 * Math.PI / 12 * hour;
    var minRad = 2 * Math.PI / 12 / 60 * min;
    canvas.rotate(rad + minRad);
    canvas.beginPath();
    canvas.lineCap = "round";
    canvas.lineWidth = 5*rem;
    canvas.moveTo(0,10*rem);
    canvas.lineTo(0, -50 * rem);
    canvas.stroke();
    canvas.restore()
}


function drawScales() {
    for (var i = 0 ; i < 60 ; i++) {
        var rad = 2 * Math.PI / 60 * i;
        var x = Math.cos(rad) * (radius - 15*rem);
        var y = Math.sin(rad) * (radius - 15*rem);
        canvas.beginPath();
        if(i % 5 == 0) {
            canvas.fillStyle = "#000";
        }else {
            canvas.fillStyle = "#CCC";
        }
        canvas.arc(x,y,2*rem,0,2*Math.PI,false);
        canvas.fill();
    }
}

function drawNumber() {
    var numbers = [3,4,5,6,7,8,9,10,11,12,1,2];
    canvas.textAlign ="center";
    canvas.textBaseline = "middle";
    canvas.font = 18 * rem + 'px Arial';
    numbers.forEach((number,index) => {
        var rad = 2 * Math.PI / 12 * index;
        var x = Math.cos(rad) * (radius - 30*rem);
        var y = Math.sin(rad) * (radius - 30*rem);
        canvas.fillText(number + "",x,y);
    })
}

function drawBg() {
    canvas.translate(radius,radius);
    canvas.beginPath();
    canvas.lineWidth = 10 * rem;
    canvas.arc(0,0,radius - 5 * rem,0,2 * Math.PI,false);
    canvas.stroke();
}



