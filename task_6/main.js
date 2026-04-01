// Exercise 3: Flattening an Array
// Take a nested array (an array of arrays) and turn it into a single "flat" array. Note: While Array.flat() exists now, doing this with reduce is a great logic builder.

// const nested = [[1, 2], [3, 4], [5, 6]];
// function flatten(array) {
//     return array.reduce((acc, current) => acc.concat(current), []);
// }
// console.log(flatten(nested));

// Goal: Use reduce to return [1, 2, 3, 4, 5, 6].

// // ===================================================================================================================
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
function groupByAge(array) {
    return array.reduce((acc, current) => {
        const age = current.age;
        if (!acc[age]) {
            acc[age] = [];
        }
        acc[age].push(current);
        return acc;
    }, {});
}
console.log(groupByAge(people));
// Goal: Use reduce to return:
// {
//   '25': [{ name: 'Alice', age: 25 }, { name: 'Charlie', age: 25 }],
//   '30': [{ name: 'Bob', age: 30 }, { name: 'David', age: 30 }],
//   '60':[{ name: 'John', age: 60 }, { name: 'Giorgi', age: 60 },]
// }