const correctUsername = "admin1";
const correctPassword = "12345678";

// HTMLდან ელემენტების წამოღება ID-ით
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const notification = document.getElementById("notification");

// localStorage-დან წარუმატებელი მცდელობების წამოღება + localStorage-დან დაბლოკვის დროის წამოღება
let failedAttempts = Number(localStorage.getItem("failedAttempts")) || 0;
let blockedUntil = Number(localStorage.getItem("blockedUntil")) || 0;

// ფუნქცია რომელიც ამოწმებს დაბლოკილია თუ არა იუზერი
function updateBlockStatus() {
  // ახლანდელი დრო მილიწამებში
  const now = Date.now();
  
  if (now < blockedUntil) {
    // Login ღილაკის გათიშვა და დარჩენილი დრო წამებში + წუთების და  წამების გამოთვლა
    loginBtn.disabled = true;
    const remainingSeconds = Math.ceil(
      (blockedUntil - now) / 1000
    );
    const minutes = Math.floor(
      remainingSeconds / 60
    );
    const seconds = remainingSeconds % 60;
    // login ის დაბლოკვის შეტყობინების გამოტანა და წითელი ტექსტის დამატება
    notification.innerHTML = `
      Login blocked ❌ <br>
      Try again in ${minutes}m ${seconds}s
    `;
    notification.classList.remove("text-green-400");
    notification.classList.add("text-red-400");
    // ფუნქციის თავიდან გაშვება 1 წამში და countdownის განახლება
    setTimeout(updateBlockStatus, 1000);
  } else {
    //Login ღილაკის ჩართვა თუ ბლოკი დასრულდა და Login blockedის ტექსტის წაშლა
    loginBtn.disabled = false;
    if (notification.innerHTML.includes("Login blocked")) {
      notification.innerHTML = "";
    }
  }
}

// ფუნქციის გაშვება გვერდის ჩატვირთვისას
updateBlockStatus();

// როცა Login ღილაკზე დააჭერ მოსმენის დაწყება
loginBtn.addEventListener("click", () => {
  // input-ებიდან მნიშვნელობების წამოღება trim ით
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  const now = Date.now();
  // ფუნქციის გაჩერება თუკი დაბლოკილია
  if (now < blockedUntil) {
    return;
  }
  // თუ username და password სწორია მაშინ წარმატების ტექსტი და მწვანე ფერის დამატება
  if (
    username === correctUsername &&
    password === correctPassword
  ) {
    notification.textContent =
      "Authorization successful ✅";
    notification.classList.remove("text-red-400");
    notification.classList.add("text-green-400");
    // წარუმატებელი მცდელობების განულება და localStorage-ში შენახვა
    failedAttempts = 0;
    localStorage.setItem(
      "failedAttempts",
      failedAttempts
    );
  } else {
    // თუ მონაცემები არასწორია, მცდელობებს გაზრდა 1-ით და localStorage-ში შენახვა
    failedAttempts++;
    localStorage.setItem(
      "failedAttempts",
      failedAttempts
    );

    // შეცდომის ტექსტი და წითელი ფერის დამატება
    notification.textContent ="Incorrect username or password ❌";
    notification.classList.remove("text-green-400");
    notification.classList.add("text-red-400");

    if (failedAttempts >= 3) {
      // ახლანდელ დროს + 5 წუთი და localStorage-ში შენახვა
      blockedUntil = Date.now() + 5 * 60 * 1000;
      localStorage.setItem(
        "blockedUntil",
        blockedUntil
      );
      // მცდელობების განულება და მისი localStorage-ში შენახვა
      failedAttempts = 0;
      localStorage.setItem(
        "failedAttempts",
        failedAttempts
      );
      // დაბლოკვის ფუნქციის გაშვება
      updateBlockStatus();
    }
  }
});