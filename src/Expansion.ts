import {vec3} from 'gl-matrix';

export default class Expansion {
    rules : Map<string, string> = new Map();

    //flower grammar is commented out
    setRules() {
        //this.rules.set('X', '[-FX][+FX][<FX][>FX]FX*');
        //this.rules.set('X', 'F*X');
        this.rules.set('F', 'FF');
        //this.rules.set('*', '[-*X][+*X][<*X][>*X]*X');
        this.rules.set('X', 'F[+FX][-FX][++FX][--FX]'); 
        //this.rules.set('X', 'F[-FX]F[+FFX][<FX][>FX]*'); 

        

        //flower
        //this.rules.set('X', 'FF[+FX][-FX][++FX][--FX]');
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