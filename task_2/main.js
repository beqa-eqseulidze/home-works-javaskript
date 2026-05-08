<<<<<<< HEAD
// task_2/main.js
const textInput = document.getElementById("text");
const countInput = document.getElementById("number");
=======
const input = document.getElementById("text");
>>>>>>> ce2081e (add a new forlder task_2)
const button = document.getElementById("btn");
const resultEl = document.getElementById("result");

button.addEventListener("click", function () {
<<<<<<< HEAD
    const word = textInput.value;
    const count = Number(countInput.value);

    // abc, 3 --> abc-abc-abc
    if (word && count > 0) {
        let repeatedText = new Array(count).fill(word).join('-');
        resultEl.textContent = repeatedText;
    } else {
        resultEl.textContent = "მიუთითეთ სიტყვა და რიცხვი!";
    }
=======
    const result = input.value.replaceAll(' ', '-').repeat(4);
    resultEl.textContent = result;
>>>>>>> ce2081e (add a new forlder task_2)
});