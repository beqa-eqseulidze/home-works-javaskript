const persons = [
  { name: 'person-1', birthYear: 1970 },
  { name: 'person-2', birthYear: 2010 },
  { name: 'person-3', birthYear: 2015 }
];


const curr = new Date().getFullYear();


persons.forEach(person => {
  person.age = curr - person.birthYear;
});


const personsCopy = persons.map(person => {
  const { birthYear, ...filtered } = person; 
  return filtered;
});



console.log("original persons:", persons);
console.log("copy persons:", personsCopy);