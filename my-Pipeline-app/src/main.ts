function processNumbers(
    nums: number[],
    filterFn: (num: number) => boolean,
    transformFn: (num: number) => number
): number[] {
    const result: number[] = [];

    for (let i = 0; i < nums.length; i++) {
        const currentNumber = nums[i];
        // თუ ფილტრის ფუნქციამ დააბრუნა true
        if (filterFn(currentNumber)) {
            const transformedNumber = transformFn(currentNumber);
            result.push(transformedNumber);
        }
    }

    return result;
}

const MyNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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