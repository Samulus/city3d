//
// util.js
// Author: Samuel Vargas
// Date: 10/05/2019
//

// https://stackoverflow.com/a/2998874
export function zeroPad(num: number, places: number) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
}