import {vec3, mat4} from 'gl-matrix';
import Turtle from './Turtle'; 
import Expansion from './Expansion';
import Draw from './Draw';
import {readTextFile} from './globals';
import Mesh from './geometry/Mesh';


export default class Lsytem {


    grammars: Array<String> = ['X'];
    iteration: number;
    expanse = new Expansion();
    drawing = new Draw();

    constructor(it: number)
    {
        this.iteration = it;
        this.expanse.setRules();
        this.drawing.setRule();
    }

    test() {
        console.log("check \n")
    }

    expansion()
    {
        //console.log('grammar array size: ' + this.grammars.length);
        //if haven't iterated so much
        if(this.iteration >= this.grammars.length)
        {

            //console.log('check cur iteration: ' + this.iteration);
            //find the last expanded grammar 
            var lastIndex = this.grammars.length - 1;

            //calculate how much more iterations are needed 
            var moreIteration = this.iteration - this.grammars.length;

            for(var i = 0; i < moreIteration; i++)
            {
                let last = this.grammars[lastIndex];
                // console.log('lst is:' + last); 
                let newStr = '';
                for(var j = 0; j < last.length; j++)
                {
                    
                    //get expanded substring and adds to the newStr
                    //console.log(last[j]);
                    newStr += this.expanse.expanse(last[j]);
                    // console.log('adding: ' + this.expanse.expanse(last[j]));
                    // console.log('cur newStr is: ' + newStr);
                }

                //console.log('newStr is: ' + newStr);
                //push the new string to the grammar list 
                this.grammars.push(newStr);
                //update the last index
                lastIndex++;
            }

            return this.grammars[lastIndex];
        }
        else
        {
            return this.grammars[this.iteration];
        }
    }

    draw(m : Mesh, p:Mesh)
    {

        // m.transArray1 = [];
        // m.transArray2 = [];
        // m.transArray3 = [];
        // m.transArray4 = [];
        // //read the file name in
        // let obj0: string = readTextFile('../branch.obj');

        //console.log('draw grammar: ' + this.expansion());

        let count = 0;
        let count1 = 0;

        var grammar = this.expansion();
        //console.log('grammar is: ' + grammar + '\n');
        for(var i = 0; i < grammar.length; i++)
        {
            //move the turtle
            //console.log('cur grammar: ' + grammar[i]);
            this.drawing.draw(grammar[i]);
            

            //if the grammar is F, meaning that we need to show it on the screen
            // if(grammar[i] == 'F' || grammar[i] == '-' || grammar[i] == '+')
            if(grammar[i] == 'F')
            {
                count ++;
                //get the current translation and rotation to generate transform
                let pos = this.drawing.cur.position;
                let rot = this.drawing.cur.orientation;
                let sca = this.drawing.cur.scale;

                //console.log(this.drawing.cur);

                let transform = mat4.create();
                transform = mat4.fromRotationTranslationScale(transform, rot, pos, sca);

                m.transArray1.push(transform[0]);
                m.transArray1.push(transform[1]);
                m.transArray1.push(transform[2]);
                m.transArray1.push(transform[3]);

                m.transArray2.push(transform[4]);
                m.transArray2.push(transform[5]);
                m.transArray2.push(transform[6]);
                m.transArray2.push(transform[7]);
                
                m.transArray3.push(transform[8]);
                m.transArray3.push(transform[9]);
                m.transArray3.push(transform[10]);
                m.transArray3.push(transform[11]);

                m.transArray4.push(transform[12]);
                m.transArray4.push(transform[13]);
                m.transArray4.push(transform[14]);
                m.transArray4.push(transform[15]);



                let color = vec3.fromValues(0.1647, 0.2314, 0.0039);

                m.colorsArray.push(color[0]);
                m.colorsArray.push(color[1]);
                m.colorsArray.push(color[2]); 
                m.colorsArray.push(1.0);               
            }

            let flag = Math.random();

            if(grammar[i] == '*')
            {
                //console.log('check petal');
                count1 ++;
                //get the current translation and rotation to generate transform
                let pos = this.drawing.cur.position;
                let rot = this.drawing.cur.orientation;
                let sca = this.drawing.cur.scale;

                //console.log(this.drawing.cur);

                let transform = mat4.create();
                transform = mat4.fromRotationTranslationScale(transform, rot, pos, sca);

                
                p.transArray1.push(transform[0]);
                p.transArray1.push(transform[1]);
                p.transArray1.push(transform[2]);
                p.transArray1.push(transform[3]);

                p.transArray2.push(transform[4]);
                p.transArray2.push(transform[5]);
                p.transArray2.push(transform[6]);
                p.transArray2.push(transform[7]);
                
                p.transArray3.push(transform[8]);
                p.transArray3.push(transform[9]);
                p.transArray3.push(transform[10]);
                p.transArray3.push(transform[11]);

                p.transArray4.push(transform[12]);
                p.transArray4.push(transform[13]);
                p.transArray4.push(transform[14]);
                p.transArray4.push(transform[15]);


                let color = vec3.fromValues(0.9333, 0.6706, 0.6706);

                p.colorsArray.push(color[0]);
                p.colorsArray.push(color[1]);
                p.colorsArray.push(color[2]); 
                p.colorsArray.push(1.0);  
            }

        }

        
        

        //let offsets: Float32Array = new Float32Array(offsetsArray);
        let array1: Float32Array = new Float32Array(m.transArray1);
        let array2: Float32Array = new Float32Array(m.transArray2);
        let array3: Float32Array = new Float32Array(m.transArray3);
        let array4: Float32Array = new Float32Array(m.transArray4);
        let colors: Float32Array = new Float32Array(m.colorsArray);


        let parray1: Float32Array = new Float32Array(p.transArray1);
        let parray2: Float32Array = new Float32Array(p.transArray2);
        let parray3: Float32Array = new Float32Array(p.transArray3);
        let parray4: Float32Array = new Float32Array(p.transArray4);
        let pcolors: Float32Array = new Float32Array(p.colorsArray);
        //let rotates: Float32Array = new Float32Array(rotationArray);

        m.setInstanceVBOs(array1, array2, array3, array4, colors);
        m.setNumInstances(count); // grid of "particles"
        //console.log(this.drawing.turtles);


        p.setInstanceVBOs(parray1, parray2, parray3, parray4, pcolors);
        p.setNumInstances(count1);
    }

};