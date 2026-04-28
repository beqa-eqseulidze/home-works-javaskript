const inventory = [
    { name: 'ლეპტოპი', price: 2500, rating: 4.8 },
    { name: 'სმარტფონი', price: 1200, rating: 4.5 },
    { name: 'ყურსასმენი', price: 350, rating: 4.2 },
    { name: 'მონიტორი', price: 800, rating: 4.9 },
    { name: 'კლავიატურა', price: 150, rating: 3.8 },
    { name: 'მაუსი', price: 90, rating: 4.0 },
    { name: 'პრინტერი', price: 550, rating: 3.5 }
];


//== PRICE sorti ==//
function sortWithPrice() {
    inventory.sort((a, b) => a.price - b.price);
    render(inventory);
}

//== Reitingi =//
function sortWithRating() {
    inventory.sort((a, b) => b.rating - a.rating);
    render(inventory);
}

//== Name ==//
function sortWithName() {
    inventory.sort((a, b) => a.name.localeCompare(b.name));
    render(inventory);
}


const app = document.getElementById("app");

function render(products) {
    app.innerHTML = "";

    products.forEach(item =>{
    app.innerHTML += `
        <div>
            <h3>${item.name}</h3>
            <p>price: ${item.price}</p>
            <p>ratting: ${item.rating}</p>
        </div>
        `;
    });
}

// Clickers
document.getElementById("btnPrice").onclick = sortWithPrice;
document.getElementById("btnRating").onclick = sortWithRating;
document.getElementById("btnName").onclick = sortWithName;

render(inventory);