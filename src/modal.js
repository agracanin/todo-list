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
        const dueDate = dateInput.value;
        const project = document.querySelector('.active-nav-item').textContent;

        const newTask = new Task(title, description, dueDate);
        project.addTask(newTask);


        taskTitle.value = '';
        taskDescription.value = '';
        dateInput.value = '';

        renderTasks(project);
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
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();

        toDoList.addProject(taskTitle.value);
        taskTitle.value = "";
        renderProjects();
    });
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
    taskTab.classList.remove('active-nav-item');
    projectTab.classList.remove('active-nav-item');

    event.currentTarget.classList.add('active-nav-item');

    loadForm(event.currentTarget.dataset.type);
}

function renderProjects() {

    const projectContainer = document.querySelector('#projects');

    projectContainer.innerHTML = "";

    for (let i = 3; i < toDoList.projects.length; i++) {
        const projectLabel = document.createElement('li');
        projectLabel.classList.add('project', 'nav-item-toggler');

        const projectSpan = document.createElement('span');
        projectSpan.textContent = toDoList.projects[i].name;

        projectLabel.appendChild(projectSpan);
        projectContainer.appendChild(projectLabel);
    }
}

function renderTasks(project) {
    const tasksContainer = document.querySelector('.today-tasks');  // replace '.tasks-container' with the actual selector for your tasks container
    tasksContainer.innerHTML = '';

    project.getTasks().forEach(task => {
        const todoContainer = document.createElement('div');
        todoContainer.classList.add('todo-container');

        const taskTitle = document.createElement('span');
        taskTitle.classList.add('task-title');
        taskTitle.textContent = task.getName();
        todoContainer.appendChild(taskTitle);

        const taskInfo = document.createElement('div');
        taskInfo.classList.add('task-info');

        const date = document.createElement('span');
        date.classList.add('date');
        date.textContent = task.getDate();
        taskInfo.appendChild(date);

        const icons = document.createElement('div');
        icons.classList.add('icons');

        const deleteIcon = document.createElement('span');
        deleteIcon.textContent = 'X';

        const completeIcon = document.createElement('span');
        completeIcon.textContent = 'O';

        icons.appendChild(deleteIcon);
        icons.appendChild(completeIcon);

        taskInfo.appendChild(icons);

        todoContainer.appendChild(taskInfo);

        tasksContainer.appendChild(todoContainer);
    });
}


export default function openModal() {
    const taskTab = document.querySelector('#task-tab');
    const projectTab = document.querySelector('#project-tab');
    taskTab.classList.remove('active-nav-item');
    projectTab.classList.remove('active-nav-item');
    const modal = document.querySelector('#createModal');
    modal.classList.remove('hidden');

    const closeBtn = document.querySelector('.close-form');
    closeBtn.addEventListener('click', () => { modal.classList.add('hidden') })

    loadForm('task');

    taskTab.classList.add('active-nav-item');

    taskTab.addEventListener('click', selectTab);
    projectTab.addEventListener('click', selectTab);
}