
const form=document.querySelector('form');

form.addEventListener('submit',(event)=>{
    event.preventDefault();

    const data=new FormData(form);
    const formObj=Object.fromEntries(data);    
    console.log(formObj); 
})