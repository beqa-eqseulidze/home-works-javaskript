// დავალება 
// დისაინის ფაილის მიხედვით გააკეთეთ ვებგვერდი, 
// გამოიყენეთ:
//  scss  - ცვლადები, იმპორტები, ნესტინგი
// შემდეგ მოცემული ჯავასკრიპტის მასვის გამოყენებით 
// დაარენდერე პეიჯი დინამურად:
const extensions = [
  {
    name: "DevLens",
    description: "Quickly inspect page layouts and visualize element boundaries.",
    enabled: true,
  },
  {
    name: "StyleSpy",
    description: "Instantly analyze and copy CSS from any webpage element.",
    enabled: true,
  },
  {
    name: "SpeedBoost",
    description: "Optimizes browser resource usage to accelerate page loading.",
    enabled: false,
  },
  {
    name: "JSONWizard",
    description: "Formats, validates, and prettifies JSON responses in-browser.",
    enabled: true,
  },
  {
    name: "TabMaster Pro",
    description: "Organizes browser tabs into groups and sessions.",
    enabled: true,
  },
  {
    name: "ViewportBuddy",
    description: "Simulates various screen resolutions directly within the browser.",
    enabled: false,
  },
  {
    name: "Markup Notes",
    description: "Enables annotation and notes directly onto webpages for collaborative debugging.",
    enabled: true,
  },
  {
    name: "GridGuides",
    description: "Overlay customizable grids and alignment guides on any webpage.",
    enabled: false,
  },
  {
    name: "Palette Picker",
    description: "Instantly extracts color palettes from any webpage.",
    enabled: true,
  },
  {
    name: "LinkChecker",
    description: "Scans and highlights broken links on any page.",
    enabled: true,
  },
  {
    name: "DOM Snapshot",
    description: "Capture and export DOM structures quickly.",
    enabled: false,
  },
  {
    name: "ConsolePlus",
    description: "Enhanced developer console with advanced filtering and logging.",
    enabled: true,
  }
];

//დაამატე გაფილტრვრის ფუნქციონალი, ანუ თუ დააჭერ 
// all ღილაკს უნდა გამოჩნდეს ყველა ქარდი
///თუ დააჭერ  ative ღილაკს მხოლოდ აქტიურები 
// ხოლო inactive მხოლოდ არააქტიურები;

//ასევე შესაძლებელი უნდა იყოს სტატუსის შეცვლა 
// აქტიურიდან არააქტიურზე და პირიქით 