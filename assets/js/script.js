import { states } from "./config.js";

const main = document.querySelector("main");
const todo = document.querySelector(".todo-div");
const doing = document.querySelector(".doing-div");
const done = document.querySelector(".done-div");
const buttonAdd = document.querySelector(".add");
const aside = document.querySelector(".add-task-form");
const filterDelay = document.querySelector(".delay-filter")
const filterName = document.querySelector(".name-filter")



buttonAdd.addEventListener("click", () => {
    main.style.display = "none";
    aside.style.display = "flex";
    buttonAdd.style.display = "none";
    filterDelay.style.display = "none";
    filterName.style.display = "none";
    clearInterval(interval);
});

filterDelay.addEventListener("click", () => {
    filterByDelay()
});

filterName.addEventListener("click", () => {
    filterByName()
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
    endDate.innerText = "Deadline: " + deadLine.toLocaleDateString("fr-FR");
    article.appendChild(endDate);

    let delay = document.createElement("h4");

    let deadline = new Date(task.deadLine) - new Date();

    if (deadline >= (1000 * 60 * 60 * 24)) {
        delay.innerText = Math.ceil(deadline / (1000 * 60 * 60 * 24)) + " jours restants";
    } else {
        delay.innerText = new Date(deadline).toLocaleTimeString("fr-FR") + " heures restantes";
    }
    article.appendChild(delay);

    return article;
}

let taskList = JSON.parse(sessionStorage.getItem("task-list"))

function filterByName() {
    if (taskList !== null) {
        taskList.sort((a, b) => (a.name > b.name) ? 1 : -1);
    }
    console.log(taskList)
    sessionStorage.setItem('task-list', JSON.stringify(taskList))


}
function filterByDelay() {
    if (taskList !== null) {
        taskList.sort((a, b) => (a.delay > b.delay) ? 1 : -1);
    }
    console.log(taskList)
    sessionStorage.setItem('task-list', JSON.stringify(taskList))

}

function fixedHeader() {
    let header = document.querySelector("header");
    let sticky = header.offsetTop;
    if (window.pageYOffset > sticky) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  }


let interval = setInterval(update, 1000);
console.log(JSON.parse(sessionStorage.getItem("task-list")));
window.onscroll = function() {fixedHeader()};
