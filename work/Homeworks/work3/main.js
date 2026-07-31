function array_clone(arr) {
    return arr.reduce((acc, item) => {
        if (Array.isArray(item)) {
            acc.push(array_clone(item));
        } else {
            acc.push(item);
        }
        return acc;
    }, []);
}

let result1 = array_clone([1, 2, 4, 0]);
let original = [1, 2, [4, 0]];
let result2 = structuredClone(original);

result2[2].push(5);

console.log(result1);
console.log(result2);
console.log(original);