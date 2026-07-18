// ===============================
// CCB VOR (300 m south of runway midpoint)
// ===============================

const CCB = {
    x: 450,
    y: 470
};

// ===============================
// ATS ROUTES
// ===============================

const routes = {

    // Bidirectional
    B425: {
        name: "B425",
        radial: 190,
        bidirectional: true,
        arrival: true,
        departure: true
    },

    W14: {
        name: "W14",
        radial: 350,
        bidirectional: true,
        arrival: true,
        departure: true
    },

    G473: {
        name: "G473",
        inbound: 300,
        outbound: 120,
        viaCCB: true,
        bidirectional: true,
        arrival: true,
        departure: true
    },

    R416: {
        name: "R416",
        radial: 70,
        bidirectional: true,
        arrival: true,
        departure: true
    },

    Q1: {
        name: "Q1",
        radial: 252,
        bidirectional: true,
        arrival: true,
        departure: false      // Sector rule
    },

    Q2: {
        name: "Q2",
        radial: 270,
        bidirectional: false,
        arrival: false,
        departure: true       // Departure only
    }

};

// ===============================
// Draw ATS routes
// ===============================

function drawRoutes(ctx) {

    ctx.strokeStyle = "#006600";
    ctx.lineWidth = 1;

    Object.values(routes).forEach(route => {

        if(route.name === "G473"){

            drawRadial(route.inbound);
            drawRadial(route.outbound);

        }else{

            drawRadial(route.radial);

        }

    });

}

function drawRadial(radial){

    let angle = (radial - 90) * Math.PI / 180;

    ctx.beginPath();
    ctx.moveTo(CCB.x, CCB.y);

    ctx.lineTo(
        CCB.x + Math.cos(angle) * 400,
        CCB.y + Math.sin(angle) * 400
    );

    ctx.stroke();

}
