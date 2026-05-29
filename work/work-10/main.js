const users = [
    {
        id: 1,
        name: "გიორგი ბერიძე",
        email: "giorgi.beridze@example.com",
        role: "Admin",
        isActive: true,
        createdAt: "2025-01-15"
    },
    {
        id: 2,
        name: "ნინო კაპანაძე",
        email: "nino.kapanadze@example.com",
        role: "User",
        isActive: true,
        createdAt: "2025-03-22"
    },
    {
        id: 3,
        name: "ლუკა მახარაძე",
        email: "luka.makharadze@example.com",
        role: "User",
        isActive: false,
        createdAt: "2025-05-10"
    },
    {
        id: 4,
        name: "ანა ტყეშელაშვილი",
        email: "ana.tqeshelashvili@example.com",
        role: "Editor",
        isActive: true,
        createdAt: "2024-11-05"
    },
    {
        id: 5,
        name: "დავით ხუციშვილი",
        email: "davit.khutsishvili@example.com",
        role: "User",
        isActive: false,
        createdAt: "2026-02-18"
    }
];

// const usersName = users.map((user) => {
//     return {
//         Name: user.name,
//         ID: user.id,
//         Email: user.email,
//     }
// });
// console.log(usersName);

const usersRole = users.filter((user) => { return user.role === "Editor" })
console.log(usersRole)