import { form } from "./domElements.js";
import { mode , productId} from "./globalStates.js";

export function onSave(event) {
  event.preventDefault();
  const formObj = new FormData(form);
  const product = Object.fromEntries(formObj);
  if (!showError(product)) return;
  
  if(mode.isEditMode){
    const id=productId.id
    product.id = id;
    edit(id,product)
  }
  else{
    product.id = 0;
    create(product)
  }  
  mode.isEditMode=false;
  productId.id=null;
  form.reset()
}

function showError(obj) {
  for (let key in obj) {
    if (obj[key].trim() === "") {
      alert(`fill ${key} field`);
      return false;
    }
  }
  return true;
}

function create(product) { 
  fetch("https://fakestoreapi.com/products", {
    method: "POST", //იწერება რქვესთის ტიპი მაგ: GET, POST, PUT ან PATCH, DELETE
    headers: {
      "Content-Type": "application/json", //აქ მიეთითება თუ რა ტიპის ინფორმაცია უნდა გავატოლოთ რექვესტს body ში
    },
    body: JSON.stringify(product), //აქ უნდა იყოს გასაგზავნი data
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
    });
}

function edit(id, product) {
  fetch(`https://fakestoreapi.com/products/${id}`, {
    method: "PUT", //იწერება რქვესთის ტიპი მაგ: GET, POST, PUT ან PATCH, DELETE
    headers: {
      "Content-Type": "application/json", //აქ მიეთითება თუ რა ტიპის ინფორმაცია უნდა გავატოლოთ რექვესტს body ში
    },
    body: JSON.stringify(product), //აქ უნდა იყოს გასაგზავნი data
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
    });
}
