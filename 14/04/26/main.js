//task_14_04_26/main.js

// მონაცემთა მასივი
const products = [
    { id: 1, name: "Laptop", price: 2000, category: "Electronics", stock: 5 },
    { id: 2, name: "Mouse", price: 50, category: "Electronics", stock: 0 },
    { id: 3, name: "Shirt", price: 40, category: "Clothing", stock: 12 },
    { id: 4, name: "Phone", price: 800, category: "Electronics", stock: 10 },
    { id: 5, name: "Jeans", price: 60, category: "Clothing", stock: 3 },
    { id: 6, name: "Keyboard", price: 100, category: "Electronics", stock: 8 }
];

const tableBody = document.getElementById('productTableBody');
const filterBtn = document.getElementById('filterBtn');


function renderTable(data) {
   
    tableBody.innerHTML = "";

    
    data.forEach(product => {
        const row = `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.price} ₾</td>
                    <td>${product.category}</td>
                    <td>${product.stock}</td>
                </tr>
            `;
        tableBody.innerHTML += row;
    });
}


renderTable(products);


filterBtn.addEventListener('click', () => {
    
    const filteredProducts = products.filter(item => item.stock > 0 && item.price > 50);

    
    renderTable(filteredProducts);
});
