//
// testrandomuniquesequence.ts
// Author: Samuel Vargas
// Date: 11/05/2019
//

import { RandomUniqueSequence } from '../src/randomuniquesequence';
import { describe, test} from "mocha"
import { assert } from "chai"

describe("testrandomuniquesequence.ts", () => {
    const LOWER_LIMIT = 16;
    const UPPER_LIMIT = 1_000_000;

    test(`[${LOWER_LIMIT}, ${UPPER_LIMIT}) are uniquely present in output`, () => {
        const numberGenerator = new RandomUniqueSequence(LOWER_LIMIT, UPPER_LIMIT);
        const numbersInSequence = new Set<number>();
        for (let n of numberGenerator) {
            if (numbersInSequence.has(n!)) {
                assert.fail(`${n} was found twice, non unique number detected.`)
            }

            numbersInSequence.add(n!)
        }
        assert.isNotTrue(numbersInSequence.has(UPPER_LIMIT))

        for (let i=0; i < LOWER_LIMIT; ++i) {
            assert.isNotTrue(numbersInSequence.has(i), `Found ${i} in numbersInSequence`)
        }
    });

});
