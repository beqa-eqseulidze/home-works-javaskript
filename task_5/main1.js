const items = [
    {name: 'Apple', price:1.5},
    {name: 'Laptop', price:1200},
    {name: 'Notebook', price:5},
    {name: 'Coffee', price:4},
]
function sum(items) {
    return items.reduce((sum, current) => {
        return sum + current.price
    }, 0);
}
console.log(sum(items))


