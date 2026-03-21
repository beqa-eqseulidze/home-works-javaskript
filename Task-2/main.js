const textInfo=document.getElementById("text")
const numberInfo=+document.getElementById("number")
const resultHere=document.getElementById("result")
textInfo.addEventListener("change",info)
number.addEventListener("change",info)

function info(){
    let text=textInfo.value
    resultHere.innerText=text
}