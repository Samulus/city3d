//
// index.js
// Author: Samuel Vargas
// Date: 10/05/2019
//

import './index.css'
import { TWGLState } from './twglstate';
import { Camera } from './camera';
import * as twgl from 'twgl.js';

// Init
const twglState = new TWGLState(
    document.getElementById("scene") as HTMLCanvasElement
);

const camera = new Camera(
    0.87266462,
    twglState.canvasWidth() / twglState.canvasHeight(),
    0.1,
    1000
);

const programInfo = twgl.createProgramInfo(twglState.gl, [ 
    document.getElementById("vertexShader")!.textContent as string,
    document.getElementById("fragmentShader")!.textContent as string,
])

twglState.gl.useProgram(programInfo.program)

const bufferInfo = twgl.primitives.createCubeBufferInfo(twglState.gl, 1)
twgl.setBuffersAndAttributes(twglState.gl, programInfo, bufferInfo)
const modelUniformLoc = twglState.gl.getUniformLocation(programInfo.program, "model")
twglState.gl.uniformMatrix4fv(modelUniformLoc, false, camera.getAmalgamatedMatrix());

// Events
window.addEventListener('resize', (): any => { 
    twglState.onWindowResize() 
}, false);

twglState.gl.clearColor(255/255, 246/255, 227/255, 255/255)
function animate() {
    twglState.gl.clear(
        twglState.gl.COLOR_BUFFER_BIT | 
        twglState.gl.DEPTH_BUFFER_BIT | 
        twglState.gl.STENCIL_BUFFER_BIT
    );

    twgl.drawBufferInfo(twglState.gl, bufferInfo)

    requestAnimationFrame(animate);
}

animate();

/*
// DOM elements
const GRID_SIZE_SLIDER = document.getElementById("gridSize");
const BUILDING_COUNT_SLIDER = document.getElementById("buildingCount");
const GRID_SIZE_DISPLAY = document.getElementById("gridSizeDisplay");
const BUILDING_COUNT_DISPLAY = document.getElementById("buildingCountDisplay");
const RESET_VISIBILITY_TEST = document.getElementById("resetVisibility");

// Classes
const ThreeUtil = require("./threeUtil");
const World = require("./world").World;
const Util = require("./util");
const WorldBuffer = require("./worldbuffer").WorldBuffer;
const ObjPicker = require("./visibilityPoles").VisibilityPoles;

// Globals
let GLOBAL_WORLD = new World(parseInt(GRID_SIZE_SLIDER.value), parseInt(BUILDING_COUNT_SLIDER.value));
let GLOBAL_WORLD_BUFFER = new WorldBuffer(GLOBAL_WORLD);
let GLOBAL_OBJ_PICKER = new ObjPicker();
let GLOBAL_THREE_STATE = ThreeUtil.initThree(CANVAS);

const threeState = new ThreeState(document.getElementById("scene") as HTMLCanvasElement);
let worldBuffer = new World();

function regenerateWorld() {
    GLOBAL_WORLD = new World(parseInt(GRID_SIZE_SLIDER.value), parseInt(BUILDING_COUNT_SLIDER.value));
    GLOBAL_WORLD_BUFFER = new WorldBuffer(GLOBAL_WORLD);
    GLOBAL_OBJ_PICKER.reset(GLOBAL_THREE_STATE);
    ThreeUtil.deleteOldMeshes(GLOBAL_THREE_STATE);
    ThreeUtil.populateSceneWithBuildings(GLOBAL_THREE_STATE, GLOBAL_WORLD_BUFFER);
}

function setupSliderNumberPreviews() {
    GRID_SIZE_SLIDER.addEventListener("mousemove", (e) => {
        GRID_SIZE_DISPLAY.innerText = "(" + Util.zeroPad(e.target.value, 3) + ")";
    });

    BUILDING_COUNT_SLIDER.addEventListener("mousemove", (e) => {
        BUILDING_COUNT_DISPLAY.innerText = "(" + Util.zeroPad(e.target.value, 5) + ")";
    });
}

function setupSliderMouseRelease(threeState) {
    GRID_SIZE_SLIDER.addEventListener("mouseup", () => {
        regenerateWorld();
    });
    BUILDING_COUNT_SLIDER.addEventListener("mouseup", () => {
        regenerateWorld();
    });
}

setupSliderNumberPreviews();
setupSliderMouseRelease(GLOBAL_THREE_STATE);

// Propagate click events in the canvas to
// `GLOBAL_OBJ_PICKER` for building selection
CANVAS.addEventListener("mousedown", e => {
    let mouse = {
        x: (e.offsetX / CANVAS.width) * 2 - 1,
        y: -(e.offsetY / CANVAS.height) * 2 + 1
    };

    GLOBAL_OBJ_PICKER.update(mouse, GLOBAL_THREE_STATE);
});

document.addEventListener("keyup", e => {
    if (e.key === "r") {
        GLOBAL_OBJ_PICKER.reset(GLOBAL_THREE_STATE);
    }
});

RESET_VISIBILITY_TEST.addEventListener("click", () => {
    GLOBAL_OBJ_PICKER.reset(GLOBAL_THREE_STATE);
});

regenerateWorld();

function animate() {
    requestAnimationFrame(animate);
    GLOBAL_THREE_STATE.renderer.render(GLOBAL_THREE_STATE.scene, GLOBAL_THREE_STATE.camera);
}

animate();
 */