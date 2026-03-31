const items = [
  { name: "Apple", price: 1.5 },
  { name: "Laptop", price: 1200 },
  { name: "Notebook", price: 5 },
  { name: "Coffee", price: 4 },
];

const res = items.reduce((item, price) =>{
    return item + items.price
},0);
// return price;

console.log(res);
