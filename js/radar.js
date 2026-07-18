// ===============================
// RADAR CONFIGURATION
// ===============================

const canvas = document.getElementById("radar");
const ctx = canvas.getContext("2d");

canvas.width = 900;
canvas.height = 900;

const CENTER_X = canvas.width / 2;
const CENTER_Y = canvas.height / 2;

const RADAR_RADIUS = 380;
const NM_RADIUS = 60;

// ===============================
// CCB VOR
// (300 m south of runway midpoint)
// ===============================

const CCB = {
    x: CENTER_X,
    y: CENTER_Y + 3
};

// ===============================
// RUNWAY 08 / 26
// ===============================

const RUNWAY = {
    heading: 80,
    length: 120
};

// ===============================
// ATS ROUTES
// ===============================

const ROUTES = [

{
name:"B425",
bearing:190,
color:"#00ff66"
},

{
name:"W14",
bearing:350,
color:"#00ff66"
},

{
name:"R416",
bearing:70,
color:"#00ff66"
},

{
name:"Q1",
bearing:252,
color:"#00ff66"
},

{
name:"Q2",
bearing:270,
color:"#00ff66"
},

{
name:"G473_A",
bearing:120,
color:"#00ff66"
},

{
name:"G473_B",
bearing:300,
color:"#00ff66"
}

];

// ===============================
// CONVERT BEARING TO X/Y
// ===============================

function bearingToXY(bearing, distanceNM){

    const angle = (bearing - 90) * Math.PI / 180;

    const scale = RADAR_RADIUS / NM_RADIUS;

    return {
        x: CCB.x + Math.cos(angle) * distanceNM * scale,
        y: CCB.y + Math.sin(angle) * distanceNM * scale
    };

}
// ===============================
// DRAW RADAR RINGS
// ===============================

function drawRadarBackground(){

    ctx.fillStyle = "#001100";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.strokeStyle="#00ff55";
    ctx.lineWidth=1;

    for(let nm=10; nm<=60; nm+=10){

        let r=(RADAR_RADIUS/NM_RADIUS)*nm;

        ctx.beginPath();
        ctx.arc(CCB.x,CCB.y,r,0,Math.PI*2);
        ctx.stroke();

    }

}

// ===============================
// DRAW RUNWAY
// ===============================

function drawRunway(){

    const p1=bearingToXY(260,10);
    const p2=bearingToXY(80,10);

    ctx.strokeStyle="white";
    ctx.lineWidth=4;

    ctx.beginPath();
    ctx.moveTo(p1.x,p1.y);
    ctx.lineTo(p2.x,p2.y);
    ctx.stroke();

    ctx.fillStyle="white";
    ctx.font="22px Arial";

    ctx.fillText("08",p1.x-25,p1.y+10);
    ctx.fillText("26",p2.x+10,p2.y+10);

}

// ===============================
// DRAW CCB
// ===============================

function drawCCB(){

    ctx.fillStyle="#00ffff";

    ctx.beginPath();
    ctx.arc(CCB.x,CCB.y,4,0,Math.PI*2);
    ctx.fill();

    ctx.font="18px Arial";
    ctx.fillStyle="#00ffff";

    ctx.fillText("CCB",CCB.x+8,CCB.y-8);

}

// ===============================
// DRAW ATS ROUTES
// ===============================

function drawRoutes(){

    ctx.strokeStyle="#00ff55";
    ctx.lineWidth=2;

    ROUTES.forEach(route=>{

        const p=bearingToXY(route.bearing,60);

        ctx.beginPath();
        ctx.moveTo(CCB.x,CCB.y);
        ctx.lineTo(p.x,p.y);
        ctx.stroke();

        ctx.fillStyle="#00ff55";
        ctx.font="18px Arial";

        let lx=bearingToXY(route.bearing,56);

        let label=route.name;

        if(route.name==="G473_A" || route.name==="G473_B")
            label="G473";

        ctx.fillText(label,lx.x,lx.y);

    });

}

// ===============================
// DRAW EVERYTHING
// ===============================

function drawRadar(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    drawRadarBackground();

    drawRoutes();

    drawRunway();

    drawCCB();

    drawAircraft();

    requestAnimationFrame(drawRadar);

}
// ===============================
// DRAW AIRCRAFT
// ===============================

function drawAircraft(){

    if(typeof aircraft==="undefined") return;

    aircraft.forEach(ac=>{

        if(ac.active===false) return;

        const pos=bearingToXY(ac.entryRadial,ac.distance);

        ac.x=pos.x;
        ac.y=pos.y;

        // Aircraft target
        ctx.fillStyle="#00ff00";
        ctx.beginPath();
        ctx.arc(ac.x,ac.y,3,0,Math.PI*2);
        ctx.fill();

        // Leader line
        ctx.strokeStyle="#00ff00";
        ctx.lineWidth=1;

        ctx.beginPath();
        ctx.moveTo(ac.x+3,ac.y-3);
        ctx.lineTo(ac.x+35,ac.y-20);
        ctx.stroke();

        // Label
        ctx.fillStyle="#00ff00";
        ctx.font="14px Consolas";

        ctx.fillText(ac.callsign,ac.x+40,ac.y-24);
        ctx.fillText("FL"+ac.level,ac.x+40,ac.y-8);
        ctx.fillText("HDG "+String(ac.heading).padStart(3,"0"),ac.x+40,ac.y+8);
        ctx.fillText(ac.speed+"KT",ac.x+40,ac.y+24);

    });

}
