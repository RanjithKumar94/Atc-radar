// ===============================
// MAIN UPDATE LOOP
// ===============================

function moveAircraft() {

    aircraft.forEach(ac => {

        // Move along route
        if (ac.direction === "INBOUND") {

            ac.distance -= 0.08;

        } else {

            ac.distance += 0.08;

        }

        // Aircraft position from route
        updateAircraftPosition();

        // Turn gradually
        if (ac.heading !== ac.assignedHeading) {

            let diff = (ac.assignedHeading - ac.heading + 360) % 360;

            if (diff > 180)
                ac.heading--;
            else
                ac.heading++;

            if (ac.heading < 0) ac.heading += 360;
            if (ac.heading >= 360) ac.heading -= 360;

        }

        // Climb / Descend
        if (ac.level < ac.assignedLevel)
            ac.level++;

        if (ac.level > ac.assignedLevel)
            ac.level--;

        // G473 passes CCB then exits on R120
        if (ac.route === "G473" &&
            ac.direction === "INBOUND" &&
            ac.distance <= 0) {

            ac.direction = "OUTBOUND";

        }

        // Arrivals land
        if (ac.direction === "INBOUND" &&
            ac.distance <= -2) {

            ac.level = 0;
            ac.remove = true;

        }

        // Departures leave sector
        if (ac.direction === "OUTBOUND" &&
            ac.distance >= 60) {

            ac.remove = true;

        }

    });

    // Remove aircraft
    for (let i = aircraft.length - 1; i >= 0; i--) {

        if (aircraft[i].remove) {

            aircraft.splice(i, 1);

        }

    }

}

// ===============================
// START SIMULATION
// ===============================

window.onload = function () {

    updateAircraftPosition();

    drawRadar();

    setInterval(moveAircraft, 100);

};
