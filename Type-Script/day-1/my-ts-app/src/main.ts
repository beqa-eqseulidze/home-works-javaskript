import type { ITodo, ITodoWithoutId } from "./models/todo";

const form = document.querySelector("form");
const table = document.querySelector("tbody");

form?.addEventListener("submit", onSave);

const todos: ITodo[] = JSON.parse(localStorage.getItem('todos')??'[]');
renderToDo(todos);

function onSave(e: Event) {
  e.preventDefault();
  const formdata = new FormData(form!);
  const todoWithoutId: ITodoWithoutId = Object.fromEntries(
    formdata,
  ) as unknown as ITodoWithoutId;
  const id = new Date().getTime();
  const todo: ITodo = { ...todoWithoutId, id };
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
  form?.reset();
  renderToDo(todos);
}

function renderToDo(data: ITodo[]): void {
  table!.innerHTML = "";
  data.forEach((item) => {
    table!.innerHTML += `<tr>
          <td>${item.id}</td>
          <td>${item.title}</td>
          <td>${item.category}</td>
         </tr>
        `;
  });
}
