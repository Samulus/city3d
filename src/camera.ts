//
// camera.ts
// Author: Samuel Vargas
// Date: 11/05/2019
//

import { m4, v3 } from "twgl.js";
import { transcode } from "buffer";

export class Camera {
    private perspectiveMatrix: m4.Mat4;
    private dirty = false;
    private eye: v3.Vec3;

    constructor(fovRadians: number, aspect: number, zNear: number, zFar: number) {
        this.perspectiveMatrix =  m4.perspective(
            fovRadians,
            aspect,
            zNear,
            zFar
        );

        this.eye = v3.create(0, 0, -3);
    }

    getAmalgamatedMatrix(time: number): m4.Mat4 {
      return m4.multiply(this.perspectiveMatrix, m4.translation(this.eye));
    }

    zoom(amountMeters: number) {
        this.eye[2] += amountMeters;
        this.dirty = true;
        console.log(this.eye);
    }

    get isDirty() {
        const t = this.dirty;
        this.dirty = false;
        return t;
    }
}