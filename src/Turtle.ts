import {vec3, quat} from 'gl-matrix';

export default class Turtle {

    position: vec3 = vec3.create();
    prevPos: vec3 = vec3.create();
    forward: vec3 = vec3.create();
    up: vec3 = vec3.create();
    right: vec3 = vec3.create();
    orientation: quat = quat.create();
    scale: vec3 = vec3.create();

    turtles: Array<Turtle>;


  constructor() {
    this.position = vec3.fromValues(0,0,0);
    this.prevPos = vec3.fromValues(0,0,0);
    this.up = vec3.fromValues(0, 1, 0);
    this.forward = vec3.fromValues(0, 0, 1);
    this.right = vec3.fromValues(1, 0, 0);
    this.scale = vec3.fromValues(1, 1, 1);
  }

  growUp(distance: number) {
    distance = 1.0;
    //vec3.copy(this.position, this.prevPos);
    this.position = vec3.fromValues(this.position[0] + distance * this.up[0], 
                                    this.position[1] + distance * this.up[1], 
                                    this.position[2] + distance * this.up[2]);

    this.scale = vec3.fromValues(distance * this.scale[0],
                                 distance * this.scale[1],
                                 distance * this.scale[2]);
  }

  rotateOnZ(angle: number) {
        let rot: quat = quat.create();

        //generate the quat along the world z axis
        quat.setAxisAngle(rot, this.forward, angle);         //angle is radius
        
        //updating UFR// 
        vec3.transformQuat(this.forward, this.forward, rot);
        vec3.transformQuat(this.up, this.up, rot);
        vec3.transformQuat(this.right, this.right, rot);
        this.orientation = rot;

 
  }

  rotateOnY(angle: number) {
    let rot: quat = quat.create();

    //generate the quat along the world z axis
    quat.setAxisAngle(rot, this.right, angle);         //angle is radius
    
    //updating UFR// 
    vec3.transformQuat(this.forward, this.forward, rot);
    vec3.transformQuat(this.up, this.up, rot);
    vec3.transformQuat(this.right, this.right, rot);
    this.orientation = rot;

}

  copy(turtle: Turtle) {
    vec3.copy(this.position, turtle.position);
    vec3.copy(this.prevPos, turtle.prevPos);
    quat.copy(this.orientation, turtle.orientation);
    vec3.copy(this.up, turtle.up);
    vec3.copy(this.right, turtle.right);
    vec3.copy(this.forward, turtle.forward);
    vec3.copy(this.scale, turtle.scale);
     // return 
  }



};

