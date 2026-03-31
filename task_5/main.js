function squareSum(numbers) {
    return numbers.reduce((sum, current) => {
        if (Array.isArray(current)) {
           
            return sum + squareSum(current);
        }
     
        return sum + (current * current);
    }, 0);
}

console.log(squareSum([1, 2, 2])); 
console.log(squareSum([1, 2, [3, 2]])); 
