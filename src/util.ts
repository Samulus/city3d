//
// util.js
// Author: Samuel Vargas
// Date: 10/05/2019
//

export function getRandIntUpTo(maxNumber: number) {
    return Math.floor(Math.random() * Math.floor(maxNumber));
}

export function getRandBetween(minNumber: number, maxNumber: number) {
    return getRandIntUpTo(maxNumber) + minNumber;
}

// https://stackoverflow.com/a/23202637
export function scale(num: number, in_min: number, in_max: number, out_min: number, out_max: number) {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

// https://stackoverflow.com/a/2998874
export function zeroPad(num: number, places: number) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
}