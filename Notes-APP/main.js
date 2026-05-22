const formEl = document.getElementById("form");
const notesEl = document.querySelector(".cards");
const titleEl = document.querySelector(".title");
const textEl = document.querySelector(".text");
const categoryEl = document.querySelector(".category");

let noteToEdit = null;

let notes = JSON.parse(localStorage.getItem("notes")) || [];

renderNotes(notes);

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  //Gather the data
  const data = new FormData(formEl);
  // Convert to a standard object
  const note = Object.fromEntries(data);

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
  noteToEdit=null;
});

function renderNotes(notesArray) {
  notesEl.innerHTML = "";
  notesArray.forEach((note) => {
    let date = new Date(note.date);
    notesEl.innerHTML += `<div class="card">
                            <h2>${note.title}</h2>
                            <p>${date}</p>
                            <div class="description">${note.text}</div>
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
