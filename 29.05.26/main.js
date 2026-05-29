const CORRECT_USERNAME = "niko";
const CORRECT_PASSWORD = "12345678";
const BLOCK_DURATION = 5 * 60 * 1000; // 5 წუთი
const MAX_ATTEMPTS = 3;

const form = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const messageDiv = document.getElementById("message");
const loginBtn = document.getElementById("loginBtn");

let timerInterval = null;
let blockTimeout = null;

// localStorage-დან მონაცემების წაკითხვა
function getFailedAttempts() {
  return parseInt(localStorage.getItem("failedAttempts")) || 0;
}

// localStorage-დან ვკითხულობთ blockedUntil-ს (string ფორმატში)
// თუ არსებობს, ვაქცევთ number-ად (parseInt), თუ არა → ვაბრუნებთ 0
function getBlockedUntil() {
  const storedValue = localStorage.getItem("blockedUntil");  // string | null
  return storedValue ? parseInt(storedValue) : 0;            // number | 0
}

function setFailedAttempts(count) {
  localStorage.setItem("failedAttempts", count);
}

function setBlockedUntil(timestamp) {
  if (timestamp > 0) {
    localStorage.setItem("blockedUntil", timestamp);
  } else {
    localStorage.removeItem("blockedUntil");
  }
}

// ტაიმერის განახლება ყოველ წამში (წამზომი)
function updateCountdown(blockedUntil) {
  if (timerInterval) clearInterval(timerInterval);

  function tick() {
    const remaining = blockedUntil - Date.now();
    if (remaining <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      unblockUser();
      return;
    }
    const minutes = String(Math.floor(remaining / 60000)).padStart(2, "0");
    const seconds = String(Math.floor((remaining % 60000) / 1000)).padStart(2, "0");
    showMessage(
      `თქვენ დაბლოკილი ხართ ${minutes}:${seconds}. გთხოვთ დაელოდოთ.`,
      "error"
    );
  }

  tick(); // პირველი განახლება მაშინვე
  timerInterval = setInterval(tick, 1000); // ყოველ წამში
}

// გვერდის ჩატვირთვისას ვამოწმებთ ბლოკირების სტატუსს
function checkBlockStatus() {
  const blockedUntil = getBlockedUntil();
  const now = Date.now();

  if (blockedUntil > now) {
    // ჯერ კიდევ დაბლოკილია
    blockUser(blockedUntil);
    return true;
  } else if (blockedUntil > 0 && blockedUntil <= now) {
    // ბლოკირების დრო ამოიწურა
    setBlockedUntil(0);
    setFailedAttempts(0);
    return false;
  }
  return false;
}

// იუზერის დაბლოკვა
function blockUser(blockedUntil) {
  disableForm(true);

  // ვანულირებთ ძველ setTimeout-ს თუ არსებობს
  if (blockTimeout) clearTimeout(blockTimeout);

  // 5 წუთის შემდეგ განბლოკვის setTimeout
  const remaining = blockedUntil - Date.now();
  blockTimeout = setTimeout(() => {
    unblockUser();
  }, remaining);

  // ტაიმერის გაშვება წამზომით
  updateCountdown(blockedUntil);
}

// იუზერის განბლოკვა
function unblockUser() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  if (blockTimeout) {
    clearTimeout(blockTimeout);
    blockTimeout = null;
  }
  setBlockedUntil(0);
  setFailedAttempts(0);
  disableForm(false);
  showMessage("ანგარიში განბლოკილია, შეგიძლიათ თავიდან სცადოთ.", "success");
}

// ფორმის ჩართვა/გამორთვა
function disableForm(disabled) {
  usernameInput.disabled = disabled;
  passwordInput.disabled = disabled;
  loginBtn.disabled = disabled;
}

// შეტყობინების ჩვენება
function showMessage(text, type) {
  messageDiv.textContent = text;
  // Tailwind classes
  messageDiv.classList.remove("hidden", "bg-green-100", "text-green-800", "border", "border-green-300", "bg-red-100", "text-red-800", "border", "border-red-300");

  if (type === "success") {
    messageDiv.classList.add("bg-green-100", "text-green-800", "border", "border-green-300");
  } else if (type === "error") {
    messageDiv.classList.add("bg-red-100", "text-red-800", "border", "border-red-300");
  }
}

// ─────────────────────────────────────────────
// EVENT + EVENTLISTENER + TRIGGER + ACTION
// ─────────────────────────────────────────────

// 1️⃣ EVENT: "submit" — როცა მომხმარებელი აწვება ღილაკს,
//    ფორმა აგზავნის "submit" event-ს

// 2️⃣ EVENTLISTENER: form.addEventListener("submit", callback)
//    — უსმენს submit event-ს, როცა მოხდება, შეასრულებს callback-ს
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // თუ დაბლოკილია, არ გავაგრძელოთ
  if (checkBlockStatus()) {
    return;
  }

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (username === CORRECT_USERNAME && password === CORRECT_PASSWORD) {
    // წარმატებული ავტორიზაცია
    showMessage("ავტორიზაცია წარმატებულია! გილოცავთ! 🎉", "success");
    setFailedAttempts(0);
    usernameInput.value = "";
    passwordInput.value = "";
  } else {
    // არასწორი მონაცემები
    let attempts = getFailedAttempts() + 1;
    setFailedAttempts(attempts);

    // 3️⃣ TRIGGER: attempts >= 3 (MAX_ATTEMPTS)
    //    — ეს არის პირობა, რომელიც ააქტიურებს ბლოკირებას
    if (attempts >= MAX_ATTEMPTS) {
      // 4️⃣ ACTION: ბლოკირების შესრულება
      //    — იწყება 5-წუთიანი ბლოკირება
      const blockedUntil = Date.now() + BLOCK_DURATION;
      setBlockedUntil(blockedUntil);
      setFailedAttempts(0);
      blockUser(blockedUntil);
    } else {
      showMessage(
        `პაროლი ან იუზერნეიმი არასწორია! დარჩენილი მცდელობები: ${
          MAX_ATTEMPTS - attempts
        }`,
        "error"
      );
    }
  }
});

// გვერდის ჩატვირთვისას შევამოწმოთ ბლოკირება
window.addEventListener("DOMContentLoaded", function () {
  checkBlockStatus();
});