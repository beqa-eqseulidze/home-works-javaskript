// let products;
// fetch("https://fakestoreapi.com/products")
    
// .then((response) => {
//     console.log(response);
//     return response.json();
// })

// .then((products) => {
//     products=products;
//     console.log("product1", products);
//     renderProducts(products);
// });


function renderProducts(products){
    document.querySelector("main").innerHTML = "";
    products.forEach((product)=>{
        document.querySelector("main").innerHTML += `<div>
                                <h2>${product.title}</h2>
                                <img src = "${product.image}" alt="">
                                <div>${product.description}</div>
                                <p>price: ${product.price}</p>
                                </div>` 
    });
}

async function getProduct(){
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    return products

}

getProduct();
