import Swiper from "swiper/bundle";
import 'swiper/swiper-bundle.css'


let swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

async function getProducts() {
    const res = await fetch('https://fakestoreapi.com/products');
    const products = await res.json();
    const container = document.querySelector('.swiper-wrapper');
    container.innerHTML = '';
    console.log(products);
    products.forEach((product) => {
        container.innerHTML += `<div class="swiper-slide"><img src="${product.image}"alt=""></div>`
    })

}
getProducts()