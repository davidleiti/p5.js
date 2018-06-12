class Controller{
    constructor(swarm, w, c1, c2){
        this.swarm = swarm;
        this.w = w;
        this.c1 = c1;
        this.c2 = c2;
    }

    updateVelocities(){
        let bestNeighbors = []
        let neighborhoods = this.swarm.getNeighbourhoods(50);
        for (var i = 0; i < this.swarm.population.length; i++) {
            let localNeighbors = neighborhoods[i];
            localNeighbors.sort(function(a, b){
                return (a.fitness < b.fitness) ? -1 : ((a.fitness > b.fitness) ? 1 : 0);
            })
            bestNeighbors.push(localNeighbors[0]);
        }

        for (var i = 0; i < this.swarm.population.length; i++) {
            let newVelX = this.w * this.swarm.population[i].velocity.x;

            //change velocity based on best neighbour
            newVelX = newVelX + this.c1 * Math.random() * (bestNeighbors[i].pos.x - this.swarm.population[i].pos.x);

            //change velocity based on best past value
            newVelX = newVelX + this.c2 * Math.random() * (this.swarm.population[i].bestPos.x - this.swarm.population[i].pos.x);

            //apply weight to current velocity
            let newVelY = this.w * this.swarm.population[i].velocity.y;

            //change velocity based on best neighbour
            newVelY = newVelY + this.c1 * Math.random() * (bestNeighbors[i].pos.y - this.swarm.population[i].pos.y);
            newVelY = newVelY + this.c2 * Math.random() * (this.swarm.population[i].bestPos.y - this.swarm.population[i].pos.y);

            this.swarm.population[i].velocity.x = newVelX;
            this.swarm.population[i].velocity.y = newVelY;
        }
    }

    bestFitness(){
        let values = [];
        for (particle of this.swarm.population) {
            values.push(particle.fitness)
        }
        sort(values);
        return values[0];
    }
}
