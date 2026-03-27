// Write a JavaScript function to get the last
// element of an array. Passing the parameter 'n'
// will return the last 'n' elements of the array.
// Test Data :

console.log(last([7, 9, 0, -2]));//check
console.log(last([7, 9, 0, -2,5,6,9],3));
console.log(last([7, 9, 0, -2],6));

// Expected Output :
// -2
// [9, 0, -2]
// [7, 9, 0, -2]

function last(arr, n) {
  if (!Array.isArray(arr)) return;
  if (n && !isNaN(n)) {

    return arr.slice(arr.length-3)
    // ან ესე
    // return arr.filter((item, i) =>{
    //     const length=arr.length 
    //     return length<=i+n;
    // });
  }
  else if(!n){
    return arr[arr.length-1]
  }
}
