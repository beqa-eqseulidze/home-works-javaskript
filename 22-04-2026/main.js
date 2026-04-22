// Write a JavaScript function to check whether an `input` is a date object or not.
// Test Data :
// console.log(is_date("October 13, 2014 11:13:00"));
// console.log(is_date(new Date(86400000)));
// console.log(is_date(new Date(99,5,24,11,33,30,0)));
// console.log(is_date([1, 2, 4, 0]));
// Output :
// false
// true
// true
// false

function isDate(date) {
  let res;
  try {    
    res = date.getFullYear() ? true : false;
  } catch (err) {
    if (err.message.includes("date.getFullYear is not a function")) {
      res = false;
    } else {
      throw new Error(err.message);
    }
  } finally {
    document.querySelector("div").textContent = `isData : ${res}`;
  }
}
// isDate(new Date(86400000))
isDate([1, 2, 4, 0]);
// try {
//   console.log(isDate("October 13, 2014 11:13:00"));
// } catch (error) {
//   console.log("error happen");
// //   throw new Error(error);
// }

// ======================================= task 2 =================================

// 2. The "Color Palette Generator"
// Goal: Loops, Math object, and DOM Style manipulation.
// The Task: Create a button labeled "Generate Palette." When clicked, use a for loop to generate 5 random Hex color codes (e.g., #FF5733).
// DOM: Create 5 <div> squares on the fly. Assign each one a random background color and display the Hex code text inside the square.
// Hint: A Hex code is just a string. You can use an array of characters [0-9, A-F] and loop through it 6 times to pick random indexes. const hexCharacters = "0123456789ABCDEF";

const palletContainer=document.querySelector('.pallet')

function GeneratePalette() {
    for(let i=0; i<5;i++){
        let hexCode=generateHexCode();
       let box= `<div style="background-color: ${hexCode};">${hexCode}</div>`
       palletContainer.innerHTML+=box;
    }
}

function generateHexCode() {
  let res = "#";
  const hexCharacters = "0123456789ABCDEF";
  for (let i = 0; i < 6; i++) {
    let index=randomNumber();
    res+=hexCharacters[index];
  }
  return res;
}

function randomNumber() {   
  return Math.floor(Math.random()*16);
}


GeneratePalette()

// =========================================== დავალება ======================================
// 3. The "Robust Form" Validator
// Goal: Practice try...catch...finally and Conditionals.
// The Task: Create a registration form with "Username" and "Age" inputs.
// Logic: When the user clicks "Submit," wrap your validation in a try block.
// throw an error if the username is less than 5 characters.
// throw an error if the age is not a number or under 18.
// Catch/Finally: Use the catch block to display the specific error message in a red <div> on the page. Use finally to clear the input fields regardless of whether the submission was successful.