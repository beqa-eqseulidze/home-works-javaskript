 const btn=document.querySelector('button');
 btn?.addEventListener('click',test)

 async function test() {  
  const req = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Tells the server we are sending JSON
    },
    body: JSON.stringify({
      email: "olivier@mail.com",
      password: "bestPassw0rd",
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
      email: "olivier@mail.com",
      password: "bestPassw0rd",
    }),
  });
  const res = await req.json();
  console.log("Registration Response:", res);
}

// registerTestUser();