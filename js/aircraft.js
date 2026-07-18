const aircraft = [

{
callsign:"VUAYA",
type:"B737",
route:"B425",
from:"VOTV",
direction:"INBOUND",
distance:60,
level:180,
assignedLevel:180,
heading:10,
assignedHeading:10,
speed:280,
ssr:"5062"
},

{
callsign:"VTI440",
type:"A320",
route:"W14",
from:"VIDP",
direction:"INBOUND",
distance:60,
level:180,
assignedLevel:180,
heading:170,
assignedHeading:170,
speed:280,
ssr:"5067"
},

{
callsign:"IGO201",
type:"AT72",
route:"W14",
from:"VIGR",
direction:"INBOUND",
distance:60,
level:110,
assignedLevel:110,
heading:170,
assignedHeading:170,
speed:210,
ssr:"5065"
},

{
callsign:"MAS103",
type:"B747",
route:"G473",
from:"WMKK",
direction:"INBOUND",
distance:60,
level:180,
assignedLevel:180,
heading:300,
assignedHeading:300,
speed:300,
ssr:"5050"
},

{
callsign:"IGO116",
type:"AT72",
route:"G473",
from:"VAAH",
direction:"OVERFLIGHT",
distance:60,
level:110,
assignedLevel:100,
heading:120,
assignedHeading:120,
speed:210,
ssr:"----"
},

{
callsign:"VTI812",
type:"A320",
route:"R416",
from:"VECC",
direction:"INBOUND",
distance:60,
level:180,
assignedLevel:180,
heading:250,
assignedHeading:250,
speed:280,
ssr:"5063"
},

{
callsign:"SEJ168",
type:"B737",
route:"Q1",
from:"VAPO",
direction:"INBOUND",
distance:60,
level:180,
assignedLevel:180,
heading:72,
assignedHeading:72,
speed:285,
ssr:"2000"
},

{
callsign:"VTDVI",
type:"DO228",
route:"B425",
from:"VOCB",
direction:"INBOUND",
distance:60,
level:110,
assignedLevel:110,
heading:10,
assignedHeading:10,
speed:170,
ssr:"5013"
}

];
// ===================================
// ROUTE TO RADAR POSITION
// ===================================

function routeBearing(ac){

    switch(ac.route){

        case "B425":
            return 190;

        case "W14":
            return 350;

        case "R416":
            return 70;

        case "Q1":
            return 252;

        case "Q2":
            return 270;

        case "G473":

            if(ac.heading>=180)
                return 300;
            else
                return 120;

        default:
            return 0;

    }

}

function updateAircraftPosition(){

    aircraft.forEach(ac=>{

        let bearing=routeBearing(ac);

        let angle=(bearing-90)*Math.PI/180;

        ac.x=CCB.x+Math.cos(angle)*(ac.distance*6.5);
        ac.y=CCB.y+Math.sin(angle)*(ac.distance*6.5);

    });

}
