// exercise 1
// Calculate the total price of all items in a shopping cart.
items = [
  { name: "Apple", price: 1.5 },
  { name: "Laptop", price: 1200 },
  { name: "Notebook", price: 5 },
  { name: "Coffee", price: 4 },
];
// Goal: Use reduce to return the sum of all prices ($1210.5$).

// ====================================================================

// Exercise 2: Tallying Votes (Frequency Map)
// Count how many times each string appears in an array.
// This is a classic real-world use case for reduce to
// create an object.

const votes = ["yes", "no", "yes"];
// Goal: Use reduce to return an object like { yes: 3, no: 2, maybe: 1, absent: 1 }.
// Hint: Use an empty object {} as your initialValue.

function sum(search, array) {
  let res = 0;
  for (item of array) {
    if (search === item) res++;
  }
  return res;
}

const res = votes.reduce((prev, cur, index, arr) => {
  prev[cur] = sum(cur, arr);
  return prev;
}, {});

// call-1 ({},'yes')=>{ return {yes:2}}
// call-2 ({yes:2},'no')=>{ return {yes:3, no:1}}
// call-3 ({yes:3, no:1},'yes')=>{ return {yes:3, no:1}}

console.log(res);

// ====================================================================================================
// Exercise 3: Flattening an Array
// Take a nested array (an array of arrays) and turn it into a single "flat" array. Note: While Array.flat() exists now, doing this with reduce is a great logic builder.

const nested = [[1, 2], [3, 4], [5, 6]];
// Goal: Use reduce to return [1, 2, 3, 4, 5, 6].

// ===================================================================================================================
// Exercise 4: Grouping by Property
// Group an array of people by their age.

const people = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 25 },
  { name: 'Giorgi', age: 60 },
  { name: 'David', age: 30 },
  { name: 'John', age: 60 }
];

// Goal: Use reduce to return:
// {
//   '25': [{ name: 'Alice', age: 25 }, { name: 'Charlie', age: 25 }],
//   '30': [{ name: 'Bob', age: 30 }, { name: 'David', age: 30 }],
//   '60':[{ name: 'John', age: 60 }, { name: 'Giorgi', age: 60 },]
// }
