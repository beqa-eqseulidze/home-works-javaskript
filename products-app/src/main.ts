import './auth.ts';

const btnLogin = document.getElementById("login");
const btnSignup = document.getElementById("signup");

btnLogin?.addEventListener("click", login);
btnSignup?.addEventListener("click", register);

async function login() {
  const req = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "kaxaber@mail.com",
      password: "12345",
    }),
  });
  const res = await req.json();
  console.log(res);
}

async function register() {
  const req = await fetch("http://localhost:3000/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "kaxaber@mail.com",
      password: "12345",
    }),
  });
  const res = await req.json();
  console.log("Registration Response:", res);
}