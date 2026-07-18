// ==========================================
// ATC RADAR SIMULATOR V2
// radar.js - PART 1
// ==========================================

// Canvas
const canvas = document.getElementById("radar");
const ctx = canvas.getContext("2d");

canvas.width = 900;
canvas.height = 900;

// Radar Centre
const CENTER_X = canvas.width / 2;
const CENTER_Y = canvas.height / 2;

// Radar
const RADAR_RADIUS = 380;
const MAX_RANGE = 60;

// Runway
const RUNWAY_HEADING = 80;
const RUNWAY_LENGTH = 120;

// CCB VOR
// 300 m south of runway midpoint
const CCB = {
    x: CENTER_X,
    y: CENTER_Y + 3
};

// Route colours
const ROUTE_COLOR = "#00ff66";
const LABEL_COLOR = "#00ff66";
const RING_COLOR = "#00ff55";

// ATS Routes
const ROUTES = [

    {
        name:"B425",
        bearing:190
    },

    {
        name:"W14",
        bearing:350
    },

    {
        name:"R416",
        bearing:70
    },

    {
        name:"Q1",
        bearing:252
    },

    {
        name:"Q2",
        bearing:270
    },

    {
        name:"G473 NW",
        bearing:300
    },

    {
        name:"G473 SE",
        bearing:120
    }

];

// ==========================================
// Bearing to Screen Position
// ==========================================

function bearingToXY(bearing,distance){

    const angle=(bearing-90)*Math.PI/180;

    const scale=RADAR_RADIUS/MAX_RANGE;

    return{

        x:CCB.x+Math.cos(angle)*distance*scale,

        y:CCB.y+Math.sin(angle)*distance*scale

    };

}

// ==========================================
// Draw Background
// ==========================================

function drawBackground(){

    ctx.fillStyle="#001100";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.strokeStyle=RING_COLOR;
    ctx.lineWidth=1;

    for(let i=10;i<=60;i+=10){

        ctx.beginPath();

        ctx.arc(
            CCB.x,
            CCB.y,
            i*(RADAR_RADIUS/MAX_RANGE),
            0,
            Math.PI*2
        );

        ctx.stroke();

    }

}
// ==========================================
// Draw Runway
// ==========================================

function drawRunway(){

    const p1 = bearingToXY(260,10);
    const p2 = bearingToXY(80,10);

    ctx.strokeStyle="white";
    ctx.lineWidth=4;

    ctx.beginPath();
    ctx.moveTo(p1.x,p1.y);
    ctx.lineTo(p2.x,p2.y);
    ctx.stroke();

    ctx.fillStyle="white";
    ctx.font="18px Arial";

    ctx.fillText("08",p1.x-22,p1.y+8);
    ctx.fillText("26",p2.x+8,p2.y+8);

}

// ==========================================
// Draw CCB VOR
// ==========================================

function drawCCB(){

    ctx.fillStyle="#00ffff";

    ctx.beginPath();
    ctx.arc(CCB.x,CCB.y,4,0,Math.PI*2);
    ctx.fill();

    ctx.font="16px Arial";
    ctx.fillStyle="#00ffff";

    ctx.fillText("CCB",CCB.x+8,CCB.y-8);

}

// ==========================================
// Draw ATS Routes
// ==========================================

function drawRoutes(){

    ctx.strokeStyle=ROUTE_COLOR;
    ctx.lineWidth=2;

    ROUTES.forEach(route=>{

        const end=bearingToXY(route.bearing,60);

        ctx.beginPath();
        ctx.moveTo(CCB.x,CCB.y);
        ctx.lineTo(end.x,end.y);
        ctx.stroke();

        const label=bearingToXY(route.bearing,56);

        ctx.fillStyle=LABEL_COLOR;
        ctx.font="16px Arial";

        ctx.fillText(route.name,label.x-12,label.y);

    });

}

// ==========================================
// Draw Radar Screen
// ==========================================

function drawRadar(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    drawBackground();

    drawRoutes();

    drawRunway();

    drawCCB();

    drawAircraft();

    requestAnimationFrame(drawRadar);

}

// ==========================================
// Draw Aircraft
// ==========================================

function drawAircraft(){

    if(typeof aircraft==="undefined") return;

    aircraft.forEach(ac=>{

        if(ac.active===false) return;

        // Position from radial & distance
        const pos=bearingToXY(ac.entryRadial,ac.distance);

        ac.x=pos.x;
        ac.y=pos.y;

        // Aircraft target
        ctx.beginPath();
        ctx.arc(ac.x,ac.y,3,0,Math.PI*2);
        ctx.fillStyle="#00ff00";
        ctx.fill();

        // Leader Line
        ctx.beginPath();
        ctx.moveTo(ac.x+4,ac.y-4);
        ctx.lineTo(ac.x+40,ac.y-24);
        ctx.strokeStyle="#00ff00";
        ctx.lineWidth=1;
        ctx.stroke();

        // Callsign
        ctx.fillStyle="#00ff00";
        ctx.font="bold 14px Consolas";
        ctx.fillText(ac.callsign,ac.x+44,ac.y-28);

        // Level
        ctx.font="13px Consolas";
        ctx.fillText(
            "FL"+ac.level,
            ac.x+44,
            ac.y-12
        );

        // Heading
        ctx.fillText(
            "HDG "+String(ac.heading).padStart(3,"0"),
            ac.x+44,
            ac.y+4
        );

        // Speed
        ctx.fillText(
            ac.speed+"KT",
            ac.x+44,
            ac.y+20
        );

    });

}

// ==========================================
// START RADAR
// ==========================================

window.onload=function(){

    drawRadar();

};
