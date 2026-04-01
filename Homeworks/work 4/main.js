// Exercise 4: Grouping by Property
// Group an array of people by their age.
// Goal: Use reduce to return:
// {
//   '25': [{ name: 'Alice', age: 25 }, { name: 'Charlie', age: 25 }],
//   '30': [{ name: 'Bob', age: 30 }, { name: 'David', age: 30 }],
//   '60':[{ name: 'John', age: 60 }, { name: 'Giorgi', age: 60 },]
// }

const people = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 },
    { name: 'Charlie', age: 25 },
    { name: 'Giorgi', age: 60 },
    { name: 'David', age: 30 },
    { name: 'John', age: 60 }
];

const grouping = people.reduce((acc, person) => {
    if (acc[person.age]) {
        acc[person.age].push(person);
    }
    else {
        acc[person.age] = [person];
    }
    return acc;
}, {});

console.log(grouping)   