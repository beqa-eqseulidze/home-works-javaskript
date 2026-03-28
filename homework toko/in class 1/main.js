function Sum(arr) {
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] !== "number" || isNaN(arr[i])) {
      return "Error only numbers";
    }

    sum += arr[i] * arr[i];
  }

  return sum;
}
console.log(Sum([1, 2, 2])); 
console.log(Sum([3, 4]));    
console.log(Sum([3, 4, 'toko'])); 
