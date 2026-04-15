const extensions = [
  {
    name: "DevLens",
    description: "Quickly inspect page layouts and visualize element boundaries.",
    enabled: true,
    icon:'./image/logo-devlens.svg'
  },
  {
    name: "StyleSpy",
    description: "Instantly analyze and copy CSS from any webpage element.",
    enabled: true,
    icon:'./image/logo-style-spy.svg'
  },
  {
    name: "SpeedBoost",
    description: "Optimizes browser resource usage to accelerate page loading.",
    enabled: false,
    icon:'./image/logo-speed-boost.dvg'
  },
  {
    name: "JSONWizard",
    description: "Formats, validates, and prettifies JSON responses in-browser.",
    enabled: true,
    icon:'./image/logo-json-wizard.svg'
  },
  {
    name: "TabMaster Pro",
    description: "Organizes browser tabs into groups and sessions.",
    enabled: true,
    icon:'./image/logo-tab-master-pro.svg'
  },
  {
    name: "ViewportBuddy",
    description: "Simulates various screen resolutions directly within the browser.",
    enabled: false,
    icon:'./image/logo-viewport-buddy.svg'
  },
  {
    name: "Markup Notes",
    description: "Enables annotation and notes directly onto webpages for collaborative debugging.",
    enabled: true,
    icon:'./image/logo-markup-notes.svg'
  },
  {
    name: "GridGuides",
    description: "Overlay customizable grids and alignment guides on any webpage.",
    enabled: false,
    icon:'./image/logo-grid-guides.svg'
  },
  {
    name: "Palette Picker",
    description: "Instantly extracts color palettes from any webpage.",
    enabled: true,
    icon:'./image/logo-palette-picker.svg'
  },
  {
    name: "LinkChecker",
    description: "Scans and highlights broken links on any page.",
    enabled: true,
    icon:'./image/logo-link-checker.svg'
  },
  {
    name: "DOM Snapshot",
    description: "Capture and export DOM structures quickly.",
    enabled: false,
    icon:'./image/logo-dom-snapshot.svg'
  },
  {
    name: "ConsolePlus",
    description: "Enhanced developer console with advanced filtering and logging.",
    enabled: true,
    icon:'./image/logo-console-plus.svg'
  }
];



// კონტეინერი
const container = document.querySelector(".cards");

// ფილტრის ღილაკები
const btnAll = document.querySelector(".but-1");
const btnActive = document.querySelector(".but-2");
const btnInactive = document.querySelector(".button button:nth-child(3)");

let currentFilter = "all";

// ქარდის შექმნა
function createCard(ext, index) {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <div class="text">
      <img src="${ext.icon}" alt="${ext.name}">
      <h3>${ext.name}</h3>
    </div>
    <p>${ext.description}</p>
    <div class="foo-1">
      <button class="remove-btn">remove</button>
      <label class="swtich">
        <input type="checkbox" ${ext.enabled ? "checked" : ""}>
        <span class="slider"></span>
      </label>
    </div>
  `;

  // toggle
  const checkbox = card.querySelector("input");
  checkbox.addEventListener("change", () => {
    extensions[index].enabled = checkbox.checked;
    render();
  });

  // remove
  const removeBtn = card.querySelector(".remove-btn");
  removeBtn.addEventListener("click", () => {
    extensions.splice(index, 1);
    render();
  });

  return card;
}

// რენდერი
function render() {
  container.innerHTML = "";

  let data = extensions;

  if (currentFilter === "active") {
    data = extensions.filter(e => e.enabled);
  } else if (currentFilter === "inactive") {
    data = extensions.filter(e => !e.enabled);
  }

  data.forEach(ext => {
    const realIndex = extensions.findIndex(e => e.name === ext.name);
    const card = createCard(ext, realIndex);
    container.appendChild(card);
  });
}

// ფილტრები
btnAll.onclick = () => {
  currentFilter = "all";
  render();
};

btnActive.onclick = () => {
  currentFilter = "active";
  render();
};

btnInactive.onclick = () => {
  currentFilter = "inactive";
  render();
};

// პირველად
render();

const checkbox = card.querySelector("input");

checkbox.addEventListener("change", () => {
  extensions[index].enabled = checkbox.checked;

  // მარტო მაშინ გადავრენდეროთ თუ filter ჩართულია
  if (currentFilter !== "all") {
    render();
  }
});