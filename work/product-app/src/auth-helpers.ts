// --- უნივერსალური ფუნქცია მოდალის დინამიურად ჩასაშენებლად ---
export function injectAuthModal(type: 'login' | 'register'): void {
    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) return;

    // რეჟიმის მიხედვით ცვლადების განსაზღვრა (კოდის გამეორების თავიდან ასაცილებლად)
    const isLogin = type === 'login';
    const title = isLogin ? 'Sign In' : 'Sign Up';
    const colorClass = isLogin ? 'blue' : 'green';

    modalRoot.innerHTML = `
    <div id="auth-container" class="fixed inset-0 bg-gray-950/50 flex items-center justify-center backdrop-blur-sm z-50">
      <div id="modal-content" class="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md transform transition-all scale-95 opacity-0 duration-300">
        <h2 class="text-2xl font-bold text-gray-800 text-center mb-6">${title}</h2>

        <div id="auth-error" class="hidden p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg border border-red-200 text-center font-medium"></div>

        <form id="auth-form" class="space-y-5">
          <div>
            <label class="block text-sm font-semibold text-gray-600 mb-1.5">Email</label>
            <input type="email" id="auth-email" required class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-${colorClass}-500 focus:border-transparent transition duration-150">
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-600 mb-1.5">Password</label>
            <input type="password" id="auth-password" required class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-${colorClass}-500 focus:border-transparent transition duration-150">
          </div>

          <div class="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100">
            <button type="button" id="auth-cancel" class="px-5 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-150 cursor-pointer">Cancel</button>
            <button type="submit" id="auth-submit" class="px-5 py-2 text-sm font-medium text-white bg-${colorClass}-600 hover:bg-${colorClass}-700 shadow-sm transition duration-150 cursor-pointer">Submit</button>
          </div>
        </form>
      </div>
    </div>
  `;

    // გამოჩენის ანიმაცია ჩაშენებისთანავე
    const content = document.getElementById('modal-content') as HTMLDivElement;
    setTimeout(() => {
        content.classList.remove('scale-95', 'opacity-0');
        content.classList.add('scale-100', 'opacity-100');
    }, 10);
}

// --- მოდალის სრულიად წაშლა DOM-იდან (დახურვა) ---
export function removeAuthModal(): void {
    const modalRoot = document.getElementById('modal-root');
    const content = document.getElementById('modal-content');

    if (modalRoot && content) {
        content.classList.remove('scale-100', 'opacity-100');
        content.classList.add('scale-95', 'opacity-0');
        // ველოდებით ანიმაციის დასრულებას და მერე ვშლით HTML-ს
        setTimeout(() => {
            modalRoot.innerHTML = '';
        }, 300);
    }
}

// --- შეცდომის ჩვენების ფუნქცია ---
export function showFieldError(message: string): void {
    const errorDiv = document.getElementById('auth-error') as HTMLDivElement;
    const emailInput = document.getElementById('auth-email') as HTMLInputElement;
    const passwordInput = document.getElementById('auth-password') as HTMLInputElement;

    if (errorDiv && emailInput && passwordInput) {
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
        emailInput.classList.add('border-red-500', 'bg-red-50');
        passwordInput.classList.add('border-red-500', 'bg-red-50');
    }
}