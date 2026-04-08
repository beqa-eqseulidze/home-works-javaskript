const products = [
    { id: 1, name: "Laptop", price: 2000, category: "Electronics", stock: 5 },
    { id: 2, name: "Mouse", price: 50, category: "Electronics", stock: 0 },
    { id: 3, name: "Shirt", price: 40, category: "Clothing", stock: 12 },
    { id: 4, name: "Phone", price: 800, category: "Electronics", stock: 10 },
    { id: 5, name: "Jeans", price: 60, category: "Clothing", stock: 3 },
    { id: 6, name: "Keyboard", price: 100, category: "Electronics", stock: 8 },
    { id: 1, name: "Laptop", price: 4000, category: "Electronics", stock: 5 }
]

//პირველი დავალება
const filtered = products.filter(product =>
    product.stock > 0 && product.price > 50
);

console.log(filtered);

//მეორე დავალება
const names = products.map(product => product.name);

console.log(names);

//მესამე დავალება
const foundKeyboard = products.find(product => product.name === "Keyboard");

console.log(foundKeyboard);

//მეოთხე დავალება
const sum = products.reduce((sum, product) => {
    if (product.category === "Electronics") {
        return sum + (product.price * product.stock);
    }
    return sum;
}, 0);

console.log(sum);

//მეხუთე დავალება
const res = products.every(product => product.price > 3000)
// const res = products.some(product => product.price > 3000)

console.log(res);