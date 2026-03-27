//ვთქვატ ბექენდიდან მოგვდის ან უსერი მაგრამ თუ ბექი ინახავს 2 ან მეტ იუზერს მაშინ
//მოგვდის იუსერების მასივი, თქვენი მიზანია იუზერის ან იუზერების სახელები ჩაწეროთ
//html ში რათა მომხმარებელმა ნახოს იუზერის არ იუზერების სახელები;
// ბექიდან მოვა ან ეს ['ბექა','საბა'] ან 'კახა'

const ulHtml = document.getElementById("userList");
const users = 'bela';

function render(names) {    
  if (Array.isArray(names)){
    names.forEach((name) => {
      ulHtml.innerHTML += `<li>${name}</li>`;
    });
  } else {
    ulHtml.innerHTML += `<li>${names}</li>`;
  }
}
render(users)
