//// Complete the square sum function so that it squares each number
//  passed into it and then sums the results together.
// For example, for [1, 2, 2] it should return 9 because 

const numbers=[1, 2, 2]
function squareSum(numbers) {
  const flat = numbers.flat(Infinity);
  return flat.reduce((sum, num) => {
    return sum + num * num;
  }, 0);
}
console.log(squareSum([1, 2, 2])); // 9
console.log(squareSum([1, 2, 3, [5, 6]]));


