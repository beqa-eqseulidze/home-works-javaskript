// მოცემული გაქვს პროდუქტების მასივი:

// const products = [
//   { id: 1, name: "Laptop", price: 2000, category: "Electronics", stock: 5 },
//   { id: 2, name: "Mouse", price: 50, category: "Electronics", stock: 0 },
//   { id: 3, name: "Shirt", price: 40, category: "Clothing", stock: 12 },
//   { id: 4, name: "Phone", price: 800, category: "Electronics", stock: 10 },
//   { id: 5, name: "Jeans", price: 60, category: "Clothing", stock: 3 },
//   { id: 6, name: "Keyboard", price: 100, category: "Electronics", stock: 8 }
// ];

// const product={ id: 3, name: "Shirt", price: 40, category: "Clothing", stock: 12 }
// const res3=products.some((el)=>el.id==product.id)



// დაწერე კოდი შემდეგი შედეგების მისაღებად:
// ========= 1 ===========
// ფილტრაცია (filter): შექმენი ახალი მასივი,
// რომელიც შეიცავს მხოლოდ იმ პროდუქტებს, რომლებიც მარაგშია (stock > 0)
// და მათი ფასი 50 ლარზე მეტია.

// ========= 2 ===========
// მასივიდან შექმენი მხოლოდ დასახელებების
// მასივი (მაგ: ["Laptop", "Phone", ...]).

// ========= 3 ===========
// ძებნა (find): იპოვე პროდუქტი, რომლის სახელია "Keyboard".

// ========= 4 ===========
// ჯამი (reduce): დათვალე ყველა იმ პროდუქტის ჯამური ღირებულება,
// რომელიც Electronics კატეგორიაშია.

// ========= 5 ===========
// შემოწმება (some/every): შეამოწმე, არის თუ არა მასივში რომელიმე პროდუქტი,
// რომელიც 3000 ლარზე მეტი ღირს.


/// მასივის მეთოდები : 
// const res=[1, 3, 5].every((el) => el % 2 != 0); //res იქნება true

// const res2=[5,4,8].some((el) => el % 2 != 0); // res2 იქნება true

// const str='hello, how are you'
// const res4=str.split(' ');
// console.log(res4);
// const res5=res4.join('-')
// console.log(res5);


// დავალება 
const products = [
  { id: 1, name: "Laptop", price: 2000, category: "Electronics", stock: 5 },
  { id: 2, name: "Mouse", price: 50, category: "Electronics", stock: 0 },
  { id: 3, name: "Shirt", price: 40, category: "Clothing", stock: 12 },
  { id: 4, name: "Phone", price: 800, category: "Electronics", stock: 10 },
  { id: 5, name: "Jeans", price: 60, category: "Clothing", stock: 3 },
  { id: 6, name: "Keyboard", price: 100, category: "Electronics", stock: 8 }
];

// მოცემული მასივი გამოიტანეთ HTML თეიბლში დინამიურად;
//html ში უნდა გქონდეთ ფილტრის ღილაკი რომელზე
//  დაჭერის შემთხვევაში მოხდება მოცემული მასივის გაფილტვრა შემდეგი 
// პირობით " შეიცავს მხოლოდ იმ პროდუქტებს, რომლებიც მარაგშია 
// (stock > 0)და მათი ფასი 50 ლარზე მეტია."
// და თეიბლი დარენდერდება თავიდან გაფილტრული მონაცემებით 


