// array-ის მეთოდი reduce;

const arr = [1, 2, 3];
const res = arr.reduce((prev, cur) => prev += cur ** 2, 0);

console.log(res);
