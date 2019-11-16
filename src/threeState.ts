//
// threeState.js
// Author: Samuel Vargas
// Date: 11/10/2019
//

const THREE = require('three');
import { WEBGL } from 'three/examples/jsm/WebGL.js';
import {Vector3, PerspectiveCamera, Scene, WebGLRenderer} from "three";
const OrbitControls = require('three-orbit-controls')(THREE)

export class ThreeState {
    private readonly canvas: HTMLCanvasElement;
    private readonly context: WebGL2RenderingContext;
    private renderer: WebGLRenderer;
    private _scene: Scene;
    private controls: any;
    private readonly camera: PerspectiveCamera;

    constructor(canvas: HTMLCanvasElement, backgroundColor: number = 0xFDF6E3) {

        if ( WEBGL.isWebGL2Available() === false ) {
            document.body.appendChild( WEBGL.getWebGL2ErrorMessage() );
        }

        //THREE.Object3D.DefaultUp = new Vector3(0,0,1);
        this._scene = new THREE.Scene()
        this.scene.name = "Human Viewable Scene";
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
            0.1, 
            100000
        );

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.camera.position.z = 20; // zoom out by default

        // Debugging
        const axesHelper = new THREE.AxesHelper( 5 );
        axesHelper.name = "Axes"
        this._scene.add(axesHelper);

        this.renderer.setClearColor(backgroundColor, 1);
        window["THREE"] = THREE;
        (window as any).scene = this._scene;
    }

    onWindowResize() {
        this.camera.aspect = this.canvas.parentElement!.clientWidth / this.canvas.parentElement!.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.canvas.parentElement!.clientWidth, this.canvas.parentElement!.clientHeight);
    }

    public render() {
        this.renderer.render(this._scene, this.camera)
    }

    get scene() {
        return this._scene;
    }
}