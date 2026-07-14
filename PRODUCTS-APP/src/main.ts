import type { IProduct, IUserInfo } from "./models/interfaces";

const btnRegister = document.querySelector("#register");
const btnLogin = document.querySelector("#login");
const btnGetProducts = document.querySelector("#getProducts");

btnRegister?.addEventListener("click", onRegister);
btnLogin?.addEventListener("click", onLogin);
btnGetProducts?.addEventListener("click", getProducts);

async function onRegister() {
  const req = await fetch("http://localhost:3000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "test@gmaii.com",
      password: "12345678",
    }),
  });
  const res: IUserInfo = await req.json();
  onSaveUser(res);
}

async function onLogin() {
  const req = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Tells the server we are sending JSON
    },
    body: JSON.stringify({
      email: "test@gmaii.com",
      password: "12345678",
    }),
  });
  const res = await req.json();
  onSaveUser(res);
}

async function getProducts(): Promise<IProduct[]> {
  let token = getJWT();
  if (token) {
    const res = await fetch("http://localhost:3000/products", {
      method: "GET",
      headers: {        
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json'
      }      
    });
    const data:IProduct[]=await res.json();
    return data
  }
  else{
    window.alert("please signin");
    return [] as IProduct[]
  }
}

function onSaveUser(user: IUserInfo): void {
  localStorage.setItem("userInfo", JSON.stringify(user));
}

function getJWT(): string | null {
  const data=localStorage.getItem("userInfo") ;
  if(data){
    const userInfo: IUserInfo = JSON.parse(data);
    return userInfo?.accessToken
  }
   return null;
}
