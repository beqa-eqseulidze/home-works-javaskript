const inventory = [
    { name: "ლეპტოპი", price: 2500, rating: 4.8 },
    { name: "სმარტფონი", price: 1200, rating: 4.5 },
    { name: "ყურსასმენები", price: 350, rating: 4.2 },
    { name: "მონიტორი", price: 800, rating: 4.9 },
    { name: "კლავიატურა", price: 150, rating: 3.8 },
    { name: "მაუსი", price: 90, rating: 4.0 },
    { name: "პრინტერი", price: 550, rating: 3.5 }
];

const container = document.getElementById('product-container');

// ფუნქცია, რომელიც ეკრანზე გამოაჩენს პროდუქტებს
function renderProducts(data) {
    container.innerHTML = ''; // ჯერ ვასუფთავებთ კონტეინერს

    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <h3>${item.name}</h3>
            <p>ფასი: ${item.price} ₾</p>
            <p>რეიტინგი: ⭐ ${item.rating}</p>
        `;
        container.appendChild(card);
    });
}

// 1. ფასით სორტირება (ზრდადობით)
document.getElementById('sortByPrice').addEventListener('click', () => {
    const sorted = [...inventory].sort((a, b) => a.price - b.price);
    renderProducts(sorted);
});

// 2. რეიტინგით სორტირება (კლებადობით - საუკეთესოები თავში)
document.getElementById('sortByRating').addEventListener('click', () => {
    const sorted = [...inventory].sort((a, b) => b.rating - a.rating);
    renderProducts(sorted);
});

// 3. სახელით სორტირება (A-Z)
document.getElementById('sortByName').addEventListener('click', () => {
    const sorted = [...inventory].sort((a, b) => a.name.localeCompare(b.name));
    renderProducts(sorted);
});

// თავდაპირველი ჩვენება
renderProducts(inventory);