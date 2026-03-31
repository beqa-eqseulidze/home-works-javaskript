const items = [
  { name: "Apple", price: 1.5 },
  { name: "Laptop", price: 1200 },
  { name: "Notebook", price: 5 },
  { name: "Coffee", price: 4 },
];

const res = items.reduce((prev, item) => {
  return (prev += item.price);
}, 0);

console.log(res);
