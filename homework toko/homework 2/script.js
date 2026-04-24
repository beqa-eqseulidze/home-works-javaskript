let form = document.getElementById("form");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  let username = document.getElementById("username").value;
  let age = document.getElementById("age").value;
  let errorDiv = document.getElementById("error");

  try {
    if (username.length < 5) {
      throw "Username too short";
    }

    if (isNaN(age)) {
      throw "Age must be a number";
    }

    if (age < 18) {
      throw "age Must be 18+";
    }

    errorDiv.innerHTML = "Success!";
    errorDiv.style.color = "green";

  } catch (err) {
    errorDiv.innerHTML = err;
    errorDiv.style.color = "red";
  } finally {
    document.getElementById("username").value = "";
    document.getElementById("age").value = "";
  }
});