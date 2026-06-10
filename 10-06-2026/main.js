import { onSave } from "./create-edit-Product.js";
import {form} from "./domElements.js"
import {renderProducts, addClickLesener} from "./renderProducts.js"

form.addEventListener('submit', onSave);
async function render(){
    await renderProducts();
    const titles=document.querySelectorAll('.title');
    addClickLesener(titles, (e)=>{console.log(e.target.id)})
}    

render()


