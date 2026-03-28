// Task 2: Clone Array
const data1 = [1, 2, 4, 0];
const data2 = [1, 2, [4, 0]];

function array_Clone(array) {
    return array.slice(0);
}

const Clone_1=array_Clone(data1)
const Clone_2=array_Clone(data2)

Clone_1.push(2)

console.log("Original data:", data1);
console.log("Clone 1(modified):", Clone_1);