import { Task } from "./Task.js";
let inputName = document.querySelector(".input-name");
let inputStatesList = document.querySelector(".status-list");
let inputDescription = document.querySelector(".input-description");
let inputDeadline = document.querySelector(".input-deadline");
let submit = document.querySelector(".submit-button");
let buttonDiscard = document.querySelector(".exit-button");
const filterDelay = document.querySelector(".delay-filter");
const filterName = document.querySelector(".name-filter");
const buttonAdd = document.querySelector(".add");

buttonDiscard.addEventListener("click", () => {
    document.querySelector("aside").style.width = "0";
    document.querySelector("main").style.marginLeft = "0";
    buttonAdd.style.display = "block";
    filterDelay.style.display = "block";
    filterName.style.display = "block";
})

submit.addEventListener("click", (e) => {
    createTask(inputName.value, inputStatesList.value, inputDescription.value, new Date(), new Date(inputDeadline.value));
    document.querySelector("aside").style.width = "0";
    document.querySelector("main").style.marginLeft = "0";
    buttonAdd.style.display = "block";
    filterDelay.style.display = "block";
    filterName.style.display = "block";
    location.reload();
});

function createTask(name, status, description, creationTime, deadLine,) {
    let task = new Task(
        name,
        status,
        description,
        creationTime,
        deadLine
    );

    let taskList = JSON.parse(localStorage.getItem("task-list"));
    localStorage.setItem("id-quantity", task.id);

    if (taskList !== null) {

        taskList.push(task);
        localStorage.setItem("task-list", JSON.stringify(taskList));

        return task;

    } else {

        taskList = [];
        taskList.push(task);
        localStorage.setItem("task-list", JSON.stringify(taskList));
    }
}