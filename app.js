const taskInput = document.querySelector('#new-task');
const filterInput = document.querySelector('#filter-task')
const ul = document.querySelector('.collections');
const addTaskBtn = document.querySelector('.task-btn');
const clearTaskBtn = document.querySelector('.clear-btn');
const taskForm = document.querySelector('.task-list');
const filterForm = document.querySelector('.filter-tasks');

// Trigger Events
(function triggerEvent(){
    // Load DOM data
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add Task
    taskForm.addEventListener('submit', addTask);
    // Remove Task
    ul.addEventListener('click', removeTask);
    // Clear Task
    clearTaskBtn.addEventListener('click', clearTask);
    // Filter Task
    filterInput.addEventListener('keypress', filterTask);
    filterInput.addEventListener('keydown', filterTask);
})();

// Get data
function getTasks(){
    let tasks;
    if (localStorage.getItem('Tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('Tasks'));
    }
    
        tasks.forEach(task =>{
        // Create list and link element
        const list = document.createElement('li');
        const link = document.createElement('a');

        // Add classname to List and link element
        list.className = 'collection-item';
        link.className = 'delete-item secondary-content';

        // Create text node from user input
        const text = document.createTextNode(task);

        // Append text node to list Element
        list.appendChild(text);

        // Append link to list 
        list.append(link);

        //Add Icon to link element
        //Append list to ul
        link.innerHTML = "<i class='fa fa-times'></i>";
        ul.append(list);
    });
}

// Add Task
function addTask(e) {
    // Create list and link element
    const list = document.createElement('li');
    const link = document.createElement('a');

    // Add classname to List and link element
    list.className = 'collection-item';
    link.className = 'delete-item secondary-content';

    // Create text node from user input
    const text = document.createTextNode(taskInput.value.toUpperCase());

    // Append text node to list Element
    list.appendChild(text);

    // Append link to list 
    list.append(link);
    // console.log(list);

    //Add Icon to link element
    //Append list to ul
    link.innerHTML = "<i class='fa fa-times'></i>";
    (taskInput.value === '') ? alert('Please add a Task!') : ul.append(list);

    addTaskToLocalStorage(taskInput.value.toUpperCase());
    // clear input field
    taskInput.value = '';

    e.preventDefault();
}

// Save task to local storage
function addTaskToLocalStorage(task){
    let tasks;
    if (localStorage.getItem('Tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('Tasks'));
    }

    tasks.push(task); 

    localStorage.setItem('Tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')){
        { confirm("Do you wish to remove task?") 
            ? e.target.parentElement.parentElement.remove() : null;
        }
    }
}

// Clear Task
function clearTask(e) {
    if (ul !== ''){
        while(ul.firstChild){
            ul.firstChild.remove();
        }
    }

    removeTaskFromLocalStorage();
    
    e.preventDefault();
}

// Remove task from local storage
function removeTaskFromLocalStorage(){
    let tasks;

    if(localStorage.getItem('Task') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('Tasks'));
    }

    localStorage.removeItem('Tasks');
}

// Filter Task
function filterTask(e) {
    const text = filterInput.value.toUpperCase();
    const list = document.querySelectorAll('.collection-item');
    
    list.forEach(item => {
        if (item.textContent.indexOf(text) != -1) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}







