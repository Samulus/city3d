//
// building.ts
// Author: Samuel Vargas
// Date: 11/07/2019
//

const Util = require ("./util");
export class Building {
    private heightMeters: Number;
    private hexColor: Number;

    constructor(heightMeters: Number, hexColor: Number) {
        this.heightMeters = heightMeters;
        this.hexColor = hexColor
    }
}