import { injectAuthModal, removeAuthModal, showFieldError } from './auth-helpers';

const API_URL = 'http://localhost:3000';

const signinBtn = document.getElementById('signin') as HTMLButtonElement;
const signupBtn = document.getElementById('signup') as HTMLButtonElement;
const logoutBtn = document.getElementById('logout') as HTMLButtonElement; // ახალი სელექტორი

// --- გამოსვლის ფუნქციონალი ტოკენის მეხსიერებიდან ამოშლა და გასუფთავება ---
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('token');
  removeAuthModal();
  alert('სისტემიდან გამოსვლა წარმატებულია!');
});

// --- მოდალის ინიციალიზაცია და შიდა მოვლენების მიბმა ---
function handleModalOpen(mode: 'login' | 'register') {
  injectAuthModal(mode);

  const container = document.getElementById('auth-container') as HTMLDivElement;
  const form = document.getElementById('auth-form') as HTMLFormElement;
  const cancelBtn = document.getElementById('auth-cancel') as HTMLButtonElement;
  const emailInput = document.getElementById('auth-email') as HTMLInputElement;
  const passwordInput = document.getElementById('auth-password') as HTMLInputElement;

  cancelBtn.addEventListener('click', removeAuthModal);
  container.addEventListener('click', (e) => { if (e.target === container) removeAuthModal(); });

  form.addEventListener('submit', async (e: Event) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    const endpoint = mode === 'login' ? '/login' : '/register';
    const successMsg = mode === 'login'
      ? 'ავტორიზაცია წარმატებულია! კეთილი იყოს თქვენი მობრძანება'
      : 'გილოცავთ თქვენ რეგისტრაცია წარმატებით გაიარეთ!';

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Request failed');
      }

      const data = await response.json();
      if (data.accessToken) localStorage.setItem('token', data.accessToken);

      removeAuthModal();
      setTimeout(() => alert(successMsg), 350);

    } catch (error) {
      console.error(`${mode} Error:`, error);
      const errMsg = mode === 'login'
        ? 'თქვენს მიერ შეყვანილი მეილი ან პაროლი არასწორია გთხოვთ ცადოთ თავიდან'
        : 'სამწუხაროდ რეგისტრაცია ვერ განხორციელდა. გთხოვთ ცადოთ თავიდან.';

      showFieldError(errMsg);
    }
  });
}

signinBtn.addEventListener('click', () => handleModalOpen('login'));
signupBtn.addEventListener('click', () => handleModalOpen('register'));