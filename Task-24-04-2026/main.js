//  =============== class work 2 ================

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

function printPremiumBooks(users) {
  return users
    .filter(user => user.profile?.membership?.type === "Premium" &&
                    user.profile?.membership?.active === true)
    .flatMap(user => user.library?.map(book => book.title) || []);
}

const result = printPremiumBooks(users);
console.log(result);