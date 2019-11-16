//
// cpugpubridge.js
// Author: Samuel Vargas
// Date: 10/16/2019
//

const THREE = require('three');
import { ThreeState } from './threeState';
import { BoxBufferGeometry, InstancedMesh, ShaderMaterial } from 'three';

export class CPUGPUBridge {
    private bufferGeometry: BoxBufferGeometry;
    private materialShader: ShaderMaterial;

    constructor(threeState: ThreeState, vertexShaderSource: string, fragmentShaderSource: string) {
        this.bufferGeometry = new BoxBufferGeometry(1, 2, 1);
        this.materialShader = new THREE.RawShaderMaterial({vertexShader: vertexShaderSource, fragmentShader: fragmentShaderSource});
        const mesh = new InstancedMesh(this.bufferGeometry, this.materialShader, 100)
        mesh.name = "Base Building";
        threeState.scene.add(mesh);
    }
}