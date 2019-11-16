//
// randomuniquesequence.ts
// Author: Samuel Vargas
// Date: 11/15/2019
//

export class RandomUniqueSequence implements Iterable<number|null> {
    private readonly lowerLimit: number;
    private readonly upperLimit: number;
    private readonly smallPrime: number;
    private readonly largePrime: number;
    private index: number;

    /**
     * Iterable that returns a pseudo random sequence of every value
     * in the range (lowerLimit, upperLimit] without duplication.
     * 
     * @param lowerLimit Inclusive minimum value in random range
     * @param upperLimit Exclusive maximum value in random range
     */

    constructor(lowerLimit: number, upperLimit: number) {
        this.lowerLimit = lowerLimit;
        this.upperLimit = upperLimit;
        const delta = this.upperLimit - this.lowerLimit;

        if (delta <= 0) {
            throw new Error(`lowerLimit=${lowerLimit}, upperLimit=${upperLimit}, 
                             lower limit must be < upper limit`);
        }

        this.smallPrime = RandomUniqueSequence.nextPrime(delta);
        this.largePrime = RandomUniqueSequence.nextPrime(this.smallPrime);
        this.index = 0;
    }

    [Symbol.iterator]() {
        const that = this;
        // noinspection JSUnusedGlobalSymbols
        return {
            next(): IteratorResult<number|null> {
                let nextNumber = that.nextNumberInSequence();
                if (nextNumber === null) {
                    that.index = 0;
                }
                return {done: nextNumber === null, value: nextNumber};
            }
        }
    }
    private nextNumberInSequence(): number | null {
        let nextRandomNumber = null;
        while (this.index < this.smallPrime) {
            nextRandomNumber = (this.index * this.largePrime) % this.smallPrime;
            this.index++;
            if (nextRandomNumber >= this.lowerLimit && nextRandomNumber < this.upperLimit) {
                break;
            }
            nextRandomNumber = null;
        } 

        return nextRandomNumber;
    }

    private static nextPrime(n: number): number {
        let i = n + 1;
        while (true) {
            ++i;
            if (RandomUniqueSequence.isPrime(i)) {
                return i;
            }
        }
    }

    private static isPrime(n: number): boolean {
        if (n < 2) {
            return false;
        }

        const q = Math.floor(Math.sqrt(n));
        for (let i = 2; i <= q; i++) {
            if (n % i == 0) {
                return false;
            }
        }
    
        return true;
    }
}