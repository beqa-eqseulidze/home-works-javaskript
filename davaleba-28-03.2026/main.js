// Task 2: Clone Array
const data1 = [1, 2, 4, 0];
const data2 = [1, 2, [4, 0]];

function array_Clone(array) {
    return array.slice(0);
}

console.log("Clone 1:", array_Clone(data1));
console.log("Clone 2:", array_Clone(data2));