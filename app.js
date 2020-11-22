//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

//Event Listeners
todoButton.addEventListener("click", addTodo);

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
