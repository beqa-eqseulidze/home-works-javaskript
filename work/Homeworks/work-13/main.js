const titleInput = document.getElementById("title");
const textInput = document.getElementById("text");
const categoryInput = document.getElementById("category");
const addBtn = document.getElementById("addBtn");
const notesBox = document.getElementById("notesBox");
const filterButtons = document.querySelectorAll(".filter-btn");

// ლოკალური საცავის ველი
let notes =
JSON.parse(localStorage.getItem("notes")) || [];
renderNotes(notes);

// დასამატებელი ველი
addBtn.addEventListener("click", () => {
    const title = titleInput.value.trim();
    const text = textInput.value.trim();
    const category = categoryInput.value;

    if(!title || !text){
        alert("შეავსე ყველა ველი");
        return;
    }

    const note = {

        id:Date.now(),

        title,

        text,

        category,

        date:new Date().toLocaleDateString()

    };
    notes.push(note);
    saveNotes();
    renderNotes(notes);
    clearInputs();
});

// დარენდერების ველი
function renderNotes(arr){

    notesBox.innerHTML = "";
    arr.forEach(note => {
        const card =
        document.createElement("div");
        card.classList.add(
            "note-card"
        );

        // ფერების მეხედვით კატეგორირება
        if(note.category === "Work"){
            card.classList.add("work");
        }
        if(note.category === "Personal"){
            card.classList.add("personal");
        }
        if(note.category === "Ideas"){
            card.classList.add("ideas");
        }
        if(note.category === "Study"){
            card.classList.add("study");
        }

        card.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.text}</p>
            <div class="note-footer">
                <small>
                    ${note.date}
                </small>
                <div class="card-actions">
                    <button
                    class="edit-btn"
                    onclick="editNote(${note.id})"
                    >
                    Edit
                    </button>
                    <button
                    class="delete-btn"
                    onclick="deleteNote(${note.id})"
                    >
                    Delete
                    </button>
                </div>
            </div>
        `;
        notesBox.appendChild(card);
    });
}

// წასაშლელი ველი
function deleteNote(id){
    notes = notes.filter(note => {
        return note.id !== id;
    });
    saveNotes();
    renderNotes(notes);
}

// ჩასასწორებელი ველი
function editNote(id){
    const note =
    notes.find(note => note.id === id);
    const newTitle =
    prompt("ახალი სათაური", note.title);
    const newText =
    prompt("ახალი ტექსტი", note.text);
    if(newTitle === null ||
       newText === null){
        return;
    }
    note.title = newTitle;
    note.text = newText;

    saveNotes();
    renderNotes(notes);
}

// დაფილტვრის ველი
filterButtons.forEach(btn => {

    btn.addEventListener("click", () => {

        filterButtons.forEach(button => {
            button.classList.remove("active");
        });

        btn.classList.add("active");

        const category =
        btn.dataset.category;

        if(category === "all"){
            renderNotes(notes);
            return;
        }
        const filtered =
        notes.filter(note => {
            return note.category === category;
        });

        renderNotes(filtered);
    });
});

// შენახვის ველი
function saveNotes(){
    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );
}

// გაწმენდის ველი
function clearInputs(){
    titleInput.value = "";
    textInput.value = "";
}