// main.js

const extensions = [
  {
    name: "DevLens",
    description: "Quickly inspect page layouts and visualize element boundaries.",
    enabled: true,
    src: "assets/images/logo-devlens.svg",
  },
  {
    name: "StyleSpy",
    description: "Instantly analyze and copy CSS from any webpage element.",
    enabled: true,
    src: "assets/images/logo-style-spy.svg",
  },
  {
    name: "SpeedBoost",
    description: "Optimizes browser resource usage to accelerate page loading.",
    enabled: false,
    src: "assets/images/logo-speed-boost.svg",
  },
  {
    name: "JSONWizard",
    description: "Formats, validates, and prettifies JSON responses in-browser.",
    enabled: true,
    src: "assets/images/logo-json-wizard.svg",
  },
  {
    name: "TabMaster Pro",
    description: "Organizes browser tabs into groups and sessions.",
    enabled: true,
    src: "assets/images/logo-tab-master-pro.svg",
  },
  {
    name: "ViewportBuddy",
    description: "Simulates various screen resolutions directly within the browser.",
    enabled: false,
    src: "assets/images/logo-viewport-buddy.svg",
  },
  {
    name: "Markup Notes",
    description:
      "Enables annotation and notes directly onto webpages for collaborative debugging.",
    enabled: true,
    src: "assets/images/logo-markup-notes.svg",
  },
  {
    name: "GridGuides",
    description:
      "Overlay customizable grids and alignment guides on any webpage.",
    enabled: false,
    src: "assets/images/logo-grid-guides.svg",
  },
  {
    name: "Palette Picker",
    description: "Instantly extracts color palettes from any webpage.",
    enabled: true,
    src: "assets/images/logo-palette-picker.svg",
  },
  {
    name: "LinkChecker",
    description: "Scans and highlights broken links on any page.",
    enabled: true,
    src: "assets/images/logo-link-checker.svg",
  },
  {
    name: "DOM Snapshot",
    description: "Capture and export DOM structures quickly.",
    enabled: false,
    src: "assets/images/logo-dom-snapshot.svg",
  },
  {
    name: "ConsolePlus",
    description:
      "Enhanced developer console with advanced filtering and logging.",
    enabled: true,
    src: "assets/images/logo-console-plus.svg",
  },
];

// ქარდის HTML-ის შექმნა
function createCardHTML(ext, index) {
  const activeClass = ext.enabled ? " active" : "";
  return `
    <div class="card" data-index="${index}">
      <img src="${ext.src}" alt="${ext.name}">
      <div>
        <div class="name">${ext.name}</div>
        <div class="desc">${ext.description}</div>
      </div>
      <div class="actions">
        <button>Remove</button>
        <div class="toggle${activeClass}">
          <div class="circle"></div>
        </div>
      </div>
    </div>
  `;
}

// ფილტრის მიხედვით ქარდების რენდერი
function renderCards(filter, search = currentSearch) {
  const grid = document.getElementById("extensionsGrid");

  let filtered;
  if (filter === "active") {
    filtered = extensions
      .map((ext, i) => ({ ext, i }))
      .filter(({ ext }) => ext.enabled);
  } else if (filter === "inactive") {
    filtered = extensions
      .map((ext, i) => ({ ext, i }))
      .filter(({ ext }) => !ext.enabled);
  } else {
    filtered = extensions.map((ext, i) => ({ ext, i }));
  }

  // სერჩის ფილტრი — სახელის დასაწყისიდან ეძებს (case-insensitive)
  if (search.trim() !== "") {
    const query = search.trim().toLowerCase();
    filtered = filtered.filter(({ ext }) =>
      ext.name.toLowerCase().includes(query)
    );
  }

  if (filtered.length === 0) {
    grid.innerHTML = `<p class="no-results">No extensions found.</p>`;
    return;
  }

  grid.innerHTML = filtered
    .map(({ ext, i }) => createCardHTML(ext, i))
    .join("");
}

// მიმდინარე ფილტრის და სერჩის მნიშვნელობა
let currentFilter = "all";
let currentSearch = "";

document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const grid = document.getElementById("extensionsGrid");

  // საწყისი რენდერი
  renderCards(currentFilter);

  // სერჩის ველი — live filtering
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", () => {
    currentSearch = searchInput.value;
    renderCards(currentFilter, currentSearch);
  });

  // ფილტრის ღილაკები
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      currentFilter = btn.getAttribute("data-filter");
      renderCards(currentFilter);
    });
  });

  // Event Delegation — toggle და Remove
  grid.addEventListener("click", (e) => {
    const toggle = e.target.closest(".toggle");
    const removeBtn = e.target.closest("button");

    // Toggle — სტატუსის შეცვლა
    if (toggle) {
      const card = toggle.closest(".card");
      const index = parseInt(card.getAttribute("data-index"));

      // მასივში სტატუსის შეცვლა
      extensions[index].enabled = !extensions[index].enabled;

      // ხელახლა რენდერი მიმდინარე ფილტრით
      renderCards(currentFilter);
    }

    // Remove — ქარდის წაშლა / მოშორება
    if (removeBtn && removeBtn.textContent === "Remove") {
      const card = removeBtn.closest(".card");
      const index = parseInt(card.getAttribute("data-index"));

      extensions.splice(index, 1);
      renderCards(currentFilter);
    }
  });
});