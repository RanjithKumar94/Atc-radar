// =========================
// SIMULATION CLOCK
// =========================

let simHour = 2;
let simMinute = 55;
let simSecond = 0;

// Aircraft not active initially
aircraft.forEach(ac=>{
    ac.active=false;
});

// =========================
// TIME FUNCTIONS
// =========================

function toMinutes(t){

    let p=t.split(":");

    return parseInt(p[0])*60+parseInt(p[1]);

}

function spawnOffset(type){

    switch(type){

        case "AT72":
        case "DO228":
            return 18;

        default:
            return 14;

    }

}

function updateClock(){

    simSecond++;

    if(simSecond==60){

        simSecond=0;
        simMinute++;

    }

    if(simMinute==60){

        simMinute=0;
        simHour++;

    }

}

function checkSpawn(){

    let current=simHour*60+simMinute;

    aircraft.forEach(ac=>{

        if(ac.active) return;

        let spawn=toMinutes(ac.ccbETA)-spawnOffset(ac.type);

        if(current>=spawn){

            ac.active=true;

            ac.distance=60;

        }

    });

}

// =========================
// AIRCRAFT MOVEMENT
// =========================

function moveAircraft(){

    updateClock();

    checkSpawn();

    aircraft.forEach(ac=>{

        if(!ac.active) return;

        if(ac.direction=="INBOUND")
            ac.distance-=0.08;

        else
            ac.distance+=0.08;

    });

    updateAircraftPosition();

}

// =========================
// START
// =========================

window.onload=function(){

    updateAircraftPosition();

    drawRadar();

    setInterval(moveAircraft,1000);

};
