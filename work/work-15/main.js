import { onSave } from "./create-edit-Product.js";
import { form } from "./domElements.js"
import { getSingleProduct } from "./get-single-product.js";
import { renderProducts, addClickLesener } from "./renderProducts.js"

form.addEventListener('submit', onSave);
async function render() {
    await renderProducts();
    const titles = document.querySelectorAll('.title');
    addClickLesener(titles)
    async (e) => {
        const id = e.targer.id;
        console.log(id);
        const product = await getSingleProduct(id);
        console.log(product)
        const inputs = form.elements['title'];
        const inputNames = ['title', 'category', 'description', 'price', 'image'];
        inputNames.forEach((key) => {
            inputs[key].value = product[key]
        });
    }
}

// async function name() {
//     async (e) => {
//         const id = e.targer.id;
//         console.log(id);
//         const product = await getSingleProduct(id);
//         console.log(product)
//         const inputs = form.elements['title'];
//         const inputNames = ['title', 'category', 'description', 'price', 'image'];
//         inputNames.forEach((key)=>{
//             inputs[key].value=product[key]
//         });
//     }
// };

render()