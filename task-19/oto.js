const persons = [
    { name: 'person-1', birthYear: 1970 },
    { name: 'person-2', birthYear: 2010 },
    { name: 'person-3', birthYear: 2015 }
];

const currentYear = new Date().getFullYear();
persons.forEach(person => {
    person.age = currentYear - person.birthYear;
});
const personsCopy = persons.map(person => {
    const newPerson = { ...person }; 
    delete newPerson.birthYear;
    return newPerson;
});


console.log("Original persons:", persons);
console.log("Copied persons (without birthYear):", personsCopy);