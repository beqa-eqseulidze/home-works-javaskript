const products = [
  { id: 1, name: "Laptop", price: 2000, category: "Electronics", stock: 5 },
  { id: 2, name: "Mouse", price: 50, category: "Electronics", stock: 0 },
  { id: 3, name: "Shirt", price: 40, category: "Clothing", stock: 12 },
  { id: 4, name: "Phone", price: 800, category: "Electronics", stock: 10 },
  { id: 5, name: "Jeans", price: 60, category: "Clothing", stock: 3 },
  { id: 6, name: "Keyboard", price: 100, category: "Electronics", stock: 8 }
];

const rows = products.map(product => {
  return `
    <tr>
      <td>${product.id}</td>
      <td>${product.name}</td>
      <td>${product.price}</td>
      <td>${product.category}</td>
      <td>${product.stock}</td>
    </tr>
  `;
});

const tableHTML = `
  <table border="1">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Price</th>
        <th>Category</th>
        <th>Stock</th>
      </tr>
    </thead>
    <tbody>
      ${rows.join("")}
    </tbody>
  </table>
`;
document.getElementById("app").innerHTML = tableHTML;

function renderTable(data) {
  const rows = data.map(product => {
    return `
        <tr>
          <td>${product.id}</td>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td>${product.category}</td>
          <td>${product.stock}</td>
        </tr>
      `;
  });

  const tableHTML = `
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          ${rows.join("")}
        </tbody>
      </table>
    `;

  document.getElementById("app").innerHTML = tableHTML;
}

document.getElementById("filterBtn").addEventListener("click", () => {
  const categoryValue = document.getElementById("categoryInput").value.trim().toLowerCase();
  const priceValue = document.getElementById("priceInput").value;
  const stockValue = document.getElementById("stockInput").value;

  const filtered = products.filter(product => {

    return (categoryValue === "" || product.category.toLowerCase() === categoryValue) &&
      (priceValue === "" || product.price >= Number(priceValue)) &&
      (stockValue === "" || product.stock >= Number(stockValue));

  });

  renderTable(filtered);
});