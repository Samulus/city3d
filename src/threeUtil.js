//
// threeUtils.js
// Author: Samuel Vargas
// Date: 10/05/2019
//

const THREE = require('three');
const OrbitControls = require('three-orbit-controls')(THREE);

export function initThree(gridSize) {
    const threeState = {};
    const canvas = document.getElementById("scene");
    const context = canvas.getContext('webgl2', {alpha: false});

    threeState.renderer = new THREE.WebGLRenderer({canvas: canvas, context: context});
    threeState.scene = new THREE.Scene();
    threeState.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    threeState.renderer.setSize(canvas.parentElement.clientWidth, canvas.parentElement.clientHeight);
    threeState.controls = new OrbitControls(threeState.camera, threeState.renderer.domElement);
    threeState.camera.position.z = 20; // zoom out by default

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

// NOTE: For max performance / ram efficiency we should upload a buffer containing
//       all the colors and sample that instead of creating 10,000 instances of MeshBasicMaterial.
export function populateSceneWithBuildings(threeState, worldBuffer) {
    const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
    let positionIndex = 0;
    for (let i = 0; i < worldBuffer.instanceCount; ++i) {
        let buildingMesh =
            new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: worldBuffer.colorBuffer[i]}));

        // Place in precomputed random location
        buildingMesh.position.x = worldBuffer.xzTranslationBuffer[positionIndex];
        buildingMesh.position.z = worldBuffer.xzTranslationBuffer[positionIndex + 1];
        positionIndex += 2;

        // Random building height
        const heightScale = worldBuffer.heightBuffer[i];

        // scale + translate for variable building height with
        // each building starting at the same y-level (0)
        buildingMesh.translateY(heightScale * 0.5);
        buildingMesh.scale.y = heightScale;

        threeState.scene.add(buildingMesh);
    }
}