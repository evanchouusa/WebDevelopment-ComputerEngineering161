const mainElement = document.getElementsByTagName("main")[0];
const inputElement = document.querySelector("input");

const failAllGet = () => {
    const errorElement = document.createElement("section");
    errorElement.classList.add("error");
    errorElement.innerText =
        "Couldn't fetch anything, is the server up and running?";
    mainElement.appendChild(errorElement);
};

const convertQuestionToElement = (question) => {
    const template = document.getElementById("question-template");
    const clone = template.content.cloneNode(true);

    clone.querySelector("#question").textContent = question.todo;
    return clone;
};

window.onload = () => {
    fetch(`/api/Todos`)
        .then((response) => (response.ok ? response.json() : Promise.reject()))
        .then((data) => {
            console.log(data);
            const listElement = document.querySelector("ul");
            data
                .map(convertQuestionToElement)
                .forEach((element) => listElement.appendChild(element));
        })
        .catch(failAllGet);

    document.querySelector("input").addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            const headers = new Headers();
            headers.set("content-type", "application/json");

            const newtodo = event.currentTarget.value;
            let shouldSendQueuedQueries = true;

            fetch("/api/Todo", {
                    headers,
                    method: "POST",
                    body: JSON.stringify({
                        todo: event.currentTarget.value,
                    }),
                })
                .catch((status) => {
                    console.log(status);
                    // const listElement = document.querySelector("ul");
                    const newItem = { todo: `${newtodo}` };
                    // listElement.append(convertQuestionToElement(newItem));

                    const prevQueuedTodos = localStorage.getItem("queued-todos");
                    if (prevQueuedTodos) {
                        const newTodos = JSON.stringify([
                            ...JSON.parse(prevQueuedTodos), newItem
                        ]);
                        localStorage.setItem("queued-todos", newTodos);
                    } else {
                        localStorage.setItem("queued-todos", JSON.stringify([newItem]));
                    }
                    inputElement.classList.add("error");


                    shouldSendQueuedQueries = false;

                    return {
                        ok: true,
                        json: () => (
                            newItem
                        ),
                    }
                })
                .then((response) => {
                    response.ok && response.status === 201 ?
                        response.json() :
                        Promise.reject(response.status);
                })
                .then((data) => {
                    inputElement.classList.remove("error");
                    inputElement.value = "";
                    const listElement = document.querySelector("ul");
                    listElement.append(convertQuestionToElement(data));
                    if (shouldSendQueuedQueries) {

                    }
                })
                .catch((status) => {
                    console.log(status);
                    const listElement = document.querySelector("ul");
                    const newItem = { todo: `${newtodo}` };
                    listElement.append(convertQuestionToElement(newItem));
                    inputElement.classList.add("error");
                });
        }
    });
};