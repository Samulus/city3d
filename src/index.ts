//
// index.js
// Author: Samuel Vargas
// Date: 10/05/2019
//

import './index.css'
import { TWGLState } from './twglstate';
import { Camera } from './camera';
import * as twgl from 'twgl.js';

// Init
const twglState = new TWGLState(
    document.getElementById("scene") as HTMLCanvasElement
);

const camera = new Camera(
    0.87266462,
    twglState.canvasWidth() / twglState.canvasHeight(),
    0.001,
    1000
);

const programInfo = twgl.createProgramInfo(twglState.gl, [ 
    document.getElementById("vertexShader")!.textContent as string,
    document.getElementById("fragmentShader")!.textContent as string,
])


// Events
window.addEventListener('resize', (): any => { 
    twglState.onWindowResize() 
}, false);

// static data
twglState.gl.useProgram(programInfo.program)

const cubeBuffer = twgl.primitives.createCubeBufferInfo(twglState.gl, 1)
twgl.setBuffersAndAttributes(twglState.gl, programInfo, cubeBuffer)
twgl.setUniforms(programInfo, { model: camera.getAmalgamatedMatrix()})

twglState.gl.clearColor(255/255, 246/255, 227/255, 255/255)

function animate() {
    twglState.gl.clear(
        twglState.gl.COLOR_BUFFER_BIT | 
        twglState.gl.DEPTH_BUFFER_BIT | 
        twglState.gl.STENCIL_BUFFER_BIT
    );

    twgl.drawBufferInfo(twglState.gl, cubeBuffer)

    requestAnimationFrame(animate);
}

animate();