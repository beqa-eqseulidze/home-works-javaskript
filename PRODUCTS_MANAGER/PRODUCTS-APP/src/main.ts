// საწყისი გვერდის ელემენტები (ორი ღილაკი და მათი კონტეინერი)
const welcomeBox = document.getElementById('welcomeBox');
const welcomeSignUp = document.getElementById('welcomeSignUp');
const welcomeSignIn = document.getElementById('welcomeSignIn');

// ფორმების საერთო კონტეინერი და უკან დაბრუნების ღილაკი
const formWrapper = document.getElementById('formWrapper');
const backBtn = document.getElementById('backBtn');

// ტაბების გადასართავი ღილაკები
const btnSignUp = document.getElementById('up');
const btnSignIn = document.getElementById('in');

// კონკრეტული ფორმების კონტეინერები
const signUpContainer = document.getElementById('signUpFormContainer');
const signInContainer = document.getElementById('signInFormContainer');

// ფორმების ელემენტები
const signUpForm = document.getElementById('signUpForm') as HTMLFormElement | null;
const signInForm = document.getElementById('signInForm') as HTMLFormElement | null;

// მესიჯების ბლოკი და გამოსვლის ღილაკი
const successMessage = document.getElementById('successMessage');
const logoutBtn = document.getElementById('logoutBtn');

// ტაბების გადართვის ფუნქცია (Sign Up / Sign In სტილები)
function switchTab(activeBtn: HTMLElement | null, inactiveBtn: HTMLElement | null, showContainer: HTMLElement | null, hideContainer: HTMLElement | null) {
  showContainer?.classList.remove('hidden');
  hideContainer?.classList.add('hidden');

  activeBtn?.classList.add('border-indigo-600', 'text-indigo-600');
  activeBtn?.classList.remove('text-gray-500', 'border-transparent');

  inactiveBtn?.classList.remove('border-indigo-600', 'text-indigo-600');
  inactiveBtn?.classList.add('text-gray-500', 'border-transparent');
}

// შეტყობინებების (მესიჯების) გამოტანის ფუნქცია
function showStatusMessage(text: string, isSuccess: boolean) {
  if (!successMessage) return;
  
  successMessage.textContent = text;
  successMessage.classList.remove('hidden');
  
  if (isSuccess) {
    successMessage.className = "mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-center font-medium";
  } else {
    successMessage.className = "mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center font-medium";
  }

  successMessage.scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => successMessage.classList.add('hidden'), 4000);
}

// საწყის გვერდზე (ორ ღილაკთან) დაბრუნების ფუნქცია
function resetToWelcomeScreen() {
  formWrapper?.classList.add('hidden');      
  welcomeBox?.classList.remove('hidden');    
  logoutBtn?.classList.add('hidden');        
}

// მთავარ გვერდზე "რეგისტრაცია" ღილაკზე დაჭერა
welcomeSignUp?.addEventListener('click', () => {
  welcomeBox?.classList.add('hidden');       
  formWrapper?.classList.remove('hidden');  
  switchTab(btnSignUp, btnSignIn, signUpContainer, signInContainer); 
});

// მთავარ გვერდზე "სისტემაში შესვლა" ღილაკზე დაჭერა
welcomeSignIn?.addEventListener('click', () => {
  welcomeBox?.classList.add('hidden');       
  formWrapper?.classList.remove('hidden');   
  switchTab(btnSignIn, btnSignUp, signInContainer, signUpContainer); // ჩართე შესვლის ტაბი
});

// "← უკან დაბრუნება" ღილაკზე დაჭერა
backBtn?.addEventListener('click', () => {
  resetToWelcomeScreen();
});

// შიდა ტაბების გადართვა (ფორმაში ყოფნისას)
btnSignUp?.addEventListener('click', () => {
  switchTab(btnSignUp, btnSignIn, signUpContainer, signInContainer);
});

btnSignIn?.addEventListener('click', () => {
  switchTab(btnSignIn, btnSignUp, signInContainer, signUpContainer);
});


// --- რეგისტრაციის გაგზავნა ---
signUpForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const emailInput = (document.getElementById('upEmail') as HTMLInputElement)?.value;
  const passwordInput = (document.getElementById('upPassword') as HTMLInputElement)?.value;

  try {
    const req = await fetch("http://localhost:3000/signup", { // /register-ის ნაცვლად
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: emailInput, password: passwordInput }),
});

    if (req.ok) {
      showStatusMessage("✅ წარმატებით დარეგისტრირდით!", true);
      signUpForm.reset();
      switchTab(btnSignIn, btnSignUp, signInContainer, signUpContainer); // გადავიყვანოთ ლოგინზე
    } else {
      showStatusMessage("❌ რეგისტრაცია ვერ მოხერხდა.", false);
    }
  } catch (error) {
    showStatusMessage("❌ სერვერთან კავშირი ვერ დამყარდა.", false);
  }
});


// --- ავტორიზაციის გაგზავნა ---
signInForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const emailInput = (document.getElementById('inEmail') as HTMLInputElement)?.value;
  const passwordInput = (document.getElementById('inPassword') as HTMLInputElement)?.value;

  try {
    const req = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailInput, password: passwordInput }),
    });

    if (req.ok) {
      showStatusMessage("✅ ავტორიზაცია წარმატებულია!", true);
      formWrapper?.classList.add('hidden'); // დავმალოთ მთლიანი ფორმების ბლოკი
      logoutBtn?.classList.remove('hidden'); // გამოვაჩინოთ "გამოსვლა"
      signInForm.reset();
    } else {
      showStatusMessage("❌ არასწორი ელ.ფოსტა ან პაროლი!", false);
    }
  } catch (error) {
    showStatusMessage("❌ სერვერთან კავშირი ვერ დამყარდა.", false);
  }
});


// --- სისტემიდან გამოსვლა (Logout) ---
logoutBtn?.addEventListener('click', () => {
  resetToWelcomeScreen(); // დააბრუნე მომხმარებელი საწყის ორ ღილაკთან
  showStatusMessage("ℹ️ თქვენ გამოხვედით სისტემიდან", true);
});

resetToWelcomeScreen(); // ჩატვირთვისას ყოველთვის გამოჩნდება მხოლოდ ორი მთავარი ღილაკი