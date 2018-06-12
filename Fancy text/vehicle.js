class Vehicle{
    constructor(x, y){
        // Position randomly initiated
        this.pos = createVector(random(width), random(y));

        // Set the target which the particle should seek (position in text display)
        this.target = createVector(x, y);

        // Velocity randomly initiated (values between -1, 1)
        this.velocity = p5.Vector.random2D();

        // Acceleration 0, should be modified at each step
        this.acceleration = createVector();

        // Display size of the vehicle
        this.size = 8;

        // Limits the velocity so values don't increase too rapidly based on acceleration
        this.speedLimit = 5;

        // Limits the force applied so steering remains smooth
        this.forceLimit = 1;
    }

    // Determines desired force for steering in the desired direction and adjusts acceleration accordingly
    adjustMovement(){
        let seekForce = this.seek(this.target);
        this.acceleration.add(seekForce);
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

    // TO-DO : Implement smoother vehicle fleeing from mouse position

    // flee(target){
    //     let desiredVelocity = p5.Vector.sub(target, this.pos);
    //     let distance = desiredVelocity.mag();
    //     if (distance < 50){
    //         let speed = map(distance, 0, 100, 0, this.speedLimit);
    //         desiredVelocity.setMag(-min(speed, this.speedLimit));
    //         let steer = p5.Vector.sub(desiredVelocity, this.velocity);
    //         steer.limit(this.forceLimit);
    //         return steer;
    //     }
    //     return createVector(0, 0)
    // }

    // Handles core movement based on velocity and acceleration
    update(){
        this.pos.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.acceleration.mult(0);
    }

    // Visualizes the vehicle as a point on the canvas
    display(){
        stroke(255);
        strokeWeight(10);
        point(this.pos.x, this.pos.y);
    }
}
