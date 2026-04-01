const people = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 25 },
  { name: 'Giorgi', age: 60 },
  { name: 'David', age: 30 },
  { name: 'John', age: 60 },
  { name: 'Kaxa', age: 17 },
  { name: 'Sam', age: 102 }
];

const group = people.reduce((res, person)=>{
  const key = person.age;

  if (!res[key]) {
    res[key] = [];
  }

  res[key].push(person);

  return res;

},{});

console.log(group);
