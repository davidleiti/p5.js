class Particle{
    constructor(xmin, xmax, ymin, ymax){
        this.pos = createVector(Math.random() * (xmax - xmin) + xmin, Math.random() * (ymax - ymin) + ymin);
        this.velocity = createVector(0,0);
        this.fitness = this.calculateFitness();

        // Information about the best point found so far by the particle
        this.bestVal = this.fitness;
        this.bestPos = createVector(this.pos.x, this.pos.y);

        // Necessary so that particles don't stray away from the search space
        this.bounds = {
            xmin: xmin,
            xmax: xmax,
            ymin: ymin,
            ymax: ymax
        };
    }

    // Ackley's function, see: https://www.sfu.ca/~ssurjano/ackley.html
    calculateFitness(){
        let first = -20 * Math.exp(-0.2 * Math.sqrt(0.5 * (this.pos.x ** 2 + this.pos.y ** 2)));
        let second = Math.exp(0.5 * (Math.cos(2 * Math.PI * this.pos.x) + Math.cos(2 * Math.PI * this.pos.y)));
        let val = first - second + Math.exp(1) + 20;
        return val;
    }

    // Moves the particle in the plane based on its velocity and updates its history
    move(){
        let x = this.pos.x + this.velocity.x;
        let y = this.pos.y + this.velocity.y;
        if (x >= this.bounds.xmax || x <= this.bounds.xmin || y >= this.bounds.ymax || y <= this.bounds.ymin){
            x = random(this.bounds.xmin, this.bounds.xmax);
            y = random(this.bounds.ymin + this.bounds.ymax);
        }
        this.pos.y = y;
        this.pos.x = x;
        this.fitness = this.calculateFitness();
        if (this.fitness < this.bestVal){
            this.bestVal = this.fitness;
            this.bestPos = this.pos;
        }
    }

    // Euclidean distance, for obvious reasons (the search space is the plane itself)
    relativeDistance(particle){
        let deltaX = (particle.pos.x - this.pos.x) ** 2;
        let deltaY = (particle.pos.y - this.pos.y) ** 2;
        return Math.sqrt(deltaX + deltaY)
    }
}
