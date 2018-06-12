class Swarm{
    constructor(count, xmin, xmax, ymin, ymax){
        this.population = [];
        for (let i = 0; i < count; i++){
            this.population.push(new Particle(xmin, xmax, ymin, ymax));
        }
    }

    getNeighbourhoods(noOfNeighbors){
        let neighborhoods = [];
        if (noOfNeighbors + 1 > this.population.length){
           noOfNeighbors = this.population.length - 1
        }

        for (let particle of this.population){
            let candidates = [];
            for (let candidate of this.population) {
                candidates.push({
                    particle: candidate,
                    distance: particle.relativeDistance(candidate)
                });
            }
            candidates.sort(function(a,b){
                return (a.distance < b.distance) ? -1 : ((a.distance > b.distance) ? 1 : 0);
            });
            let localResult = [];
            for (let i = 1; i < noOfNeighbors + 1; i++) {
                localResult.push(candidates[i].particle);
            }
            neighborhoods.push(localResult);
        }
        return neighborhoods
    }

    bestParticle(){
        let particles = this.population;
        particles.sort(function(a,b){
            return (a.fitness < b.fitness) ? -1 : ((a.fitness > b.fitness) ? 1 : 0);
        });
        return particles[0];
    }

    avgFitness(){
        let s = 0.0;
        for (var i = 0; i < this.population.length; i++) {
            s += this.population[i].fitness;
        }
        return s / this.population.length;
    }
}
