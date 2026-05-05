const persons = [
    { name: 'Bela', birthYear: 1993 },
    { name: 'Nika', birthYear: 1972 },
    { name: 'Andro', birthYear: 1999 }
];

const currentYear = new Date().getFullYear();

// დავამატე age (არ ვცვლი original array-ს)
const personsWithAge = persons.map(person => ({
    ...person,
    age: currentYear - person.birthYear
}));

// 2. შევქმენი ახალი მასივი და წავშალე birthYear
const personsCopy = personsWithAge.map(({ birthYear, ...rest }) => rest);

// 3. დავბეჭდე
console.log('Original + age:', personsWithAge);
console.log('Copy without birthYear:', personsCopy);