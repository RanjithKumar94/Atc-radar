
const canvas = document.getElementById("radarCanvas");
const ctx = canvas.getContext("2d");

const W = canvas.width;
const H = canvas.height;

const CX = W / 2;
const CY = H / 2;

const RADIUS = 400;

function drawRadar(){

ctx.clearRect(0,0,W,H);

// Background
ctx.fillStyle="#001100";
ctx.fillRect(0,0,W,H);

// Range Rings
ctx.strokeStyle="#00ff66";
ctx.lineWidth=1;

for(let i=1;i<=4;i++){

ctx.beginPath();
ctx.arc(CX,CY,RADIUS*i/4,0,Math.PI*2);
ctx.stroke();

}

// Cross

ctx.beginPath();
ctx.moveTo(CX-RADIUS,CY);
ctx.lineTo(CX+RADIUS,CY);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(CX,CY-RADIUS);
ctx.lineTo(CX,CY+RADIUS);
ctx.stroke();

// Runway 08/26

ctx.lineWidth=4;

ctx.beginPath();
ctx.moveTo(CX-70,CY);
ctx.lineTo(CX+70,CY);
ctx.stroke();

ctx.fillStyle="#00ff66";
ctx.font="18px Arial";

ctx.fillText("08",CX-95,CY-10);
ctx.fillText("26",CX+75,CY-10);

requestAnimationFrame(drawRadar);

}

drawRadar();
