//
// threeUtils.js
// Author: Samuel Vargas
// Date: 10/05/2019
//

/*
const THREE = require('three');
const OrbitControls = require('three-orbit-controls')(THREE);

export function initThree(gridSize) {
    const threeState = {};
    const canvas: HTMLCanvasElement = document.getElementById("scene") as HTMLCanvasElement;
    const context = canvas.getContext('webgl2', {alpha: false});

    threeState.renderer = new THREE.WebGLRenderer({canvas: canvas, context: context});
    threeState.scene = new THREE.Scene();
    threeState.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100000);
    threeState.renderer.setSize(canvas.parentElement.clientWidth, canvas.parentElement.clientHeight);
    threeState.controls = new OrbitControls(threeState.camera, threeState.renderer.domElement);
    threeState.camera.position.z = 20; // zoom out by default

    // Debugging
    const axesHelper = new THREE.AxesHelper( 5 );
    threeState.scene.add(axesHelper)

    // Automatically resize window
    window.addEventListener('resize', onWindowResize, false);

    function onWindowResize() {
        const canvas = document.getElementById("scene");
        threeState.camera.aspect = canvas.parentElement.clientWidth / canvas.parentElement.clientHeight;
        threeState.camera.updateProjectionMatrix();
        threeState.renderer.setSize(canvas.parentElement.clientWidth, canvas.parentElement.clientHeight);
    }

    onWindowResize();

    threeState.renderer.setClearColor(0xFDF6E3, 1);
    return threeState;
}

export function deleteOldMeshes(threeState) {
    for (let i = threeState.scene.children.length - 1; i >= 0; i--) {
        if (threeState.scene.children[i].type === "Mesh") {
            threeState.scene.children[i].material.dispose();
            threeState.scene.remove(threeState.scene.children[i]);
        }
    }
}

export function populateSceneWithBuildings(threeState, worldBuffer) {
    const bufferGeometry = new THREE.BoxBufferGeometry(1, 1, 1);

    const geometry = new THREE.InstancedBufferGeometry()
    geometry.index = bufferGeometry.index;
    geometry.attributes.position = bufferGeometry.attributes.position;

    const material = new THREE.RawShaderMaterial( {
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent
    });

    const mesh = new THREE.Mesh(geometry, material)
    threeState.scene.add(mesh);

    const offsetAttribute = new THREE.InstancedBufferAttribute(new Float32Array(worldBuffer.xzTranslationBuffer), 2);
    geometry.addAttribute('offset', offsetAttribute)

    const heightAttribute = new THREE.InstancedBufferAttribute(new Float32Array(worldBuffer.heightBuffer), 1);
    geometry.addAttribute('height', heightAttribute)

    const colorAttribute = new THREE.InstancedBufferAttribute(new Float32Array(worldBuffer.colorBuffer), 3);
    geometry.addAttribute('color', colorAttribute)
}
 */