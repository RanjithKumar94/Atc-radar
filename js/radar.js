const canvas = document.getElementById("radarCanvas");
const ctx = canvas.getContext("2d");

const CX = canvas.width / 2;
const CY = canvas.height / 2;
const RADIUS = 400;

// ------------------------------
// AIRPORT
// ------------------------------

const RUNWAY = {
    heading: 80,
    length: 160
};

const CCB = {
    x: CX,
    y: CY + 12    // ~300 m south of runway midpoint
};

// ------------------------------
// ROUTES
// ------------------------------

const ROUTES = [

    {
        name: "B425",
        bearings: [190]
    },

    {
        name: "W14",
        bearings: [350]
    },

    {
        name: "G473",
        bearings: [300,120]
    },

    {
        name: "R416",
        bearings: [70]
    },

    {
        name: "Q1",
        bearings: [252]
    },

    {
        name: "Q2",
        bearings: [270]
    }

];

function bearingToXY(bearing, distance){

    const angle = (bearing - 90) * Math.PI / 180;

    return {

        x: CCB.x + Math.cos(angle) * distance,
        y: CCB.y + Math.sin(angle) * distance

    };

}

function drawBackground(){

    ctx.fillStyle="#001100";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.strokeStyle="#00aa44";
    ctx.lineWidth=1;

    for(let i=1;i<=6;i++){

        ctx.beginPath();
        ctx.arc(CX,CY,(RADIUS/6)*i,0,Math.PI*2);
        ctx.stroke();

    }

    ctx.beginPath();
    ctx.moveTo(CX-RADIUS,CY);
    ctx.lineTo(CX+RADIUS,CY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(CX,CY-RADIUS);
    ctx.lineTo(CX,CY+RADIUS);
    ctx.stroke();

} 
// ------------------------------
// RUNWAY
// ------------------------------

function drawRunway(){

    const angle = (RUNWAY.heading - 90) * Math.PI / 180;

    const x1 = CX - Math.cos(angle) * RUNWAY.length / 2;
    const y1 = CY - Math.sin(angle) * RUNWAY.length / 2;

    const x2 = CX + Math.cos(angle) * RUNWAY.length / 2;
    const y2 = CY + Math.sin(angle) * RUNWAY.length / 2;

    ctx.strokeStyle="#ffffff";
    ctx.lineWidth=4;

    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();

    ctx.fillStyle="#ffffff";
    ctx.font="15px Arial";

    ctx.fillText("08",x1-20,y1+8);
    ctx.fillText("26",x2+8,y2+8);

}

// ------------------------------
// CCB VOR
// ------------------------------

function drawCCB(){

    ctx.fillStyle="#00ffff";

    ctx.beginPath();
    ctx.arc(CCB.x,CCB.y,5,0,Math.PI*2);
    ctx.fill();

    ctx.font="13px Arial";
    ctx.fillText("CCB",CCB.x+8,CCB.y-8);

}

// ------------------------------
// ATS ROUTES
// ------------------------------

function drawRoutes(){

    ctx.strokeStyle="#00ff66";
    ctx.lineWidth=1;

    ROUTES.forEach(route=>{

        route.bearings.forEach(bearing=>{

            const p = bearingToXY(bearing,RADIUS);

            ctx.beginPath();
            ctx.moveTo(CCB.x,CCB.y);
            ctx.lineTo(p.x,p.y);
            ctx.stroke();

            const t = bearingToXY(bearing,RADIUS-40);

            ctx.fillStyle="#00ff66";
            ctx.font="12px Arial";
            ctx.fillText(route.name,t.x,t.y);

        });

    });

}
// ------------------------------
// RADAR SWEEP
// ------------------------------

//functionction sweepAngle =ion
//drawSweep drawSweep(){

    const angle = (sweepAngle - 90) * Math.PI / 180;

    ctx.strokeStyle="#00ff00";
    ctx.lineWidth=2;

    ctx.beginPath();
    ctx.moveTo(CX,CY);
    ctx.lineTo(
        CX + Math.cos(angle) * RADIUS,
        CY + Math.sin(angle) * RADIUS
    );
    ctx.stroke();

    sweepAngle += 1;

    if(sweepAngle >= 360)
        sweepAngle = 0;

}

// ------------------------------
// AIRCRAFT
// ------------------------------

function drawAircraft(){

    ctx.font="12px monospace";

    aircraft.forEach(ac=>{

        // Aircraft target
        ctx.fillStyle="#00ff66";

        ctx.beginPath();
        ctx.arc(ac.x,ac.y,4,0,Math.PI*2);
        ctx.fill();

        // Leader line
        ctx.strokeStyle="#00ff66";

        ctx.beginPath();
        ctx.moveTo(ac.x,ac.y);
        ctx.lineTo(ac.x+28,ac.y-24);
        ctx.stroke();

        // Label
        ctx.fillStyle="#00ff66";

        ctx.fillText(ac.callsign,ac.x+32,ac.y-36);
        ctx.fillText(
            "FL"+ac.level+"→"+ac.assignedLevel,
            ac.x+32,
            ac.y-22
        );

        ctx.fillText(
            "HDG"+ac.heading+"→"+ac.assignedHeading,
            ac.x+32,
            ac.y-8
        );

        ctx.fillText(
            ac.speed+"KT",
            ac.x+32,
            ac.y+6
        );

    });

}

// ------------------------------
// MAIN DRAW FUNCTION
// ------------------------------

function drawRadar(){

    drawBackground();

    drawRunway();

    drawCCB();

    drawRoutes();

    drawAircraft();

    drawSweep();

    requestAnimationFrame(drawRadar);

}

drawRadar();
