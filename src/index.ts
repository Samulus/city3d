//
// index.js
// Author: Samuel Vargas
// Date: 10/05/2019
//

import './index.css'
import * as twgl from 'twgl.js';
import { TWGLState } from './twglstate';
import { Camera } from './camera';

// Init
const twglState = new TWGLState(
    document.getElementById("scene") as HTMLCanvasElement
);

const camera = new Camera(
    0.87266462,
    twglState.canvasWidth() / twglState.canvasHeight(),
    0.01,
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

let mouseDown = false;
(twglState.gl.canvas as HTMLElement).addEventListener('mousedown', e => {
   mouseDown = true;
});

(twglState.gl.canvas as HTMLElement).addEventListener('mousemove', e => {
    if (mouseDown) {
        camera.addYaw(e.movementX / 100)
        camera.addPitch(e.movementY / 100)
    }
});

(twglState.gl.canvas as HTMLElement).addEventListener('mouseup', e => {
    mouseDown = false;
});

twglState.gl.canvas.addEventListener("wheel", event => {
    const normalizedZoom = Math.sign((event as any).deltaY);
    camera.zoom(normalizedZoom * -0.5)
})

// static data
twglState.gl.useProgram(programInfo.program)

const cubeBuffer = twgl.primitives.createCubeBufferInfo(twglState.gl, 1)
twgl.setBuffersAndAttributes(twglState.gl, programInfo, cubeBuffer)
twgl.setUniforms(programInfo, { 
    mvp: camera.getAmalgamatedMatrix(0),
    smallPrime: 1021,
    largePrime: 2927
})

twglState.gl.clearColor(255/255, 246/255, 227/255, 255/255)
twglState.gl.enable(twglState.gl.DEPTH_TEST);

function animate(time: number) {
    twglState.gl.clear(
        twglState.gl.COLOR_BUFFER_BIT | 
        twglState.gl.DEPTH_BUFFER_BIT | 
        twglState.gl.STENCIL_BUFFER_BIT
    );

    if (camera.isDirty) {
        twgl.setUniforms(programInfo, { mvp: camera.getAmalgamatedMatrix(0), }) 
    }

    twgl.drawBufferInfo(
        twglState.gl, 
        cubeBuffer, 
        twglState.gl.TRIANGLES, 
        cubeBuffer.numElements,
        0,
        500_000
    );
    requestAnimationFrame(animate);
}

animate(0);