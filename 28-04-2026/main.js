const unsortedArray = [6, 7, 1, 5, 0];

const sortedArray = unsortedArray.sort((a, b) => {
   return a - b;
});

// console.log(sortedArray);

//იუზერების სორტიორება ასაკის მიხედვით
const users = [
  { name: "user-1", age: 26 },
  { name: "user-2", age: 15 },
  { name: "user-3", age: 6 },
  { name: "user-4", age: 26 },
];

const sortedUsers = users.sort((a, b) => {   
  return b.age - a.age;
});

// console.log(sortedUsers);


//იუზერების სორტიორება ასაკის მიხედვით
// const a={name:'aa'}
// const b={name:'aa'}
// console.log(b.name.localeCompare(a.name));

const users_2 = [
  { name: "bb", age: 26 },
  { name: "aa", age: 15 },
  { name: "ff", age: 6 },
  { name: "dd", age: 26 },
];

const sortedUsers_2 = users_2.sort((a, b) => { 
        return b.name.localeCompare(a.name)
    });


console.log(sortedUsers_2);

//===================== დავალება =====================

//წარმოიდგინე, რომ აწყობ ონლაინ მაღაზიის მცირე მოდულს. მოცემული მონაცემებით 
// სადაც თითოეულ ობიექტს აქვს სახელი, ფასი და რეიტინგი.

// შექმენი div კონტეინერი, სადაც გამოჩნდება პროდუქტები "ბარათების" (Cards) სახით.
// დაამატე 3 ღილაკი შესაბამისი ID-ებით:
// "ფასით სორტირება (იაფიდან ძვირისკენ)"
// "რეიტინგით სორტირება (საუკეთესოები თავში)"
// "სახელით სორტირება (A-Z)"

const inventory = [
    { name: "ლეპტოპი", price: 2500, rating: 4.8 },
    { name: "სმარტფონი", price: 1200, rating: 4.5 },
    { name: "ყურსასმენები", price: 350, rating: 4.2 },
    { name: "მონიტორი", price: 800, rating: 4.9 },
    { name: "კლავიატურა", price: 150, rating: 3.8 },
    { name: "მაუსი", price: 90, rating: 4.0 },
    { name: "პრინტერი", price: 550, rating: 3.5 }
];