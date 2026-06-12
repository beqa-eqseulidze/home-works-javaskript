import { form, mainTag } from "./domElements.js"

export async function onSave(event) {
  // ფორმის submit რომ გვერდი არ გადატვირთოს
  event.preventDefault();

  // ფორმიდან ვიღებთ ყველა ველის მნიშვნელობას
  const formObj = new FormData(event.currentTarget);

  // FormData-ს ჩვეულებრივ ობიექტად ვაქცევთ
  const product = Object.fromEntries(formObj);

  // ვალიდაცია: ცარიელი ველი თუ არის, შენახვას არ ვაგრძელებთ
  if (!showError(product)) return;

  // Fake Store API-სთვის id ვანიჭებთ
  product.id = 0;

  // price ტექსტიდან რიცხვად ვაქცევთ
  if (product.price) {
    product.price = Number(product.price);
  }

  try {
    // ახალ პროდუქტს API-ში ვაგზავნით POST request-ით
    const res = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    // თუ server-მა შეცდომა დააბრუნა, აქ ვჩერდებით
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    // პასუხს JSON ფორმატში ვკითხულობთ
    const data = await res.json();
    console.log(data);

    // თუ main ელემენტი არსებობს, ახალ პროდუქტს გვერდზეც ვამატებთ
    if (mainTag && data && data.title) {
      const p = document.createElement("p");
      p.className = "title";
      p.id = data.id;
      p.textContent = data.title;
      p.addEventListener("click", (e) => {
        console.log(e.target.id);
      });
      mainTag.appendChild(p);
    }

    // წარმატების შემდეგ ფორმას ვასუფთავებთ
    form.reset();
  } catch (error) {
    // შეცდომის შემთხვევაში კონსოლში და alert-ით ვაჩვენებთ ინფორმაციას
    console.error("Could not create product:", error);
    alert("Product was not saved. Check the console for details.");
  }
}

function showError(obj) {
  // თითოეული ველის შემოწმება, რომ ცარიელი მნიშვნელობა არ იყოს
  for (let key in obj) {
    if (String(obj[key] ?? "").trim() === "") {
      alert(`fill ${key} field`);
      return false;
    }
  }
  return true;
}
