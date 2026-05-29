
let notes = JSON.parse(localStorage.getItem('notes')) || [];
let currentFilter = 'all';
let currentEditId = null;

// DOMS :
const notesContainer = document.getElementById('notes-container');
const noteTitleInput = document.getElementById('note-title');
const noteTextInput = document.getElementById('note-text');
const noteCategorySelect = document.getElementById('note-category');
const addNoteBtn = document.getElementById('add-note-btn');
const sidebarButtons = document.querySelectorAll('.category-btn');


function renderNotes() {
    notesContainer.innerHTML = '';
    
    let filteredNotes = notes;
    if (currentFilter !== 'all') {
        filteredNotes = notes.filter(note => note.category === currentFilter);
    }

    filteredNotes.forEach(note => {
        let bgClass = '';
        let categoryName = '';
        
        if (note.category === 'work') {
            bgClass = 'bg-[#f87171] border-red-300'; 
            categoryName = 'სამუშაო';
        } else if (note.category === 'personal') {
            bgClass = 'bg-[#0ea5e9] border-blue-300'; 
            categoryName = 'პირადი';
        } else if (note.category === 'ideas') {
            bgClass = 'bg-[#fde047] border-yellow-300'; 
            categoryName = 'იდეები';
        } else if (note.category === 'study') {
            bgClass = 'bg-[#22c55e] border-green-300'; 
            categoryName = 'სწავლა';
        }

        const card = document.createElement('div');
        card.className = `${bgClass} border rounded-lg p-4 flex flex-col justify-between shadow-sm min-h-[150px]`;
        
        card.innerHTML = `
            <div data-id="${note.id}">
                <div class="flex justify-between items-center text-xs text-gray-600 mb-2 font-bold">
                    <span>${categoryName}</span>
                    <span class="text-[10px] font-normal">${note.date}</span>
                </div>
                <h3 class="font-bold text-gray-900 mb-1">${note.title}</h3>
                <p class="text-sm text-gray-700">${note.text}</p>
            </div>
            <div class="flex justify-end gap-3 mt-4 border-t border-black/5 pt-2">
                <button onclick="editNote(${note.id})" class="text-gray-600 hover:text-blue-600">
                    <i class="fas fa-pencil-alt"></i>
                </button>
                <button onclick="deleteNote(${note.id})" class="text-gray-600 hover:text-red-600">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;

        notesContainer.appendChild(card);
    });
}


// === ჩანაწერის რედაქტირება ===
function editNote(id) {
    const noteToEdit = notes.find(note => note.id === id);
    
    if (noteToEdit) {
        noteTitleInput.classList.remove('border-red-500');
        noteTextInput.classList.remove('border-red-500');

        noteTitleInput.value = noteToEdit.title;
        noteTextInput.value = noteToEdit.text;
        noteCategorySelect.value = noteToEdit.category;
        
        currentEditId = id;
        addNoteBtn.innerText = 'შეცვლა';
    }
}


// === ჩანაწერის წაშლა ===
function deleteNote(id) {
    notes = notes.filter(note => note.id !== id);
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
}

// === ჩანაწერის დამატება / შენახვა ===
addNoteBtn.addEventListener('click', () => {
    const title = noteTitleInput.value.trim();
    const text = noteTextInput.value.trim();
    const category = noteCategorySelect.value;

    noteTitleInput.classList.remove('border-red-500');
    noteTextInput.classList.remove('border-red-500');

    if (title === '' || text === '') {
        if (title === '') noteTitleInput.classList.add('border-red-500');
        if (text === '') noteTextInput.classList.add('border-red-500');
        return; 
    }

    // == Date-ის დამატება == 
    const d = new Date();
    const simpleDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

    if (currentEditId !== null) {
        notes = notes.map(note => {
            if (note.id === currentEditId) {
                return { id: note.id, title: title, text: text, category: category, date: simpleDate };
            }
            return note;
        });
        addNoteBtn.innerText = '+ დამატება';
        currentEditId = null;
    } else {
        const newNote = {
            id: Date.now(),
            title: title,
            text: text,
            category: category,
            date: simpleDate
        };
        notes.unshift(newNote);
    }

    localStorage.setItem('notes', JSON.stringify(notes));
    noteTitleInput.value = '';
    noteTextInput.value = '';
    renderNotes();
});

// === ფილტრაცია (Sidebar) ===
sidebarButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        sidebarButtons.forEach(b => {
            b.classList.remove('bg-gray-200', 'font-bold', 'text-gray-700');
            b.classList.add('hover:bg-gray-200', 'text-gray-600');
        });

        btn.classList.add('bg-gray-200', 'font-bold', 'text-gray-700');
        btn.classList.remove('hover:bg-gray-200', 'text-gray-600');

        currentFilter = btn.getAttribute('data-category');
        renderNotes();
    });
});

renderNotes();