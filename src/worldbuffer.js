//
// worldbuffer.js
// Author: Samuel Vargas
// Date: 10/05/2019
//

export class WorldBuffer {
    constructor(world) {
        this.heightBuffer = [];
        this.colorBuffer = [];
        this.xzTranslationBuffer = [];
        let i = 0;
        for (let building of world.buildingIterable()) {
            this.heightBuffer.push(building.value.heightMeters);
            this.colorBuffer.push(building.value.hexColor);
            this.xzTranslationBuffer.push(building.value.x);
            this.xzTranslationBuffer.push(building.value.z);
            i++;
        }

        this.instanceCount = i;
    }
}