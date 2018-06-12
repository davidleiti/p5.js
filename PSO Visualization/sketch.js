var noParticles = 100;
var swarm;
var controller;
var scoreLabel;
var pointLabel;

function setup(){
    createCanvas(700, 700);
    swarm = new Swarm(200, -350, 350, -350, 350);
    controller = new Controller(swarm, 150, 0.7, 1.0, 2.5);
    scoreLabel = document.getElementById("lowestFitness");
    pointLabel = document.getElementById("point");
}

function draw(){
    background(51);
    stroke(255);
    // Coordinate system
    line(width / 2, 0, width / 2, height);
    line(0, height / 2, width, height / 2);

    // Update the velocities for each particle
    controller.updateVelocities();

    // Move the particles in the plain and display them on the canvas
    for (particle of swarm.population) {
        particle.move();
        drawParticle(particle);
    }

    // Display details of the best particle
    let bestParticle = controller.bestParticle();
    scoreLabel.innerHTML = "Lowest fitness score: " + bestParticle.fitness.toString();
    pointLabel.innerHTML = "At point: " + bestParticle.pos.x + ", " + bestParticle.pos.y;
}

// Allign particles to the drawn coordinate system
function drawParticle(particle){
    ellipse(particle.pos.x + width / 2, height - (particle.pos.y + height / 2), 10);
}

// Reset simulation on mouse click
mouseClicked = function(){
    setup();
}
