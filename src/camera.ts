//
// camera.ts
// Author: Samuel Vargas
// Date: 11/05/2019
//

import { m4, v3 } from "twgl.js";

export class Camera {
    private perspectiveMatrix: m4.Mat4;
    private sceneMatrix: m4.Mat4;

    constructor(fovRadians: number, aspect: number, zNear: number, zFar: number) {
        this.perspectiveMatrix =  m4.perspective(
            fovRadians,
            aspect,
            zNear,
            zFar
        );

        this.sceneMatrix = m4.identity();
    }

    getAmalgamatedMatrix(): m4.Mat4 {
        const r = m4.translate(this.sceneMatrix, v3.create(0, 0, -5))
        return r;
    }
}