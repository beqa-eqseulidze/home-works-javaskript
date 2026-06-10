fetch("https://fakestoreapi.com/products")
    .then((response) => {
        console.log(response);
        return response.json();
    })
    .then((products) => {
        console.log("products-1", products);
        renderProducts(products);
    });

function renderProducts(products) {
    document.querySelector("main").innerHTML = "";                                            
    products.forEach((product) => {
        document.querySelector("main").innerHTML += `
                    <div class="product-card">
                        <img src="${product.image}" alt="${product.title}">
                        <h2>${product.title}</h2>
                        <p class="price">$${product.price}</p>
                    </div>`;
    });
} 
