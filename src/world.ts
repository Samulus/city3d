/*
//
// world.ts
// Author: Samuel Vargas
// Date: 10/05/2019
//

import {Building} from "./building";
const Util = require("./util");

export class World {
    private cells: Array<Building | null>;
    private numBuildings: number;

    constructor(gridSize: number, numBuildings: number) {
        this.cells = new Array(gridSize * gridSize).fill(null);
        this.numBuildings = numBuildings;
        this.addRandomBuildings(this.numBuildings);
    }

    addRandomBuildings(numToAdd: number) {
        let addedCount = 0;
        for (let i = 0; i < numToAdd; ++i) {
            const index = this.getRandomCellIndex((cell) => cell === null);
            if (index < 0) {
                // no more space for additional buildings
                this.numBuildings += addedCount;
                return;
            }
            this.cells[index] = Building.getRandomBuilding();
            addedCount++;
        }
    }

    getRandomCellIndex(filterCB: (cell: Building | null) => boolean): number {
        const randArrIndex = Util.getRandIntUpTo(this.cells.length);
        for (let i = randArrIndex; i >= 0; --i) {
            if (filterCB(this.cells[i])) {
                return i;
            }
        }

        for (let i = randArrIndex + 1; i < this.cells.length; ++i) {
            if (filterCB(this.cells[i])) {
                return i;
            }
        }

        return -1;
    }

    static indexToWorldPosition(index: number, numberOfCells: number) {
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

    * buildingIterable() {
        for (let i = 0; i < this.cells.length; ++i) {
            if (this.cells[i] !== null) {
                const position = World.indexToWorldPosition(i, this.cells.length);
                yield {done: false, value: Object.assign(position, this.cells[i])};
            }
        }
    }
}
 */