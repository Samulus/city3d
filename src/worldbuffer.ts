//
// worldbuffer.js
// Author: Samuel Vargas
// Date: 10/05/2019
//

/*
function hexToRgb(hex) {
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    return {r: r, g: g, b: b}
}

export class WorldBuffer {
    private heightBuffer: any[];
    constructor(world) {
        this.heightBuffer = [];
        this.colorBuffer = [];
        this.xzTranslationBuffer = [];
        let i = 0;
        for (let building of world.buildingIterable()) {
            this.heightBuffer.push(building.value.heightMeters);
            let color = hexToRgb(building.value.hexColor) 
            this.colorBuffer.push(color.r);
            this.colorBuffer.push(color.g);
            this.colorBuffer.push(color.b);
            this.xzTranslationBuffer.push(building.value.x);
            this.xzTranslationBuffer.push(building.value.z);
            i++;
        }

        this.instanceCount = i;
    }
}
 */