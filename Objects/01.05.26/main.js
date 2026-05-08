//function test(){}
//const test=function(){}
//const test=()=>{}
//const arr=[]
//const obj={}    


//ობიექტის შექმნა:
   //1 ხერხი: const myOmj={} ძირითადათ ვიყენებთ
   //2 ხერხი: const myOm=new Object()

// const phones1=[577889944, 599487598];
// const phones2=phones;
// phones2[577889944, 599487598];

   //ობიექტი შედგება key და value წყვილებისგან
// const person1 = {
//     name:'Bela',   // Property (პროპერთი)
//     age:33,   // Property (პროპერთი)
//     phones:[577889944, 599487598],
//     fn:()=>{},    //method (მეთოდი)
// }
// const phones=person1.phones;
// phones[0]=111111

//როგორ მივწვდეთ ობიექტში შესაბამის key-ის :
//1 ხერხი : obj.name  //ძირითადათ ვიყენებთ ამ სინტაქსს

//2 ხერხი : obj['name']  //ამ სინტაქსს ვიყენებთ როცა key შემოგვდის სინამიურად
//მაგ: person1 ის ობიექტიდან ალერტით გამოვიტანოთ იმ key-ს მნიშვნელობა რომელსაც იუზერი შეიყვანს პრომპტის ფანჯარაში
// const key=window.prompt('ჩაწერე "age" ან "name":');
// window.alert(person1[key])

// //პროპერტის მნიშვნელობის შეცვლა
// person1.name





// const person1 = {
//     name:'Bela',   // Property (პროპერთი)
//     age:33,   // Property (პროპერთი)
//     phones:[577889944, 599487598],
//     fn:()=>{},    //method (მეთოდი)
// }
//მაგ: person1 ის ობიექტიდან დააკოპირეთ phones მასივი და შეინახეთ ცვლადში
//სახელად დაარქვით myPhones შემდეგ ის მასივში დაამატეთ ახალი ტელეფონი და ბოლოს კონსოლში დაბეჭდეთ ტელეფონების მასივი person1 და myPhones მასივიდან

// const person1 = {
//   name: 'Bela',
//   age: 33,
//   phones: [898668961, 577229077],
// };

// const myPhones = [...person1.phones];

// myPhones.push(574124002);

// console.log('person1 phones:', person1.phones);
// console.log('myPhones:', myPhones);


// const car1 = {
//     mark: "opel",
//     door: 4,
// }
// const car2 = {...car1}
// car2.model = 'astra'
 
// console.log("car1:",car1)
// console.log("car2:",car2)

//პროპერტის წაშლა
const person3 = {
  firstname: "John",
  lastname: "Doe",
  age: 50,
};

delete person3.age;
// console.log(person3)

//object კლასის სტატისკური მეთოდები ობიექტებთან სამუშაოდ
const keys = Object.keys(person3)    //აბრუნებს პარამეტრად გადაცემული ობიექტის key ების მასივს
console.log(keys)
const values = Object.values(person3)    //აბრუნებს პარამეტრად გადაცემული ობიექტის values ების მასივს
console.log(values)