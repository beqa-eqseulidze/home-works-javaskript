const products = [
  { id: 1, name: "Laptop", price: 2000, category: "Electronics", stock: 5 },
  { id: 2, name: "Mouse", price: 50, category: "Electronics", stock: 0 },
  { id: 3, name: "Shirt", price: 40, category: "Clothing", stock: 12 },
  { id: 4, name: "Phone", price: 800, category: "Electronics", stock: 10 },
  { id: 5, name: "Jeans", price: 60, category: "Clothing", stock: 3 },
  { id: 6, name: "Keyboard", price: 100, category: "Electronics", stock: 8 },
];

// 1 Task
const filter = products.filter(
  (products) => products.stock > 0 && products.price > 50,
);
// console.log(filter)

// 2 Task
const NameOfProducts = products.map((products) => products.name);
// console.log(NameOfProducts)

// 3 Task
const FindKeyboard = products.find((products) => products.name === "Keyboard");
// console.log(FindKeyboard)

// 4 Task
const ElectronicsPrice = products
  .filter((products) => products.category === "Electronics")
  .reduce((cur, products) => cur + products.price, 0);
// console.log(ElectronicsPrice)

// 5 Task-Lesson  array methods : [].every(); [].some(). ორივე აბრუნებს true ან false.
const res = [1, 3, 5, 4].every((el) => el % 2 != 0);     // res იქნება true
const res2 = [5, 7, 8].some((el) => el % 2 != 0);        //res იქნება true
// --------------------------------------------------
const str="hello world"
const res4=str.split(" ")        // ეს დაყოფს ელემენტებს.
// console.log(res4)
const res5=res4.join("-")        //ეს დააბრუნებს მასივად და რასაც დავუწერთ იმით დააშორებს ერთმანეთისგან,
console.log(res5)
