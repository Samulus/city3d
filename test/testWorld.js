//
// worldbuffer.js
// Author: Samuel Vargas
// Date: 10/05/2019
//

import {suite, test} from "mocha";

const mocha = require("mocha").suite;
const assert = require("chai").assert;
const World = require ("../src/world").World;

suite("world.js", () => {
    test("constructor() - Buildings are added on construction", () => {
        const world = new World(2, 4); // 2x2, 4 buildings → full map
        let building = world.buildingIterable().next();
        let addedBuildings = 0;

        for (let b of world.buildingIterable()) {
            assert.isFalse(building.done);
            assert.isNotNull(building.value);
            addedBuildings++;
        }

        assert.equal(4, addedBuildings);
    });

    test("#indexToWorldPosition - Misc scenarios", () => {
        // Center → {x: 0, z: 0}
        var position;
        position = World.indexToWorldPosition(4, 9);
        assert.equal(position.x, 0);
        assert.equal(position.z, 0);

        // North → {x: 0, z: -1}
        position = World.indexToWorldPosition(1, 9);
        assert.equal(position.x, 0);
        assert.equal(position.z, -1);

        // South → {x: 0, z: 1}
        position = World.indexToWorldPosition(7, 9);
        assert.equal(position.x, 0);
        assert.equal(position.z, 1);

        // West → {x: -1, z: 0}
        position = World.indexToWorldPosition(3, 9);
        assert.equal(position.x, -1);
        assert.equal(position.z, 0);

        // East → {x: 1, z: 0}
        position = World.indexToWorldPosition(5, 9);
        assert.equal(position.x, 1);
        assert.equal(position.z, 0);
    });
});