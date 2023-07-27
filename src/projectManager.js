import Task from "./task";
import Project from "./project";

export default class projectManager {
    constructor() {
        this.projects = [];
        this.projects.push(new Project('Home'));
    }

    setProjects(projects) {
        this.projects = projects;
    }

    getProjects() {
        return this.projects;
    }

    addProject(name) {
        const newProject = new Project(name);
        this.projects.push(newProject);
        return newProject;
    }
}