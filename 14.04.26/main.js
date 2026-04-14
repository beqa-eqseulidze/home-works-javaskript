const products = [
  { id: 1, name: "Laptop", price: 2000, category: "Electronics", stock: 5 },
  { id: 2, name: "Mouse", price: 50, category: "Electronics", stock: 0 },
  { id: 3, name: "Shirt", price: 40, category: "Clothing", stock: 12 },
  { id: 4, name: "Phone", price: 800, category: "Electronics", stock: 10 },
  { id: 5, name: "Jeans", price: 60, category: "Clothing", stock: 3 },
  { id: 6, name: "Keyboard", price: 100, category: "Electronics", stock: 8 }
];

function ProductRes(curent){
  let rows = "";

  for (let i = 0; i < curent.length; i++){
    let p = curent[i];
    
    rows += `
      <tr>
        <td>${p.id}</td>
        <td>${p.name}</td>
        <td>$${p.price}</td>
        <td>${p.category}</td>
        <td>${p.stock}</td>
      </tr>
    `;
  }

  document.getElementById("tableBody").innerHTML = rows;
}


document.getElementById("filterButton").addEventListener("click", function() {
  
  let filtri = [];

  for (let i = 0; i < products.length; i++) {
    if (products[i].stock > 0 && products[i].price > 50) {
      filtri.push(products[i]);
    }
  }

  ProductRes(filtri);
});