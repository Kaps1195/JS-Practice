const bahutSaareFloats = require('./AMillionSortedFloats');

// Enter your input float number here
number = 0.000003153092132723857;

// This function takes two arguments, 1. The number for which we want to find the closest number for
// and 2. The input array which is the 'bahutSaareFloats' array
function closest (num, arr) {
    // mid, low and high are the index values of the arr
    let mid;
    let low = 0;
    let high = arr.length - 1;
    while (high - low > 1) {
        mid = Math.floor((low + high) / 2);
        if (arr[mid] < num) {
            low = mid;
        } else {
            high = mid;
        }
    }
    // This condition checks for the smallest difference and prints the result when the low and high are closest to
    // our num. 
    // Ex: If our array is [1, 2, 4] and our num = 2, low = 0, high = 1, it will check for 
    // (num - arr[low] which is 2 - 1 = 1   <=   arr[high] - num which is 4 - 2 = 2)
    // basically 1 <= 2 and the answer is 1
    if (num - arr[low] <= arr[high] - num) {
        return arr[low];
    }
    return arr[high];
}

console.log(closest(number,bahutSaareFloats));