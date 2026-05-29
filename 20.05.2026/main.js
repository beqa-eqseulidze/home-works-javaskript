//==============================================================================================
const users = [
  { id: 101, name: 'The Deep', email: 'thedeep@gmail.com', role: 'admin' },
  { id: 102, name: 'ანი', email: 'ani@yahoo.com', role: 'user' },
  { id: 103, name: 'ლუკა', email: 'luka@gmail.com', role: 'user' },
  { id: 101, name: 'ალექსი', email: 'aleks@gmail.com', role: 'user' },
  { id: 101, name: 'Homelander', email: 'homelander@gmail.com', role: 'admin' },
];

//==============================================================================================

//users filter
const usersWithUserRole = users.filter((user)=>{return user.role === 'user'})
console.log(usersWithUserRole);

//================================================================================================

//admins filter
const usersWithAdminRole = users.filter((user)=>{return user.role === 'admin'})
console.log(usersWithAdminRole);


















//================================================================================================

// //მომხმარებლების ID , Name და Email-ის დაბეჭდვა:
// const filteredPersons = people.map(person=>{
//   return {
//     id: person.id,
//     name: person.name,
//     email: person.email
//   };
// });

// console.log(filteredPersons)

// //=====================================================================================================

// // მომხმარებლების Role-ების დაბეჭდვა:
// const personRoles = people.map(person=>{
//   return{
//     name: person.name,
//     role: person.role
//   };
// });

// console.log(personRoles);


// //===================================================================================================

// // მომხმარებლების Id და Email-ის დაბეჭდვა;

// const personIdAndEmail = people.map(person=>{
//     return{
//         id: person.id,
//         email: person.email
//     }
// });

// console.log(personIdAndEmail);

// //====================================================================================================