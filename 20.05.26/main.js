// /Array Methods (revision)
const users = [
  {
    id: "usr_92o1k389a",
    name: "Alex Rivera",
    email: "alex.rivera@example.com",
    role: "Admin",
    status: "Active",
    profile: {
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      bio: "Systems architect and coffee enthusiast.",
      location: "San Francisco, CA",
    },
    createdAt: "2024-03-15T08:30:00Z",
  },
  {
    id: "usr_41p8f273b",
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    role: "Editor",
    status: "Active",
    profile: {
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      bio: "Content strategist and UX writer.",
      location: "Toronto, ON",
    },
    createdAt: "2024-05-22T14:15:00Z",
  },
    {
      id: "usr_10x5m914c",
      name: "Marcus Johnson",
      email: "marcus.j@example.com",
      role: "User",
      status: "Suspended",
      profile: {
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
        bio: "Data analyst exploring the world of AI.",
        location: "Austin, TX"
      },
      createdAt: "2025-01-10T11:05:00Z"
    },
    {
      id: "usr_77v3e622d",
      name: "Elena Rostova",
      email: "elena.r@example.com",
      role: "User",
      status: "Active",
      profile: {
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
        bio: "Front-end developer. I build pretty interfaces.",
        location: "Berlin, DE"
      },
      createdAt: "2025-08-04T19:42:00Z"
    }
];

// array methods: length, push, shift,slice,pop,splice,map,concat,filter,find,sort;

// const res=[6,5].shift();
// console.log(res);

// let res=[].push(5);
// console.log(res);

// const numbers=[5,6,7,8,9]
// const res=numbers.splice(1,2);
// console.log('result: ',res);
// console.log('numbers: ',numbers);

// const numbers=[5,6,7,8,9]
// const res=numbers.slice(1,2);
// console.log('result: ',res);
// console.log('numbers: ',numbers);

// const userNames = users.map((user) => {  
//   return user.name
// });
// console.log(userNames)

// const usersWithAdminRole=users.filter((user)=>{return user.role==='Admin'})
// console.log(usersWithAdminRole);


// const employees = [
//   { id: 11223344556, name: "ani", fullname: "anikashvili" },
//   { id: 22334455667, name: "bela", fullname: "birt" },
//   { id: 33445566778, name: "nika", fullname: "nikoladze" }
// ];

// const names = employees.map(emp => emp.name);
// console.log(names);
// const filtered = employees.filter(emp => emp.name.startsWith("n"));
// console.log(filtered);

// const users = [
//   { id: 12574736826, name: "bela", fullname: "fhkahdkf" },
//   { id: 98765432101, name: "giorgi", fullname: "georgadze" },
//   { id: 55432198765, name: "luka", fullname: "lukava" }
// ];

// const foundUser = users.find(user => user.id === 98765432101);

// console.log(foundUser);



// const accounts = [
//   { id: 12574736826, name: "Bela", fullname: "fhkahdkf", role: "admin" },
//   { id: 98765, name: "Nika", fullname: "user", role: "superAdmin" },
//   { id: 55432198765, name: "luka", fullname: "lukava", role: "admin" },
//   { id: 987656, name: "Giorgi", fullname: "user", role: "superAdmin" },
// ];


// const admins = accounts.filter(account => account.role === "admin");

// console.log(admins);


// გაზრდილი მასივი, სადაც თითოეულ იუზერს აქვს რამდენიმე როლი (მასივის სახით)
const accounts = [
  { id: 1, name: "bela", fullname: "fhkahdkf", roles: "admin"},
  { id: 2, name: "Nika", fullname: "user", roles: "superAdmin"},
  { id: 3, name: "luka", fullname: "lukava", roles: "support"},
  { id: 4, name: "lika", fullname: "giorgadze", roles: "editor"},
  { id: 5, name: "anna", fullname: "beridze", roles: "admin"}
];

const strictAdmins = accounts.filter(account => account.roles.includes("admin"));
console.log(strictAdmins);


