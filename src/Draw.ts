import {vec3} from 'gl-matrix';
import Turtle from './Turtle';
import {readTextFile} from './globals';
import Mesh from './geometry/Mesh';
//import { scale } from 'gl-matrix/src/gl-matrix/vec2';

export default class Draw {

    turtles: Array<Turtle> = [new Turtle()];
    cur = this.turtles[0];

    rules : Map<string, any> = new Map();

    //scale = Math.random();

    constructor()
    {
        // let obj0: string = readTextFile('../branch.obj');
        // let m = new Mesh(obj0, vec3.fromValues(0, 0, 0));
        // m.create();

    }

    pushTurtle()
    {
        let tmp = new Turtle();
        tmp.copy(this.cur);
        this.turtles.push(tmp);
        // console.log('push in cur: ');
        // console.log(this.cur);
        // console.log(tmp);
        //this.cur = tmp;
    }

    popTurtle()
    {
        let tmp = this.turtles.pop();
        this.cur.copy(tmp);
        //this.cur = tmp;

        // console.log('pop out prev: ');
        // console.log(this.cur);
        // console.log(tmp);
    }

    growUp()
    {
       // console.log(this);

        let step = Math.random();
        this.cur.growUp(step);
    }

    rotateRight()
    {
        let flag = Math.random();
        // if(this.cur.scale[0] < 0.7)
        // {
        //     return;
        // }

        let angle = Math.random();
        
        if(flag < 0.5)
            this.cur.rotateOnZ(angle);
        else   
            this.cur.rotateOnY(angle);
    }

    rotateLeft()
    {
        let flag = Math.random();
        // if(this.cur.scale[0] < 0.7)
        // {
        //     return;
        // }

        let angle = Math.random();
        
        if(flag < 0.5)
            this.cur.rotateOnZ(-angle);
        else   
            this.cur.rotateOnY(-angle);
        //console.log('check rotate: ');
       // console.log(this.cur);
    }

    rotateForward()
    {
        this.cur.rotateOnY(-1.5);
        //console.log('check rotate: ');
       // console.log(this.cur);
    }

    rotateBack()
    {
        this.cur.rotateOnY(1.5);
        //console.log('check rotate: ');
       // console.log(this.cur);
    }

    setRule()
    {
        this.rules.set('F', this.growUp.bind(this));
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
            //console.log(this.cur);
        }
    }

};