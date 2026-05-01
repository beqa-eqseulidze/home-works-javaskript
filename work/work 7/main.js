// const obj = {
//     name: 'john',
//     test: () => { },
// }

// const person1 = {
//     name: "john",
//     age: 26,
//     fn: () => { },
// }
// const key = window.prompt('ჩაწერე "age" ან "name": ')
// window.alert(person1[key, 'name'])
// // window.alert(person1.key)

//დავალება person1 ის ობიექტიდან დააკოპირეთ phones მასივი და შეინახეთ ცვლადში სახელად const myPhones ის მასივში დაამატეთ ახალი ტელეფონი ხოლო კონსოლში დაბეჭდეთ ტელეფონის მასივი person1 ის ობიექტიდან და myPhones მასივიდან 
// const person1 = {
//     name: "john",
//     age: 26,
//     phones: [577001122, 555334455],
//     fn: () => { },
// };

// // const myPhones = [...person1.phones]
// const myPhones = [...person1['phones']]
// myPhones.push(598667788)

// // console.log("person1 phones: ", person1.phones)
// console.log("person1 phones: ", person1['phones'])
// console.log("myPhones", myPhones)

// const car = {
//     mark: 'Opel',
//     color: 'White',
//     door: 4,
// }

// const car2 = { ...car }
// car2.model = 'Astra'

// console.log(car)
// console.log(car2)

const car = {
    Brand: 'Nissan',
    Model: 'NSX(NA1)',
    Color: 'Gray',
    Year: 1990,
}

const car2 = { ...car }
car2.HP = '270-274'
delete car2.HP;

console.log(car)
console.log(car2)