const CCB = {
    x: 450,
    y: 470
};

const ROUTES = [
    {name:"B425", bearings:[190]},
    {name:"W14", bearings:[350]},
    {name:"G473", bearings:[300,120]},
    {name:"R416", bearings:[70]},
    {name:"Q1", bearings:[252]},
    {name:"Q2", bearings:[270]}
];

function drawRoutes(ctx){

    ctx.strokeStyle="#009900";
    ctx.lineWidth=1;

    ROUTES.forEach(route=>{

        route.bearings.forEach(bearing=>{

            let a=(bearing-90)*Math.PI/180;

            ctx.beginPath();
            ctx.moveTo(CCB.x,CCB.y);

            ctx.lineTo(
                CCB.x+Math.cos(a)*420,
                CCB.y+Math.sin(a)*420
            );

            ctx.stroke();

            ctx.fillStyle="#00ff66";
            ctx.font="12px Arial";

            ctx.fillText(
                route.name,
                CCB.x+Math.cos(a)*220,
                CCB.y+Math.sin(a)*220
            );

        });

    });

    // Draw CCB VOR
    ctx.fillStyle="#00ffff";
    ctx.beginPath();
    ctx.arc(CCB.x,CCB.y,5,0,Math.PI*2);
    ctx.fill();

    ctx.fillStyle="#00ffff";
    ctx.fillText("CCB",CCB.x+8,CCB.y-8);

}
