// სერვერის ბაზის URL მისამართი json-server-auth-ისთვის
const API_URL = 'http://localhost:3000';
// --- მთავარი ღილაკების ელემენტები ---
const signinBtn = document.getElementById('signin') as HTMLButtonElement;
const signupBtn = document.getElementById('signup') as HTMLButtonElement;
// --- ავტორიზაციის ელემენტები ---
const authLoginContainer = document.getElementById('auth-login') as HTMLDivElement;
const loginContent = document.getElementById('login-content') as HTMLDivElement;
const loginForm = document.getElementById('login-form') as HTMLFormElement;
const loginEmail = document.getElementById('login-email') as HTMLInputElement;
const loginPassword = document.getElementById('login-password') as HTMLInputElement;
const loginError = document.getElementById('login-error') as HTMLDivElement;
const loginCancel = document.getElementById('login-cancel') as HTMLButtonElement;
// --- რეგისტრაციის ელემენტების ---
const authRegisterContainer = document.getElementById('auth-register') as HTMLDivElement;
const registerContent = document.getElementById('register-content') as HTMLDivElement;
const registerForm = document.getElementById('register-form') as HTMLFormElement;
const registerEmail = document.getElementById('register-email') as HTMLInputElement;
const registerPassword = document.getElementById('register-password') as HTMLInputElement;
const registerError = document.getElementById('register-error') as HTMLDivElement;
const registerCancel = document.getElementById('register-cancel') as HTMLButtonElement;

// ავტორიზაციის კონტაინერის გახსნა და დახურვა
function openLoginContainer(): void {
  loginForm.reset();
  loginError.classList.add('hidden');
  loginEmail.classList.remove('border-red-500', 'bg-red-50');
  loginPassword.classList.remove('border-red-500', 'bg-red-50');

  authLoginContainer.classList.remove('hidden');
  setTimeout(() => {
    loginContent.classList.remove('scale-95', 'opacity-0');
    loginContent.classList.add('scale-100', 'opacity-100');
  }, 10);
}

function closeLoginContainer(): void {
  loginContent.classList.remove('scale-100', 'opacity-100');
  loginContent.classList.add('scale-95', 'opacity-0');
  setTimeout(() => authLoginContainer.classList.add('hidden'), 300);
}

// რეგისტრაციის კონტაინერის გახსნა და დახურვა
function openRegisterContainer(): void {
  registerForm.reset();
  registerError.classList.add('hidden');
  registerEmail.classList.remove('border-red-500', 'bg-red-50');
  registerPassword.classList.remove('border-red-500', 'bg-red-50');

  authRegisterContainer.classList.remove('hidden');
  setTimeout(() => {
    registerContent.classList.remove('scale-95', 'opacity-0');
    registerContent.classList.add('scale-100', 'opacity-100');
  }, 10);
}

function closeRegisterContainer(): void {
  registerContent.classList.remove('scale-100', 'opacity-100');
  registerContent.classList.add('scale-95', 'opacity-0');
  setTimeout(() => authRegisterContainer.classList.add('hidden'), 300);
}

// --- ივენთების მსმენელები გახსნაზე და ჩაკეტვაზე ---
signinBtn.addEventListener('click', openLoginContainer);
loginCancel.addEventListener('click', closeLoginContainer);
authLoginContainer.addEventListener('click', (e) => { if (e.target === authLoginContainer) closeLoginContainer(); });

signupBtn.addEventListener('click', openRegisterContainer);
registerCancel.addEventListener('click', closeRegisterContainer);
authRegisterContainer.addEventListener('click', (e) => { if (e.target === authRegisterContainer) closeRegisterContainer(); });


// === ასინქრონული ავტორიზაციის ლოგიკა +error ===
loginForm.addEventListener('submit', async (e: Event) => {
  e.preventDefault();

  const email = loginEmail.value.trim();
  const password = loginPassword.value;

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Auth failed');
    }

    const data = await response.json();
    if (data.accessToken) localStorage.setItem('token', data.accessToken);

    closeLoginContainer();
    setTimeout(() => alert('ავტორიზაცია წარმატებულია! კეთილი იყოს თქცენი მობრძანება'), 350);

  } catch (error) {
    console.error('Login Error:', error);
    loginError.textContent = 'თქვენს მიერ შეყვანილი მეილი ან პაროლი არასწორია გთხოვთ ცადოთ თავიდან';
    loginError.classList.remove('hidden');
    loginEmail.classList.add('border-red-500', 'bg-red-50');
    loginPassword.classList.add('border-red-500', 'bg-red-50');
  }
});


// === ასინქრონული რეგისტრაციის ლოგიკა +error ===
registerForm.addEventListener('submit', async (e: Event) => {
  e.preventDefault();

  const email = registerEmail.value.trim();
  const password = registerPassword.value;

  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Registration failed');
    }

    const data = await response.json();
    if (data.accessToken) localStorage.setItem('token', data.accessToken);

    closeRegisterContainer();
    setTimeout(() => alert('გილოცავთ თქვენ რეგისტრაცია წარმატებით გაიარეთ!'), 350);

  } catch (error) {
    console.error('Register Error:', error);
    registerError.textContent = 'სამწუხაროდ რეგისტრაცია ვერ განხორციელდა. გთხოვთ ცადოთ თავიდან.';
    registerError.classList.remove('hidden');
    registerEmail.classList.add('border-red-500', 'bg-red-50');
    registerPassword.classList.add('border-red-500', 'bg-red-50');
  }
});