// ბექენდის საბაზისო URL
const API_URL = 'http://localhost:3000';

// დამხმარე ფუნქცია DOM ელემენტების ID-ით მარტივად ასარჩევად
const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T | null;

// DOM ელემენტების ობიექტი კოდის სისუფთავისთვის
const els = {
  welcome: $('welcomeBox'),           // საწყისი მისალმების კონტეინერი
  signup: $('welcomeSignUp'),         // რეგისტრაციაზე გადასვლის ღილაკი
  signin: $('welcomeSignIn'),         // ავტორიზაციაზე გადასვლის ღილაკი
  wrapper: $('formWrapper'),         // ფორმების კონტეინერი
  back: $('backBtn'),                 // უკან დაბრუნების ღილაკი
  tabUp: $('tabSignUp'),             // რეგისტრაციის ტაბის ღილაკი
  tabIn: $('tabSignIn'),             // ავტორიზაციის ტაბის ღილაკი
  upCont: $('signUpFormContainer'),   // რეგისტრაციის ფორმის კონტეინერი
  inCont: $('signInFormContainer'),   // ავტორიზაციის ფორმის კონტეინერი
  upForm: $<HTMLFormElement>('signUpForm'), // რეგისტრაციის ფორმა
  inForm: $<HTMLFormElement>('signInForm'), // ავტორიზაციის ფორმა
  auth: $('authContainer'),           // ავტორიზაციის/რეგისტრაციის ბლოკი
  dash: $('dashboardView'),           // დეშბორდის ბლოკი
  logout: $('logoutBtn'),             // გამოსვლის ღილაკი
  email: $('userEmailDisplay'),       // იუზერის მეილის გამოსაჩენი ველი
  grid: $('productGrid'),             // პროდუქტების კონტეინერი (ბადე)
  add: $('addProductBtn'),           // პროდუქტის დამატების ღილაკი
  modal: $('productModal'),           // პროდუქტის მოდალური ფანჯარა
  card: $('modalCard'),               // მოდალური ფანჯრის ბარათი
  mForm: $<HTMLFormElement>('productForm'), // მოდალური ფანჯრის ფორმა
  mTitle: $('modalTitle'),           // მოდალის სათაური
  toast: $('statusToast'),             // Toast შეტყობინების ველი
  pId: $<HTMLInputElement>('productId'),         // პროდუქტის ID (რედაქტირებისთვის)
  pTitle: $<HTMLInputElement>('productTitle'),     // პროდუქტის სათაურის ინპუტი
  pDesc: $<HTMLTextAreaElement>('productDescription'), // პროდუქტის აღწერის ველი
  pPrice: $<HTMLInputElement>('productPrice'),     // პროდუქტის ფასის ინპუტი
  pImg: $<HTMLInputElement>('productImage'),       // პროდუქტის სურათის ინპუტი
  pCat: $<HTMLSelectElement>('productCategory')    // პროდუქტის კატეგორიის სელექტი
};

// კატეგორიების ლოკალური მასივი ქეშირებისთვის
let categories: { id: string | number; title: string }[] = [];

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

// ზოგადი დამხმარე ფუნქცია HTTP მოთხოვნებისთვის (GET, POST, PUT, DELETE)
async function api(path: string, method = 'GET', body?: any) {
  const token = localStorage.getItem('token');
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  
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

// ავტორიზაციის სტატუსის შემოწმების ფუნქცია
function checkAuth() {
  const token = localStorage.getItem('token');
  const emailVal = localStorage.getItem('userEmail');
  const isAuth = !!(token && emailVal);

  // შესაბამისი კონტეინერების ჩვენება/დამალვა
  els.auth?.classList.toggle('hidden', isAuth);
  els.dash?.classList.toggle('hidden', !isAuth);
  els.logout?.classList.toggle('hidden', !isAuth);
  els.email?.classList.toggle('hidden', !isAuth);

  if (isAuth && els.email) {
    els.email.textContent = emailVal;
    loadDashboard();
  } else {
    els.wrapper?.classList.add('hidden');
    els.welcome?.classList.remove('hidden');
  }
}

// ნავიგაციისა და ღილაკების მოვლენების მსმენელები
els.signup?.addEventListener('click', () => { els.welcome?.classList.add('hidden'); els.wrapper?.classList.remove('hidden'); switchTab(true); });
els.signin?.addEventListener('click', () => { els.welcome?.classList.add('hidden'); els.wrapper?.classList.remove('hidden'); switchTab(false); });
els.back?.addEventListener('click', () => { els.wrapper?.classList.add('hidden'); els.welcome?.classList.remove('hidden'); });
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

// სისტემიდან გამოსვლა
els.logout?.addEventListener('click', () => {
  localStorage.clear();
  showToast('ℹ️ თქვენ გამოხვედით სისტემიდან', 'success');
  checkAuth();
});

// პროდუქტების დეშბორდის ჩატვირთვა
async function loadDashboard() {
  // კატეგორიების ჩატვირთვა და სელექტში დამატება
  const cats = await api('/categories');
  if (cats) {
    categories = cats;
    if (els.pCat) {
      els.pCat.innerHTML = categories.map(c => `<option value="${c.id}">${c.title}</option>`).join('');
    }
  }
  
  if (els.grid) els.grid.innerHTML = '<p class="text-center text-slate-500 col-span-full">იტვირთება...</p>';
  
  // პროდუქტების ჩატვირთვა და HTML-ის გენერირება
  const prods = await api('/products');
  if (prods && els.grid) {
    els.grid.innerHTML = prods.length ? prods.map((p: any) => {
      const cat = categories.find(c => c.id.toString() === p.category?.toString())?.title || 'სხვა';
      const img = p.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500';
      return `
        <div class="bg-white rounded-2xl border border-slate-200/80 hover:border-indigo-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group">
          <div class="h-44 bg-slate-100 flex items-center justify-center relative overflow-hidden">
            <img class="max-w-full max-h-full object-cover group-hover:scale-105 transition duration-300" src="${img}" alt="${p.title}">
            <span class="absolute top-3 left-3 bg-slate-900/75 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm">${cat}</span>
          </div>
          <div class="p-4 flex flex-col flex-grow">
            <h4 class="text-base font-bold text-slate-800 mb-1 line-clamp-1">${p.title}</h4>
            <p class="text-xs text-slate-500 mb-4 flex-grow line-clamp-2">${p.description}</p>
            <div class="flex justify-between items-center pt-3 border-t border-slate-100">
              <span class="text-lg font-black text-indigo-600">$${Number(p.price).toFixed(2)}</span>
              <div class="flex gap-2">
                <button class="px-2.5 py-1.5 text-xs font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-lg transition edit-btn cursor-pointer" data-id="${p.id}">რედაქტირება</button>
                <button class="px-2.5 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition delete-btn cursor-pointer" data-id="${p.id}">წაშლა</button>
              </div>
            </div>
          </div>
        </div>`;
    }).join('') : '<p class="text-center text-slate-500 col-span-full">პროდუქტები არ არის.</p>';
    
    // რედაქტირების და წაშლის ღილაკების მოვლენების მიბმა
    prods.forEach((p: any, idx: number) => {
      const cardEl = els.grid?.children[idx];
      cardEl?.querySelector('.edit-btn')?.addEventListener('click', () => openModal(p));
      cardEl?.querySelector('.delete-btn')?.addEventListener('click', async () => {
        if (confirm('ნამდვილად გსურთ წაშლა?') && await api(`/products/${p.id}`, 'DELETE')) {
          showToast('✅ წაიშალა!', 'success');
          loadDashboard();
        }
      });
    });
  }
}

// მოდალური ფანჯრის გახსნის ფუნქცია
function openModal(p?: any) {
  if (els.mTitle) els.mTitle.textContent = p ? 'პროდუქტის რედაქტირება' : 'ახალი პროდუქტი';
  if (els.pId) els.pId.value = p?.id || '';
  if (els.pTitle) els.pTitle.value = p?.title || '';
  if (els.pDesc) els.pDesc.value = p?.description || '';
  if (els.pPrice) els.pPrice.value = p?.price ? p.price.toString() : '';
  if (els.pImg) els.pImg.value = p?.image || '';
  if (els.pCat) els.pCat.value = p?.category ? p.category.toString() : categories[0]?.id.toString() || '';

  // მოდალის გამოჩენა ანიმაციით
  els.modal?.classList.remove('opacity-0', 'pointer-events-none');
  els.modal?.classList.add('opacity-100', 'pointer-events-auto');
  els.card?.classList.remove('scale-95');
  els.card?.classList.add('scale-100');
}

// მოდალური ფანჯრის დახურვის ფუნქცია
function closeModal() {
  els.modal?.classList.remove('opacity-100', 'pointer-events-auto');
  els.modal?.classList.add('opacity-0', 'pointer-events-none');
  els.card?.classList.remove('scale-100');
  els.card?.classList.add('scale-95');
}

// მოდალის კონტროლის ღილაკების მოვლენები
els.add?.addEventListener('click', () => openModal());
$('modalCloseBtn')?.addEventListener('click', closeModal);
$('modalCancelBtn')?.addEventListener('click', closeModal);

// პროდუქტის ფორმის გაგზავნა (დამატება / განახლება)
els.mForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = els.pId?.value;
  const data = {
    title: els.pTitle?.value, description: els.pDesc?.value,
    price: parseFloat(els.pPrice?.value || '0'), image: els.pImg?.value,
    category: els.pCat?.value
  };
  
  // PUT მოთხოვნა განახლებისთვის, POST - ახლის დამატებისთვის
  const res = id ? await api(`/products/${id}`, 'PUT', data) : await api('/products', 'POST', data);
  if (res) {
    showToast(id ? '✅ პროდუქტი განახლდა!' : '✅ პროდუქტი დაემატა!', 'success');
    closeModal();
    loadDashboard();
  }
});

// საწყისი შემოწმება გვერდის ჩატვირთვისას
checkAuth();