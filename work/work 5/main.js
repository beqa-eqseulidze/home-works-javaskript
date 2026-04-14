
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
// function createCard(extension) {
//     const cardHTML = `
//         <div class="info">
//             <img src="${extension.icon}" alt="${extension.name}">
//             <div class="about">
//                 <h3>${extension.name}</h3>
//                 <p>${extension.description}</p>
//             </div>
//         </div>
//         <div class="status">
//             <button class="remove-btn">Remove</button>
//             <label class="switch">
//                 <input type="checkbox" ${extension.enabled ? 'checked' : ''}>
//                 <span class="slider"></span>
//             </label>
//         </div>
//     `;

//     const card = document.createElement('div');
//     card.className = 'card';
//     card.innerHTML = cardHTML;
//     return card;
// }
// function renderCards(filter = 'all') {
//     // გავასუფთავოთ კონტეინერი
//     cardsContainer.innerHTML = '';

//     // გავფილტროთ extensions მასივი
//     let filteredExtensions = extensions;

//     if (filter === 'active') {
//         filteredExtensions = extensions.filter(ext => ext.enabled === true);
//     }
//     else if (filter === 'inactive') {
//         filteredExtensions = extensions.filter(ext => ext.enabled === false);
//     }
//     // 'all' შემთხვევაში არაფერს ვფილტრავთ

//     // ვქმნით და ვამატებთ კარტებს
//     filteredExtensions.forEach(extension => {
//         const card = createCard(extension);
//         cardsContainer.appendChild(card);
//     });
// }
// filterButtons.forEach(button => {
//     button.addEventListener('click', () => {

//         // ყველა ღილაკს ვაშორებთ "active" კლასს
//         filterButtons.forEach(btn => btn.classList.remove('active'));

//         // დაჭერილ ღილაკს ვამატებთ "active" კლასს
//         button.classList.add('active');

//         // ვიღებთ რომელი ღილაკია დაჭერილი (All, Active, Inactive)
//         const filterType = button.textContent.toLowerCase();

//         // ვრენდერებთ კარტებს შესაბამისი ფილტრით
//         renderCards(filterType);
//     });
// });

// // ==================== INITIAL RENDER ====================
// renderCards('all');   // გვერდის ჩატვირთვისას ყველა კარტი გამოჩნდეს
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
    const checkbox = card.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', () => {
        extensions[index].enabled = checkbox.checked;
        renderCards(getCurrentFilter());
    });
    // Remove ღილაკის მუშაობა
    const removeBtn = card.querySelector('.remove-btn');
    removeBtn.addEventListener('click', () => {
        if (confirm(`ნამდვილად გსურთ წაშლა "${extension.name}"?`)) {
            extensions.splice(index, 1);        // ამოშლა მასივიდან
            renderCards(getCurrentFilter());    // გადახატვა
        }
    });

    return card;
}
function getCurrentFilter() {
    const activeButton = document.querySelector('.buttons button.active');
    if (!activeButton) return 'all';
    return activeButton.textContent.toLowerCase();
}
function renderCards(filter = 'all') {
    cardsContainer.innerHTML = '';

    let filteredExtensions = extensions;

    if (filter === 'active') {
        filteredExtensions = extensions.filter(ext => ext.enabled === true);
    } else if (filter === 'inactive') {
        filteredExtensions = extensions.filter(ext => ext.enabled === false);
    }

    filteredExtensions.forEach((extension, originalIndex) => {
        // ვპოულობთ ორიგინალ ინდექსს extensions მასივში
        const realIndex = extensions.findIndex(ext => ext.name === extension.name);

        const card = createCard(extension, realIndex);
        cardsContainer.appendChild(card);
    });
}
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterType = button.textContent.toLowerCase();
        renderCards(filterType);
    });
});
renderCards('all');