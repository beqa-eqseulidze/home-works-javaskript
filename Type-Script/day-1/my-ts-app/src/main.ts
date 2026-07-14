import type { ITodo, ITodoWithoutId } from "./models/todo";

const form = document.querySelector("form");
form?.addEventListener("submit", onCreate);

const table = document.querySelector("tbody");

let todos: ITodo[] = JSON.parse(localStorage.getItem("todos") ?? "[]");
let todoForEdit: ITodo | null = null;

renderToDo(todos);

function onCreate(e: Event) {
  e.preventDefault();
  const formdata = new FormData(form!);
  const todoWithoutId = Object.fromEntries(
    formdata,
  ) as unknown as ITodoWithoutId;

  if (todoForEdit) {
    todoForEdit.category = todoWithoutId.category;
    todoForEdit.title = todoWithoutId.title;
    localStorage.setItem("todos", JSON.stringify(todos));
    renderToDo(todos);
    todoForEdit = null;
  } else {
    const id = new Date().getTime();
    const todo: ITodo = { ...todoWithoutId, id };
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    renderToDo(todos);
  }
  form?.reset();
}

function renderToDo(data: ITodo[]): void {
  table!.innerHTML = "";
  data.forEach((item) => {
    table!.innerHTML += `<tr>
          <td>${item.id}</td>
          <td>${item.title}</td>
          <td>${item.category}</td>
          <th>
           <button class="edit" id="${item.id}" >შეცვლა</button>
           <button class="delete" id="${item.id}" >წაშლა</button>
          </th>
         </tr>
        `;
  });

  const btnEdits = document.querySelectorAll(".edit");
  const btnDeletes = document.querySelectorAll(".delete");

  btnEdits.forEach((btn) => {
    btn.addEventListener("click", onEdit);
  });

  btnDeletes.forEach((btn) => {
    btn.addEventListener("click", onDelete);
  });
}

function onEdit(e: Event): void {
  const btn = e.target as HTMLElement;
  if (btn && btn.id) {
    let id = +btn.id;
    todoForEdit = todos.find((el) => el.id == id) ?? null;
    const inputs = form?.querySelectorAll("[name]") as unknown;
    if (Array.isArray(inputs)) {
      inputs[0].value = todoForEdit?.title;
      inputs[1].value = todoForEdit?.category;
    }
  }
}

function onDelete(e: Event): void {
  const btn = e.target as HTMLElement;
  if (btn && btn.id) {
    let id = +btn.id;
    let filteredTodos = todos.filter((el) => el.id != id);
    todos = [...filteredTodos];
    localStorage.setItem("todos", JSON.stringify(todos));
    renderToDo(todos);
  }
}

// =============================================================

interface IUser {
  birthYear?: number;
  name: string;
  phones: string[];
  bankAccount?: string;
  status: Status
}

type Status ="adimn"|"user"|"guest"

const person1: IUser = {
  birthYear: 2015,
  name: "ana",
  phones: ["591-55-66-88", "551-85-96-26"],
  status:"guest"

};

const person2: IUser = {
  birthYear: 2020,
  name: "ana",
  phones: ["591-55-66-88", "551-85-96-26"],
  bankAccount: "TB264564515647GEL4511",
  status:"adimn"

};

function getPersonAge(pers: IUser):number|null{
  if(pers.birthYear)
  return new Date().getFullYear() - pers.birthYear;
  else return null
}

let person3:IUser | number | string | null;



