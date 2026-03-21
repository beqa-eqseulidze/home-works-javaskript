const userInformation=document.getElementById("inputInfo")
const span=document.getElementById("yourInfo")
inputInfo.addEventListener("change" , info);


function info(){
    let inputInfo=userInformation.value
    let yourInfo=inputInfo.replaceAll(" ","-")
    span.innerText=yourInfo
}
