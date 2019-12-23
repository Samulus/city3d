//
// ubo.ts
// Author: Samuel Vargas
// Date: 11/22/2019
//

import { m4 } from "twgl.js";

export class UBO {
    private buffer: WebGLBuffer;

    constructor(gl: WebGL2RenderingContext, bufferSizeBytes: number, usage: GLenum) {
        this.buffer = gl.createBuffer()!;
        gl.bindBuffer(gl.UNIFORM_BUFFER, this.buffer);
        gl.bufferData(gl.UNIFORM_BUFFER, bufferSizeBytes, usage);
    }

    attachToShader(gl: WebGL2RenderingContext, program: WebGLProgram, uboName: string, blockBindingIndex: number) {
        const uboIndex = gl.getUniformLocation(program, uboName)! as number;
        gl.uniformBlockBinding(program, uboIndex, blockBindingIndex);
        gl.bindBufferBase(gl.UNIFORM_BUFFER, 0, this.buffer)
    }

    bufferSubUint32(gl: WebGL2RenderingContext, n: number, dstByteOffset: number, ) {
        gl.bindBuffer(gl.UNIFORM_BUFFER, this.buffer);
        gl.bufferSubData(gl.UNIFORM_BUFFER, dstByteOffset, Uint32Array.of(n));
    }

    bufferSubMat4(gl: WebGL2RenderingContext, m: m4.Mat4, dstByteOffset: number) {
        // TODO: I don't like calling this function 16 times, but there's no stride argument
        //       and layout (std140) rules dictate that each each component in the mat4 is 
        //       expanded to a vec4. I could just store everything in an untyped 
        //       texture buffer as a workaround I suppose.
        let k=0;
        for (let i=dstByteOffset; i < 64; i += 4) {
            gl.bufferSubData(gl.UNIFORM_BUFFER, i, Float32Array.of(m[k]));
            k++;
        }
    }
}