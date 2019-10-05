//
// building.js
// Author: Samuel Vargas
// Date: 10/05/2019
//

const Util = require ("./util");

export class Building {
    constructor(heightMeters, hexColor) {
        this.heightMeters = heightMeters;
        this.hexColor = hexColor
    }

    static getRandomBuilding() {
        const randHeightMeters = Util.getRandBetween(1, 30);
        const randHexColor = Math.random() * 0xffffff;
        return new Building(randHeightMeters, randHexColor);
    }
}