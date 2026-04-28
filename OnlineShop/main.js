const inventory = [
  { name: "ლეპტოპი", price: 2500, rating: 4.8 },
  { name: "სმარტფონი", price: 1200, rating: 4.5 },
  { name: "ყურსასმენები", price: 350, rating: 4.2 },
  { name: "მონიტორი", price: 800, rating: 4.9 },
  { name: "კლავიატურა", price: 150, rating: 3.8 },
  { name: "მაუსი", price: 90, rating: 4.0 },
  { name: "პრინტერი", price: 550, rating: 3.5 },
];

const produqtebi = document.getElementById("products");

function render(arr) {
  produqtebi.innerHTML = arr
    .map(
      (i) => `
    <div class="card">
       <h3>${i.name}</h3>
       <p>${i.price}ლ</p>
       <p>${i.rating}</p>
    </div>
  `,
    )
    .join("");
}

render(inventory);
