const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const message = document.getElementById("message");

const Correct_User = "admin1";
const Correct_Password = "12345678";
const Max_Tries = 3;
const Ban_Time = 5 * 60 * 1000;

// წინა მცდელობების აღდგენა localstorage-დან 
let attempts = parseInt(localStorage.getItem("loginAttempts")) || 0;
let countdownInterval;

//ვამოწმებთ არის თუ არა მომხმარებელი დაბლოკილი გვერდზე შემოსვლისსას ;
function checkBanStatus() {
    const lockUntil = localStorage.getItem("lockUntil"); //ვიღებთ დაბლოკვის ვადის დასრულების დროს

    if (lockUntil) {
        const currentTime = Date.now();
        const timeLeft = parseInt(lockUntil) - currentTime; //გამოვთვლით ban-ის ახსნის დროს.

        if (timeLeft > 0) {
            startCountdown(timeLeft); //თუ დრო დარჩენილია ვიწყებთ დარჩენილი დროისათვლას
        } else {
            unlockForm();
        }
    }
}

// TIMER  : 
function startCountdown(duration) {
    loginBtn.disabled = true; // button off
    usernameInput.disabled = true; // login off
    passwordInput.disabled = true; // password off

    const endTIme = Date.now() + duration; // ban-ახსნის დროს ვადგენტ

    function updateTimer() {
        const remaining = endTIme - Date.now();

        if (remaining <= 0) {
            clearInterval(countdownInterval); // ათვლის გაჩერება
            unlockForm();
        } else {
            const minutes = Math.floor(remaining / 60000);
            const seconds = Math.floor((remaining % 60000) / 1000);

            message.className = "mt-4 text-center text-sm font-medium text-red-600";
            message.textContent = `თქვენ დაიბლოკეთ.. აგეხსნებათ ${minutes}:${seconds < 10 ? '0' : ''}${seconds} წუთში`;
        }
    }

    clearInterval(countdownInterval);
    updateTimer();
    countdownInterval = setInterval(updateTimer, 1000); //ათვლის განახლება ყოველ 1 წამში
}

//განბლოკვა და გასუფტავება.
function unlockForm() {
    attempts = 0; // მცდელობების ნულზე ჩამოსვლა
    localStorage.removeItem("loginAttempts"); // მცდელობების წაშლა მეხსიერებიდან
    localStorage.removeItem("lockUntil"); // დაბლოკვის ვადის წაშლა

    //ვრთავთ login-ს :
    loginBtn.disabled = false;
    usernameInput.disabled = false;
    passwordInput.disabled = false;
    message.textContent = "";
}


loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const enteredUsername = usernameInput.value.trim();
    const enteredPassword = passwordInput.value.trim();

    // მონაცემების შემოწმება ;
    if (enteredUsername === Correct_User && enteredPassword === Correct_Password) {
        message.className = "mt-4 text-center text-sm font-medium text-green-600";
        message.textContent = "წარმატებით შესრულდა";
        attempts = 0; // ვანულებ წარმატებით შესვლისას.
        localStorage.removeItem("loginAttempts");
    } else {
        attempts++; // +1 try
        localStorage.setItem("loginAttempts", attempts);

        // 3 მცდელობის მიღწევისას დავბლოკავთ;
        if (attempts >= Max_Tries) {                             
            const lockUntilTime = Date.now() + Ban_Time;    //ვთვლით როდის დასრულდება BAN
            localStorage.setItem("lockUntil", lockUntilTime);  
            startCountdown(Ban_Time);  // ვიწყებთ ტაიმერის ათვლას დაბლოკვის დროით                                 
        } else {                                                       
            // შეცდომების შეტყობინება დარჩენილი მცდელობების რაოდენობით;;
            message.className = "mt-4 text-center text-sm font-medium text-red-600"; 
            message.textContent = ` სახელი ან პაროლი არასწოროა. დარჩენილია : ${Max_Tries - attempts} მცდელობა`;
        }
    }                                                                   
});                                                                    

checkBanStatus();