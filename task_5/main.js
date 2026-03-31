function squareSum(numbers) {
    return numbers.reduce((sum, current) => {
        if (Array.isArray(current)) {
            // თუ ელემენტი მასივია, რეკურსიულად ვიძახებთ იგივე ფუნქციას
            return sum + squareSum(current);
        }
        // თუ ელემენტი რიცხვია, აგვყავს კვადრატში და ვამატებთ ჯამს
        return sum + (current * current);
    }, 0);
}

// მაგალითების შემოწმება:
console.log(squareSum([1, 2, 2])); // 1 + 4 + 4 = 9
console.log(squareSum([1, 2, [3, 2]])); // 1 + 4 + (9 + 4) = 18