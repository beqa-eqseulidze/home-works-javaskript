import { onSave } from "./create-edit-Product.js";
import {form} from "./domElements.js"
import {renderProducts, addClickListener} from "./renderProducts.js"
import {getSingleProduct} from "./getSingleProduct.js"
import { mode, productId } from "./globalStates.js";

form.addEventListener('submit', onSave);

 async function render(){
    await renderProducts();
    const titles=document.querySelectorAll('.title');
    addClickListener(titles, async (e)=>{
        const id=e.target.id  
        const product=await getSingleProduct(id);
        const inputs = form.elements;
        const inputNames=['title','category','description','price','image']
        inputNames.forEach((key)=>{
            inputs[key].value=product[key]
        })
        mode.isEditMode=true;
        productId.id=product.id;
    })
}    

render()