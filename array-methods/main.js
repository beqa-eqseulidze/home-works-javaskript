//main.js

// თვისება length აბრუნებს მასივის სიგრძეს(ზომას) :
// const fruits = ["apple", "banana", "orange", "mango", "grapes"];
// let size = fruits.length;
// console.log(size);

//მეთოდი toString()მასივის ელემენტებს აბრუნებს მძიმით გამოყოფილი სტრიქონის სახით.
// const fruits = ["apple", "banana", "orange", "mango", "grapes"];
// let myList = fruits.toString();
// console.log(myList);

//მეთოდი at()მასივიდან ინდექსირებულ ელემენტს აბრუნებს.
// const fruits = ["apple", "banana", "orange", "mango", "grapes"];
// let fruit = fruits.at(2);
// console.log(fruit);

//მეთოდი join() აკავშირებს მასივის ყველა ელემენტს სტრიქონში როგორც toString(), მაგრამ დამატებით შეგიძლიათ მიუთითოთ გამყოფი.
// const fruits = ["apple", "banana", "orange", "mango", "grapes"];
// console.log(fruits.join(" / "));

//მეთოდი pop()მასივიდან ბოლო ელემენტს შლის.
// const fruits = ["apple", "banana", "orange", "mango", "grapes"];
// fruits.pop(2);
// console.log(fruits);

//მეთოდი pop()აბრუნებს მნიშვნელობას, რომელიც „ამოშლილია“: 
// const fruits = ["apple", "banana", "orange", "mango", "grapes"];
// let fruit = fruits.pop();
// console.log(fruit);

//მეთოდი push()მასივს (ბოლოს) ახალ ელემენტს უმატებს:
// const fruits = ["apple", "banana", "orange", "mango", "grapes"];
// fruits.push("kiwi");
// console.log(fruits);

//მეთოდი push()აბრუნებს ახალ სიგრძეს:
// const fruits = ["apple", "banana", "orange", "mango", "grapes"];
// let length = fruits.push("kiwi");
// console.log(length);

//მეთოდი shift()შლის მასივის პირველ ელემენტს და ყველა სხვა ელემენტს უფრო დაბალ ინდექსზე „გადაჰყავს“.
// const fruits = ["Banana", "Orange", "Apple", "Mango"];
// fruits.shift();
// console.log(fruits);

//მეთოდი shift()აბრუნებს მნიშვნელობას, რომელიც „გადაიტანეს“
// const fruits = ["Banana", "Orange", "Apple", "Mango"];
// let fruit = fruits.shift();
// console.log(fruit); 

//მეთოდი unshift() მასივს ახალ ელემენტს უმატებს და ძველ ელემენტებს ცვლის
// const fruits = ["Banana", "Orange", "Apple", "Mango"];
// fruits.unshift("Lemon");
// console.log(fruits);

//ეთოდი unshift()აბრუნებს მასივის ახალ სიგრძეს
// const fruits = ["Banana", "Orange", "Apple", "Mango"];
// fruits.unshift("Lemon");
// console.log(fruits.length);

//თვისება lengthმასივში ახალი ელემენტის დამატების მარტივ გზას გვთავაზობს:
// const fruits = ["Banana", "Orange", "Apple", "Mango"];
// fruits[fruits.length] = "Kiwi";
// console.log(fruits);

//თვისება delete მასივიდან ელემენტს შლის, მაგრამ არ ცვლის ინდექსებს:
// const fruits = ["Banana", "Orange", "Apple", "Mango"];
// delete fruits[0];
// console.log(fruits);

//მეთოდი concat()ქმნის ახალ მასივს არსებული მასივების გაერთიანებით (კონკატენაციით):
// const myGirls = ["Cecilia", "Liza", "Bela"];
// const myBoys = ["Nika", "Tornike", "Luka"];
// const myChildren = myGirls.concat(myBoys);
// console.log(myChildren);

//მეთოდი concat()არ ცვლის არსებულ მასივებს. ის ყოველთვის აბრუნებს ახალ მასივს.
//მეთოდს concat()შეუძლია მიიღოს მასივის ნებისმიერი რაოდენობის არგუმენტი.
// const arr1 = ["Cecilie", "Lone"];
// const arr2 = ["Emil", "Tobias", "Linus"];
// const arr3 = ["Robin", "Morgan"];
// const myChildren = arr1.concat(arr2, arr3);
// console.log(myChildren);

//მეთოდს concat()ასევე შეუძლია სტრიქონების არგუმენტებად აღება:
// const arr1 = ["Emil", "Tobias", "Linus"];
// const myChildren = arr1.concat("Robin", "Morgan");
// console.log(myChildren);

//მეთოდი copyWithin()მასივის ელემენტებს მასივის სხვა პოზიციაზე კოპირებს:
// const fruits = ["Banana", "Orange", "Apple", "Mango"];
// fruits.copyWithin(0, 2);
// console.log(fruits);

//მეთოდი copyWithin() ინდექს 0-იდან ინდექს 2-მდე ელემენტების კოპირება მე-2 ინდექსში
//მეთოდი copyWithin()არსებულ მნიშვნელობებს გადაწერს.
//მეთოდი copyWithin()მასივში ელემენტებს არ ამატებს.
//მეთოდი copyWithin()არ ცვლის მასივის სიგრძეს.
// const fruits = ["Banana", "Orange", "Apple", "Mango", "Kiwi"];
// fruits.copyWithin(2, 0, 2);
// console.log(fruits);

//მეთოდი flat() ქმნის ახალ მასივს ქვემასივის ელემენტებით, რომელებიც დაკავშირებულია მითითებულ სიღრმეზე.
// const myArr = [[1, 2], [3, 4], [5, 6], [7, 8]];
// const newArr = myArr.flat();
// console.log(newArr);

//მეთოდი flatMap()თავდაპირველად ასახავს მასივის ყველა ელემენტს და შემდეგ ქმნის ახალ მასივს მასივის გაბრტყელებით.
// const myArr = [1, 2, 3, 4, 5, 6];
// const newArr = myArr.flatMap(x => [x, x * 10]);
// console.log(newArr);



// function test(fn) {
//     return fn();
// }
// let a=0;
// function increase() {
//     a++
// }
// const res=test(increase);

// console.log(res)

//find ეძებს ელემენტ მასივში
const persons=[
    {id:1,firsName:'giorgi'},
    {id:2,firsName:'saba'},
    {id:3,firsName:'tornike'},
    {id:4,firsName:'bela'},
    {id:5,firsName:'tornike'}
];

//find
// const personId=persons.find((item, index, arr) =>item.id==6);

//foreach ეს მეთოდი ახალ მასივს არ აბრუნებს
const a=persons.forEach((item,index,arr) => {
    item.lastName='default'
})
//map
const transformedUsers=persons.map((item,index,arr) =>{
    return item
});
// const indexS=persons.((item,index,arr) =>{
//     return item
// });
// console.log(indexS);

const indexE = persons.findLastIndex((item,index,arr) =>{
    return item
});
console.log(indexE);
const index=persons.findIndex((item,index,arr) =>{
    return item.firsName==='tornike'
});
console.log(index)
//  copiedPersons.push({id:5,firstName:'oto'});
//  copiedPersons[1]='beqa'

//  console.log('copiedPersons:', copiedPersons);
//  console.log('persons;', persons);


