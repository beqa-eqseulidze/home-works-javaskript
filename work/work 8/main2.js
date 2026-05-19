const value = document.querySelector('#countVal');

let numbers = localStorage.getItem('numbers') || 0;
value.innerText = numbers;

function increment() {
    numbers++;
    value.innerText = numbers;
    localStorage.setItem('numbers', numbers)
};