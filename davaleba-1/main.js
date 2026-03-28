// Complete the square sum function so that it squares each number
//  passed into it and then sums the results together.
// For example, for [1, 2, 2] it should return 9 because 




function square(arr){
  let sum = 0;

  for(let i=0; i<arr.length; i++){
    
    sum+=arr[i] * arr[i];
  }
  return sum;
}
 


const result = square([1,2,2]);


console.log("answer", result); 


