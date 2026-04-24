// const obj = {
//     name: 'john',
//     age: 21,
// dog: { color: 'black', name: 'jeka' }
// }

// function dogName(obj) {
//     if (obj.dog) {
//         return obj.dog.name;
//     }
//     return "Dog not found";
// }

// console.log(dogName(obj));

// function dogName(obj) {
//     try {
//         if (!obj.dog) {
//             throw new Error("dog not found");
//         }

//         return obj.dog.name;

//     } catch (error) {
//         return "Dog not found";
//     }
//     finally {
//         console.log("Function finished");
//     }
// }

// console.log(dogName(obj));

// function dogName(obj) {
//     return obj.dog?.name || "Dog not found";
// }

// console.log(dogName(obj));

const users = [
    {
        id: 1,
        name: "Aria",
        profile: {
            membership: { type: "Premium", active: true }
        },
        library: [
            { title: "The Martian", rating: 4.5 },
            { title: "Dune", rating: 4.8 }
        ]
    },
    {
        id: 2,
        name: "Bob",
        profile: null, // Bob has no profile!
        library: [
            { title: "Project Hail Mary", rating: 4.9 }
        ]
    },
    {
        id: 3,
        name: "Cassie",
        profile: {
            membership: { type: "Basic", active: false }
        },
        // Cassie has no library property!
    }
];
function libraryProperty(users) {
    const titles = users.flatMap(user =>
        user.library?.map(book => book.title) ?? []
    );

    return titles.length ? titles : "title not found";
}

console.log(libraryProperty(users));