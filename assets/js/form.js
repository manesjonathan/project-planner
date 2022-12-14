import { Task } from "./Task.js";

let inputName = document.querySelector(".input-name");
let inputStatesList = document.querySelector(".status-list");
let inputDescription = document.querySelector(".input-description");
let inputDeadline = document.querySelector(".input-deadline");
let submit = document.querySelector(".submit-button");

submit.addEventListener("click", (e) => {
    createTask(inputName.value, inputStatesList.value, inputDescription.value, new Date(), new Date(inputDeadline.value));
    location.reload();
});

function createTask(name, status, description, creationTime, deadLine,) {
    let task = new Task(
        name,
        status,
        description,
        creationTime,
        deadLine,
    );

    let taskList = JSON.parse(sessionStorage.getItem("task-list"));

    if (taskList !== null) {

        taskList.push(task);
        sessionStorage.setItem("task-list", JSON.stringify(taskList));

        return task;

    } else {

        taskList = [];
        taskList.push(task);
        sessionStorage.setItem("task-list", JSON.stringify(taskList));

        return task;
    }
}