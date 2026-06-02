document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('ticket-form');
    const formSection = document.getElementById('form-section');
    const ticketSection = document.getElementById('ticket-section');

    const fullNameInput = document.getElementById('full-name');
    const emailInput = document.getElementById('email');
    const githubInput = document.getElementById('github');
    const avatarInput = document.getElementById('avatar-input');

    const dropZone = document.getElementById('drop-zone');
    const uploadIconContainer = document.getElementById('upload-icon-container');
    const previewContainer = document.getElementById('preview-container');
    const avatarPreview = document.getElementById('avatar-preview');
    const removeImgBtn = document.getElementById('remove-img-btn');
    const changeImgBtn = document.getElementById('change-img-btn');
    const uploadText = document.getElementById('upload-text');
    const avatarHint = document.getElementById('avatar-hint');

    const displayName = document.getElementById('display-name');
    const displayEmail = document.getElementById('display-email');
    const ticketName = document.getElementById('ticket-name');
    const ticketGithub = document.getElementById('ticket-github');
    const ticketAvatar = document.getElementById('ticket-avatar');
    const ticketNumber = document.getElementById('ticket-number');

    let uploadedFile = null;

    // --- Avatar Upload Logic ---

    const handleFile = (file) => {
        if (!file) return;

        // Check format
        if (!['image/jpeg', 'image/png'].includes(file.type)) {
            showAvatarError("File format must be JPG or PNG.");
            return;
        }

        // Check size (500KB = 500 * 1024 bytes)
        if (file.size > 500 * 1024) {
            showAvatarError("File size exceeds 500KB.");
            return;
        }

        clearAvatarError();
        uploadedFile = file;

        const reader = new FileReader();
        reader.onload = (e) => {
            avatarPreview.src = e.target.result;
            showPreview();
        };
        reader.readAsDataURL(file);
    };

    const showAvatarError = (msg) => {
        avatarHint.innerHTML = `<img src="./assets/images/icon-info.svg" alt="Info" class="w-4 h-4 filter invert-[24%] sepia-[86%] saturate-[2808%] hue-rotate-[347deg] brightness-[98%] contrast-[92%]" /> <span class="text-orange-500">${msg}</span>`;
        avatarHint.classList.add('text-orange-500');
    };

    const clearAvatarError = () => {
        avatarHint.innerHTML = `<img src="./assets/images/icon-info.svg" alt="Info" class="w-4 h-4" /> <span>Upload your photo (JPG or PNG, max size: 500KB).</span>`;
        avatarHint.classList.remove('text-orange-500');
    };

    const showPreview = () => {
        uploadIconContainer.classList.add('hidden');
        uploadText.classList.add('hidden');
        previewContainer.classList.remove('hidden');
    };

    const hidePreview = () => {
        uploadIconContainer.classList.remove('hidden');
        uploadText.classList.remove('hidden');
        previewContainer.classList.add('hidden');
        uploadedFile = null;
        avatarInput.value = '';
        avatarPreview.src = '';
    };

    // Click to upload
    dropZone.addEventListener('click', (e) => {
        if (e.target !== removeImgBtn && e.target !== changeImgBtn) {
            avatarInput.click();
        }
    });

    avatarInput.addEventListener('change', (e) => {
        handleFile(e.target.files[0]);
    });

    // Drag and drop
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('border-orange-500');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('border-orange-500');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('border-orange-500');
        if (e.dataTransfer.files.length) {
            handleFile(e.dataTransfer.files[0]);
        }
    });

    // Button actions
    removeImgBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        hidePreview();
    });

    changeImgBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        avatarInput.click();
    });

    // --- Form Validation and Submission ---

    const showError = (input, errorId, show) => {
        const errorEl = document.getElementById(errorId);
        if (show) {
            input.classList.add('border-orange-500');
            input.classList.remove('border-neutral-500', 'focus:ring-neutral-0', 'focus:border-neutral-0');
            errorEl.classList.remove('hidden');
        } else {
            input.classList.remove('border-orange-500');
            input.classList.add('border-neutral-500', 'focus:ring-neutral-0', 'focus:border-neutral-0');
            errorEl.classList.add('hidden');
        }
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;

        // Validate Avatar
        if (!uploadedFile) {
            showAvatarError("Please upload an avatar.");
            isValid = false;
        } else {
            clearAvatarError();
        }

        // Validate Full Name
        if (!fullNameInput.value.trim()) {
            showError(fullNameInput, 'name-error', true);
            isValid = false;
        } else {
            showError(fullNameInput, 'name-error', false);
        }

        // Validate Email
        if (!emailInput.value.trim() || !validateEmail(emailInput.value)) {
            showError(emailInput, 'email-error', true);
            isValid = false;
        } else {
            showError(emailInput, 'email-error', false);
        }

        // Validate GitHub
        if (!githubInput.value.trim() || !githubInput.value.startsWith('@')) {
            showError(githubInput, 'github-error', true);
            isValid = false;
        } else {
            showError(githubInput, 'github-error', false);
        }

        if (isValid) {
            generateTicket();
        }
    });

    const generateTicket = () => {
        // Populate data
        displayName.textContent = fullNameInput.value.trim();
        displayEmail.textContent = emailInput.value.trim();
        ticketName.textContent = fullNameInput.value.trim();
        ticketGithub.textContent = githubInput.value.trim();
        
        // Random ticket number
        const randomNum = Math.floor(Math.random() * 90000) + 10000;
        ticketNumber.textContent = randomNum;

        // Avatar
        if (uploadedFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                ticketAvatar.src = e.target.result;
            };
            reader.readAsDataURL(uploadedFile);
        }

        // Switch screens with fade
        formSection.classList.add('opacity-0');
        setTimeout(() => {
            formSection.classList.add('hidden');
            ticketSection.classList.remove('hidden');
            // Small delay to allow display block before opacity transition
            setTimeout(() => {
                ticketSection.classList.remove('opacity-0');
            }, 50);
        }, 500);
    };
});
<<<<<<< HEAD



=======
>>>>>>> 2d57b2f2a04f428b9705b88ccc5654105de1db74
