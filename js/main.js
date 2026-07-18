function moveAircraft() {

    aircraft.forEach(ac => {

        // Turn towards assigned heading
        if (ac.heading !== ac.assignedHeading) {

            let diff = (ac.assignedHeading - ac.heading + 360) % 360;

            if (diff > 180)
                ac.heading -= 1;
            else
                ac.heading += 1;

            if (ac.heading < 0) ac.heading += 360;
            if (ac.heading >= 360) ac.heading -= 360;
        }

        // Convert aviation heading to canvas angle
        let rad = (ac.heading - 90) * Math.PI / 180;

        ac.x += Math.cos(rad) * 1.2;
        ac.y += Math.sin(rad) * 1.2;

        // Climb/descend
        if (ac.level < ac.assignedLevel) ac.level++;
        if (ac.level > ac.assignedLevel) ac.level--;
    });

}

setInterval(moveAircraft,100);
