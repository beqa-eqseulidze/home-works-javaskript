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

// მხოლოდ ლუწი რიცხვები და გაორმაგება
const result1 = processNumbers(
  MyNumbers, 
  (n) => n % 2 === 0, // filterFn: აბრუნებს true-ს თუ ლუწია
  (n) => n * 2        // transformFn: აორმაგებს
);
console.log(result1); // დაბეჭდავს: [4, 8, 12, 16, 20]

// გვინდა 5-ზე მეტი რიცხვები და გამოვაკლოთ 5
const result2 = processNumbers(
  MyNumbers, 
  (n) => n > 5,       // filterFn: აბრუნებს true-ს თუ 5-ზე მეტია
  (n) => n - 5        // transformFn: აკლებს 5-ს
);
console.log(result2); // დაბეჭდავს: [1, 2, 3, 4, 5]