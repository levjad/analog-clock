const canvas = document.getElementById('clock');
const ctx = canvas.getContext('2d');
let radius = canvas.height / 2;
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
	ctx.fillStyle = document.documentElement.classList.contains('dark') ? 'black' : 'white';
	ctx.fill();

	ctx.beginPath();
	ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
	ctx.fillStyle = document.documentElement.classList.contains('dark') ? 'white' : 'black';
	ctx.fill();
}

function drawNumbers() {
	ctx.font = radius * 0.15 + 'px Arial';
	ctx.textBaseline = 'middle';
	ctx.textAlign = 'center';
	ctx.fillStyle = document.documentElement.classList.contains('dark') ? 'white' : 'black';
	for (let num = 1; num < 13; num++) {
		const ang = num * Math.PI / 6;
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
	const time = new Date();
	const h = time.getHours();
	const m = time.getMinutes();
	const s = time.getSeconds();

	const hour = h % 12;
	const hourAngle = hour * Math.PI / 6 + m * Math.PI / (6 * 60) + s * Math.PI / (360 * 60);
	const minuteAngle = m * Math.PI / 30 + s * Math.PI / (30 * 60);
	const secondAngle = s * Math.PI / 30;

	drawPointer(hourAngle, radius * 0.5, radius * 0.07, document.documentElement.classList.contains('dark') ? 'white' : 'black');
	drawPointer(minuteAngle, radius * 0.8, radius * 0.07, document.documentElement.classList.contains('dark') ? 'white' : 'black');
	drawPointer(secondAngle, radius * 0.9, radius * 0.02, 'red');
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

function animate() {
	ctx.clearRect(-radius, -radius, canvas.width, canvas.height);
	drawClock();
	requestAnimationFrame(animate);
}

animate();
