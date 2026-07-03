import type { Isignup } from './types';

const baseUrl = 'http://localhost:3000';

const signinBtn = document.getElementById('signin');
const signupBtn = document.getElementById('signup');
const logoutBtn = document.getElementById('logout');
const modalRoot = document.getElementById('modal-root');
const toast = document.getElementById('statusToast');

function showMessage(message: string, type: Isignup) {
  if (!toast) return;

  toast.textContent = message;
  toast.className = 'fixed top-6 right-6 z-50 p-4 rounded-xl shadow-xl font-semibold transition-all duration-300';

  if (type === 'success') {
    toast.classList.add('bg-emerald-50', 'text-emerald-800');
  } else {
    toast.classList.add('bg-rose-50', 'text-rose-800');
  }

  toast.classList.remove('hidden');

  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3000);
}

async function api(path: string, body: object) {
  try {
    const res = await fetch(`${baseUrl}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      showMessage(data.error || 'Error occurred', 'danger');
      return null;
    }

    return data;
  } catch {
    showMessage('Server connection failed', 'danger');
    return null;
  }
}

function clearModal() {
  if (modalRoot) {
    modalRoot.innerHTML = '';
  }
}

function createSignupForm() {
  clearModal();

  const form = document.createElement('div');
  form.className = 'bg-white p-8 rounded-2xl shadow-xl w-full max-w-md';
  form.innerHTML = `
    <h3 class="text-xl font-bold text-gray-800 mb-4 text-center">ანგარიშის შექმნა</h3>
    <form id="signupForm" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-600 mb-1">ელ. ფოსტა</label>
        <input type="email" id="upEmail" placeholder="example@gmail.com" required
          class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none">
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-600 mb-1">პაროლი</label>
        <input type="password" id="upPassword" placeholder="••••••••" required
          class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none">
      </div>
      <button type="submit" class="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition">
        რეგისტრაცია
      </button>
    </form>
  `;

  modalRoot?.appendChild(form);

  document.getElementById('signupForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = (document.getElementById('upEmail') as HTMLInputElement).value;
    const password = (document.getElementById('upPassword') as HTMLInputElement).value;
    const res = await api('/signup', { email, password });
    if (res) {
      showMessage('User registered successfully!', 'success');
      clearModal();
    }
  });
}

function createSigninForm() {
  clearModal();

  const form = document.createElement('div');
  form.className = 'bg-white p-8 rounded-2xl shadow-xl w-full max-w-md';
  form.innerHTML = `
    <h3 class="text-xl font-bold text-gray-800 mb-4 text-center">სისტემაში შესვლა</h3>
    <form id="signinForm" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-600 mb-1">ელ. ფოსტა</label>
        <input type="email" id="inEmail" placeholder="example@gmail.com" required
          class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-600 mb-1">პაროლი</label>
        <input type="password" id="inPassword" placeholder="••••••••" required
          class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
      </div>
      <button type="submit" class="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition">
        შესვლა
      </button>
    </form>
  `;

  modalRoot?.appendChild(form);

  document.getElementById('signinForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = (document.getElementById('inEmail') as HTMLInputElement).value;
    const password = (document.getElementById('inPassword') as HTMLInputElement).value;
    const res = await api('/login', { email, password });
    if (res) {
      showMessage('Login successful!', 'success');
      clearModal();
    }
  });
}

signupBtn?.addEventListener('click', createSignupForm);
signinBtn?.addEventListener('click', createSigninForm);
logoutBtn?.addEventListener('click', () => {
  clearModal();
  showMessage('Logged out successfully', 'success');
});
