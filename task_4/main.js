function squareSum(numbers) {
  // flatten (nested array-ს გაშლა)
  const flat = numbers.flat(Infinity);

  // კვადრატების ჯამი
  return flat.reduce((sum, num) => {
    return sum + num * num;
  }, 0);
}

// test
console.log(squareSum([1, 2, 2])); // 9
console.log(squareSum([1, 2, 3, [5, 6]])); // 1+4+9+25+36 = 75