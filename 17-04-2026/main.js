

const myDivs=document.querySelectorAll('div');
const mySpan=document.querySelector('span');
const divsArray=Array.from(myDivs)
divsArray.push(mySpan);

for( div of divsArray){
    div.innerText='hello'
}

// myDivs.forEach((div)=>{
//     div.innerText='hello'
// })



// class person{
//     firstName;
//     lastName;

//     static sayHello(){
//         console.log('hello')
//     }
  
//     constructor(name,lastname){
//         this.firstName=name;
//         this.lastName=lastname;
//     }

//     fullName(){
//         return this.firstName+' '+this.lastName
//     }

// }

// const person1=new person('beqa','ekseulidze');
// // const person2=new person('saba','kechakmadze');

// person.sayHello()


// Array

// const array1=new Array(); 
// const array2=[];