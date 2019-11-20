//
// camera.ts
// Author: Samuel Vargas
// Date: 11/05/2019
//

import { m4 } from "twgl.js";

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
        return m4.multiply(this.perspectiveMatrix, this.sceneMatrix);
    }
}