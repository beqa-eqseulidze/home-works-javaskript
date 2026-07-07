// ts წინასწარ განსაზღვრული მონაცემის ტიპები:
// number, string, boolean,null,undefined;

// //js კოდი
// let a;
// a = 15;
// a = "dd";

// //ts კოდი
// let b: number;
// b=16;
// // b="beqa"
// console.log(b*2)

// js
const myNumbers = [];
myNumbers.push(12);
console.log(myNumbers);
myNumbers.push("test");
console.log(myNumbers);

//ts
const myNumbers1: number[] = [];
myNumbers1.push(12);
console.log(myNumbers1);
myNumbers1.push(26);
console.log(myNumbers1);

function sayHello(name: string): string {
  if (name.length < 5) {
    return `Hello ${name}`;
  } else {
    console.log(`Hello ${name}`);
    return "";
  }
}

function logger(name: string): void {
  console.log(name);
}

sayHello("Saba");


🌤️ დავალება: ამინდის სტატისტიკა (Weather Tracker)
ჩვენ გვექნება ორი დამოუკიდებელი მასივი, რომლებიც ერთმანეთთან ინდექსებით იქნებიან დაკავშირებული 
(მაგალითად, მე-0 ინდექსზე იქნება პირველი ქალაქი და პირველი ქალაქის ტემპერატურა):
cities: ქალაქების სახელების მასივი (string[])
temperatures: ტემპერატურების მასივი (number[])
შენი მიზანია დაწერო 3 ფუნქცია:
1. ფუნქცია addWeatherData
ეს ფუნქცია სისტემაში ამატებს ახალ ქალაქს და მის ტემპერატურას.

პარამეტრები: * cityList: ქალაქების მასივი (string[])

tempList: ტემპერატურების მასივი (number[])

cityName: ახალი ქალაქის სახელი (string)

tempValue: ახალი ქალაქის ტემპერატურა (number)

რას აკეთებს: ფუნქციამ cityName უნდა ჩაამატოს ქალაქების მასივში, 
ხოლო tempValue — ტემპერატურების მასივში. (გამოიყენე .push()).

2. ფუნქცია countFreezingCities
ეს ფუნქცია ითვლის, რამდენ ქალაქშია ყინვა (ანუ ტემპერატურა 0 გრადუსზე ნაკლებია).

პარამეტრები: ტემპერატურების მასივი (number[]).

რას აკეთებს: უნდა გადაუაროს ტემპერატურების მასივს, დაითვალოს რამდენი რიცხვია < 0 და დააბრუნოს ეს რაოდენობა (number).

3. ფუნქცია printWeatherSummary
ეს ფუნქცია ეკრანზე ბეჭდავს სრულ ინფორმაციას.

პარამეტრები: cityList (string[]) და tempList (number[]).

რას აკეთებს: for ციკლის გამოყენებით უნდა გადაუაროს მასივებს (რადგან ორივე მასივში მონაცემები ერთი და იგივე თანმიმდევრობითაა, ინდექსი i ორივესთვის საერთო იქნება) და გამოიტანოს ტექსტი. მაგალითად: "თბილისი: 15 გრადუსი".