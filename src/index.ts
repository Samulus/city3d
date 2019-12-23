//
// index.js
// Author: Samuel Vargas
// Date: 10/05/2019
//

import './index.css'
import * as twgl from 'twgl.js';
import { TWGLState } from './twglstate';
import { Camera } from './camera';
import { RANDOM_PRIMES } from './primes';

// Init
const twglState = new TWGLState(
    document.getElementById("scene") as HTMLCanvasElement
);

const camera = new Camera(
    0.87266462,
    twglState.canvasWidth() / twglState.canvasHeight(),
    0.01,
    5000
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
   requestAnimationFrame(animate);
});

(twglState.gl.canvas as HTMLElement).addEventListener('mousemove', e => {
    if (mouseDown) {
        camera.addYaw(e.movementX / 100)
        camera.addPitch(e.movementY / 100)
        requestAnimationFrame(animate);
    }
});

(twglState.gl.canvas as HTMLElement).addEventListener('mouseup', e => {
    mouseDown = false;
    requestAnimationFrame(animate);
});

twglState.gl.canvas.addEventListener("wheel", event => {
    const normalizedZoom = Math.sign((event as any).deltaY);
    camera.zoom(normalizedZoom * -10)
    requestAnimationFrame(animate);
})

// static data
twglState.gl.useProgram(programInfo.program)

const cubeBuffer = twgl.primitives.createCubeBufferInfo(twglState.gl, 1)
twgl.setBuffersAndAttributes(twglState.gl, programInfo, cubeBuffer)
twgl.setUniforms(programInfo, { 
    mvp: camera.getAmalgamatedMatrix(0),
    gridSize: 100,
    seed: 17,
})

// texture: globalBuffer
twglState.gl.pixelStorei(twglState.gl.UNPACK_ALIGNMENT, 1); // 1 byte at a time please

const globalBuffer = twglState.gl.createTexture();
twglState.gl.bindTexture(twglState.gl.TEXTURE_2D, globalBuffer);
twglState.gl.texImage2D(
    twglState.gl.TEXTURE_2D,
    0,
    twglState.gl.R32UI,
    RANDOM_PRIMES.length,
    1,
    0,
    twglState.gl.RED_INTEGER,
    twglState.gl.UNSIGNED_INT,
    RANDOM_PRIMES);

twglState.gl.texParameteri(twglState.gl.TEXTURE_2D, twglState.gl.TEXTURE_MIN_FILTER, twglState.gl.NEAREST);
twglState.gl.texParameteri(twglState.gl.TEXTURE_2D, twglState.gl.TEXTURE_MAG_FILTER, twglState.gl.NEAREST);
twglState.gl.activeTexture(twglState.gl.TEXTURE0);
twglState.gl.bindTexture(twglState.gl.TEXTURE_2D, globalBuffer)

const index = twglState.gl.getUniformLocation(programInfo.program, "globalBuffer")
twglState.gl.uniform1i(index, 0);

twglState.gl.clearColor(0, 0, 0, 1)
twglState.gl.enable(twglState.gl.DEPTH_TEST);

function animate(time: number) {
    twglState.gl.clear(
        twglState.gl.COLOR_BUFFER_BIT | 
        twglState.gl.DEPTH_BUFFER_BIT | 
        twglState.gl.STENCIL_BUFFER_BIT
    );

    if (camera.isDirty) {
        twgl.setUniforms(programInfo, { 
            mvp: camera.getAmalgamatedMatrix(0), 
        }) 
    }

    twgl.drawBufferInfo(
        twglState.gl, 
        cubeBuffer, 
        twglState.gl.TRIANGLES, 
        cubeBuffer.numElements,
        0,
        500 // this should be between [0, gridSize]
    );
}

animate(0);
