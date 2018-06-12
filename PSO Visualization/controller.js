class Controller{
    constructor(swarm, neighborhoodSize, w, c1, c2){
        this.swarm = swarm;
        this.neighborhoodSize = neighborhoodSize;

        // Inertia coeffienct i.e audacity factor of the particles
        // Forces the particle to move in the same direction until now
        this.w = w;

        // Cognitive learning coefficient
        // Forces the particles to move towards their best previous position(based on fitness) => conservation
        this.c1 = c1;

        // Social learning coefficient
        // Forces the particles to move towards their best neighbour(based on fitness) => follower
        this.c2 = c2;
    }

    updateVelocities(){
        // Determine the neighbor with the best fitness for each particle
        let bestNeighbors = []
        let neighborhoods = this.swarm.getNeighbourhoods(this.neighborhoodSize);
        for (var i = 0; i < this.swarm.population.length; i++) {
            let localNeighbors = neighborhoods[i];
            localNeighbors.sort(function(a, b){
                return (a.fitness < b.fitness) ? -1 : ((a.fitness > b.fitness) ? 1 : 0);
            })
            bestNeighbors.push(localNeighbors[0]);
        }

        // Update the velocities based on the given coefficients
        for (var i = 0; i < this.swarm.population.length; i++) {
            // Update the x velocity based the inertia coeffienct
            let newVelX = this.w * this.swarm.population[i].velocity.x;

            // Update the x velocity based on best neighbour
            newVelX += this.c1 * Math.random() * (bestNeighbors[i].pos.x - this.swarm.population[i].pos.x);

            // Update the y velocity based on best past value
            newVelX +=  this.c2 * Math.random() * (this.swarm.population[i].bestPos.x - this.swarm.population[i].pos.x);

            // Apply same modifications to the y velocity
            let newVelY = this.w * this.swarm.population[i].velocity.y;
            newVelY += this.c1 * Math.random() * (bestNeighbors[i].pos.y - this.swarm.population[i].pos.y);
            newVelY += this.c2 * Math.random() * (this.swarm.population[i].bestPos.y - this.swarm.population[i].pos.y);

            this.swarm.population[i].velocity.x = newVelX;
            this.swarm.population[i].velocity.y = newVelY;
        }
    }

    bestParticle(){
        return this.swarm.bestParticle();
    }
}
