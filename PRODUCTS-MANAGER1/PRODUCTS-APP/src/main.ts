// ============================================
// types.ts-დან ვშემოიტანთ Isignup ტიპს
// ეს ტიპი გვეუბნება რომ type პარამეტრი მხოლოდ 'success' ან 'danger' იქნება
// ============================================
import type { Isignup } from './types';

// ============================================
// სერვერის მისამართი
// ყველა API მოთხოვნა ამ მისამართზე გაიგზავნება
// ============================================
const baseUrl = 'http://localhost:3000';

// ============================================
// DOM ელემენტების არჩევა
// HTML-იდან ვარჩევთ ღილაკებსა და კონტეინერებს ID-ით
// ============================================
const signinBtn = document.getElementById('signin');     // Sign in ღილაკი (ლურჯი)
const signupBtn = document.getElementById('signup');     // Sign up ღილაკი (მწვანე)
const logoutBtn = document.getElementById('logout');     // Log out ღილაკი (წითელი)
const modalRoot = document.getElementById('modal-root'); // მოდალის კონტეინერი, სადაც ფორმები ჩაიტვირთება
const toast = document.getElementById('statusToast');    // შეტყობინებების ველი (success/error)

// ============================================
// showMessage ფუნქცია - შეტყობინების ჩვენება
// მიიღებს მესიჯს და ტიპს (success ან danger)
// 3 წამის შემდეგ ავტომატურად ქრება
// ============================================
function showMessage(message: string, type: Isignup) {
  // თუ toast ელემენტი არ არსებობს, ფუნქცია მუშაობას წყვეტს
  if (!toast) return;

  // ტექსტის დაყენება toast-ში
  toast.textContent = message;

  // სტილების განულება და საბაზისო სტილების დაყენება
  toast.className = 'fixed top-6 right-6 z-50 p-4 rounded-xl shadow-xl font-semibold transition-all duration-300';

  // ტიპის მიხედვით ფონის ფერის არჩევა
  if (type === 'success') {
    toast.classList.add('bg-emerald-50', 'text-emerald-800'); // მწვანე ფონი, მწვანე ტექსტი
  } else {
    toast.classList.add('bg-rose-50', 'text-rose-800'); // წითელი ფონი, წითელი ტექსტი
  }

  // toast-ის გამოჩენა (hidden კლასის წაშლა)
  toast.classList.remove('hidden');

  // 3 წამის შემდეგ toast-ის დამალვა
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3000);
}

// ============================================
// api ფუნქცია - სერვერთან კავშირი
// მიიღებს path-ს (მაგ. '/signup') და body-ს (მონაცემები)
// აგზავნის POST მოთხოვნას სერვერზე და აბრუნებს პასუხს
// ============================================
async function api(path: string, body: object) {

  try {
    // fetch-ით მოთხოვნის გაგზავნა
    const res = await fetch(`${baseUrl}${path}`, {
      method: 'POST', // POST მეთოდი (მონაცემების გაგზავნა)
      headers: { 'Content-Type': 'application/json' }, // ვეუბნებით სერვერს რომ JSON-ს ვაგზავნით
      body: JSON.stringify(body), // ობიექტს ვაქცევთ JSON სტრიქონად
    });

    // სერვერის პასუხის წაკითხვა JSON-ის სახით
    const data = await res.json();

    // თუ პასუხი წარმატებული არ არის (status 400-500-ის დიაპაზონში)
    if (!res.ok) {
      // შეცდომის ჩვენება (თუ სერვერმა შეცდომა გამოგზავნა, მისი, თორემ საერთო)
      showMessage(data.error || 'Error occurred', 'danger');
      return null; // null-ის დაბრუნება ნიშნავს რომ მოთხოვნა წარუმატებელი იყო
    }

    // წარმატებული პასუხის დაბრუნება
    return data;
  } catch {
    // თუ სერვერთან კავშირი ვერ დამყარდა (ინტერნეტი არ არის, სერვერი გამორთულია)
    showMessage('Server connection failed', 'danger');
    return null;
  }
}

// ============================================
// clearModal ფუნქცია - მოდალის გასუფთავება
// შლის ყველაფერს modalRoot-დან (ფორმებს, ტექსტს და ა.შ.)
// ============================================
function clearModal() {
  if (modalRoot) {
    modalRoot.innerHTML = ''; // ცარიელ სტრიქონად ვაქცევთ
  }
}

// ============================================
// createSignupForm ფუნქცია - Sign up ფორმის შექმნა
// დინამიურად ქმნის რეგისტრაციის ფორმას და ამატებს მოდალში
// ============================================
function createSignupForm() {
  clearModal(); // ჯერ მოდალი გავასუფთაოთ

  // ახალი div ელემენტის შექმნა
  const form = document.createElement('div');

  // Tailwind CSS კლასების დაყენება (თეთრი ფონი, მრგვალი კუთხეები, ჩრდილი)
  form.className = 'bg-white p-8 rounded-2xl shadow-xl w-full max-w-md';

  // ფორმის HTML-ის ჩასმა (template literal)
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

  // მზა ფორმის მოდალში ჩასმა
  modalRoot?.appendChild(form);

  // ფორმის გაგზავნის მოსმენა (submit event)
  document.getElementById('signupForm')?.addEventListener('submit', async (e) => {
    e.preventDefault(); // გვერდის განახლების გაუქმება (სტანდარტული ფორმის ქცევა)

    // input-ებიდან მნიშვნელობების წაკითხვა
    const email = (document.getElementById('upEmail') as HTMLInputElement).value;
    const password = (document.getElementById('upPassword') as HTMLInputElement).value;

    // API-ზე signup მოთხოვნის გაგზავნა
    const res = await api('/signup', { email, password });

    // თუ პასუხი წარმატებულია
    if (res) {
      showMessage('User registered successfully!', 'success'); // წარმატების მესიჯი
      clearModal(); // ფორმის დახურვა
    }
  });
}

// ============================================
// createSigninForm ფუნქცია - Sign in ფორმის შექმნა
// დინამიურად ქმნის შესვლის ფორმას და ამატებს მოდალში
// ============================================
function createSigninForm() {
  clearModal(); // ჯერ მოდალი გავასუფთაოთ

  // ახალი div ელემენტის შექმნა
  const form = document.createElement('div');

  // Tailwind CSS კლასების დაყენება
  form.className = 'bg-white p-8 rounded-2xl shadow-xl w-full max-w-md';

  // ფორმის HTML-ის ჩასმა
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

  // მზა ფორმის მოდალში ჩასმა
  modalRoot?.appendChild(form);

  // ფორმის გაგზავნის მოსმენა
  document.getElementById('signinForm')?.addEventListener('submit', async (e) => {
    e.preventDefault(); // გვერდის განახლების გაუქმება

    // input-ებიდან მნიშვნელობების წაკითხვა
    const email = (document.getElementById('inEmail') as HTMLInputElement).value;
    const password = (document.getElementById('inPassword') as HTMLInputElement).value;

    // API-ზე login მოთხოვნის გაგზავნა
    const res = await api('/login', { email, password });

    // თუ პასუხი წარმატებულია
    if (res) {
      showMessage('Login successful!', 'success'); // წარმატების მესიჯი
      clearModal(); // ფორმის დახურვა
    }
  });
}

// ============================================
// ღილაკების მოსმენა (Event Listeners)
// თითოეულ ღილაკზე დაჭერისას შესაბამისი ფუნქცია გაეშვება
// ============================================
signupBtn?.addEventListener('click', createSignupForm);  // Sign up ღილაკი → რეგისტრაციის ფორმა
signinBtn?.addEventListener('click', createSigninForm);  // Sign in ღილაკი → შესვლის ფორმა
logoutBtn?.addEventListener('click', () => {
  clearModal(); // მოდალის გასუფთავება
  showMessage('Logged out successfully', 'success'); // წარმატების მესიჯი
});
