//
// camera.ts
// Author: Samuel Vargas
// Date: 11/05/2019
//

import { m4, v3 } from "twgl.js";
import { Arcball } from './arcball';

export class Camera {
    private perspectiveMatrix: m4.Mat4;
    private dirty = false;
    private eye: v3.Vec3;
    private yaw: number = 0;
    private pitch: number = 0;

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
      // Zoom Out Matrix
      const translatedEye = m4.translation(this.eye);
      const perspectiveTranslation = m4.multiply(this.perspectiveMatrix, translatedEye)

      // Rotation Matrix (todo, these angles are  influencing each other)
      // the yaw should be global and pitch local or vice versa
      const yaw = m4.axisRotate(m4.identity(), v3.create(0, 1, 0), this.yaw)
      const pitch = m4.axisRotate(m4.identity(), v3.create(1, 0, 0), this.pitch)
      const rotation = m4.multiply(pitch, yaw); 

      return m4.multiply(perspectiveTranslation, rotation);
    }

    addPitch(amount: number) {
        this.pitch += amount
        this.dirty = true;
    }

    addYaw(amount: number) {
        this.yaw += amount
        this.dirty = true;
    }
  
    zoom(amountMeters: number) {
        this.eye[2] += amountMeters;
        this.dirty = true;
    }

    get isDirty() {
        const t = this.dirty;
        this.dirty = false;
        return t;
    }
}