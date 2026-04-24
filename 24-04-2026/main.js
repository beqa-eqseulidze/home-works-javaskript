// const myHeading=document.querySelector('h1')

// console.dir(myHeading)

// function clearClass(){
//     myHeading.className = "beqa";
//     console.dir(myHeading)
// }

//  ===================  რესტ პარამეტრები (Rest parameters) ===========

// function test(...params){
//     let sum=0;
//     for(let param of params){
//         sum+=param
//     }
//     return sum
// }
// console.log(myArrowFn(1,2,3,4,10))


// ===============  default parameters =================

// function test(a=[],b=[]){
//    return a.concat(b) 
// }

// console.log(test([1,2,3]));

// ======================= Optional chaining (?.) operator =========
const adventurer = {
  name: "Alice",
  cat: {
    name: "Dinah",
  },
  dogs:[{name:'jeka'}]
};
// if(adventurer.dogs && adventurer.dogs[1]){    
//     const dogName = adventurer.dogs[1].name;
//     console.log(dogName);
// }
const dogName=adventurer?.dogs[1]?.name
console.log(dogName)
// Expected output: undefined
// console.log(adventurer.someNonExistentMethod?.());
// Expected output: undefined



// დაწერეთ ფუნქცია რომელიც პარამეტრად იღებს ობიექტს 
// და ამ ობიექტიდან დაბეჭდავს ძაღლის სახელს;
// მაგალითად ობიექტი შეიძლება იყოს ესეთი: 
 const obj={
    name:'John',
    age:21,
    // dog:{ color:'black', name: 'jeka'}
 }

//  =============================== class work 2 ================
// The Challenge: The "Galactic Library"
// You have an array of User objects. Some users have a profile and library data, while others are missing sections entirely. Your task is to extract a clean list of book titles that meet specific criteria without the code crashing.
// The Data
// JavaScript
const users = [
  {
    id: 1,
    name: "Aria",
    profile: {
      membership: { type: "Premium", active: true }
    },
    library: [
      { title: "The Martian", rating: 4.5 },
      { title: "Dune", rating: 4.8 }
    ]
  },
  {
    id: 2,
    name: "Bob",
    profile: null, // Bob has no profile!
    library: [
      { title: "Project Hail Mary", rating: 4.9 }
    ]
  },
  {
    id: 3,
    name: "Cassie",
    profile: {
      membership: { type: "Basic", active: false }
    },
    // Cassie has no library property!
  }
];