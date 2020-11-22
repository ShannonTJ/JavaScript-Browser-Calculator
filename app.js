//Query Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
filterOption.addEventListener("click", filterTodo);

//Functions

function addTodo(event) {
  event.preventDefault();

  //Create div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //create li
  const newTask = document.createElement("li");
  newTask.innerText = todoInput.value;
  newTask.classList.add("todo-item");

  todoDiv.appendChild(newTask);

  //add to local storage
  saveTodos(todoInput.value);

  //Checkmark button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");

  todoDiv.appendChild(completedButton);

  //Trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");

  todoDiv.appendChild(trashButton);

  //Append to ul
  todoList.appendChild(todoDiv);

  //Clear input value
  todoInput.value = "";
}

function deleteTodo(event) {
  const item = event.target;

  //Delete todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    //Animation
    todo.classList.add("fall");
    removeLocal(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
      console.log("running");
    });
  } else if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(event) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "complete":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "incomplete":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveTodos(todo) {
  //Check local storage
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  //Check local storage
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    //Create div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create li
    const newTask = document.createElement("li");
    newTask.innerText = todo;
    newTask.classList.add("todo-item");

    todoDiv.appendChild(newTask);

    //Checkmark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");

    todoDiv.appendChild(completedButton);

    //Trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");

    todoDiv.appendChild(trashButton);

    //Append to ul
    todoList.appendChild(todoDiv);
  });
}

function removeLocal(todo) {
  //Check local storage
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todos.indexOf(todo.children[0].innerText);
  todos.splice(todoIndex, 1);
  console.log(todoIndex);
  localStorage.setItem("todos", JSON.stringify(todos));
}
