// require() is used to load and cached Javascript modules. It is similar to C language's #include. It basically reads a Javascript file, executes the file, and then returns the object.
const express = require('express')
const fs = require('fs/promises')

//function for getting all Dos under Todo list
const getAllDos = (req, res) => {
    const allDos = JSON.stringify(res.app.locals.reactions);

    if (res.statusCode >= 400) //above 400 means that there is an error
        res.status(res.statusCode).send(`${res.statusCode} ERROR`); //return error
    else {
        res.writeHead(200, { 'Content-Type': "application/json" }); //200 means success, so we'll write in todos
        res.end(allDos);

        //pass through the data that we have
        console.log(allDos);
    }
};

//function for posting specific todo
const postToDo = (req, res) => {
    const allDos = res.app.locals.reactions;
    const newtodo = req.body.todo;

    const obj = { todo: `${newtodo}` };

    allDos.push(obj);
    //['todo'] = newtodo;
    console.log(allDos)

    res.status(201).json(obj);
    fs.writeFile("./todos.json", JSON.stringify(allDos));
};

const main = () => {
    const app = express();
    const port = 3000;

    // This line adds/uses express.json in every middleware layer.
    app.use(express.json());

    // express.static lets you serve static files back to people/users
    // we're serving files from the "static" directory on our file system
    // to be a little bit more clear, this is actually apath
    app.use(express.static("./static"));

    // This line gets the method route. Basically accesses directory to get all todos.
    app.get("/api/Todos", getAllDos);

    app.post("/api/Todo", postToDo);

    fs.readFile("./todos.json", "utf-8")
        .then((fileContents) => JSON.parse(fileContents))
        .then((data) => {
            // Access local data. Local objects have the property of being local variables within the application.
            app.locals.reactions = data;

            // This prints out which todo it starts on. Specifically, app.listen is used to bind and listen the connections on the specified host and port.  
            app.listen(port, () => {
                console.log(`Todos started on http://localhost:${port}`);
            });
        });
};

main();