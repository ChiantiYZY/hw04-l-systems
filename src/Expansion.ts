import {vec3} from 'gl-matrix';

export default class Expansion {
    rules : Map<string, string> = new Map();

    //flower grammar is commented out
    setRules() {
        this.rules.set('X', 'FFF[-FX][+FX][++FX][--FX]*');
        this.rules.set('*', 'F*');
        //this.rules.set('X', '-FX');
        //this.rules.set('*', '[-*X][+*X][<*X][>*X]*X');
       //this.rules.set('X', 'FFFF[+X][-X]*'); 
       //this.rules.set('X', 'F[--F-+]X[++F+-]X'); 
        //this.rules.set('X', 'F[-FX]');

        

        //flower
        //this.rules.set('X', 'F[+X][-X]*');
        //this.rules.set('*', 'F');
    }


    expanse(grammar: string) {
        let newGrammar: string;
    
        if(this.rules.get(grammar) != undefined)
        {                
            return this.rules.get(grammar);
        }
        else
        {
            return grammar;
        }
    }
    
};