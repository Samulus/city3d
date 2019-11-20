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
        //this.sceneMatrix =  m4.lookAt(v3.create(1,0.2, -1), v3.create(0,0,0), v3.create(0, 1, 0));

    }

    getAmalgamatedMatrix(): m4.Mat4 {
        return m4.multiply(this.perspectiveMatrix, this.sceneMatrix);
        //return m4.multiply(this.sceneMatrix, this.perspectiveMatrix);
    }
}