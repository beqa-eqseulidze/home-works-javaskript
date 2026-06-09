// ბრაუზერის DOM ელემენტების ქეშირება, რომლებსაც განვაახლებთ აპლიკაციის მუშაობისას.
const content = document.querySelector("#content");
const statusEl = document.querySelector("#status");
const currentPageEl = document.querySelector("#current-page");
const navButtons = document.querySelectorAll(".nav-btn");

// როუტების კონფიგურაცია: თითოეული გასაღები უკავშირდება Fake Store API-ს ენდპოინტს და რენდერის ფუნქციას.
const routes = {
  products: {
    url: "https://fakestoreapi.com/products",
    title: "Products",
    render: renderProducts,
  },
  users: {
    url: "https://fakestoreapi.com/users",
    title: "Users",
    render: renderUsers,
  },
  carts: {
    url: "https://fakestoreapi.com/carts",
    title: "Cart",
    render: renderCarts,
  },
};

// მიმდინარე ჰეშის (hash) წაკითხვა და შესაბამისი როუტის შერჩევა.
function getRouteFromHash() {
  const hash = window.location.hash.replace("#", "");
  return routes[hash] ? hash : null;
}

// აქტიური გვერდის სათაურის განახლება და შესაბამისი ღილაკის მონიშვნა.
function setActiveRoute(route) {
  currentPageEl.textContent = route;
  navButtons.forEach((button) => {
    const active = button.dataset.route === route;
    button.classList.toggle("bg-teal-500", active);
    button.classList.toggle("text-slate-950", active);
    button.classList.toggle("bg-white/10", !active);
    button.classList.toggle("text-white", !active);
  });
}

// ჩატვირთვის (loading) ეკრანის ჩვენება API რექვესთის მიმდინარეობისას.
function setLoading(route) {
  content.innerHTML = `
    <div class="col-span-full rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-slate-300">
      <div class="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-teal-300 border-t-transparent"></div>
      <p>Loading ${route}...</p>
    </div>
  `;
  statusEl.textContent = "Fetching data...";
  content.setAttribute("aria-busy", "true");
}

// შეცდომის შეტყობინების ჩვენება რექვესთის ჩავარდნის შემთხვევაში.
function setError(message) {
  content.innerHTML = `
    <div class="col-span-full rounded-3xl border border-rose-400/30 bg-rose-500/10 p-8 text-center text-rose-200">
      <h2 class="text-xl font-semibold">Request failed</h2>
      <p class="mt-2 text-sm">${message}</p>
    </div>
  `;
  statusEl.textContent = "Error";
  content.setAttribute("aria-busy", "false");
}

// მთავარი მტვირთავი: მოაქვს შესაბამისი როუტის მონაცემები და გადასცემს სწორ რენდერერს.
async function loadRoute(route) {
  const config = routes[route];
  if (!config) {
    // თუ ვალიდური როუტი არ არის არჩეული, ვმალავთ პანელებს და ვასუფთავებთ აქტიური ტაბის სტილებს
    document.querySelector("#status-panel").classList.add("hidden");
    document.querySelector("#status-panel").classList.remove("flex");
    content.classList.add("hidden");
    navButtons.forEach((button) => {
      button.classList.remove("bg-teal-500", "text-slate-950");
      button.classList.add("bg-white/10", "text-white");
    });
    return;
  }

  // პანელების ჩვენება, როდესაც გვერდი აქტიურია
  document.querySelector("#status-panel").classList.remove("hidden");
  document.querySelector("#status-panel").classList.add("flex");
  content.classList.remove("hidden");

  setActiveRoute(route);
  setLoading(config.title);

  try {
    const response = await fetch(config.url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    
    // რბოლის პირობის (race condition) თავიდან აცილება: მონაცემებს ვარენდერებთ მხოლოდ იმ შემთხვევაში, თუ ეს როუტი კვლავ აქტიურია.
    if (getRouteFromHash() !== route) return;

    content.innerHTML = "";
    config.render(data);
    statusEl.textContent = `Loaded ${data.length} items`;
    content.setAttribute("aria-busy", "false");
  } catch (error) {
    // რბოლის პირობის (race condition) თავიდან აცილება: შეცდომას ვაჩვენებთ მხოლოდ იმ შემთხვევაში, თუ ეს როუტი კვლავ აქტიურია.
    if (getRouteFromHash() === route) {
      setError(`Could not load ${config.title.toLowerCase()} data. ${error.message}`);
    }
  }
}

// პროდუქტების ბარათების რენდერინგი მიღებული API მონაცემების მიხედვით.
function renderProducts(products) {
  products.forEach((product) => {
    content.innerHTML += `
      <article class="group overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 p-4 shadow-lg transition hover:-translate-y-1 hover:border-teal-300/30 hover:shadow-glow">
        <div class="mb-4 flex h-56 items-center justify-center rounded-2xl bg-white p-4">
          <img src="${product.image}" alt="${product.title}" class="max-h-full object-contain transition group-hover:scale-105" />
        </div>
        <p class="mb-2 text-xs uppercase tracking-[0.25em] text-teal-300">${product.category}</p>
        <h2 class="max-h-14 overflow-hidden text-lg font-semibold text-white">${product.title}</h2>
        <p class="mt-3 max-h-20 overflow-hidden text-sm leading-6 text-slate-300">${product.description}</p>
        <div class="mt-4 flex items-center justify-between gap-3">
          <span class="rounded-full bg-teal-400/15 px-3 py-1 text-sm font-semibold text-teal-300">$${product.price}</span>
          <span class="text-sm text-slate-400">Rating: ${product.rating.rate} (${product.rating.count})</span>
        </div>
      </article>
    `;
  });
}

// მომხმარებლების ბარათების რენდერინგი მიღებული API მონაცემების მიხედვით.
function renderUsers(users) {
  users.forEach((user) => {
    content.innerHTML += `
      <article class="rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-lg">
        <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400 to-orange-400 text-xl font-bold text-slate-950">
          ${user.name.firstname[0]}${user.name.lastname[0]}
        </div>
        <h2 class="text-xl font-semibold text-white">${user.name.firstname} ${user.name.lastname}</h2>
        <p class="mt-1 text-sm text-slate-400">@${user.username}</p>
        <dl class="mt-4 space-y-2 text-sm text-slate-300">
          <div><span class="text-slate-500">Email:</span> ${user.email}</div>
          <div><span class="text-slate-500">Phone:</span> ${user.phone}</div>
          <div><span class="text-slate-500">City:</span> ${user.address.city}</div>
          <div><span class="text-slate-500">Street:</span> ${user.address.street}, ${user.address.number}</div>
        </dl>
      </article>
    `;
  });
}

// კალათების რენდერინგი და მათში არსებული პროდუქტების სიის ჩვენება.
function renderCarts(carts) {
  carts.forEach((cart) => {
    const productList = cart.products
      .map(
        (product) => `
          <li class="flex items-center justify-between gap-3 rounded-2xl bg-white/5 px-4 py-3">
            <span class="truncate text-sm text-slate-200">Product #${product.productId}</span>
            <span class="rounded-full bg-orange-400/15 px-3 py-1 text-sm font-semibold text-orange-300">
              Qty: ${product.quantity}
            </span>
          </li>
        `
      )
      .join("");

    content.innerHTML += `
      <article class="rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-lg">
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="text-xs uppercase tracking-[0.25em] text-orange-300">Cart #${cart.id}</p>
            <h2 class="mt-2 text-xl font-semibold text-white">User ID: ${cart.userId}</h2>
            <p class="mt-1 text-sm text-slate-400">Date: ${new Date(cart.date).toLocaleDateString("en-GB")}</p>
          </div>
          <span class="rounded-full bg-teal-400/15 px-3 py-1 text-sm font-semibold text-teal-300">
            ${cart.products.length} items
          </span>
        </div>
        <ul class="mt-4 space-y-2">${productList}</ul>
      </article>
    `;
  });
}

// მონაცემების ხელახალი ჩატვირთვა URL ჰეშის (hash) ყოველი ცვლილებისას.
window.addEventListener("hashchange", () => {
  loadRoute(getRouteFromHash());
});

// ნავიგაციის ღილაკზე კლიკი ცვლის URL ჰეშს, რაც თავის მხრივ იწვევს როუტის ჩატვირთვას.
navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    window.location.hash = button.dataset.route;
  });
});

// გვერდის პირველადი ჩატვირთვისას/რეფრეშისას ვასუფთავებთ ჰეშს და ვმალავთ ყველა პანელს (მხოლოდ ჰედერის გამოსაჩენად).
window.addEventListener("DOMContentLoaded", () => {
  if (window.location.hash) {
    window.location.hash = "";
  } else {
    loadRoute(null);
  }
});
