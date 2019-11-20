//
// cubebuffer.js
// Author: Samuel Vargas
// Date: 11/15/2019
//

import * as twgl from 'twgl.js';

export class CubeBuffer {
    private bufferInfo: twgl.BufferInfo;

    constructor(gl: WebGL2RenderingContext) {
        this.bufferInfo = twgl.primitives.createCubeBufferInfo(gl, 1)
        twgl.setBuffersAndAttributes(gl, )
    }
}