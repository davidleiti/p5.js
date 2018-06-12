var noParticles = 100;
var swarm;
var controller;
var scoreLabel;

function setup(){
    createCanvas(700, 700);
    swarm = new Swarm(100, -350, 350, -350, 350);
    controller = new Controller(swarm, 0.3, 1.0, 2.5);
    scoreLabel = document.getElementById("lowestFitness");
}

function draw(){
    background(51);
    stroke(255);
    line(width / 2, 0, width / 2, height);
    line(0, height / 2, width, height / 2);
    controller.updateVelocities();
    for (particle of swarm.population) {
        particle.move();
        drawParticle(particle);
    }
    scoreLabel.innerHTML = "Lowest fitness score: " + controller.bestFitness();
}

function drawParticle(particle){
    ellipse(particle.pos.x + 350, height - (particle.pos.y + 350), 10);
}

mouseClicked = function(){
    setup();
}
