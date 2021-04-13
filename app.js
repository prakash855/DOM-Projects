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
  // Add task event
  form.addEventListener("submit", addTask);
  // remove task event
  tasklist.addEventListener("click", removeTask);
//   clear task event
clearBtn.addEventListener('click', clearTasks)
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
  taskInput.value = "";
  console.log(li);
  e.preventDefault();
}

//remove

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item"))
    e.target.parentElement.parentElement.remove();
}

//clear tasks

function clearTasks(e){
    // one way 
    // tasklist.innerHTML = ''

    // faster way
    while(tasklist.firstChild)tasklist.removeChild(tasklist.firstChild)
}