const inventory = [
  { name: "ლეპტოპი", price: 2500, rating: 4.8 },
  { name: "სმარტფონი", price: 1200, rating: 4.5 },
  { name: "ყურსასმენები", price: 350, rating: 4.2 },
  { name: "მონიტორი", price: 800, rating: 4.9 },
  { name: "კლავიატურა", price: 150, rating: 3.8 },
  { name: "მაუსი", price: 90, rating: 4.0 },
  { name: "პრინტერი", price: 550, rating: 3.5 },
];

const container = document.querySelector(".container");

function renderProducts(data) {
  container.innerHTML = "";

  data.forEach((product, index) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${product.name}</h3>
      <p>ფასი: ${product.price}₾</p>
      <p>რეიტინგი:  ${product.rating}</p>
      <div>
        <button class="buyBtn">ყიდვა</button>
        <button class="detailsBtn">დეტალები</button>
        <button class="deleteBtn">წაშლა</button>
      </div>
    `;

    card.querySelector(".buyBtn").addEventListener("click", () => {
     window.alert(product.name + " კალათაში დამატება");
    });

    card.querySelector(".detailsBtn").addEventListener("click", () => {
      window.alert(`${product.name}\nფასი: ${product.price}₾\nრეიტინგი: ${product.rating}`);
    });

    card.querySelector(".deleteBtn").addEventListener("click", () => {
      card.remove();
    });

    container.appendChild(card);
  });
}

document.getElementById("sortPrice").onclick = () => {
  renderProducts([...inventory].sort((a,b)=>a.price-b.price));
};

document.getElementById("sortRating").onclick = () => {
  renderProducts([...inventory].sort((a,b)=>b.rating-a.rating));
};

document.getElementById("sortName").onclick = () => {
  renderProducts([...inventory].sort((a,b)=>a.name.localeCompare(b.name)));
};
renderProducts(inventory);