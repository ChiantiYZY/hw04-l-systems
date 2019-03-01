import {vec3} from 'gl-matrix';
import Turtle from './Turtle';
import {readTextFile} from './globals';
import Mesh from './geometry/Mesh';
//import { scale } from 'gl-matrix/src/gl-matrix/vec2';

export default class Draw {

    turtles: Array<Turtle> = [new Turtle()];
    cur = this.turtles[0];

    rules : Map<string, any> = new Map();
    sca : number;
    ang : number;

    //scale = Math.random();

    constructor()
    {
        // let obj0: string = readTextFile('../branch.obj');
        // let m = new Mesh(obj0, vec3.fromValues(0, 0, 0));
        // m.create();
        this.sca = 1.0;
        this.ang = 1.0;

    }

    pushTurtle()
    {
        let tmp = new Turtle();
        tmp.copy(this.cur);
       // vec3.copy(tmp.prevPos, this.cur.position);
        this.turtles.push(tmp);

    }

    popTurtle()
    {
        let tmp = this.turtles.pop();
        this.cur.copy(tmp);
        
    }

    growUp()
    {
       // console.log(this);

        //let step = Math.random();
        this.cur.growUp(this.sca);
    }

    rotateRight()
    {
        let flag = Math.random();
        // if(this.cur.scale[0] > 0.7)
        // {
        //     return;
        // }

        let angle = this.ang * Math.random();


        //this.cur.rotateOnZ(1.57 * angle);
        
        if(flag < 0.33)
            this.cur.rotateOnZ(angle);
        else if(flag < 0.67)  
            this.cur.rotateOnY(angle);
        else
            this.cur.rotateOnX(angle);
        // else    
        //     this.cur.growUp(1);
    }

    rotateLeft()
    {
        let flag = Math.random();
        // if(this.cur.scale[0] < 0.7)
        // {
        //     return;
        // }

        let angle = this.ang * -Math.random();

        //this.cur.rotateOnZ(-1.57* angle);
        
        if(flag < 0.33)
            this.cur.rotateOnZ(angle);
        else if(flag < 0.67)  
            this.cur.rotateOnY(angle);
        else
            this.cur.rotateOnX(angle);
        // else    
        //     this.cur.growUp(1);
        //console.log('check rotate: ');
       // console.log(this.cur);
    }

    rotateForward()
    {
        let flag = Math.random();
        this.cur.rotateOnY(1.57 * flag);
        //console.log('check rotate: ');
       // console.log(this.cur);
    }

    rotateBack()
    {
        let flag = Math.random();
        this.cur.rotateOnY(-1.57 * flag);
        //console.log('check rotate: ');
       // console.log(this.cur);
    }

    setRule()
    {
        this.rules.set('F', this.growUp.bind(this));
        this.rules.set('*', this.growUp.bind(this));
        this.rules.set('+', this.rotateRight.bind(this));
        this.rules.set('-', this.rotateLeft.bind(this));
        this.rules.set('>', this.rotateForward.bind(this));
        this.rules.set('<', this.rotateBack.bind(this));
        //this.rules.set('-', this.cur.rotateOnZ.bind(this.cur));
        
        this.rules.set('[', this.pushTurtle.bind(this));
        this.rules.set(']', this.popTurtle.bind(this));

        
        
    }

    draw(grammar: string)
    {
        let func = this.rules.get(grammar);

        //console.log('grammar is: ' + grammar + 'func is: '  + func);

        if(func)
        {
            func();
           // console.log(this.cur);
        }
    }

};