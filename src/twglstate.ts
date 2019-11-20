//
// twglState.js
// Author: Samuel Vargas
// Date: 11/16/2019
//

import * as twgl from "twgl.js"

export class TWGLState {
    private readonly _gl: WebGL2RenderingContext;
    private shaders: Map<String, twgl.ProgramInfo>;
    private clearColor: {r: number, g: number, b: number};

    constructor(canvas: HTMLCanvasElement, backgroundColor: number = 0xFDF6E3) {
        this._gl  = canvas.getContext("webgl2")!
        this.shaders = new Map<String, twgl.ProgramInfo>();
        console.assert(this._gl != null, "Could not create webgl2 context.");

        this.clearColor = {
            r: ((backgroundColor >> 16)) & 255 / 255.0,
            g: ((backgroundColor >> 8) & 255) / 255.0,
            b: (backgroundColor & 255) / 255.0
        }

        this.onWindowResize();
    }

    get gl() {
        return this._gl;
    }

    render() {
        this.gl.clearColor(this.clearColor.r, this.clearColor.g, this.clearColor.b, 255);
        this.gl.clear(
            this.gl.COLOR_BUFFER_BIT | 
            this.gl.DEPTH_BUFFER_BIT | 
            this.gl.STENCIL_BUFFER_BIT
        );
    }


    onWindowResize() {
        const width = (this._gl.canvas as HTMLElement).parentElement!.clientWidth;
        const height = (this._gl.canvas as HTMLElement).parentElement!.clientHeight;
        this._gl.viewport(0, 0, width, height);
    }

    canvasWidth(): number {
        return (this._gl.canvas as any).clientWidth as number
    }

    canvasHeight(): number {
        return (this._gl.canvas as any).clientHeight as number
    }
}