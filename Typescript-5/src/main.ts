const MyNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function processNumbers(nums: number[], filterFn: (n: number) => boolean, transformFn: (n: number) => number): number[] {
    const result: number[] = [];
    for (let i = 0; i < nums.length; i++) {
        if (filterFn(nums[i])) {
            result.push(transformFn(nums[i]));
        }
    }
    return result;
}

const result1 = processNumbers(
    MyNumbers,
    (n) => n % 2 === 0,
    (n) => n * 2
);
console.log(result1);

const result2 = processNumbers(
    MyNumbers,
    (n) => n > 5,
    (n) => n - 5
);
console.log(result2);
