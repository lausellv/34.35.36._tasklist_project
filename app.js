// Define UI variables
const form = document.querySelector('#task-form'),
  taskList = document.querySelector('.collection'),
  clearBtn = document.querySelector('.clear-tasks'),
  filter = document.querySelector('#filter'),
  taskInput = document.querySelector('#task');

// load all event listener
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  //DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // add task event
  form.addEventListener('submit', addTask);
  // remove task event
  taskList.addEventListener('click', removeTask);
  // clear all tasks
  clearBtn.addEventListener('click', clearTasks);
  //filter task events
  filter.addEventListener('keydown', filterTasks);
}



// remove a task (callback function)
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
      //remove from LS (local storage)
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

//remove from LS
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
if (taskItem.textContent=== task){
    tasks.splice(index, 1)
}
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// clear (remove) all tasks (callback function)
function clearTasks (e){

    //one way of doing it would be as easy as setting the value of taskList back to ''
    //taskList.innerHTML='';
// a faster way however wld be
//https://www.measurethat.net/Benchmarks/Show/34/0/innerhtml-vs-removechild
while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
}
    //if (e.target.classList.contains('clear-tasks))

    // clear from local storage
    clearTasksFromLocalStorage();
};

// clear tasks from Local Storage
function clearTasksFromLocalStorage(){
    localStorage.clear();
}

//filter tasks (callback function)
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  // we can loop bc we used queryselector that returns a node //had we used getElement by class that wld return an HTML collection that would have to in turn be converted to an array so that we cld use forEach but querySelector solves this bc it returns an array

  document.querySelectorAll('.collection-item').forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) !== -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
    
// Load contents of the DOM to the task list from LS = Local Storage (callback function)
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
 // create a list item  IOW a li element
 const li = document.createElement('li');
 // add a class to the li
 li.className = 'collection-item';
 // create the textnode and append to the li
 li.appendChild(document.createTextNode(task));
 // create a new link element
 const link = document.createElement('a');
 // add a class to the a element
 link.className = 'delete-item secondary-content';
 //add icon html
 link.innerHTML = '<i class="fa fa-remove"></i>';
 // append the icon to the link
 li.appendChild(link);
 // Append li to ul
 taskList.appendChild(li);

    });
}



// add a Task (callback function)
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task');
  };

//CREATING AND APPENDING LIST ELEMENTS
  // create a list item  IOW a li element
  const li = document.createElement('li');
  // add a class to the li
  li.className = 'collection-item';
  // create the textnode and append to the li
  li.appendChild(document.createTextNode(taskInput.value));
  // create a new link element
  const link = document.createElement('a');
  // add a class to the a element
  link.className = 'delete-item secondary-content';
  //add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // append the icon to the link
  li.appendChild(link);
  // now we need to append the li to the ul
  taskList.appendChild(li);

  // store in local storage
  storeTaskInLocalStorage(taskInput.value);

  // clear the input
  taskInput.value = '';

  e.preventDefault();
}


// Store Task in local storage
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

}


