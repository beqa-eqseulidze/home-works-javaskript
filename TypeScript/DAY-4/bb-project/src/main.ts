// ===== processNumbers: ფილტრი და ტრანსფორმატორი (Pipeline) =====

function processNumbers(
  nums: number[],
  filterFn: (n: number) => boolean,
  transformFn: (n: number) => number
): number[] {
  const result: number[] = [];

  for (let i = 0; i < nums.length; i++) {
    if (filterFn(nums[i])) {
      result.push(transformFn(nums[i]));
    }
  }

  return result;
}

const MyNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log("MyNumbers:", MyNumbers);

// მაგალითი 1: მხოლოდ ლუწი რიცხვები, გაორმაგება
const result1 = processNumbers(
  MyNumbers,
  (n) => n % 2 === 0,
  (n) => n * 2
);
console.log("result1:", result1); // უნდა იყოს: [4, 8, 12, 16, 20]

// მაგალითი 2: 5-ზე მეტი რიცხვები, გამოვაკლოთ 5
const result2 = processNumbers(
  MyNumbers,
  (n) => n > 5,
  (n) => n - 5
);
console.log("result2:", result2); // უნდა იყოს: [1, 2, 3, 4, 5]