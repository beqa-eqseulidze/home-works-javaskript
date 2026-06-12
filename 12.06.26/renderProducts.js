import { mainTag } from './domElements.js'

export async function renderProducts() {
    // პროდუქტების სია Fake Store API-დან მოგვაქვს
    const res = await fetch('https://fakestoreapi.com/products');

    // პასუხს JSON ობიექტებად ვკითხულობთ
    const data = await res.json();

    // ძველ კონტენტს ვშლით, რომ ახალი სია ჩავტვირთოთ
    mainTag.innerHTML = '';

    // თითოეულ პროდუქტს ეკრანზე ცალკე აბზაცად ვბეჭდავთ
    data.forEach((product) => {
        mainTag.innerHTML += `
        <p class="title" id=${product.id} >${product.title} </p> 
        `
    })
}

export function addClickLesener(htmlElements, fn) {
    // მიღებულ ყველა ელემენტზე ერთსა და იმავე click ქმედებას ვამაგრებთ
    htmlElements.forEach((el) => {
        el.addEventListener('click', fn)
    })
}
