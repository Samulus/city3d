//
// world.js
// Author: Samuel Vargas
// Date: 10/05/2019
//

const Building = require("./building").Building;
const Util = require("./util");

export class World {
    constructor(gridSize, numBuildings) {
        this._cells = new Array(gridSize * gridSize).fill(null);
        this._numBuildings = numBuildings;
        this.addRandomBuildings(this._numBuildings);
    }

    addRandomBuildings(numToAdd) {
        let addedCount = 0;
        for (let i = 0; i < numToAdd; ++i) {
            const index = this.getRandomCellIndex((cell) => cell === null);
            if (index < 0) {
                // no more space for additional buildings
                this._numBuildings += addedCount;
                return;
            }
            this._cells[index] = Building.getRandomBuilding();
            addedCount++;
        }
    }

    getRandomCellIndex(filterCB) {
        const randArrIndex = Util.getRandIntUpTo(this._cells.length);
        for (let i = randArrIndex; i >= 0; --i) {
            if (filterCB(this._cells[i])) {
                return i;
            }
        }

        for (let i = randArrIndex + 1; i < this._cells.length; ++i) {
            if (filterCB(this._cells[i])) {
                return i;
            }
        }

        return -1;
    }

    static indexToWorldPosition(index, numberOfCells) {
        const cellsSquared = Math.sqrt(numberOfCells);

        // 1D → 2D Coordinates (+ Half-Offset)
        let col = (index % cellsSquared) + 0.5;
        let row = (Math.floor(index / cellsSquared)) + 0.5;

        // 2D → 2D Normalized
        row /= cellsSquared;
        col /= cellsSquared;

        // 2D Normalized → World Position
        const halfOfGrid = cellsSquared * 0.5;
        row = Util.scale(row, 0, 1, -halfOfGrid, halfOfGrid);
        col = Util.scale(col, 0, 1, -halfOfGrid, halfOfGrid);

        return {x: col, z: row}
    }

    *buildingIterable() {
        for (let i = 0; i < this._cells.length; ++i) {
            if (this._cells[i] !== null) {
                const position = World.indexToWorldPosition(i, this._cells.length);
                yield {done: false, value: Object.assign(position, this._cells[i])};
            }
        }
    }
}