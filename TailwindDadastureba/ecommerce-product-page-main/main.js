//გალერეა: სურათების სია + მიმდინარე ინდექსი

// მთავარი სურათის DOM ელემენტის წამოღება
const mainImage = document.getElementById("main-image");

// ყველა Thumbnail (მცირე ზომის) ღილაკის წამოღება
const thumbButtons = document.querySelectorAll(".thumb-btn");

// Thumbnail-ების data-full ატრიბუტებიდან დიდ სურათებზე ბმულების მასივის შექმნა
const images = Array.from(thumbButtons).map((btn) => btn.dataset.full);

// ინდექსის ცვლადი მიმდინარე აქტიური სურათის სათვალთვალოდ
let currentIndex = 0;

// ფუნქცია, რომელიც აყენებს აქტიურ სურათს და ახლებს Thumbnail-ების სტილებს
function setActiveImage(index) {
  currentIndex = index;
  
  // მთავარი სურათის წყაროს (src) განახლება
  mainImage.src = images[currentIndex];

  // თითოეულ Thumbnail ღილაკზე აქტიური ჩარჩოს (Border) სტილის ჩართვა/გამორთვა
  thumbButtons.forEach((btn, i) => {
    btn.classList.toggle("border-orange-500", i === currentIndex);
    btn.classList.toggle("border-transparent", i !== currentIndex);
  });
}

// თითოეულ Thumbnail ღილაკზე დაჭერის Event-ის დამატება
thumbButtons.forEach((button, index) => {
  button.addEventListener("click", () => setActiveImage(index));
});


//მობილურის ნავიგაციის ისრები (Prev / Next)

const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

// წინა სურათზე გადასვლის ლოგიკა (ციკლური ნავიგაცია)
prevBtn.addEventListener("click", () => {
  const newIndex = (currentIndex - 1 + images.length) % images.length;
  setActiveImage(newIndex);
});

// შემდეგ სურათზე გადასვლის ლოგიკა (ციკლური ნავიგაცია)
nextBtn.addEventListener("click", () => {
  const newIndex = (currentIndex + 1) % images.length;
  setActiveImage(newIndex);
});


// პროდუქტის რაოდენობის მრიცხველი (Quantity Counter)

const decreaseBtn = document.getElementById("decrease-btn");
const increaseBtn = document.getElementById("increase-btn");
const quantityEl = document.getElementById("quantity");

// საწყისი რაოდენობა
let quantity = 0;

// რაოდენობის გაზრდა
increaseBtn.addEventListener("click", () => {
  quantity++;
  quantityEl.textContent = quantity;
});

// რაოდენობის შემცირება (მხოლოდ იმ შემთხვევაში, თუ რაოდენობა 0-ზე მეტია)
decreaseBtn.addEventListener("click", () => {
  if (quantity > 0) {
    quantity--;
    quantityEl.textContent = quantity;
  }
});

// კალათაში დამატება (Add to Cart)

const addToCartBtn = document.getElementById("add-to-cart-btn");

addToCartBtn.addEventListener("click", () => {
  // თუ რაოდენობა 0-ია, კალათაში არაფერს ამატებს
  if (quantity === 0) {
    return;
  }

  // შეტყობინების გამოტანა წარმატებული დამატებისას
  alert(`დაემატა ${quantity} ცალი კალათაში`);

  // რაოდენობის განულება და UI-ს განახლება
  quantity = 0;
  quantityEl.textContent = quantity;
});



// მობილური მენიუს გადართვა (Mobile Menu Toggle)

const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

// მობილური მენიუს გამოჩენა/დამალვა Tailwind CSS კლასების ცვლილებით
menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
  mobileMenu.classList.toggle("flex");
});