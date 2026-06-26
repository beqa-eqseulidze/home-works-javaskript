const btnSignIn = document.getElementById('signin');
const btnSignUp = document.getElementById('signup');
btnSignIn?.addEventListener('click', login)
btnSignUp?.addEventListener('click', register)

async function login(e: Event) {
  e.preventDefault()
  const req = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email: "olivier@mail.com",
      password: "bestPassw0rd"
    }),
  });
  const res = await req.json();
  console.log(res)
};

async function register(e: Event) {
  e.preventDefault()
  const req = await fetch("http://localhost:3000/register", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email: "olivier@mail.com",
      password: "bestPassw0rd"
    }),
  });
  const res = await req.json();
  console.log("Registration Response", res)
};