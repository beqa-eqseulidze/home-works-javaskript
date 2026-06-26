const btnSignUp = document.getElementById('up');
const btnSignIn = document.getElementById('in');

btnSignUp?.addEventListener('click', login);
btnSignIn?.addEventListener('click', registerTestUser)




 async function login() {  
  const req = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Tells the server we are sending JSON
    },
    body: JSON.stringify({
      email: "bitrvelishvili.modus@gmail.com",
      password: "123456789",
    }),
  });
  const res=await req.json();
  console.log(res)
}

async function registerTestUser() {  
  const req = await fetch("http://localhost:3000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "bitrvelishvili.modus@gmail.com",
      password: "123456789",
    }),
  });
  const res = await req.json();
  console.log("Registration Response:", res);
}

// registerTestUser();