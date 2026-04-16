let extensions = [
    {
        name: "DevLens",
        description: "Quickly inspect page layouts and visualize element boundaries.",
        enabled: true,
        icon: "./images/logo-devlens.svg",
        url: "https://example.com/devlens"
    },
    {
        name: "StyleSpy",
        description: "Instantly analyze and copy CSS from any webpage element.",
        enabled: true,
        icon: "./images/logo-style-spy.svg",
        url: "https://example.com/stylespy"
    },
    {
        name: "SpeedBoost",
        description: "Optimizes browser resource usage to accelerate page loading.",
        enabled: false,
        icon: "./images/logo-speed-boost.svg",
        url: "https://example.com/speedboost"
    },
    {
        name: "JSONWizard",
        description: "Formats, validates, and prettifies JSON responses in-browser.",
        enabled: true,
        icon: "./images/logo-json-wizard.svg",
        url: "https://example.com/jsonwizard"
    },
    {
        name: "TabMaster Pro",
        description: "Organizes browser tabs into groups and sessions.",
        enabled: true,
        icon: "./images/logo-tab-master-pro.svg",
        url: "https://example.com/tabmaster"
    },
    {
        name: "ViewportBuddy",
        description: "Simulates various screen resolutions directly within the browser.",
        enabled: false,
        icon: "./images/logo-viewport-buddy.svg",
        url: "https://example.com/viewportbuddy"
    },
    {
        name: "Markup Notes",
        description: "Enables annotation and notes directly onto webpages for collaborative debugging.",
        enabled: true,
        icon: "./images/logo-markup-notes.svg",
        url: "https://example.com/markupnotes"
    },
    {
        name: "GridGuides",
        description: "Overlay customizable grids and alignment guides on any webpage.",
        enabled: false,
        icon: "./images/logo-grid-guides.svg",
        url: "https://example.com/gridguides"
    },
    {
        name: "Palette Picker",
        description: "Instantly extracts color palettes from any webpage.",
        enabled: true,
        icon: "./images/logo-palette-picker.svg",
        url: "https://example.com/palettepicker"
    },
    {
        name: "LinkChecker",
        description: "Scans and highlights broken links on any page.",
        enabled: true,
        icon: "./images/logo-link-checker.svg",
        url: "https://example.com/linkchecker"
    },
    {
        name: "DOM Snapshot",
        description: "Capture and export DOM structures quickly.",
        enabled: false,
        icon: "./images/logo-dom-snapshot.svg",
        url: "https://example.com/domsnapshot"
    },
    {
        name: "ConsolePlus",
        description: "Enhanced developer console with advanced filtering and logging.",
        enabled: true,
        icon: "./images/logo-console-plus.svg",
        url: "https://example.com/consoleplus"
    }
];

const cardsContainer = document.querySelector('.cards');
const filterButtons = document.querySelectorAll('.buttons button');
const searchInput = document.getElementById('searchInput');
const logoSearchContainer = document.querySelector('.logo-search-container');

let currentSearchTerm = '';

// Card-ის შექმნა
function createCard(extension, index) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <div class="info">
            <img src="${extension.icon}" alt="${extension.name}">
            <div class="about">
                <h3>${extension.name}</h3>
                <p>${extension.description}</p>
            </div>
        </div>
        <div class="status">
            <button class="remove-btn" data-index="${index}">Remove</button>
            <label class="switch">
                <input type="checkbox" ${extension.enabled ? 'checked' : ''} data-index="${index}">
                <span class="slider"></span>
            </label>
        </div>
    `;
    // Toggle enabled
    const checkbox = card.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', () => {
        extensions[index].enabled = checkbox.checked;
        renderCards(getCurrentFilter(), currentSearchTerm);
    });
    // Remove button
    const removeBtn = card.querySelector('.remove-btn');
    removeBtn.addEventListener('click', () => {
        if (confirm(`ნამდვილად გსურთ წაშლა "${extension.name}"?`)) {
            extensions.splice(index, 1);
            renderCards(getCurrentFilter(), currentSearchTerm);
        }
    });

    return card;
}

// gettinh Current Filter
function getCurrentFilter() {
    const activeButton = document.querySelector('.buttons button.active');
    if (!activeButton) return 'all';
    return activeButton.textContent.toLowerCase();
}
//render function both filter + searc bar
function renderCards(filter = 'all', searchTerm = '') {
    cardsContainer.innerHTML = '';
    let filteredExtensions = extensions;

    // Status filter (Active / Inactive)
    if (filter === 'active') {
        filteredExtensions = filteredExtensions.filter(ext => ext.enabled === true);
    } else if (filter === 'inactive') {
        filteredExtensions = filteredExtensions.filter(ext => ext.enabled === false);
    }

    // Search filter (name + description)
    if (searchTerm.trim() !== '') {
        const term = searchTerm.toLowerCase().trim();
        filteredExtensions = filteredExtensions.filter(ext => 
            ext.name.toLowerCase().includes(term) || 
            ext.description.toLowerCase().includes(term)
        );
    }

    filteredExtensions.forEach((extension) => {
        const realIndex = extensions.findIndex(ext => ext.name === extension.name);
        const card = createCard(extension, realIndex);
        cardsContainer.appendChild(card);
    });
}

// Search input events
searchInput.addEventListener('focus', () => {
    logoSearchContainer.classList.add('search-active');
});

searchInput.addEventListener('blur', () => {
    if (searchInput.value.trim() === '') {
        logoSearchContainer.classList.remove('search-active');
    }
});

searchInput.addEventListener('input', () => {
    currentSearchTerm = searchInput.value;
    renderCards(getCurrentFilter(), currentSearchTerm);
});

// Filter buttons
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        renderCards(button.textContent.toLowerCase(), currentSearchTerm);
    });
});

// გაშვება
renderCards('all', '');

// THEME TOGGLE
const themeBtn = document.getElementById('theme-btn');
const themeIcon = document.getElementById('theme-icon');
function toggleTheme() {
    document.body.classList.toggle('light-mode');

    if (document.body.classList.contains('light-mode')) {
        themeIcon.src = './images/icon-moon.svg';
        themeIcon.alt = 'Switch to Dark Mode';
    } else {
        themeIcon.src = './images/icon-sun.svg';
        themeIcon.alt = 'Switch to Light Mode';
    }

    // შენახვა (გვერდის გადატვირთვისას თემა არ დაიკარგოს)
    localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
}

themeBtn.addEventListener('click', toggleTheme);

// თემის აღდგენა გვერდის ჩატვირთვისას
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeIcon.src = './images/icon-moon.svg';
        themeIcon.alt = 'Switch to Dark Mode';
    }
}
// გამოძახება
loadSavedTheme();