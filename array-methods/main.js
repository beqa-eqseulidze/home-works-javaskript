//მასივის მეთოდები (array methods)

const myNumber = [1, 2];
// console.log(myNumber.length);

//ამატებს ელემენტს მასივის ბოლოში
// myNumber.push(4);
// console.log(myNumber);

//ამატებს ელემენტს მასივის თავში
// myNumber.unshift(5);
// console.log(myNumber);

//ამოშლის ელემენტს მასივის ბოლოდან
// const removeElement=myNumber.pop()
// console.log('removeElement:', removeElement)
// console.log(myNumber);

//ამოშლის ელემენტს მასივის თავში
// const removeElement=myNumber.shift();
// console.log('removeElement:', removeElement)
// console.log('myNumber: ',myNumber);

//find ეძებს ელემენტ მასივში
const persons = [
  { id: 1, firsName: "giorgi" },
  { id: 2, firsName: "saba" },
  { id: 3, firsName: "tornike" },
  { id: 4, firsName: "bela" },
  { id: 5, firsName: "tornike" },
  { id: 6, firsName: "beqa" },
];
//find
// const personId=persons.find((item,index,arr)=>item.id==6);

//foreach ეს მეთოდი ახალა მასივს არ აბრუნებს
const a = persons.forEach((item, index, arr) => {
  item.lastName = "default";
});

//map
const copiedPersons = persons.map((item, index, arr) => {
  return item;
});

//findindex ეძებს სასურველ ელემენტს თავიდან და შეჩერდება სადც იპოვის
const indexS = persons.findIndex((item, index, arr) => {
  return item.firsName == "tornike";
});
console.log(indexS);

//findindex ეძებს სასურველ ელემენტს მასივის ბოლოდან და შეჩერდება სადც იპოვის
const indexE = persons.findLastIndex((item, index, arr) => {
  return item.firsName == "tornike";
});

//filter აბრუნებს სასურველი ელემენტების მასივს
const filteredPersons = persons.filter((item, index, arr) => {
  return item.id % 2 !== 0;
});

console.log(filteredPersons);

// console.log('copiedPersons: ',copiedPersons);
// console.log('persons; ',persons)
