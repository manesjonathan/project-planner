import { states } from "./config.js";

const main = document.querySelector("main");
const todo = document.querySelector(".todo-div");
const doing = document.querySelector(".doing-div");
const done = document.querySelector(".done-div");
const buttonAdd = document.querySelector(".add");
const aside = document.querySelector(".add-task-form");

let interval = setInterval(update, 1000);
console.log(JSON.parse(sessionStorage.getItem("task-list")));

buttonAdd.addEventListener("click", () => {
    main.style.display = "none";
    aside.style.display = "flex";
    buttonAdd.style.display = "none";
    clearInterval(interval);
});

export function update() {
    aside.style.display = "none";
    buttonAdd.style.display = "block";

    todo.innerHTML = null;
    doing.innerHTML = null;
    done.innerHTML = null;

    let taskList = JSON.parse(sessionStorage.getItem("task-list"));
    if (taskList !== null) {
        for (let task of taskList) {
            let article = createArticle(task);
            addArticleToSection(task, article);
        }
    }
}

function addArticleToSection(task, article) {
    switch (task.status) {
        case states.todo:
            todo.appendChild(article);
            break;

        case states.doing:
            doing.appendChild(article);
            break;

        case states.done:
            done.appendChild(article);
            break;
    }
}

function createArticle(task) {
    let creationDate = new Date(task.creationTime);
    let deadLine = new Date(task.deadLine);

    let article = document.createElement("article");
    article.classList.toggle(task.id);
    article.classList.toggle(task.status);
    article.setAttribute("draggable", true);
    article.setAttribute("onDragStart", onDragStart(event))

    let title = document.createElement("h2");
    title.innerText = task.name;
    article.appendChild(title);

    let descriptionContent = document.createElement("p");
    descriptionContent.innerText = task.description;
    article.appendChild(descriptionContent);

    let startDate = document.createElement("h3");
    startDate.innerText = creationDate.toLocaleDateString("fr-FR");
    article.appendChild(startDate);

    let endDate = document.createElement("h3");
    endDate.innerText = deadLine.toLocaleDateString("fr-FR");
    article.appendChild(endDate);

    let delay = document.createElement("h4");

    let deadline = new Date(task.deadLine) - new Date();

    if (deadline >= (1000 * 60 * 60 * 24)) {
        delay.innerText = Math.ceil(deadline / (1000 * 60 * 60 * 24)) + " jours restants";
    } else {
        delay.innerText = new Date(deadline).toLocaleTimeString("fr-FR");
    }
    article.appendChild(delay);

    return article;
}


function onDragStart(event) {
    event.dataTansfer.setData("text/plain", event.target.id);
    //event.currentTarget.style.opacity = "0.6";
}

function onDragOver(event) {
    event.preventDefault();
}

function onDrop(event) {
    const id = event.dataTansfer.getData("text");
    const draggableElement = document.getElementById(id);
    const dropzone = event.target;
    dropzone.appendChild(draggableElement);
    //draggableElement.style.opacity = "1";
    event.dataTransfer.clearData();
}