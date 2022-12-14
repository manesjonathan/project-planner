import { states } from "./config.js";
import { Task } from "./Task.js";

console.log(JSON.parse(sessionStorage.getItem("task-list")));
const main = document.querySelector("main");
const todo = document.querySelector(".todo");
const doing = document.querySelector(".doing");
const done = document.querySelector(".done");
const buttonAdd = document.querySelector(".add");
const aside = document.querySelector("aside");

buttonAdd.addEventListener("click", () => {
 
/*     main.style.display = "block"; */
 
        let name = prompt("name");
    let status = prompt("status");
    let description = prompt("description");
    let creationTime = new Date();
    let deadLine = new Date("2023/01/01");

    createTask(name, status, description, creationTime, deadLine);
    update(); 
});
update();

function update() {
    todo.innerHTML = null;
    doing.innerHTML = null;
    done.innerHTML = null;
    
    let taskList = JSON.parse(sessionStorage.getItem("task-list"));
    for (let task of taskList) {
        let article = createArticle(task);
        addArticleToSection(task, article);
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

function createArticle(task) {
    let creationDate = new Date(task.creationTime);
    let deadLine = new Date(task.deadLine);

    let article = document.createElement("article");
    article.classList.toggle(task.name);
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
    endDate.innerText = deadLine.toLocaleDateString("fr-FR");
    article.appendChild(endDate);

    let delay= document.createElement("h4")
    delay.innerText= (task.delay/(1000*60*60*24)).toFixed(0) + " jours restant"
    article.appendChild(delay)

    return article;
}
