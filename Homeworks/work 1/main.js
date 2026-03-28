
console.log(array_Clone([1, 2, 4, 0]));
console.log(array_Clone([1, 2, [4, 0]]));
function array_Clone(arr) {
    return arr.map(item => {
        if (Array.isArray(item)) {
            return array_Clone(item);
        } else {
            return item;
        }
    });
}