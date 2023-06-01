// const form = document.querySelector("#form");
// const taskInput = document.querySelector("#taskInput");
// const tasksList = document.querySelector("#tasksList");
// const emptyList = document.querySelector("#emptyList");

// // Создаем массив с новыми задачами
// const tasks = [];

// form.addEventListener("submit", addTask);
// tasksList.addEventListener("click", deleteTask);
// tasksList.addEventListener("click", doneTask);

// // Добавление задачи
// function addTask(event) {
//   event.preventDefault();
//   const taskText = taskInput.value;

//   // Создали объект с задачей которая будет отправляться в массив
//   const newTask = {
//     id: Date.now(),
//     text: taskText,
//     done: false,
//   };

//   // Добавляем задачу в массив с задачами
//   tasks.push(newTask);

//   console.log(tasks);

//   // Формируем css класс
//   const cssClass = newTask.done ? "task-title--done" : "task-title";

//   taskHTML = `
//   <li id="${newTask.id}" class="list-group-item  d-flex justify-content-between task-item">
//   <span class="${cssClass}">${newTask.text}</span>
//   <div class="task-item__buttons">
//     <button type="button" data-action="done" class="btn-action">
//       <img src="./img/tick.svg" alt="Done" width="18" height="18">
//     </button>
//     <button type="button" data-action="delete" class="btn-action">
//       <img src="./img/cross.svg" alt="Done" width="18" height="18">
//     </button>
//   </div>
// </li> `;
//   tasksList.insertAdjacentHTML("beforeend", taskHTML);

//   if (emptyList.children.length > 1) {
//     emptyList.classList.add("none");
//   }
//   taskInput.value = "";
//   taskInput.focus();
// }
// // Удаление задачи
// function deleteTask(event) {
//   if (event.target.dataset.action === "delete") {
//     const parenNode = event.target.closest(".list-group-item");

//     // Определяем id задачи
//     const id = Number(parenNode.id);
//     // Перебираем массив с помощью метода findIndex
//     const index = tasks.findIndex((task) => task.id === id);

//     // Удаляем задачу из массива
//     tasks.splice(index, 1);
//     parenNode.remove();
//   }
//   if (tasksList.children.length === 1) {
//     emptyList.classList.remove("none");
//   }
// }
// // Выполнение задачи
// function doneTask(e) {
//   if (e.target.dataset.action === "done") {
//     const parenNode = e.target.closest(".list-group-item");
//     const taskDone = parenNode.querySelector(".task-title");
//     taskDone.classList.toggle("task-title--done");
//   }
// }

const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");

let tasks = [];

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.forEach((task) => renderTask(task));
}

checkEmptyList();

form.addEventListener("submit", addTusk);
function addTusk(event) {
  event.preventDefault();
  const taskText = taskInput.value;

  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };

  tasks.push(newTask);
  // добавляем задачу в хранилище браузера
  saveToLocalStorage();
  renderTask(newTask);

  taskInput.value = "";
  taskInput.focus();
  checkEmptyList();
}

tasksList.addEventListener("click", deleteTask);

function deleteTask(event) {
  if (event.target.dataset.action === "delete") {
    const parenNode = event.target.closest("li");
    // Определяем id задачи
    const id = Number(parenNode.id);

    const index = tasks.findIndex((task) => task.id === id);
    tasks.splice(index, 1);

    // tasks = tasks.filter((task) => task.id !== id);
    saveToLocalStorage();
    parenNode.remove();
  }
  checkEmptyList();
}

tasksList.addEventListener("click", doneTask);
function doneTask(event) {
  if (event.target.dataset.action === "done") {
    const parenNode = event.target.closest("li");

    const id = Number(parenNode.id);
    const task = tasks.find(function (task) {
      if (task.id === id) {
        return true;
      }
    });

    task.done = !task.done;
    saveToLocalStorage();
    const taskText = parenNode.querySelector(".task-title");
    taskText.classList.toggle("task-title--done");
  }
}

function checkEmptyList() {
  if (tasks.length === 0) {
    const emptyListHTML = `
    <li id="emptyList" class="list-group-item empty-list">
    <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
    <div class="empty-list__title">Список дел пуст</div>
  </li>`;
    tasksList.insertAdjacentHTML("afterbegin", emptyListHTML);
  }
  if (tasks.length > 0) {
    const emptyListEl = document.querySelector("#emptyList");
    emptyListEl ? emptyListEl.remove() : null;
  }
}

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTask(task) {
  const cssClass = task.done ? "task-title task-title--done" : "task-title";

  const taskHTML = `
  <li id="${task.id}" class="list-group-item  d-flex justify-content-between task-item">
  <span class="${cssClass}">${task.text}</span>
  <div class="task-item__buttons">
    <button type="button" data-action="done" class="btn-action">
      <img src="./img/tick.svg" alt="Done" width="18" height="18">
    </button>
    <button type="button" data-action="delete" class="btn-action">
      <img src="./img/cross.svg" alt="Done" width="18" height="18">
    </button>
  </div>
</li>`;

  tasksList.insertAdjacentHTML("beforeend", taskHTML);
}
