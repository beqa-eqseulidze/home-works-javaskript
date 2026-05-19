// // local storage ჩაწერა და შეცვლა
// localStorage.setItem('mykey','123456');

// //local storage დან წაკითხვა
// console.log(localStorage.getItem('mykey'));

// //local storage დან წაშლა კონკრეტული ჩანაწერის
// localStorage.removeItem('mykey')

// //local storage დან წაშლა კონკრეტული ჩანაწერის
// localStorage.clear()

// // nullish ოპერატორი : ??
// let a= null ?? '123' // a=123
// let b= undefined ?? '123' // b=123
// let c= '' ?? '123' // c=''
// let c= 0 ?? '123' // c=0

// // or ოპერატორი : ||
// let a= null || '123' // a=123
// let b= undefined || '123' // b=123
// let c= '' || '123' // c='123'
// let c= 0 || '123' // c='123'

const valueContainer = document.querySelector("#countValue");

let count = +localStorage.getItem("count") || 0;
valueContainer.innerText = count;

function increment() {
    count++;
    valueContainer.innerText = count;
    localStorage.setItem("count", count);
}

// =================================================================

//  exercise 2
const tbody = document.querySelector("tbody");
const nameInput = document.querySelector("input");

let persons = JSON.parse(localStorage.getItem("persons"));

if (!persons) {
    persons = [];
    const strPersons = JSON.stringify(persons);
    localStorage.setItem("persons", strPersons);
}

renderPerson(persons);

function renderPerson(parsonsArray) {
    tbody.innerHTML = "";
    parsonsArray.forEach((pres) => {
        tbody.innerHTML += `
              <tr>
                <td>${pres.id}</td>
                <td>${pres.name}</td>
                <td><button id="${pres.id}" onclick="deletePerson(event)" > delete person</button></td>
            </tr>`;
    });
}

function addPerson() {
    let name = nameInput.value.trim();
    if (!name) return;
    const newPerson = createPerson(name);
    persons.push(newPerson);
    localStorage.setItem("persons", JSON.stringify(persons));
    renderPerson(persons);
    nameInput.value = "";
}

function createPerson(personName) {
    let personId = generateId();
    return {
        id: personId,
        name: personName,
    };
}

function generateId() {
    return Date.now().toString(36);
}


function deletePerson(event) {
    const id = event.target.id
    const flitteredPersons = persons.filter(pres => pres.id !== id);
    persons = [...flitteredPersons]
    localStorage.setItem('persons', JSON.stringify(persons));
    renderPerson(persons)
}