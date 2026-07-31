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