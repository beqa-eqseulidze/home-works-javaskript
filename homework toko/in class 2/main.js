// The Challenge: The "Galactic Library"
// You have an array of User objects. Some users have a profile and library data, while others are missing sections entirely. Your task is to extract a clean list of book titles that meet specific criteria without the code crashing.
// The Data
// JavaScript
const users = [
  {
    id: 1,
    name: "Aria",
    profile: {
      membership: { type: "Premium", active: true },
    },
    library: [
      { title: "The Martian", rating: 4.5 },
      { title: "Dune", rating: 4.8 },
    ],
  },
  {
    id: 2,
    name: "Bob",
    profile: null, // Bob has no profile!
    library: [{ title: "Project Hail Mary", rating: 4.9 }],
  },
  {
    id: 3,
    name: "Cassie",
    profile: {
      membership: { type: "Basic", active: false },
    },
  },
];

// pasuxi

const titles = users
  .filter(
    (user) =>
      user.profile?.membership?.type === "Premium" &&
      user.profile?.membership?.active,
  )
  .flatMap(
    (user) =>
      user.library
        ?.filter((book) => book.rating >= 4.7)
        .map((book) => book.title) || [],
  );

console.log(titles);
