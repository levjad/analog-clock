var canvas = document.getElementById('clock');
var ctx = canvas.getContext('2d');
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.9;

function drawClock() {
	drawFace();
	drawNumbers();
	updateTime();
}

function drawFace() {
	ctx.beginPath();
	ctx.arc(0, 0, radius, 0, 2 * Math.PI);
	ctx.fillStyle = 'white';
	ctx.fill();

	ctx.beginPath();
	ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
	ctx.fillStyle = 'black';
	ctx.fill();
}

function drawNumbers() {
	var ang;
	var num;
	ctx.font = radius * 0.15 + 'px arial';
	ctx.textBaseline = 'middle';
	ctx.textAlign = 'center';
	for (num = 1; num < 13; num++) {
		ang = num * Math.PI / 6;
		ctx.rotate(ang);
		ctx.translate(0, -radius * 0.85);
		ctx.rotate(-ang);
		ctx.fillText(num.toString(), 0, 0);
		ctx.rotate(ang);
		ctx.translate(0, radius * 0.85);
		ctx.rotate(-ang);
	}
}

function updateTime() {
	var time = new Date();
	var h = time.getHours();
	var m = time.getMinutes();
	var s = time.getSeconds();
	h = h % 12;
	h = h * Math.PI / 6 + m * Math.PI / (6 * 60) + s * Math.PI / (360 * 60);
	drawPointer(h, radius * 0.5, radius * 0.07, 'black');
	m = m * Math.PI / 30 + s * Math.PI / (30 * 60);
	drawPointer(m, radius * 0.8, radius * 0.07, 'black');
	s = s * Math.PI / 30;
	drawPointer(s, radius * 0.9, radius * 0.02, 'red');
	console.log('Stunde: ' + h + ' Minuten ' + m + ' Sekunden ' + s);
}

function drawPointer(pos, length, width, color) {
	ctx.beginPath();
	ctx.lineWidth = width;
	ctx.lineCap = 'round';
	ctx.moveTo(0, 0);
	ctx.rotate(pos);
	ctx.lineTo(0, -length);
	ctx.strokeStyle = color;
	ctx.stroke();
	ctx.rotate(-pos);
}

setInterval(drawClock, 1000);
