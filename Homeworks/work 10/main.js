//=======================დავალება=======================
const persons = [
    { name: 'person-1', birthYear: 1970 },
    { name: 'person-2', birthYear: 2010 },
    { name: 'person-3', birthYear: 2015 }
];

const currentYear = new Date().getFullYear();

// age-ის დამატება
const personsWithAge = persons.map(person => {
    return {
        ...person,
        age: currentYear - person.birthYear
    };
});

// copy-ის შექმნა და იქედან birthYear-ის ამოშლა
const personsCopy = personsWithAge.map(person => {
    const newPerson = { ...person };
    delete newPerson.birthYear;
    return newPerson;
});

// შედეგის დაბეჭვდა
console.log("Original + Age: ", personsWithAge);
console.log("Copy - Birthyear: ", personsCopy);