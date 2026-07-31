const container = document.querySelector("#container");
const productsBtn = document.querySelector("#productsBtn");
const usersBtn = document.querySelector("#usersBtn");
const cartsBtn = document.querySelector("#cartsBtn");

productsBtn.addEventListener("click", getProducts);
usersBtn.addEventListener("click", getUsers);
cartsBtn.addEventListener("click", getCarts);

async function getProducts() {
    const response = await fetch(
        "https://fakestoreapi.com/products"
    );
    const products = await response.json();
    renderProducts(products);
}

async function getUsers() {
    const response = await fetch(
        "https://fakestoreapi.com/users"
    );
    const users = await response.json();
    renderUsers(users);
}

async function getCarts() {
    const response = await fetch(
        "https://fakestoreapi.com/carts"
    );
    const carts = await response.json();
    renderCarts(carts);
}

function renderProducts(products) {
    container.innerHTML = "";
    products.forEach(product => {
        container.innerHTML += `
        <div class="bg-white rounded-2xl overflow-hidden flex flex-col shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-[0_12px_25px_rgba(0,0,0,0.15)]">
            <img src="${product.image}" class="w-full h-[180px] object-contain p-5 bg-slate-50">
            <div class="p-4 flex flex-col gap-3 flex-grow">
                <h3 class="text-base line-clamp-2 h-[45px] font-semibold">${product.title}</h3>
                <p class="text-[22px] font-bold text-blue-600">$${product.price}</p>
            </div>
        </div>
        `;
    });
}

function renderUsers(users) {
    container.innerHTML = "";
    users.forEach(user => {
        container.innerHTML += `
        <div class="bg-white rounded-2xl overflow-hidden flex flex-col shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-[0_12px_25px_rgba(0,0,0,0.15)] p-4 gap-2">
            <h3 class="text-base font-semibold capitalize">${user.name.firstname}</h3>
            <p class="text-sm text-gray-600">${user.email}</p>
            <p class="text-sm text-gray-500">${user.phone}</p>
        </div>
        `;
    });
}

function renderCarts(carts) {
    container.innerHTML = "";
    carts.forEach(cart => {
        container.innerHTML += `
        <div class="bg-white rounded-2xl overflow-hidden flex flex-col shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-[0_12px_25px_rgba(0,0,0,0.15)] p-4 gap-2">
            <h3 class="text-base font-semibold">Cart #${cart.id}</h3>
            <p class="text-sm text-gray-600">User ID: ${cart.userId}</p>
            <p class="text-sm text-gray-500">Products: ${cart.products.length}</p>
        </div>
        `;
    });
}

getProducts();