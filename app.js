//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

//Event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);

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

function deleteTodo(event) {
  const item = event.target;

  //Delete todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    //Animation
    todo.classList.add("fall");
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  } else if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}
