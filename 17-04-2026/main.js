

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


// setTimeout და setInterval clearInterval ფუნქციები :

// 1) setTimeout ფუნქცია;

function seyHello(){
    console.log('hello')   
}
function seyGoodby(){
    console.log('Goodby')   
}

//  setTimeout(seyHello,5000)

// 2) setInterval ფუნქცია;

let helloInterval=setInterval(seyHello,1000);
// setInterval(seyGoodby,1000);


function killInterval(){
    console.log('interval killed')
    clearInterval(helloInterval)
}

setTimeout(killInterval,5001)


// დავალება :
// გააკეთეთ ვებგვერდი სადაც ეკრანზე გამოიტანთ საათს და ეს საათი უნდა იყოს მოქმედი და სწორი
// საათის ფორმატი 17:06:08 (საათი : წუთი : წამი)
// გამოიყენეთ Date ის ობიექტის ჩაშენებული მეთოდები და setInterval ფუნქცია ;
//