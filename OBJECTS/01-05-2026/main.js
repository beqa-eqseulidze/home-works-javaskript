// // function test(){}
// // const test=function(){}
// // const test=()=>{}
// // const arr=[]
// // const obj={}

// //ობიექტის შექმნა
//     // 1 ხერხი : const myOmj={} //ძირითადად ვიყენებთ
//     // 2 ხერხი : const myOmj= new Object()

// //ობექტი შედგება key და value წყვილებისგან,
// const person1 = {
//   name: "john", //property (პროპერთი)
//   age: 26, //property (პროპერთი)
//   phones:[577889944,599487596],
//   fn: () => {}, // method (მეთოდი)
// };


// //როგორ მივწვდეთ ობიექტში შესაბამის key ის :
// // 1 ხერხი: obj.name //ძირითადად ვიყენებთ ამ სინტაქსს

// // 2 ხერხი: obj['name'] // ამ სინტაქსს ვიყენებთ როცა key შემოგვდის დინამიურად
// // მაგ: person1 ის ობიექტიდან, ალერტით გამოვიტანოთ 
// // იმ key მნიშვნელობა რომელსაც იუზერი შეიყვანს 
// // პრომტის ფანჯარაში
// // const key=window.prompt('ჩაწერე "age" ან "name": ');
// // window.alert(person1[key])

// //პროპერტის მნიშვნელობის შეცვლა
// person1.name='beqa'

// //მაგ: person1 ის ობიექტიდან დააკოპირეთ phones მასივი და შეინახეთ ცვლადში 
// // სახელად const myPhones შემდე myPhones ის მასივში დაამატეთ ახალი ტელეფონი
// // ბოლოს კონსოლში დაბეჭდეთ 
// // ტელეფონების მასივი person1 ის ობიექტიდან და myPhones მასივისდან;

// // const myPhones=[...person1.phones];
// // const myPhones=person1.phones.map(item=>item);
// // const myPhones=person1.phones.slice(0);

// // ობიექტის დაკოპირება 
// const car1={
//     mark:'opel',
//     door: 4
// }

// const car2={...car1}
// car2.model='astra'

// // console.log("car1: ", car1)
// // console.log("car2: ", car2)

// // პროპერტის წაშლა
const person3 = {
  firstname: "John",
  lastname: "Doe",
  age: 50,
};

// delete person3.age;

// // console.log(person3)


// //  Object  კლასის სტატიკური მეთოდები ობიექტებთან სამუშაოდ
// const keys=Object.keys(person3) // აბრუნებს პარამეტრად გადაცემული ობიექტის key ების მასივს
// // console.log(keys);
// const values=Object.values(person3); // აბრუნებს პარამეტრად გადაცემული ობიექტის value - ების მასივს
// // console.log(values);

const entries=Object.entries(person3);
console.log(entries)

// const target = { a: 1, b: 2 };
// const source = { b: 4, c: 5 };
// console.log(target['a'])


// const returnedTarget = Object.assign(source, target);
// // { a: 1, b: 4, c: 5};
// console.log(returnedTarget)

// const obj = { fName: 'ff', lName: 'gg' };
// obj.fullname=function(){}

// console.log(obj.fullname())


// დავალება 
// მოცემულ პერსონების მასივში ყველა პერსონის ობიექტს დაამატეთ ახალი property "age" შესაბამისი მნიშვნელობით,
// ასევე შემდეგ შექმენი არსებული პერსონების copy და თვითოეულ ობიექტიდან წაშალე პროპერტი "birthYear"

const persons=[
    {name: 'person-1', birthYear:1970},
    {name: 'person-2', birthYear:2010},
    {name: 'person-3', birthYear:2015}
]

// ორივე ობიექტი დაბეჭდე კონსოლში და დააკვირდი რომ "birthYear" პროპერტყ მხოლოდ copy პერსონებიდან არის წაშლილი

