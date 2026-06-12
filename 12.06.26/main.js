import { onSave } from "./create-edit-Product.js";
import { form } from "./domElements.js"
import { renderProducts, addClickLesener } from "./renderProducts.js"

async function render() {
    // ჯერ API-დან პროდუქტებს ვტვირთავთ
    await renderProducts();

    // არსებულ title ელემენტებზე click listener-ებს ვამატებთ
    const titles = document.querySelectorAll('.title');
    addClickLesener(titles, (e) => { console.log(e.target.id) })

    // submit-ზე პროდუქტის შექმნის ფუნქციას ვაბამთ
    form.addEventListener('submit', onSave);
}

// გვერდის გაშვებისას მთავარი რენდერი იძახება
render()
