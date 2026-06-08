const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const formObj = Object.fromEntries(data);
    localStorage.setItem('user', JSON.stringify(formObj));
    console.log(formObj);
    form.reset
})