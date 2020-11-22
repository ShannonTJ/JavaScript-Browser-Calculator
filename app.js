//Query Selectors
const taskInput = document.querySelector(".task-input");
const taskButton = document.querySelector(".task-button");
const taskList = document.querySelector(".task-list");
const filterOption = document.querySelector(".filter-task");

//Event Listeners
document.addEventListener("DOMContentLoaded", loadTasks);
taskButton.addEventListener("click", addTask);
taskList.addEventListener("click", removeTask);
filterOption.addEventListener("click", filterTask);

//Functions

function loadTasks() {
  //Check local storage
  let tasks = checkLocal();

  tasks.forEach(function (task) {
    //Create div
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    //create li
    const newTask = document.createElement("li");
    newTask.innerText = task;
    newTask.classList.add("task-item");

    taskDiv.appendChild(newTask);

    createButtons(taskDiv);

    //Append to ul
    taskList.appendChild(taskDiv);
  });
}

function addTask(event) {
  event.preventDefault();

  //Only add non-empty strings
  if (taskInput.value !== "") {
    //Create div
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    //create li
    const newTask = document.createElement("li");
    newTask.innerText = taskInput.value;
    newTask.classList.add("task-item");

    taskDiv.appendChild(newTask);

    //add to local storage
    saveToLocal(taskInput.value);

    createButtons(taskDiv);

    //Append to ul
    taskList.appendChild(taskDiv);

    //Clear input value
    taskInput.value = "";

    //Tasks added when "complete" is selected will not be displayed
    displayTasks(taskList, filterOption.value);
  }
}

function removeTask(event) {
  const btnPressed = event.target;

  //Remove task
  if (btnPressed.classList[0] === "trash-btn") {
    const task = btnPressed.parentElement;

    //Animation
    task.classList.add("fall");

    //Remove from local storage
    removeLocal(task);
    task.addEventListener("transitionend", function () {
      //Remove from UI
      task.remove();
    });
  } else if (btnPressed.classList[0] === "complete-btn") {
    //Add strikethrough
    const task = btnPressed.parentElement;
    task.classList.toggle("completed");

    //If a task is toggled, it will display on different dropdown selections
    displayTasks(taskList, filterOption.value);
  }
}

function filterTask(event) {
  //Changes tasks displayed when the dropdown is active
  displayTasks(taskList, event.target.value);
}

function displayTasks(taskList, value) {
  const tasks = taskList.childNodes;
  tasks.forEach(function (task) {
    switch (value) {
      case "all":
        //Display all tasks
        task.style.display = "flex";
        break;
      case "complete":
        //Display complete tasks
        if (task.classList.contains("completed")) {
          task.style.display = "flex";
        } else {
          task.style.display = "none";
        }
        break;
      case "incomplete":
        //Display incomplete tasks
        if (!task.classList.contains("completed")) {
          task.style.display = "flex";
        } else {
          task.style.display = "none";
        }
        break;
    }
  });
}

function saveToLocal(task) {
  //Check local storage
  let tasks = checkLocal();

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeLocal(task) {
  //Check local storage
  let tasks = checkLocal();

  const taskIndex = tasks.indexOf(task.children[0].innerText);
  tasks.splice(taskIndex, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function checkLocal() {
  //Check local storage
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  return tasks;
}

function createButtons(taskDiv) {
  //Checkmark button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");

  taskDiv.appendChild(completedButton);

  //Trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");

  taskDiv.appendChild(trashButton);
}
