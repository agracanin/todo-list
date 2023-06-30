import openModal from "./modal";
import Task from "./task";
import projectManager from "./projectManager";
import Project from "./project";

const createNew = document.querySelector('.new-project');
createNew.addEventListener('click', openModal);