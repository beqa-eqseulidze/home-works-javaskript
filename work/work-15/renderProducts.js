import { mainTag } from './domElements.js'

export async function renderProducts() {
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    mainTag.innerHTML = '';
    data.forEach((product) => {
        mainTag.innerHTML += `
        <p class="title" id=${product.id} >${product.title} </p> 
        `
    })
}

export function addClickLesener(htmlElements, fn) {
    htmlElements.forEach((el) => {
        el.addEventListener('click', fn)
    })
}
