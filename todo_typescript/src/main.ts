import './assets/styles/sass/partials/_main.scss';

import { Task } from './Task';
import { TaskList } from './TaskList';

const taskListElement = document.querySelector('#task-list');
const searchInput: HTMLInputElement | null = document.querySelector('#search-input');
const addButton: HTMLButtonElement | null = document.querySelector('#add-task');
const newTaskInput: HTMLInputElement | null = document.querySelector('#new-task-input');
const tabRemaining: HTMLButtonElement | null = document.querySelector('#tab-remaining');
const tabCompleted: HTMLButtonElement | null = document.querySelector('#tab-completed');
const tabAll: HTMLButtonElement | null = document.querySelector('#tab-all');

if (!taskListElement || !searchInput || !addButton || !newTaskInput || !tabRemaining || !tabCompleted || !tabAll) {
    throw new Error('DOM elements not found');
}

const taskList = new TaskList();
let currentTab = 'all';


addButton.addEventListener('click', () => {
    const taskValue = newTaskInput.value.trim();
    if (taskValue !== '') {
        createTask(taskValue);
        newTaskInput.value = '';
        render();
    }
});

// Event listener for the input field to trigger search on input
searchInput.addEventListener('input', () => {
    const searchParam = searchInput.value;
    render(searchParam);
});

tabRemaining.addEventListener('click', () => {
    switchTab('remaining');
});

tabCompleted.addEventListener('click', () => {
    switchTab('completed');
});

tabAll.addEventListener('click', () => {
    switchTab('all');
});

function createTask(value: string): void {
    const task = new Task(value);
    taskList.addTask(task);
}

function render(searchParam: string = '') {
    const filteredTaskList = search(taskList, searchParam);
    renderList(filteredTaskList);
}

function search(list: TaskList, searchTerm: string = ''): TaskList {
    const tasks = list.list.filter((item) => {
        return item.value.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return new TaskList(tasks);
}

function renderList(tasks: TaskList) {
    if (!taskListElement) throw new Error('DOM element not found');

    taskListElement.innerHTML = '';

    const filteredTasks = filterByTab(tasks, currentTab);

    filteredTasks.list.forEach((task) => {
        const element = document.createElement('div');
        element.classList.add('task-item');

        const label = document.createElement('label');
        label.classList.add('form-control');
        element.appendChild(label);

        const inputField = document.createElement('input');
        inputField.setAttribute('type', 'checkbox');
        inputField.checked = task.completed;

        // Event listener for changing the task completion status
        inputField.addEventListener('change', () => {
            toggleTaskCompleted(task.id);
        });

        const taskValue = document.createElement('div');
        taskValue.classList.add('task-item-value');
        taskValue.textContent = task.value;

        label.appendChild(inputField);
        label.appendChild(taskValue);

        taskListElement.appendChild(element);
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn-delete');
        deleteButton.textContent = 'Delete';

        // Event listener for the delete button
        deleteButton.addEventListener('click', () => {
            deleteTask(task.id);
        });

        element.appendChild(deleteButton);

        // taskListElement.appendChild(element);
        taskListElement.insertBefore(element, taskListElement.firstChild);
    });
}
function deleteTask(id: string): void {
    taskList.deleteTaskById(id);
    render(); // Render the updated task list after deletion
}

function toggleTaskCompleted(id: string): void {
    const task = taskList.getTaskById(id);

    if (task) {
        task.toggleCompleted();
        render(); // Render the updated task list after toggling completion status
    }
}

function switchTab(tab: string): void {
    currentTab = tab;

    // Remove 'active' class from all tabs
    [tabRemaining, tabCompleted, tabAll].forEach(tab => {
        if (tab) {
            tab.classList.remove('active');
        }
    });

    // Add 'active' class to the clicked tab
    if (tab === 'remaining') {
        tabRemaining?.classList.add('active');
    } else if (tab === 'completed') {
        tabCompleted?.classList.add('active');
    } else {
        tabAll?.classList.add('active');
    }

    render();
}

function filterByTab(list: TaskList, tab: string): TaskList {
    if (tab === 'completed') {
        return new TaskList(list.list.filter(item => item.getCompleted()));
    } else if (tab === 'remaining') {
        return new TaskList(list.list.filter(item => !item.getCompleted()));
    } else {
        return list;
    }
}

// Initial render with the default tab
render();


