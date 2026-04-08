const products = [
   { id: 1, name: "Laptop", price: 2000, category: "Electronics", stock: 5 },
   { id: 2, name: "Mouse", price: 50, category: "Electronics", stock: 0 },
   { id: 3, name: "Shirt", price: 40, category: "Clothing", stock: 12 },
   { id: 4, name: "Phone", price: 800, category: "Electronics", stock: 10 },
   { id: 5, name: "Jeans", price: 60, category: "Clothing", stock: 3 },
   { id: 6, name: "Keyboard", price: 100, category: "Electronics", stock: 8 }
];


const filteredProducts = products.filter(product =>product.stock > 0 && product.price > 50);

const productnames = products.map(product => product.name
);


const findedProduct = products.find(product => 
    product.name === "Keyboard"
);






console.log(filteredProducts);
console.log(productnames);
console.log(findedProduct);
