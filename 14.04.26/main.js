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

/**
 * ფუნქცია, რომელიც ასუფთავებს ცხრილს და არენდერებს გადაცემულ მასივს
 */
function renderTable(data) {
    // 1. ვასუფთავებთ ცხრილს (innerHTML-ის და ცარიელებით ხდება "თავიდან დარენდერება")
    tableBody.innerHTML = "";

    // 2. ციკლით გადავუყვებით მასივს და ვამატებთ ახალ სტრიქონებს
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

// ღილაკზე დაჭერის მოვლენა
filterBtn.addEventListener('click', () => {
    // ვფილტრავთ მასივს პირობით: stock > 0 და price > 50
    const filteredProducts = products.filter(item => item.stock > 0 && item.price > 50);

    // გაფილტრული მონაცემებით ცხრილის ხელახალი დარენდერება
    renderTable(filteredProducts);
});
