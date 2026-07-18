function moveAircraft() {

    aircraft.forEach(ac => {

        // Turn towards assigned heading
        let diff = (ac.assignedHeading - ac.heading + 360) % 360;

        if(diff > 180){
            ac.heading -= 1;
        }else if(diff > 0){
            ac.heading += 1;
        }

        if(ac.heading < 0) ac.heading += 360;
        if(ac.heading >= 360) ac.heading -= 360;

        // Move
        let rad = ac.heading * Math.PI / 180;

        ac.x += Math.sin(rad) * 0.7;
        ac.y -= Math.cos(rad) * 0.7;

        // Climb / Descend
        if(ac.level > ac.assignedLevel){
            ac.level -= 1;
        }

        if(ac.level < ac.assignedLevel){
            ac.level += 1;
        }

    });

}

setInterval(moveAircraft,100);
