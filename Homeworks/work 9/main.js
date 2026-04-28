//================================დავალება================================
const inventory = [
    { name: "ლეპტოპი", price: 2500, rating: 4.8 },
    { name: "სმარტფონი", price: 1200, rating: 4.5 },
    { name: "ყურსასმენი", price: 350, rating: 4.2 },
    { name: "მონიტორი", price: 800, rating: 4.9 },
    { name: "კლავიატურა", price: 150, rating: 3.8 },
    { name: "მაუსი", price: 90, rating: 4.8 },
    { name: "პრინტერი", price: 550, rating: 3.5 },
];

const cardsContainer = document.querySelector(".cards");

// როგორ მდგომარეობაში არის სორტირება
let priceState = 0;
let ratingState = 0;
let nameState = 0;

// card ში პროდუქტების ინფორმაციის შეტანა
function renderProducts(data) {
    cardsContainer.innerHTML = "";

    data.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h3>${item.name}</h3>
            <p>ფასი: ${item.price} ₾</p>
            <p>რეიტინგი: ${item.rating}</p>
        `;

        cardsContainer.appendChild(card);
    });
}

// თავიდან გამოსხვა
renderProducts(inventory);

// ღილაკები
const priceBtn = document.getElementById("sortPrice");
const ratingBtn = document.getElementById("sortRating");
const nameBtn = document.getElementById("sortName");


// ფასით სორტირება ფასი იაფიდან ძვირამდე ან ძვირიდან იაფამდე
priceBtn.addEventListener("click", () => {
    let sorted;

    if (priceState === 0) {
        sorted = [...inventory].sort((a, b) => a.price - b.price);
        priceBtn.textContent = "ფასი ⬆️";
    } else if (priceState === 1) {
        sorted = [...inventory].sort((a, b) => b.price - a.price);
        priceBtn.textContent = "ფასი ⬇️";
    } else {
        sorted = [...inventory];
        priceBtn.textContent = "ფასი";
    }

    priceState = (priceState + 1) % 3;

    renderProducts(sorted);
});


// რეიტინგით სორტირება რეიტინგი მაღლიდან დაბლამდე ან დაბლიდან მაღლამდე
ratingBtn.addEventListener("click", () => {
    let sorted;

    if (ratingState === 0) {
        sorted = [...inventory].sort((a, b) => a.rating - b.rating);
        ratingBtn.textContent = "რეიტინგი ⬆️";
    } else if (ratingState === 1) {
        sorted = [...inventory].sort((a, b) => b.rating - a.rating);
        ratingBtn.textContent = "რეიტინგი ⬇️";
    } else {
        sorted = [...inventory];
        ratingBtn.textContent = "რეიტინგი";
    }

    ratingState = (ratingState + 1) % 3;

    renderProducts(sorted);
});


// დასახელების სორტირება ანბანის საწყისიდან ან ბოლოდან
nameBtn.addEventListener("click", () => {
    let sorted;

    if (nameState === 0) {
        sorted = [...inventory].sort((a, b) =>
            a.name.localeCompare(b.name)
        );
        nameBtn.textContent = "დასახელება A-Z ⬆️";
    } else if (nameState === 1) {
        sorted = [...inventory].sort((a, b) =>
            b.name.localeCompare(a.name)
        );
        nameBtn.textContent = "დასახელება Z-A ⬇️";
    } else {
        sorted = [...inventory];
        nameBtn.textContent = "დასახელება";
    }

    nameState = (nameState + 1) % 3;

    renderProducts(sorted);
});