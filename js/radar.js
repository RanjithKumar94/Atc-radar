const canvas = document.getElementById("radarCanvas");
const ctx = canvas.getContext("2d");

const CX = canvas.width/2;
const CY = canvas.height/2;
const R = 400;

function drawRadar(){

ctx.clearRect(0,0,canvas.width,canvas.height);

// Background
ctx.fillStyle="#001100";
ctx.fillRect(0,0,canvas.width,canvas.height);

// Rings
ctx.strokeStyle="#00ff66";

for(let i=1;i<=4;i++){
ctx.beginPath();
ctx.arc(CX,CY,R*i/4,0,Math.PI*2);
ctx.stroke();
}

// Cross
ctx.beginPath();
ctx.moveTo(CX-R,CY);
ctx.lineTo(CX+R,CY);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(CX,CY-R);
ctx.lineTo(CX,CY+R);
ctx.stroke();

// Runway
ctx.lineWidth=3;
ctx.beginPath();
ctx.moveTo(CX-70,CY);
ctx.lineTo(CX+70,CY);
ctx.stroke();

ctx.fillStyle="#00ff66";
ctx.font="16px Arial";
ctx.fillText("08",CX-90,CY-8);
ctx.fillText("26",CX+75,CY-8);

// Aircraft
aircraft.forEach(ac=>{

// Radar target
ctx.fillStyle="#00ff66";
ctx.beginPath();
ctx.arc(ac.x,ac.y,4,0,Math.PI*2);
ctx.fill();

// Leader line
ctx.beginPath();
ctx.moveTo(ac.x,ac.y);
ctx.lineTo(ac.x+30,ac.y-25);
ctx.stroke();

// Label
ctx.font="13px monospace";

ctx.fillText(ac.callsign,ac.x+35,ac.y-35);
ctx.fillText("FL"+ac.level+"→"+ac.assignedLevel,ac.x+35,ac.y-20);
ctx.fillText("HDG"+ac.heading+"→"+ac.assignedHeading,ac.x+35,ac.y-5);
ctx.fillText(ac.speed+"KT",ac.x+35,ac.y+10);

});

requestAnimationFrame(drawRadar);

}

drawRadar();
