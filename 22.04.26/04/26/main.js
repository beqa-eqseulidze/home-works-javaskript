// function isDate(date) {
//    return date.getFullYear() ? true : false;
// }
// console.log(isDate("October 13, 2014 11:13:00"));


// function isDate(date) {
//     let res;
//    res=date.getFullYear() ? true : false;
//    console.log('test')
//    document.querySelector('div').textContent=(`isData : ${res}`);
// }
// isDate("October 13, 2014 11:13:00")
   


// function isDate(date) {
//     let res;
//     try{
//         res=date.getFullYear() ? true : false;
//     }
//     catch(err){
//         if(err.message.includes('dare.getFullYear is not a function')) {
//            res=false;
//         }
//         throw new Error(err.message)
       
//     }
//     finally {
//        document.querySelector('div').textContent=(`isData : ${res}`);
//     }
// }
// isDate("October 13, 2014 11:13:00")



//============== task 2 "Color Palette Generatior" ==============================
function GeneratePalette(){

}
generateHexCode(){
    let res='#'
    const  hexCharacters = "0123456789ABCDEF";
    for(let i=0; i<5; i++){ 
        let index=randomNumber();
        res+=hexCharacters[index]; 
    }
    return res;
}

function randomNumber() {
  return res=Math.floor(Math.random()*16);
}