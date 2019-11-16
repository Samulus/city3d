//
// threeState.js
// Author: Samuel Vargas
// Date: 11/10/2019
//

const THREE = require('three');
import {Vector3, PerspectiveCamera, Scene, WebGLRenderer} from "three";
const OrbitControls = require('three-orbit-controls')(THREE)

export class ThreeState {
    private readonly canvas: HTMLCanvasElement;
    private readonly context: WebGL2RenderingContext;
    private renderer: WebGLRenderer;
    private scene: Scene;
    private controls: any;
    private readonly camera: PerspectiveCamera;

    constructor(canvas: HTMLCanvasElement) {
        THREE.Object3D.DefaultUp = new Vector3(0,0,1);
        this.scene = new THREE.Scene()
        this.canvas = canvas;
        this.context = canvas.getContext("webgl2", {alpha: false})!;
        this.renderer = new WebGLRenderer({
            canvas: this.canvas,
            context: this.context
        });

        this.renderer.setSize(
            this.canvas.parentElement!.clientWidth,
            this.canvas.parentElement!.clientHeight
        );

        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1, 100000
        );

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.camera.position.z = 20; // zoom out by default

        // Debugging
        const axesHelper = new THREE.AxesHelper( 5 );
        this.scene.add(axesHelper);

        this.renderer.setClearColor(0xFDF6E3, 1);
    }

    onWindowResize(canvasWidth: number, canvasHeight: number) {
        this.camera.aspect = canvasWidth / canvasHeight;
    }

    public render() {
        this.renderer.render(this.scene, this.camera)
    }
}