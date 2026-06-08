// const maindomain = "https://fakestoreapi.com/products";
// let products;

// fetch("https://fakestoreapi.com/products")
//     .then((response) => { return response.json() })
//     .then((products) => {
//         products = products;
//         renderProducts(products);
//     });

// function renderProducts(products) {
//     document.querySelector("main").innerHTML = "";
//     products.forEach(product => {
//         document.querySelector("main").innerHTML +=
//             `<div>
//             <h2>${product.title}</h2>
//             <img src="${product.image}">
//             <div>${product.description}</div>
//             <p>${product.price}</p>
//         </div>`;
//     });
// }

async function getProduct() {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();
    renderProducts(products);
}

getProduct();

function renderProducts(products) {
    document.querySelector("main").innerHTML = "";

    products.forEach(product => {
        document.querySelector("main").innerHTML += `
            <div>
                <h2>${product.title}</h2>
                <img src="${product.image}">
                <div>${product.description}</div>
                <p>${product.price}</p>
            </div>
        `;
    });
}