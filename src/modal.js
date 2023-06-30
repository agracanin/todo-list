import Task from "./task";
import Project from "./project";
import projectManager from "./projectManager";

const toDoList = new projectManager();

function createTaskForm() {

    const form = document.createElement('form');
    form.classList.add('create-form');
    form.id = 'create-form';

    const taskTitle = document.createElement('textarea');
    taskTitle.maxLength = '40';
    taskTitle.required = true;
    taskTitle.placeholder = "Task Name (ex: Clean Home)";

    const taskDescription = document.createElement('textarea');
    taskDescription.classList.add('description-textarea');
    taskDescription.maxLength = '240';
    taskDescription.required = true;
    taskDescription.placeholder = "Description (ex: Pick up dirty laundry and mop floors)";

    form.appendChild(taskTitle);
    form.appendChild(taskDescription);

    const bottomForm = document.createElement('div');
    bottomForm.classList.add('bottom-form');

    const dateContainer = document.createElement('div');
    dateContainer.classList.add('date-input-container');

    const dateLabel = document.createElement('label');
    dateLabel.setAttribute('for', 'date-input');
    dateLabel.textContent = 'Due Date:';

    const dateInput = document.createElement('input');
    dateInput.classList.add('date');
    dateInput.setAttribute('type', 'date');
    dateInput.setAttribute('id', 'date-input');

    dateContainer.appendChild(dateLabel);
    dateContainer.appendChild(dateInput);

    bottomForm.appendChild(dateContainer);

    const submitBtn = document.createElement('button');
    submitBtn.classList.add('submit-btn');
    submitBtn.textContent = "Create Task";
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const title = taskTitle.value;
        const description = taskDescription.value;
        const dueDate = dueDate.value;

        const newTask = new Task(title, description, dueDate);

        const projectToAddTo = toDoList.getProjects()[0];
        projectToAddTo.addTask(newTask);

        taskTitle.value = '';
        taskDescription.value = '';
        dateInput.value = '';
    });

    bottomForm.appendChild(submitBtn);

    form.appendChild(bottomForm);

    return form;
}

function createProjectForm() {
    const form = document.createElement('form');
    form.classList.add('create-form', "project-form");
    form.id = 'create-form';

    const taskTitle = document.createElement('textarea');
    taskTitle.maxLength = '40';
    taskTitle.required = true;
    taskTitle.placeholder = "Project Name (ex: Home)";

    const submitBtn = document.createElement('button');
    submitBtn.classList.add('submit-btn');
    submitBtn.textContent = "Create Project";
    submitBtn.addEventListener('click', () => { return });
    form.appendChild(taskTitle);
    form.appendChild(submitBtn);

    return form;
}

function loadForm(type) {
    const content = document.querySelector('.form-container');
    content.innerHTML = '';
    if (type === 'task') {
        content.appendChild(createTaskForm());
    } else {
        content.appendChild(createProjectForm());
    }
}

function selectTab(event) {
    const taskTab = document.querySelector('#task-tab');
    const projectTab = document.querySelector('#project-tab');
    taskTab.classList.remove('active-item');
    projectTab.classList.remove('active-item');

    event.currentTarget.classList.add('active-item');

    loadForm(event.currentTarget.dataset.type);
}

export default function openModal() {
    const taskTab = document.querySelector('#task-tab');
    const projectTab = document.querySelector('#project-tab');
    taskTab.classList.remove('active-item');
    projectTab.classList.remove('active-item');
    const modal = document.querySelector('#createModal');
    modal.classList.remove('hidden');

    const closeBtn = document.querySelector('.close-form');
    closeBtn.addEventListener('click', () => { modal.classList.add('hidden') })

    loadForm('task');

    taskTab.classList.add('active-item');

    taskTab.addEventListener('click', selectTab);
    projectTab.addEventListener('click', selectTab);
}