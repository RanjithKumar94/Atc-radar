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

// Runway 08/26
ctx.lineWidth = 4;

let rwAngle = (80 - 90) * Math.PI / 180;
let len = 80;

let x1 = CX - Math.cos(rwAngle) * len;
let y1 = CY - Math.sin(rwAngle) * len;

let x2 = CX + Math.cos(rwAngle) * len;
let y2 = CY + Math.sin(rwAngle) * len;

ctx.beginPath();
ctx.moveTo(x1, y1);
ctx.lineTo(x2, y2);
ctx.stroke();

ctx.font = "16px Arial";
ctx.fillStyle = "#00ff66";
ctx.fillText("08", x1 - 18, y1 + 5);
ctx.fillText("26", x2 + 5, y2 + 5);
const radials = [70,88,120,190,252,270,300,350];

ctx.lineWidth = 1;
    
drawRoutes(ctx);

// Draw CCB VOR
ctx.fillStyle = "#00ffff";

ctx.beginPath();
ctx.arc(CCB.x, CCB.y, 5, 0, Math.PI * 2);
ctx.fill();

ctx.fillText("CCB", CCB.x + 8, CCB.y - 8);
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
const radials = [70,88,120,190,252,270,300,350];

ctx.lineWidth = 1;

radials.forEach(r => {

    let a = (r - 90) * Math.PI / 180;

    ctx.beginPath();
    ctx.moveTo(CX,CY);
    ctx.lineTo(
        CX + Math.cos(a)*R,
        CY + Math.sin(a)*R
    );
    ctx.stroke();

});
drawRadar();
