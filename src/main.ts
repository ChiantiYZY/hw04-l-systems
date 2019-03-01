import {vec3} from 'gl-matrix';
import * as Stats from 'stats-js';
import * as DAT from 'dat-gui';
import Square from './geometry/Square';
import ScreenQuad from './geometry/ScreenQuad';
import OpenGLRenderer from './rendering/gl/OpenGLRenderer';
import Camera from './Camera';
import {setGL} from './globals';
import ShaderProgram, {Shader} from './rendering/gl/ShaderProgram';
import Lsystem from './Lsystem';
import {readTextFile} from './globals';
import Mesh from './geometry/Mesh';
import Draw from './Draw';

// Define an object with application parameters and button callbacks
// This will be referred to by dat.GUI's functions that add GUI elements.
const controls = {
  iteration: 1,
  angle: 1,
  color1: [0.2314 * 255, 0.149 * 255, 0.0],
  color2: [0.9333 * 255, 0.6706 * 255, 0.6706 * 255],
};

let square: Square;
let screenQuad: ScreenQuad;
let branch: Mesh;
let petal:Mesh;
let pot:Mesh;
let time: number = 0.0;

function loadScene() {

  screenQuad = new ScreenQuad();
  screenQuad.create();


  //let obj0: string = readTextFile('../branch.obj');

  let obj0: string = readTextFile('./src/branch.obj');
  branch = new Mesh(obj0, vec3.fromValues(0, 0, 0));
  branch.create();

  let obj1: string = readTextFile('./src/petal.obj');
  petal = new Mesh(obj1, vec3.fromValues(0, 0, 0));
  petal.create();

  let obj2: string = readTextFile('./src/pot.obj');
  pot = new Mesh(obj2, vec3.fromValues(0, 0, 0));
  pot.create();

  square = new Square();
  square.create();
}

function main() {
  // Initial display for framerate
  const stats = Stats();
  stats.setMode(0);
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';
  document.body.appendChild(stats.domElement);
  let flag = false;

  var show = { add:function(){ flag = true }};

  // Add controls to the gui
  const gui = new DAT.GUI();

  gui.add(controls, 'iteration', 1, 8).step(1);
  gui.add(controls, 'angle', 0, 2).step(0.1);
  gui.addColor(controls, 'color1');
  gui.addColor(controls, 'color2');
  gui.add(show, 'add').name('Do L-System');

  // get canvas and webgl context
  const canvas = <HTMLCanvasElement> document.getElementById('canvas');
  const gl = <WebGL2RenderingContext> canvas.getContext('webgl2');
  if (!gl) {
    alert('WebGL 2 not supported!');
  }
  // `setGL` is a function imported above which sets the value of `gl` in the `globals.ts` module.
  // Later, we can import `gl` from `globals.ts` to access it
  setGL(gl);

  // Initial call to load scene
  loadScene();

  //const camera = new Camera(vec3.fromValues(50, 50, 50), vec3.fromValues(50, 50, 50));
  const camera = new Camera(vec3.fromValues(10, 10, 10), vec3.fromValues(0, 0, 0));

  const renderer = new OpenGLRenderer(canvas);
  renderer.setClearColor(0.2, 0.2, 0.2, 1);
  //gl.enable(gl.BLEND);
  //gl.blendFunc(gl.ONE, gl.ONE); // Additive blending
  gl.enable(gl.DEPTH_TEST);

  const instancedShader = new ShaderProgram([
    new Shader(gl.VERTEX_SHADER, require('./shaders/instanced-vert.glsl')),
    new Shader(gl.FRAGMENT_SHADER, require('./shaders/instanced-frag.glsl')),
  ]);

  const flat = new ShaderProgram([
    new Shader(gl.VERTEX_SHADER, require('./shaders/flat-vert.glsl')),
    new Shader(gl.FRAGMENT_SHADER, require('./shaders/flat-frag.glsl')),
  ]);

  //generate L-System
  let l = new Lsystem(0);


  let curIter = controls.iteration;

          l.iteration = controls.iteration;
          //.log("check iteration: " + l.iteration + "\n");
          //var grammar = l.expansion();
          let c1 = vec3.fromValues(controls.color1[0] / 255.0, controls.color1[1] / 255.0, controls.color1[2] / 255.0 );
          let c2 = vec3.fromValues(controls.color2[0] / 255.0, controls.color2[1] / 255.0, controls.color2[2] / 255.0 );
          l.c1 = c1;
          l.c2 = c2;
          //l.draw(branch, petal, 1.0);

  let potColorsArray: number[] = [0.2196, 0.1333, 0.0235, 1.0]; // brown
  let col1Array: number[] = [2, 0, 0, 0]; // scale x
  let col2Array: number[] = [0, 2, 0, 0]; // scale y
  let col3Array: number[] = [0, 0, 2, 0]; // scale z
  let col4Array: number[] = [0, 2, 0, 1]; // translation
  let col1: Float32Array = new Float32Array(col1Array);
  let col2: Float32Array = new Float32Array(col2Array);
  let col3: Float32Array = new Float32Array(col3Array);
  let col4: Float32Array = new Float32Array(col4Array);
  let colors: Float32Array = new Float32Array(potColorsArray);
  pot.setInstanceVBOs(col1, col2, col3, col4, colors);
  pot.setNumInstances(1); 

  //renderer.render(camera, instancedShader, [pot]);


  // This function will be called every frame
  function tick() {
    camera.update();
    stats.begin();
    instancedShader.setTime(time);
    flat.setTime(time++);
    gl.viewport(0, 0, window.innerWidth, window.innerHeight);

    renderer.clear();
    

    let c1 = vec3.fromValues(controls.color1[0] / 255.0, controls.color1[1] / 255.0, controls.color1[2] / 255.0 );
    let c2 = vec3.fromValues(controls.color2[0] / 255.0, controls.color2[1] / 255.0, controls.color2[2] / 255.0 );
    let angle = controls.angle;
    l.c1 = c1;
    l.c2 = c2;
    if(flag == true)
    {
      // branch.colorsArray = [];
      // // branch.transArray1 = [];
      // // branch.transArray2 = [];
      // // branch.transArray3 = [];
      // // branch.transArray4 = [];
      
      // petal.colorsArray = [];

      
      //branch.destory;
      
      renderer.clear();
      //branch.create();

      let c1 = vec3.fromValues(controls.color1[0] / 255.0, controls.color1[1] / 255.0, controls.color1[2] / 255.0 );
      let c2 = vec3.fromValues(controls.color2[0] / 255.0, controls.color2[1] / 255.0, controls.color2[2] / 255.0 );
      let angle = controls.angle;
      l.c1 = c1;
      l.c2 = c2;

      console.log('check updating');
          //LSystem
          l.iteration = controls.iteration;
          //.log("check iteration: " + l.iteration + "\n");
          //var grammar = l.expansion();
          
          l.draw(branch, petal, angle);
    }


    flag = false;
    
    // renderer.render(camera, instancedShader, [
    //   square,
    // ]);
    //renderer.render(camera, instancedShader, [branch, petal]);
    renderer.render(camera, instancedShader, [branch, petal, pot]);

    renderer.render(camera, flat, [screenQuad]);
    //renderer.render(camera, instancedShader, [petal]);
    stats.end();

    // Tell the browser to call `tick` again whenever it renders a new frame
    requestAnimationFrame(tick);
  }

  window.addEventListener('resize', function() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.setAspectRatio(window.innerWidth / window.innerHeight);
    camera.updateProjectionMatrix();
    flat.setDimensions(window.innerWidth, window.innerHeight);
  }, false);

  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.setAspectRatio(window.innerWidth / window.innerHeight);
  camera.updateProjectionMatrix();
  flat.setDimensions(window.innerWidth, window.innerHeight);

  // Start the render loop
  tick();
}

main();
