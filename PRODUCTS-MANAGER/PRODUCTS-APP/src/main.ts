import type { IsignUp } from "./models/interfaces";
import type { HTTPMethods, successType } from "./models/types";

// ბექენდის საბაზისო URL
const API_URL = 'http://localhost:3000';

// დამხმარე ფუნქცია DOM ელემენტების ID-ით მარტივად ასარჩევად
// const getDomElement = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T | null;
const getDomElement = (id: string) => document.getElementById(id);

// DOM ელემენტების ობიექტი კოდის სისუფთავისთვის
const els = {
  welcome: getDomElement('welcomeBox'),                         // საწყისი მისალმების კონტეინერი
  signup: getDomElement('welcomeSignUp'),                       // რეგისტრაციაზე გადასვლის ღილაკი
  signin: getDomElement('welcomeSignIn'),                       // ავტორიზაციაზე გადასვლის ღილაკი
  wrapper: getDomElement('formWrapper'),                        // ფორმების კონტეინერი
  back: getDomElement('backBtn'),                               // უკან დაბრუნების ღილაკი
  tabUp: getDomElement('tabSignUp'),                            // რეგისტრაციის ტაბის ღილაკი
  tabIn: getDomElement('tabSignIn'),                            // ავტორიზაციის ტაბის ღილაკი
  upCont: getDomElement('signUpFormContainer'),                 // რეგისტრაციის ფორმის კონტეინერი
  inCont: getDomElement('signInFormContainer'),                 // ავტორიზაციის ფორმის კონტეინერი
  upForm: getDomElement('signUpForm'),                          // რეგისტრაციის ფორმა
  inForm: getDomElement('signInForm'),                          // ავტორიზაციის ფორმა
  toast: getDomElement('statusToast'),                          // Toast შეტყობინების ველი
};

// დინამიკური Toast შეტყობინების ჩვენების ფუნქცია (მხოლოდ Tailwind CSS-ით)
function showToast(msg: string, type: successType ) {
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
async function api(path: string, method: HTTPMethods = 'POST', body?: IsignUp) {
  const headers = { 'Content-Type': 'application/json' };

  // შეცდომების ქართული თარგმანების რუკა
  const errorMap = {
    'Email_already_exists': 'ეს ელ.ფოსტა უკვე რეგისტრირებულია!',
    'Password is too short': 'პაროლი ძალიან მოკლეა (მინ. 4 სიმბოლო)!',
    'Email format is invalid': 'ელ.ფოსტის ფორმატი არასწორია!',
    'Incorrect password': 'პაროლი არასწორია!',
    'Cannot find user': 'მომხმარებელი ვერ მოიძებნა!'
  };

  try {
    const res = await fetch(`${API_URL}${path}`, { method, headers, body: body ? JSON.stringify(body) : undefined });
    if (!res.ok) {
      let rawErr : string ;
      const contentType = res.headers.get('content-type') || '';

      // JSON ან ტექსტური შეცდომის წაკითხვა სერვერიდან
      if (contentType.includes('application/json')) {
        const errData = await res.json();
        rawErr = errData.error || errData.message || 1;
      } else {
        rawErr = await res.text();
      }
new RegExp('').test()
      // შეცდომის დამუშავება და ქართულად გამოტანა
      if (rawErr) {    
        const cleanErr  = rawErr.trim().replace(/^["']|["']$/g, '').trim() as keyof typeof errorMap;
        const mappedMsg = errorMap[cleanErr] || cleanErr;
        showToast(`❌ ${mappedMsg}`, 'danger');
        return null;
      }
      throw new Error();
    } 
      const per={
        age:25
      }
      let key: keyof typeof per = "age";
      console.log(per[key])
  
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
