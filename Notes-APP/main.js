const formEl = document.getElementById("form");
const notesEl = document.querySelector(".cards");
const titleEl = document.querySelector(".title");
const textEl = document.querySelector(".text");
const errorEls = document.querySelectorAll(".error");
const categoryEl = document.querySelector(".category");

let noteToEdit = null;

let notes = JSON.parse(localStorage.getItem("notes")) || [];

renderNotes(notes);

function addHiddenClass() {
  errorEls.forEach((el) => el.classList.add("hidden"));
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  addHiddenClass();
  //Gather the data
  const data = new FormData(formEl);
  // Convert to a standard object
  const note = Object.fromEntries(data);
  const emptyInputs = [];
  for (key in note) {
    if (note[key].trim() === "") emptyInputs.push(key);
  }
  emptyInputs.forEach((key) => {
    document.getElementById(key).classList.remove("hidden");
  });
  if (!!emptyInputs.length) 
    return; 

  if (noteToEdit) {
    noteToEdit.title = note.title;
    noteToEdit.text = note.text;
    noteToEdit.category = note.category;
  } else {
    const date = new Date();
    note.id = date.getTime();
    note.date = date.toString();
    notes.push(note);
  }
  localStorage.setItem("notes", JSON.stringify(notes));
  formEl.reset();
  renderNotes(notes);
  noteToEdit = null;
});

function renderNotes(notesArray) {
 console.log('call filter ', notesArray)
  notesEl.innerHTML = "";
  notesArray.forEach((note) => {
    let date = new Date(note.date);
    notesEl.innerHTML += `<div class="card">
                            <h2>${note.title}</h2>
                            <p>${date}</p>
                            <div class="description">${note.text}</div>
                            <div class="category">category:${note.category}</div>
                            <div class="actions">
                                <span onclick="edit(event)" id=${note.id} > რედაქტირება  </span>
                                <span onclick="del(event)" id=${note.id} > წაშლა  </span>
                            </div>
                        </div>
                       `;
  });
}

function edit(event) {
  const noteId = event.target.id;
  const note = notes.find((note) => note.id == noteId);
  noteToEdit = note;
  //შევავსოთ ფორმა
  titleEl.value = note.title;
  textEl.value = note.text;
  categoryEl.value = note.category;
}

function del(event) {
  const noteId = event.target.id;
  const filtered = notes.filter((note) => note.id != noteId);
  notes = [...filtered];
  localStorage.setItem("notes", JSON.stringify(notes));
  renderNotes(notes);
}

function filterNotes(category){
  if(category){
    const filtered=notes.filter(note=>note.category===category);   
    renderNotes(filtered);
    return
  }
  renderNotes(notes);
}





