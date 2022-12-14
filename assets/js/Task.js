export class Task {
    static id = 1;

    constructor(name, status, description, creationTime, deadLine) {
        this.id = Task.id++;
        this.name = name;
        this.status = status;
        this.description = description;
        this.creationTime = creationTime;
        this.deadLine = deadLine;
        this.delay = deadLine-creationTime;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    setStatus(status) {
        this.status = status;
    }

    getStatus() {
        return this.status;
    }

    setDescription(description) {
        this.description = description;
    }

    getDescription() {
        return this.description;
    }

    setCreationTime(creationTime) {
        this.creationTime = creationTime;
    }

    getCreationTime() {
        return this.creationTime;
    }

    setDeadLine(deadLine) {
        this.deadLine = deadLine;
    }

    getDeadLine() {
        return this.deadLine;
    }
}