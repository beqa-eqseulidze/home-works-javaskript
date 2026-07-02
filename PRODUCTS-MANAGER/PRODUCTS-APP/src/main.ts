// ბექენდის საბაზისო URL
const API_URL = 'http://localhost:3000';

// დამხმარე ფუნქცია DOM ელემენტების ID-ით მარტივად ასარჩევად
const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T | null;

// DOM ელემენტების ობიექტი კოდის სისუფთავისთვის
const els = {
  welcome: $('welcomeBox'),                         // საწყისი მისალმების კონტეინერი
  signup: $('welcomeSignUp'),                       // რეგისტრაციაზე გადასვლის ღილაკი
  signin: $('welcomeSignIn'),                       // ავტორიზაციაზე გადასვლის ღილაკი
  wrapper: $('formWrapper'),                        // ფორმების კონტეინერი
  back: $('backBtn'),                               // უკან დაბრუნების ღილაკი
  tabUp: $('tabSignUp'),                            // რეგისტრაციის ტაბის ღილაკი
  tabIn: $('tabSignIn'),                            // ავტორიზაციის ტაბის ღილაკი
  upCont: $('signUpFormContainer'),                 // რეგისტრაციის ფორმის კონტეინერი
  inCont: $('signInFormContainer'),                 // ავტორიზაციის ფორმის კონტეინერი
  upForm: $<HTMLFormElement>('signUpForm'),          // რეგისტრაციის ფორმა
  inForm: $<HTMLFormElement>('signInForm'),          // ავტორიზაციის ფორმა
  toast: $('statusToast'),                          // Toast შეტყობინების ველი
};

// დინამიკური Toast შეტყობინების ჩვენების ფუნქცია (მხოლოდ Tailwind CSS-ით)
function showToast(msg: string, type: 'success' | 'danger') {
  if (!els.toast) return;
  els.toast.textContent = msg;

  // Toast-ის საბაზისო კლასები
  els.toast.className = 'fixed top-6 right-6 z-50 p-4 rounded-xl shadow-xl font-semibold flex items-center gap-3 transition-all duration-300 transform translate-y-0 opacity-100';

  // წარმატების ან შეცდომის სტილების მინიჭება
  if (type === 'success') {
    els.toast.classList.add('bg-emerald-50', 'text-emerald-800', 'border-l-4', 'border-emerald-500', 'border-y', 'border-r', 'border-emerald-200');
  } else {
    els.toast.classList.add('bg-rose-50', 'text-rose-800', 'border-l-4', 'border-rose-500', 'border-y', 'border-r', 'border-rose-200');
  }

  els.toast.classList.remove('hidden', '-translate-y-6', 'opacity-0');

  // 3 წამში გაქრობის ტაიმერი
  setTimeout(() => {
    els.toast?.classList.add('-translate-y-6', 'opacity-0');
    els.toast?.classList.remove('translate-y-0', 'opacity-100');
    setTimeout(() => els.toast?.classList.add('hidden'), 300);
  }, 3000);
}

// ზოგადი დამხმარე ფუნქცია HTTP მოთხოვნებისთვის (POST)
async function api(path: string, method = 'GET', body?: any) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };

  // შეცდომების ქართული თარგმანების რუკა
  const errorMap: Record<string, string> = {
    'Email already exists': 'ეს ელ.ფოსტა უკვე რეგისტრირებულია!',
    'Password is too short': 'პაროლი ძალიან მოკლეა (მინ. 4 სიმბოლო)!',
    'Email format is invalid': 'ელ.ფოსტის ფორმატი არასწორია!',
    'Incorrect password': 'პაროლი არასწორია!',
    'Cannot find user': 'მომხმარებელი ვერ მოიძებნა!'
  };

  try {
    const res = await fetch(`${API_URL}${path}`, { method, headers, body: body ? JSON.stringify(body) : undefined });
    if (!res.ok) {
      let rawErr = '';
      const contentType = res.headers.get('content-type') || '';

      // JSON ან ტექსტური შეცდომის წაკითხვა სერვერიდან
      if (contentType.includes('application/json')) {
        const errData = await res.json();
        rawErr = errData.error || errData.message || '';
      } else {
        rawErr = await res.text();
      }

      // შეცდომის დამუშავება და ქართულად გამოტანა
      if (rawErr) {
        const cleanErr = rawErr.replace(/^["']|["']$/g, '').trim();
        const mappedMsg = errorMap[cleanErr] || cleanErr;
        showToast(`❌ ${mappedMsg}`, 'danger');
        return null;
      }
      throw new Error();
    }
    return res.headers.get('content-type')?.includes('application/json') ? await res.json() : true;
  } catch {
    showToast('❌ სერვერთან კავშირი ან მოთხოვნა ვერ განხორციელდა.', 'danger');
    return null;
  }
}

// ტაბების გადართვის ფუნქცია (Sign Up / Sign In)
function switchTab(showUp: boolean) {
  els.upCont?.classList.toggle('hidden', !showUp);
  els.inCont?.classList.toggle('hidden', showUp);

  // ტაბების ვიზუალური აქტიურობის მართვა Tailwind კლასებით
  els.tabUp?.classList.toggle('text-indigo-600', showUp);
  els.tabUp?.classList.toggle('border-indigo-600', showUp);
  els.tabUp?.classList.toggle('text-slate-400', !showUp);
  els.tabUp?.classList.toggle('border-transparent', !showUp);

  els.tabIn?.classList.toggle('text-indigo-600', !showUp);
  els.tabIn?.classList.toggle('border-indigo-600', !showUp);
  els.tabIn?.classList.toggle('text-slate-400', showUp);
  els.tabIn?.classList.toggle('border-transparent', showUp);
}

// ნავიგაციისა და ღილაკების მოვლენების მსმენელები
els.signup?.addEventListener('click', () => {
  // მისალმების ეკრანის დამალვა, ფორმის ჩვენება და Sign Up ტაბის გააქტიურება
  els.welcome?.classList.add('hidden');
  els.wrapper?.classList.remove('hidden');
  switchTab(true);
});

els.signin?.addEventListener('click', () => {
  // მისალმების ეკრანის დამალვა, ფორმის ჩვენება და Sign In ტაბის გააქტიურება
  els.welcome?.classList.add('hidden');
  els.wrapper?.classList.remove('hidden');
  switchTab(false);
});

els.back?.addEventListener('click', () => {
  // ფორმის დამალვა და მისალმების ეკრანზე დაბრუნება
  els.wrapper?.classList.add('hidden');
  els.welcome?.classList.remove('hidden');
});

els.tabUp?.addEventListener('click', () => switchTab(true));
els.tabIn?.addEventListener('click', () => switchTab(false));

// რეგისტრაციის ფორმის გაგზავნა
els.upForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = ($('upEmail') as HTMLInputElement).value;
  const password = ($('upPassword') as HTMLInputElement).value;
  const res = await api('/signup', 'POST', { email, password });
  if (res) {
    showToast('✅ მომხმარებელი წარმატებით დარეგისტრირდა!', 'success');
    els.upForm?.reset();
  }
});

// ავტორიზაციის ფორმის გაგზავნა
els.inForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = ($('inEmail') as HTMLInputElement).value;
  const password = ($('inPassword') as HTMLInputElement).value;
  const res = await api('/login', 'POST', { email, password });
  if (res) {
    showToast('✅ მომხმარებელი წარმატებით დალოგინდა!', 'success');
    els.inForm?.reset();
  }
});
