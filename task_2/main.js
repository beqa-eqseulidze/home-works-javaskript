    const input = document.getElementById("text");
    const button = document.getElementById("btn");
    const resultEl = document.getElementById("result");
    const resultE2 = document.getElementById("result_2");

    button.addEventListener("click", function () {
      const result = input.value.trim().replaceAll(' ','-').repeat(4);
      resultEl.textContent = result;
    });
    