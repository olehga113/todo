const addBtn = document.getElementById('addBtn');
const taskInput = document.getElementById('task');
const taskList = document.getElementById('taskList');

// Load tasks from local storage
document.addEventListener('DOMContentLoaded', function () {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(function (task) {
            const li = document.createElement('li');
            li.innerText = task.value;
            li.classList.toggle('completed', task.completed);
            li.innerHTML += '<button class="delete">Delete</button>';
            li.addEventListener('click', function () {
                li.classList.toggle('completed');
                updateLocalStorage();
            });
            li.querySelector('.delete').addEventListener('click', function (event) {
                event.stopPropagation();
                taskList.removeChild(li);
                updateLocalStorage();
            });
            taskList.appendChild(li);
        });
    }
});

addBtn.addEventListener('click', function (event) {
    event.preventDefault();
    const newTask = taskInput.value.trim();
    if (newTask == '') return;
    taskInput.value = '';
    const li = document.createElement('li');
    li.innerText = newTask;
    li.innerHTML += '<button class="delete">Delete</button>';
    li.addEventListener('click', function () {
        li.classList.toggle('completed');
        updateLocalStorage();
    });
    li.querySelector('.delete').addEventListener('click', function (event) {
        event.stopPropagation();
        taskList.removeChild(li);
        updateLocalStorage();
    });
    taskList.appendChild(li);
    updateLocalStorage();
});

taskInput.addEventListener('keydown', function (event) {
    if (event.code === 'Enter') {
        addBtn.click();
    }
});

// Update local storage
function updateLocalStorage() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(function (li) {
        tasks.push({
            value: li.innerText,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
