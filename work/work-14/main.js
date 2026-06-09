import Swiper from 'swiper/bundle';
import 'swiper/css';

const swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function(index, className){
            return '<span class="" + className + '">'+(index+1)+"<span>
        }
    },
});

async function getProducts() {
    const response = await fetch(
        "https://fakestoreapi.com/products"
    );
    const products = await response.json();
    const container = document.querySelector('.swiper-wrapper');
    container.innerHTML = '';
    console.log(products);
    products.forEach((product) => {
        container.innerHTML += `
        <div class="swiper-slide">
        <img src="$(product.image)" alt="">
        </div>
        `
    });
}