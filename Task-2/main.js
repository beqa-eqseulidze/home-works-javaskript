const textInfo = document.getElementById("text");
const numberInfo = document.getElementById("number");
const resultHere = document.getElementById("result");
textInfo.addEventListener("change", info);
number.addEventListener("change", info);

function info() {
  let text = textInfo.value;
  let number = +numberInfo.value;
  let res = "";
  for (let i = 0; i < number; i++) {
    res+= text + "-"
}

resultHere.innerText =res.slice(0,(res.length-2))

}