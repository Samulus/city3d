//
// index.js
// Author: Samuel Vargas
// Date: 10/05/2019
//

import './index.css'
import { TWGLState } from './twglstate';
import { Camera } from './camera';
import * as twgl from 'twgl.js';
import { Arcball } from './arcball';

// Init
const twglState = new TWGLState(
    document.getElementById("scene") as HTMLCanvasElement
);

const arcball = new Arcball();

const camera = new Camera(
    arcball,
    0.87266462,
    twglState.canvasWidth() / twglState.canvasHeight(),
    0.01,
    100
);

const programInfo = twgl.createProgramInfo(twglState.gl, [ 
    document.getElementById("vertexShader")!.textContent as string,
    document.getElementById("fragmentShader")!.textContent as string,
])


// Events
window.addEventListener('resize', (): any => { 
    twglState.onWindowResize() 
}, false);

twglState.gl.canvas.addEventListener("wheel", event => {
    const normalizedZoom = Math.sign((event as any).deltaY);
    camera.zoom(normalizedZoom * -0.1)
})

// static data
twglState.gl.useProgram(programInfo.program)

const cubeBuffer = twgl.primitives.createCubeBufferInfo(twglState.gl, 0.25)
//const cubeBuffer = twgl.primitives.createTorusBufferInfo(twglState.gl, 1, 1, 10, 4);
twgl.setBuffersAndAttributes(twglState.gl, programInfo, cubeBuffer)
twgl.setUniforms(programInfo, { model: camera.getAmalgamatedMatrix(0)})

twglState.gl.clearColor(255/255, 246/255, 227/255, 255/255)
twglState.gl.enable(twglState.gl.DEPTH_TEST);

function animate(time: number) {
    twglState.gl.clear(
        twglState.gl.COLOR_BUFFER_BIT | 
        twglState.gl.DEPTH_BUFFER_BIT | 
        twglState.gl.STENCIL_BUFFER_BIT
    );

    if (camera.isDirty) {
        twgl.setUniforms(programInfo, { model: camera.getAmalgamatedMatrix(time)})
    }

    twgl.drawBufferInfo(twglState.gl, cubeBuffer)

    requestAnimationFrame(animate);
}

animate(0);