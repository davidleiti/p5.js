class Vehicle{
    constructor(x, y){
        this.pos = createVector(random(width), random(y));
        this.target = createVector(x, y);
        this.velocity = p5.Vector.random2D();
        //this.velocity = createVector();
        this.acceleration = createVector();
        this.size = 8;
        this.speedLimit = 5;
        this.forceLimit = 1;
    }

    behavior(){
        let seekForce = this.seek(this.target);
        this.accelerate(seekForce);
    }

    accelerate(value){
        this.acceleration.add(value);
    }

    seek(target){
        let desiredVelocity = p5.Vector.sub(target, this.pos);
        let distance = desiredVelocity.mag();
        let speed = map(distance, 0, 100, 0, this.speedLimit);
        desiredVelocity.setMag(min(speed, this.speedLimit));
        let steer = p5.Vector.sub(desiredVelocity, this.velocity);
        steer.limit(this.forceLimit);
        return steer;
    }

    flee(target){
        let desiredVelocity = p5.Vector.sub(target, this.pos);
        let distance = desiredVelocity.mag();
        if (distance < 50){
            let speed = map(distance, 0, 100, 0, this.speedLimit);
            desiredVelocity.setMag(-min(speed, this.speedLimit));
            let steer = p5.Vector.sub(desiredVelocity, this.velocity);
            steer.limit(this.forceLimit);
            return steer;
        }
        return createVector(0, 0)
    }

    update(){
        this.pos.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.acceleration.mult(0);
    }

    show(){
        stroke(255);
        strokeWeight(10);
        point(this.pos.x, this.pos.y);
    }
}
