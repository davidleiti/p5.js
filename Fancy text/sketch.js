var font;
var vehicles = []
var points = []
var displayText = "text";

function preload() {
    font = loadFont("soloist.ttf");
}

function setup() {
    createCanvas(1200, 600);
    reset();
}

function reset(){
    x = ceil(displayText.length / 2);
    textSize(256 - (displayText.length * 9));
    points = font.textToPoints(displayText, max(0, width / 2 - (x * 150)), 400);
    vehicles = [];
    for (let p of points){
        vehicles.push(new Vehicle(p.x, p.y))
    }
}

function draw() {
    background(51);
    vehicles.forEach(function(vehicle){
        vehicle.adjustMovement();
        vehicle.update();
        vehicle.display();
    });
}

// Modify displayed text to show user input
function buttonHandler(){
    displayText = document.getElementById("t").value;
    reset();
}
