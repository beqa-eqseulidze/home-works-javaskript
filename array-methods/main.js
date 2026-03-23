//მასივის მეთოდები (array methods)

const myNumber=[1,2];
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
const persons=[
    {id:1,firsName:'giorgi'},
    {id:2,firsName:'saba'},
    {id:3,firsName:'tornike'},
    {id:4,firsName:'bela'},
];

const person=persons.find((item,index,arr)=>{
     console.log('item: ', item);
     console.log('index: ', index);
     console.log('arr: ', arr);
     console.log('********************************************')
     return item.id==6
})

console.log('person:' , person);