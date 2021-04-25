//define UI vars
const form = document.querySelector("#task-form");
const tasklist = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//upload evenListeners
loadEventListeners();

// Load all EventListener
function loadEventListeners() {
  //DOM events
  document.addEventListener("DOMContentLoaded", getTasks);
  // Add task event
  form.addEventListener("submit", addTask);
  // remove task event
  tasklist.addEventListener("click", removeTask);
  //   clear task event
  clearBtn.addEventListener("click", clearTasks);
  //filter tasks even
  filter.addEventListener("keyup", filtertasks);
}

//get tasks from LS
function getTasks() {
  if (localStorage.getItem("tasks") === null) tasks = [];
  else tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.forEach(function (task) {
    const li = document.createElement("li");
    // add class
    li.className = "collection-item";
    // create text node and append it
    li.appendChild(document.createTextNode(task));
    // create a new link
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    // add icon html
    link.innerHTML = `<i class='fa fa-remove'></i>`;
    // append the link to li
    li.appendChild(link);
    // append li to ul
    tasklist.appendChild(li);
  });
}
function addTask(e) {
  if (taskInput.value === "") alert("Add task");
  // create li Element
  const li = document.createElement("li");
  // add class
  li.className = "collection-item";
  // create text node and append it
  li.appendChild(document.createTextNode(taskInput.value));
  // create a new link
  const link = document.createElement("a");
  link.className = "delete-item secondary-content";
  // add icon html
  link.innerHTML = `<i class='fa fa-remove'></i>`;
  // append the link to li
  li.appendChild(link);
  // append li to ul
  tasklist.appendChild(li);

  //store in LS
  storeTaskInLocalStorage(taskInput.value);
  taskInput.value = "";
  console.log(li);
  e.preventDefault();
}

// Store task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) tasks = [];
  else tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
//remove

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are You Sure?")) {
      e.target.parentElement.parentElement.remove();

      //remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

//remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null)tasks = [];
  tasks = JSON.parse(localStorage.getItem('tasks'));

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task)tasks.splice(index, 1);
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//clear tasks

function clearTasks(e) {
  // one way
  // tasklist.innerHTML = ''

  // faster way
  while (tasklist.firstChild) tasklist.removeChild(tasklist.firstChild);
}

// filter tasks

function filtertasks(e) {
  const text = e.target.value.toLowerCase();
  console.log(text);
  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) !== -1) task.style.display = "block";
    else task.style.display = "none";
  });
}
