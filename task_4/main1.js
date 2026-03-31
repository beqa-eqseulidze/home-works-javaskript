
function square(arr){
  let sum = 0;

  for(let i=0; i<arr.length; i++){
    
    sum+=arr[i] * arr[i];
  }
  return sum;
}
 


const result = square([1,2,2]);


console.log("answer", result); 