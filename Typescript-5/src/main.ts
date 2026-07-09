const MyNumbers : number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 , 12];

function processNumbers(nums: number[], filterFn: (n: number) => boolean,
  transformFn: (n: number) => number): number[] {
  const result: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    if (filterFn(nums[i])) {
      result.push(transformFn(nums[i]));
    }
  }
  return result;
}


const result1: number[] = processNumbers(
  MyNumbers,
  (n) => n % 2 === 0,  //ვამოწმებ ლუწობას
  (n) => n * 2
);
console.log(result1);  // res - [4, 8, 12, 16, 20 , 24]


const result2: number[] = processNumbers(
  MyNumbers,
  (n) => n > 5,  //ვამოწმებ 5-ზე მეტობას
  (n) => n - 5 
);
console.log(result2); // res - [1, 2, 3, 4, 5]
