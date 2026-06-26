import { onSave } from "./create-edit-Product.js";
import { form } from "./domElements.js"
import { renderProducts, addClickLesener } from "./renderProducts.js"
import { getSingleProduct } from "./getSingleProduct.js"
import { mode, productId } from "./globalStates.js";

async function render() {
    // ჯერ API-დან პროდუქტებს ვტვირთავთ
    await renderProducts();

    // არსებულ title ელემენტებზე click listener-ებს ვამატებთ
    const titles = document.querySelectorAll('.title');
    addClickLesener(titles, async (e) => {
        const id = e.target.id
        const product = await getSingleProduct(id);
        const inputs = form.elements;
        const inputNames = ['title', 'category', 'description', 'price', 'image']
        inputNames.forEach((key) => {
            inputs[key].value = product[key];
        })
        mode.isEditMode = true;
        productId.id = product.id;
    })

    // submit-ზე პროდუქტის შექმნის ფუნქციას ვაბამთ
    form.addEventListener('submit', onSave);
}

// გვერდის გაშვებისას მთავარი რენდერი იძახება
render()
