const usernameInput = document.getElementById("username");
const ageInput = document.getElementById("age");
const submitBtn = document.getElementById("submitBtn");
const messageBox = document.getElementById("message");


function checkUsername(username) {
  if (username.length < 5) {
    throw new Error("Username should be minimum 5 simbols");
  }
}

function checkAge(age) {
  if (age === "" || isNaN(age)){
    throw new Error("Age should be namber only");
  }

  if (Number(age) < 18) {
    throw new Error("Age should be at least 18");
  }
}

function checkerForm(username, age){
  checkUsername(username);
  checkAge(age);
}



submitBtn.addEventListener("click", () => {
  try {
    messageBox.textContent = "";
    messageBox.className = "";

    const username = usernameInput.value;
    const age = ageInput.value;

    checkerForm(username, age);

    messageBox.textContent = "Successful Registration";
    messageBox.className = "success";

  } catch (error){
    messageBox.textContent = error.message;
    messageBox.className = "error";

  } finally{
    usernameInput.value = "";
    ageInput.value = "";
  }
});