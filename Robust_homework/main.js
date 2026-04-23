const usernameInput = document.getElementById("username");
const ageInput = document.getElementById("age");
const message = document.getElementById("message");
const button = document.getElementById("submitBtn");

button.addEventListener("click", function () {
  try {
    let username = usernameInput.value;
    let age = ageInput.value;

    message.textContent = "";
    message.className = "";

    if (username.length < 5) {
      throw new Error("Username should be atleast 5 symbols");
    }

    if (isNaN(age) || age === "") {
      throw new Error("Age should be number");
    }

    if (Number(age) < 18) {
      throw new Error("age should be atleast 18");
    }

    message.textContent = "Registration Done";
    message.className = "success";

  } catch (error){
    message.textContent = error.message;
    message.className = "error";

  }finally{
    usernameInput.value = "";
    ageInput.value = "";
  }
});