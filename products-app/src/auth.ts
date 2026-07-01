const loginBtn = document.querySelector("#loginBtn") as HTMLButtonElement;
const signupBtn = document.querySelector("#signupBtn") as HTMLButtonElement;
const modal = document.querySelector("#authModal") as HTMLElement;
const closeBtn = document.querySelector("#closeModalBtn") as HTMLElement;
const formBox = document.querySelector("#authFormContainer") as HTMLElement;

let formType = "login";

function showForm() {
  if (!formBox) return;

  if (formType === "login") {
    formBox.innerHTML = `
      <h2 class="text-2xl font-bold text-center mb-6">Login</h2>
      <form id="authForm">
        <input type="email" id="email" placeholder="Email" class="w-full px-4 py-2 border rounded-lg mb-3 focus:outline-none focus:border-green-500" required />
        <input type="password" id="password" placeholder="Password" class="w-full px-4 py-2 border rounded-lg mb-3 focus:outline-none focus:border-green-500" required />
        <div id="formMessage" class="text-sm text-center mb-3 min-h-[24px]"></div>
        <button type="submit" class="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all cursor-pointer">
          Sign In
        </button>
      </form>
      <div class="text-center mt-4">
        <a id="switchBtn" class="text-blue-500 cursor-pointer hover:underline">Sign Up</a>
      </div>
    `;
  } else {
    formBox.innerHTML = `
      <h2 class="text-2xl font-bold text-center mb-6">Sign Up</h2>
      <form id="authForm">
        <input type="email" id="email" placeholder="Email" class="w-full px-4 py-2 border rounded-lg mb-3 focus:outline-none focus:border-green-500" required />
        <input type="password" id="password" placeholder="Password" class="w-full px-4 py-2 border rounded-lg mb-3 focus:outline-none focus:border-green-500" required />
        <div id="formMessage" class="text-sm text-center mb-3 min-h-[24px]"></div>
        <button type="submit" class="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all cursor-pointer">
          Create Account
        </button>
      </form>
      <div class="text-center mt-4">
        <a id="switchBtn" class="text-blue-500 cursor-pointer hover:underline">Login</a>
      </div>
    `;
  }

  const switchBtn = document.querySelector("#switchBtn");
  if (switchBtn) {
    switchBtn.onclick = () => {
      formType = formType === "login" ? "register" : "login";
      showForm();
    };
  }

  const form = document.querySelector("#authForm") as HTMLFormElement;
  if (form) {
    form.onsubmit = async (e) => {
      e.preventDefault();
      
      const emailInput = document.querySelector("#email") as HTMLInputElement;
      const passwordInput = document.querySelector("#password") as HTMLInputElement;
      const formMessage = document.querySelector("#formMessage") as HTMLElement;
      
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
      
      formMessage.textContent = '';
      formMessage.className = 'text-sm text-center mb-3 min-h-[24px]';
      
      if (!email || !password) {
        formMessage.textContent = 'Please fill all fields';
        formMessage.className = 'text-sm text-center mb-3 min-h-[24px] text-red-600';
        return;
      }
      
      if (!email.includes('@') || !email.includes('.')) {
        formMessage.textContent = 'Please enter a valid email address';
        formMessage.className = 'text-sm text-center mb-3 min-h-[24px] text-red-600';
        return;
      }
      
      if (password.length < 5) {
        formMessage.textContent = 'Password must be at least 5 characters';
        formMessage.className = 'text-sm text-center mb-3 min-h-[24px] text-red-600';
        return;
      }
      
      try {
        const endpoint = formType === "login" ? "login" : "register";
        const response = await fetch(`http://localhost:3000/${endpoint}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        
        const data = await response.json();
        
        if (response.ok) {
          if (formType === "login") {
            formMessage.textContent = 'Login successful!';
            formMessage.className = 'text-sm text-center mb-3 min-h-[24px] text-green-600';
            setTimeout(() => {
              modal.classList.add("hidden");
            }, 1500);
          } else {
            formMessage.textContent = 'Registration successful!';
            formMessage.className = 'text-sm text-center mb-3 min-h-[24px] text-green-600';
            setTimeout(() => {
              formType = "login";
              showForm();
              const newFormMessage = document.querySelector("#formMessage") as HTMLElement;
              if (newFormMessage) {
                newFormMessage.textContent = 'Account created! Please login.';
                newFormMessage.className = 'text-sm text-center mb-3 min-h-[24px] text-green-600';
              }
            }, 1500);
          }
        } else {
          formMessage.textContent = data.message || 'Something went wrong';
          formMessage.className = 'text-sm text-center mb-3 min-h-[24px] text-red-600';
        }
      } catch (error) {
        formMessage.textContent = 'Network error. Is server running?';
        formMessage.className = 'text-sm text-center mb-3 min-h-[24px] text-red-600';
        console.error(error);
      }
    };
  }
}

loginBtn.onclick = () => {
  formType = "login";
  showForm();
  modal.classList.remove("hidden");
};

signupBtn.onclick = () => {
  formType = "register";
  showForm();
  modal.classList.remove("hidden");
};

closeBtn.onclick = () => modal.classList.add("hidden");

modal.onclick = (e: any) => {
  if (e.target === modal) modal.classList.add("hidden");
};