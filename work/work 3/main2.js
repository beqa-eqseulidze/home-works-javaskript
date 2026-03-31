const nested = [[1, 2], [3, 4], [5, 6]];

const res = nested.reduce((acc, arr) => {
    arr.forEach(num => acc.push(num));
    return acc;
}, []);

console.log(res)