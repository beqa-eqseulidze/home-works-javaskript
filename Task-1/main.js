const userInformation=document.getElementById("inputInfo")
const span=document.getElementById("yourInfo")
inputInfo.addEventListener("change" , info);


function info(){
    let inputInfo=userInformation.value
    let yourInfo=inputInfo.trim().replaceAll(" ","-")
    span.innerText=yourInfo
}
