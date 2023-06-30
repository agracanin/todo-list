export default class Task {
    constructor(name, description, dueDate = 'No date') {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.completed = false;
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setDescription(description) {
        this.description = description;
    }

    getDescription() {
        return this.description;
    }

    setDate(dueDate) {
        this.dueDate = dueDate;
    }

    getDate() {
        return this.dueDate;
    }

    setCompleted(value) {
        this.completed = value;
    }

    getCompleted() {
        return this.completed;
    }
}