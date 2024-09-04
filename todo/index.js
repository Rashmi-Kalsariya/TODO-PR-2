const express = require('express')

const app = express()
app.use(express.json())


let initialTodo = [
    { title: "HTML", isCompleted: true, id: 1 },
    { title: "javascript", isCompleted: true, id: 2 },
    { title: "React", isCompleted: false, id: 3 }
]


app.get("/", (req, res) => {
    res.send("welcome to the todo api")
})


app.get("/todos", (req, res) => {
    res.send(initialTodo)
})


app.get("/todo/:id", (req, res) => {

    let { id } = req.params;
    id = parseInt(id);

    let todoItem = initialTodo.find(todo => todo.id === id);

    if (!todoItem) {
        return res.status(404).send('Todo not found');
    }

    res.send(todoItem);

    // Not Passing Case so Copied One line From ChatGpt
    // id = parseInt(id); 


})




app.get("/findbystatus", (req, res) => {
    let { isCompleted } = req.query;

    if (!isCompleted) {
        return res.status(400).send({ msg: "isCompleted query parameter is required" });
    }

    let status = isCompleted.toLowerCase() == "true";

    let filteredTodos = initialTodo.filter(todo => todo.isCompleted == status);

    res.send(filteredTodos);
});




app.post("/addtodo", (req, res) => {

    let { title, isCompleted } = req.body;


    let data = {
        id: Date.now(),
        title,
        isCompleted
    };

    initialTodo.push(data);
    res.send(data);

})




app.patch("/update/:id", (req, res) => {

    let { id } = req.params;

    const Index = initialTodo.findIndex(todo => todo.id === id);

    initialTodo[Index] = { ...initialTodo[Index], ...req.body };
    res.send(initialTodo[Index]);
})




app.delete("/delete/:id", (req, res) => {
    let { id } = req.params;
    id = parseInt(id);

    let index = initialTodo.findIndex(todo => todo.id === id);

    let deletedTodo = initialTodo.splice(index, 1);

    res.send({ deletedTodo: deletedTodo[0], todos: initialTodo });

    // Not Passing Case So copied Two Lines From ChatGpt
    // res.send({ deletedTodo: deletedTodo[0], todos: initialTodo });
    // id = parseInt(id);

});




app.listen(8090, () => {
    console.log("Listening On Port 8090");

})