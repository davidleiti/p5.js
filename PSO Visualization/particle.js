class Particle{
    constructor(xmin, xmax, ymin, ymax){
        this.pos = createVector(Math.random() * (xmax - xmin) + xmin, Math.random() * (ymax - ymin) + ymin);
        this.bounds = {
            xmin: xmin,
            xmax: xmax,
            ymin: ymin,
            ymax: ymax
        };
        this.velocity = createVector(0,0);
        this.fitness = this.calculateFitness();
        this.bestVal = this.fitness;
        this.bestPos = createVector(this.pos.x, this.pos.y);
    }

    calculateFitness(){
        let first = -20 * Math.exp(-0.2 * Math.sqrt(0.5 * (this.pos.x ** 2 + this.pos.y ** 2)));
        let second = Math.exp(0.5 * (Math.cos(2 * Math.PI * this.pos.x) + Math.cos(2 * Math.PI * this.pos.y)));
        let val = first - second + Math.exp(1) + 20;
        return val;
    }

    move(){
        let x = this.pos.x + this.velocity.x;
        let y = this.pos.y + this.velocity.y;
        if (x >= this.bounds.xmax || x <= this.bounds.xmin || y >= this.bounds.ymax || y <= this.bounds.ymin){
            x = random(this.bounds.xmin, this.bounds.xmax);
            y = random(this.bounds.ymin + this.bounds.ymax);
            console.log("x: ", x, "y: ", y);
        }
        this.pos.y = y;
        this.pos.x = x;
        this.fitness = this.calculateFitness();
        if (this.fitness < this.bestVal){
            this.bestVal = this.fitness;
            this.bestPos = this.pos;
        }
    }

    relativeDistance(particle){
        let deltaX = (particle.pos.x - this.pos.x) ** 2;
        let deltaY = (particle.pos.y - this.pos.y) ** 2;
        return Math.sqrt(deltaX + deltaY)
    }
}
