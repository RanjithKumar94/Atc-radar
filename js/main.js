// ==========================================
// main.js - PART 1
// Simulation Clock & Spawn Engine
// ==========================================

// Simulator starts at 03:00:00

let simHour = 3;
let simMinute = 0;
let simSecond = 0;

// 1 real second = 1 simulator second
const SIM_SPEED = 1;

// ------------------------------------------
// Convert HH:MM to minutes
// ------------------------------------------

function timeToMinutes(time){

    const p = time.split(":");

    return parseInt(p[0]) * 60 + parseInt(p[1]);

}

// ------------------------------------------
// Aircraft entry offset
// ------------------------------------------

function entryOffset(type){

    switch(type){

        case "AT72":
        case "ATR72":
        case "DO228":
            return 18;

        default:
            return 14;

    }

}

// ------------------------------------------
// Current simulator time
// ------------------------------------------

function currentMinutes(){

    return simHour * 60 + simMinute;

}

// ------------------------------------------
// Advance simulation clock
// ------------------------------------------

function updateClock(){

    simSecond += SIM_SPEED;

    if(simSecond >= 60){

        simSecond = 0;
        simMinute++;

    }

    if(simMinute >= 60){

        simMinute = 0;
        simHour++;

    }

}

// ------------------------------------------
// Spawn aircraft
// ------------------------------------------

function spawnAircraft(){

    aircraft.forEach(ac=>{

        if(ac.active) return;

        const entryTime =
            timeToMinutes(ac.ccbETA) -
            entryOffset(ac.type);

        if(currentMinutes() >= entryTime){

            ac.active = true;

            ac.distance = 60;

            console.log(
                ac.callsign +
                " entered sector."
            );

        }

    });

}


// ==========================================
// PART 2
// Aircraft Movement
// ==========================================

function moveAircraft(){

    aircraft.forEach(ac=>{

        if(!ac.active) return;

        // Speed (NM per simulated second)
        let moveRate;

        switch(ac.type){

            case "AT72":
            case "ATR72":
                moveRate = 14/1080;      // 18 min from 60 NM
                break;

            case "DO228":
                moveRate = 14/1080;
                break;

            default:
                moveRate = 60/840;       // 14 min from 60 NM
                break;

        }

        // Move towards CCB
        ac.distance -= moveRate;

        // Aircraft reaches CCB
        if(ac.distance <= 0){

            ac.distance = 0;

            // Remove arrival from radar
            if(ac.route!="G473"){

                ac.active=false;

                console.log(ac.callsign+" landed.");

            }
            else{

                // Continue as overflight
                ac.entryRadial = (ac.entryRadial==120)?300:120;

                ac.distance = 0.1;

            }

        }

    });

// ==========================================
// PART 3
// Simulation Loop
// ==========================================

function updateSimulation(){

    // Advance clock
    updateClock();

    // Spawn aircraft when entry time arrives
    spawnAircraft();

    // Move active aircraft
    moveAircraft();

    // Update radar positions
    aircraft.forEach(ac=>{

        if(!ac.active) return;

        const pos = bearingToXY(ac.entryRadial, ac.distance);

        ac.x = pos.x;
        ac.y = pos.y;

    });

}

// ==========================================
// DIGITAL CLOCK
// ==========================================

function formatTime(value){

    return value.toString().padStart(2,"0");

}

function drawClock(){

    ctx.fillStyle="#00ff00";
    ctx.font="20px Consolas";

    ctx.fillText(
        formatTime(simHour)+":"+
        formatTime(simMinute)+":"+
        formatTime(simSecond),
        720,
        30
    );

}

// ==========================================
// START SIMULATOR
// ==========================================

window.onload=function(){

    drawRadar();

    setInterval(function(){

        updateSimulation();

    },1000);

};
    

}
