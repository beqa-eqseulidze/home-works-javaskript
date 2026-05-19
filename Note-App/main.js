// დამხმარე ფუნქცია, რომელიც იღებს HTML ელემენტს მისი id-ის მიხედვით
const $ = id => document.getElementById(id);

// დამხმარე ფუნქცია, რომელიც იცავს აპლიკაციას XSS შეტევებისგან. 
// ის ცვლის სპეციალურ სიმბოლოებს (მაგ. <, >) შესაბამისი HTML ექვივალენტებით ასევე თუ მას მოვაშორებთ აღარ გამოვა ჩვენი ქარდები ეკრანზე
const esc = str => str.replace(/[&<>'"]/g, t => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[t] || t));

// ვკითხულობთ შენახულ ჩანაწერებს ლოკალური საცავიდან (localStorage). 
// თუ საცავი ცარიელია, ვიყენებთ ნაგულისხმევ მასივს სატესტო მონაცემებით თუ ამას ამოვიღებთ შესაბამისად ქარდებიც არ გვექნება
let notes = JSON.parse(localStorage.getItem('notes_app_v2')) || [
    { id: 1, title: 'იდეები: ახალი', text: 'შეხვედრა Angular-ზე, Angular-ის ახალი API...', category: 'იდეები', date: new Date('2024-05-18T10:00:00').getTime() },
    { id: 2, title: 'სამუშაო შეხვედრა', text: 'შეხვედრა Angular-ზე, Angular-ის ახალი API...', category: 'სამუშაო', date: new Date('2024-05-18T11:00:00').getTime() },
    { id: 3, title: 'იდეები: ახალი', text: 'შეხვედრა Angular-ზე, Angular-ის ახალი API...', category: 'იდეები', date: new Date('2024-05-18T12:00:00').getTime() },
    { id: 4, title: 'პირადი შეხსენება', text: 'შეხვედრა Angular-ზე, Angular-ის ახალი API...', category: 'პირადი', date: new Date('2024-05-18T13:00:00').getTime() },
    { id: 5, title: 'პროექტის იდეები', text: 'შეხვედრა Angular-ზე, Angular-ის ახალი API...', category: 'იდეები', date: new Date('2024-05-18T14:00:00').getTime() },
    { id: 6, title: 'პროექტის იდეები', text: 'შეხვედრა Angular-ზე, Angular-ის ახალი API...', category: 'პირადი', date: new Date('2024-05-17T10:00:00').getTime() },
    { id: 7, title: 'იდეები: ახალი', text: 'შეხვედრა Angular-ზე, Angular-ის ახალი API...', category: 'იდეები', date: new Date('2024-05-17T11:00:00').getTime() },
    { id: 8, title: 'პირადი შეხსენება', text: 'შეხვედრა Angular-ზე, Angular-fn აქ...', category: 'პირადი', date: new Date('2024-05-17T12:00:00').getTime() },
    { id: 9, title: 'სამუშაო, იდეები', text: 'შეხვედრა Angular-ზე, Angular-ის ახალი API...', category: 'სამუშაო', date: new Date('2024-05-17T13:00:00').getTime() },
    { id: 10, title: 'სწავლა: React API', text: 'შეხვედრა Angular-ზე, Angular-ის ახალი API...', category: 'სწავლა', date: new Date('2024-05-17T14:00:00').getTime() },
    { id: 11, title: 'იდეები: იდეები', text: 'შეხვედრა Angular-ზე, Angular-ის ახალი API...', category: 'იდეები', date: new Date('2024-05-18T15:00:00').getTime() },
    { id: 12, title: 'სამუშაო', text: 'შეხვედრა Angular-ზე, Angular-ის ახალი API...', category: 'სამუშაო', date: new Date('2024-05-18T16:00:00').getTime() },
    { id: 13, title: 'პირადი შეხსენება', text: 'შეხვედრით თქვენი ჩანაწერი აქ...', category: 'პირადი', date: new Date('2024-05-18T17:00:00').getTime() }
];

// აქტიური კატეგორია, რომლის მიხედვითაც იფილტრება ჩანაწერები (თავდაპირველად ყველა - 'all')
let activeCategory = 'all';

// ფუნქცია, რომელიც ინახავს ცვლილებებს ლოკალურ საცავში, 
// თავიდან ხატავს ჩანაწერებს და ეკრანზე გამოაქვს შეტყობინება წარმატების შესახებ
const saveAndRender = (msg) => {
    localStorage.setItem('notes_app_v2', JSON.stringify(notes)); // ვინახავთ მონაცემებს
    render(); // ვაახლებთ ეკრანს

    // თუ ფუნქციას გადაეცა შეტყობინება (msg), ვაჩვენებთ მას 2.5 წამით
    if (msg) {
        const t = document.createElement('div');
        t.className = 'bg-[#265d60] text-white px-4 py-3 rounded shadow-lg text-sm transition-opacity';
        t.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span class="ml-2">${msg}</span>`;
        $('toastContainer').appendChild(t); // ვამატებთ შეტყობინებას კონტეინერში
        setTimeout(() => t.remove(), 2500); // 2.5 წამის შემდეგ ვშლით
    }
};

// ფუნქცია თარიღის ლამაზად ფორმატირებისთვის (მაგ: 2024 წლის 18 მაისი)
const formatDate = d => {
    const date = new Date(d);
    const m = ["იანვარი", "თებერვალი", "მარტი", "აპრილი", "მაისი", "ივნისი", "ივლისი", "აგვისტო", "სექტემბერი", "ოქტომბერი", "ნოემბერი", "დეკემბერი"];
    return `${date.getFullYear()} წლის ${date.getDate()} ${m[date.getMonth()]}`;
};

// მთავარი ფუნქცია, რომელიც პასუხისმგებელია ჩანაწერების ეკრანზე გამოტანაზე
const render = () => {
    const grid = $('notesGrid'); // ვიღებთ იმ კონტეინერს სადაც ჩანაწერები უნდა ჩაიყაროს

    // ვფილტრავთ ჩანაწერებს აქტიური კატეგორიის მიხედვით და ვალაგებთ თარიღის კლებადობით (უახლესი ჯერ)
    const filtered = notes.filter(n => activeCategory === 'all' || n.category === activeCategory).sort((a, b) => b.date - a.date);

    grid.innerHTML = ''; // ვასუფთავებთ კონტეინერს ძველი ჩანაწერებისგან

    // ვმალავთ ან ვაჩვენებთ კონტეინერს და ცარიელი მდგომარეობის ტექსტს (როცა ჩანაწერები არ არის)
    grid.classList.toggle('hidden', !filtered.length);
    $('emptyState').classList.toggle('hidden', filtered.length > 0);

    // კატეგორიების მიხედვით განსაზღვრული ფერები
    const colors = { 'სამუშაო': 'bg-[#ffb3c1]', 'პირადი': 'bg-[#a9cff0]', 'იდეები': 'bg-[#fcf3c3]', 'სწავლა': 'bg-[#a0dfa0]' };

    // თითოეული გაფილტრული ჩანაწერისთვის ვქმნით HTML სტრუქტურას და ვამატებთ გრიდში
    filtered.forEach(n => {
        grid.innerHTML += `
            <div class="${colors[n.category]} rounded shadow-sm border border-black/5 p-4 flex flex-col hover:shadow-md relative group">
                <h3 class="text-[15px] font-bold text-slate-900">${esc(n.title)}</h3>
                <span class="text-[11px] text-slate-700 mb-2 mt-1">${formatDate(n.date)}</span>
                <p class="text-[14px] text-slate-800 leading-snug line-clamp-4 flex-1">${esc(n.text)}</p>
                <div class="mt-4 flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <!-- რედაქტირების ღილაკი -->
                    <button onclick="editNote(${n.id})" class="text-slate-500 hover:text-slate-800"><i class="fa-solid fa-pen text-sm"></i></button>
                    <!-- წაშლის ღილაკი -->
                    <button onclick="delNote(${n.id})" class="text-red-500 hover:text-red-700"><i class="fa-solid fa-trash text-sm"></i></button>
                </div>
            </div>`;
    });
};

// ახალი ჩანაწერის დამატების ფორმის გაგზავნის (submit) ივენთი
$('noteForm').onsubmit = e => {
    e.preventDefault(); // ვაჩერებთ გვერდის გადატვირთვას ფორმის გაგზავნისას
    // ვამატებთ ახალ ჩანაწერს მასივის დასაწყისში (unshift)
    notes.unshift({ id: Date.now(), title: $('noteTitle').value, text: $('noteText').value, category: $('noteCategory').value, date: Date.now() });
    e.target.reset(); // ვასუფთავებთ ფორმის ველებს
    saveAndRender('ჩანაწერი დაემატა!'); // ვინახავთ და ვაახლებთ ეკრანს
};  

// ფუნქცია ჩანაწერის წასაშლელად, მიბმულია წაშლის ღილაკზე HTML-ში (onclick)
window.delNote = id => {
    // ვფილტრავთ მასივს და ვტოვებთ ყველას გარდა წასაშლელი ჩანაწერისა
    notes = notes.filter(n => n.id !== id);
    saveAndRender('ჩანაწერი წაიშალა!');
};

// ფუნქცია ჩანაწერის სარედაქტირებლად, ხსნის მოდალს შესაბამისი მონაცემებით
window.editNote = id => {
    const n = notes.find(x => x.id === id); // ვეძებთ ჩანაწერს id-ის მიხედვით
    if (n) {
        // ვავსებთ რედაქტირების ფორმის ველებს არჩეული ჩანაწერის მონაცემებით
        $('editNoteId').value = n.id;
        $('editNoteTitle').value = n.title;
        $('editNoteCategory').value = n.category;
        $('editNoteText').value = n.text;
        // ვაჩენთ სარედაქტირებელ მოდალს დამალული კლასების მოხსნით
        $('editModal').classList.remove('hidden', 'opacity-0');
    }
};

// რედაქტირების ფორმის გაგზავნის ივენთი
$('editForm').onsubmit = e => {
    e.preventDefault();
    const n = notes.find(x => x.id == $('editNoteId').value); // ვპოულობთ ჩანაწერს
    if (n) {
        // ვაახლებთ ნაპოვნი ჩანაწერის მონაცემებს
        Object.assign(n, { title: $('editNoteTitle').value, text: $('editNoteText').value, category: $('editNoteCategory').value, date: Date.now() });
        $('editModal').classList.add('hidden'); // ვმალავთ მოდალს
        saveAndRender('ცვლილება შენახულია!');
    }
};

// სარედაქტირებლო მოდალის დახურვის ღილაკებზე (X-ზე და გაუქმების ღილაკზე) ივენთების მიბმა
['closeEditModalBtn', 'cancelEditBtn'].forEach(id => $(id).onclick = () => $('editModal').classList.add('hidden'));

// გვერდითა პანელზე (sidebar) კატეგორიების ღილაკებზე დაჭერის ივენთები
document.querySelectorAll('.sidebar-btn').forEach(btn => btn.onclick = () => {
    // ყველა ღილაკს ვუხსნით აქტიურ კლასებს და ვანიჭებთ არააქტიურს
    document.querySelectorAll('.sidebar-btn').forEach(b => {
        b.classList.remove('bg-[#e6f0f9]', 'text-slate-800');
        b.classList.add('text-slate-700');
    });
    // არჩეულ ღილაკს ვანიჭებთ აქტიურ კლასებს (ლურჯი ფონი, მუქი ტექსტი)
    btn.classList.add('bg-[#e6f0f9]', 'text-slate-800');
    btn.classList.remove('text-slate-700');

    // ვცვლით აქტიურ კატეგორიას არჩეული ღილაკის data-category ატრიბუტის მიხედვით
    activeCategory = btn.dataset.category;
    render(); // თავიდან ვხატავთ ჩანაწერებს ახალი ფილტრით
});

// აპლიკაციის ჩატვირთვისას თავდაპირველი რენდერის (დახატვის) გამოძახება
render();

// როცა კატეგორიების ფორმაში dropdown-დან ავირჩევთ კატეგორიას, 
// ეს მოვლენა (change) უზრუნველყოფს, რომ იმავე კატეგორიით გაიფილტროს ჩვენი ქარდები
$('noteCategory').addEventListener('change', (e) => {
    activeCategory = e.target.value;

    // განვაახლე გვერდითა ნავბარი (sidebar)ასევე ღილაკების დიზაინიც, 
    // რათა არჩეული კატეგორიის ღილაკი გააქტიურებულად გამოჩნდეს
    document.querySelectorAll('.sidebar-btn').forEach(b => {
        if (b.dataset.category === activeCategory) {
            b.classList.add('bg-[#e6f0f9]', 'text-slate-800');
            b.classList.remove('text-slate-700');
        } else {
            b.classList.remove('bg-[#e6f0f9]', 'text-slate-800');
            b.classList.add('text-slate-700');
        }
    });

    render(); // თავიდან ვხატავთ ჩანაწერებს ახალი ფილტრით
});