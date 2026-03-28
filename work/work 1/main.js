const numbers = [1, 2, 2]
function square(numbers) {
    const squared = numbers.map((num) => num * num);
    let sum = 0;

    for (let i = 0; i < numbers.length; i++) {
        sum += squared[i];
    }

    return sum;
}

console.log(square([1, 2, 2]));