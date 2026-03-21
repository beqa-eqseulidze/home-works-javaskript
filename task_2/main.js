    const input = document.getElementById("text");
    const button = document.getElementById("btn");
    const resultEl = document.getElementById("result");

    button.addEventListener("click", function () {
      const result = input.value.replaceAll(' ','-').repeat(4);
      resultEl.textContent = result;
    });
    