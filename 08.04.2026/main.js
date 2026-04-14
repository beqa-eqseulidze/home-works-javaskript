const products = [
  { id: 1, name: "Laptop", price: 2000, category: "Electronics", stock: 5 },
  { id: 2, name: "Mouse", price: 50, category: "Electronics", stock: 0 },
  { id: 3, name: "Shirt", price: 40, category: "Clothing", stock: 12 },
  { id: 4, name: "Phone", price: 800, category: "Electronics", stock: 10 },
  { id: 5, name: "Jeans", price: 60, category: "Clothing", stock: 3 },
  { id: 6, name: "Keyboard", price: 100, category: "Electronics", stock: 8 }
];
    
// ========= 1 ===========
// ფილტრაცია (filter): შექმენი ახალი მასივი, 
// რომელიც შეიცავს მხოლოდ იმ პროდუქტებს, რომლებიც მარაგშია (stock > 0) 
// და მათი ფასი 50 ლარზე მეტია.
const filteredProducts = products.filter(p => p.stock > 0 && p.price > 50);
console.log(filteredProducts)


// ========= 2 ===========
// მასივიდან შექმენი მხოლოდ დასახელებების 
// მასივი (მაგ: ["Laptop", "Phone", ...]).
const productNames = products.map(p => p.name);
console.log(productNames)

// ========= 3 ===========
// ძებნა (find): იპოვე პროდუქტი, რომლის სახელია "Keyboard".

const keyboard = products.find(p => p.name === "Keyboard");
console.log(keyboard)


// // ========= 4 ===========
// // ჯამი (reduce): დათვალე ყველა იმ პროდუქტის ჯამური ღირებულება, 
// // რომელიც Electronics კატეგორიაშია.
const totalElectronicsPrice = products
  .filter(p => p.category === "Electronics")
  .reduce((sum, p) => sum + p.price, 0);
  console.log(totalElectronicsPrice)


// ========= 5 ===========
// შემოწმება (some/every): შეამოწმე, არის თუ არა მასივში რომელიმე პროდუქტი, რომელიც 3000 ლარზე მეტი ღირს.
const res=[1,5,3].every((el) => (el % 2 != 0));
const res2=[1,4,7].some((el) => (el % 2 != 0 ));

