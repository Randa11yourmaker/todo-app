const todos = [];

function createTodo (text) {
    const todo = {
        id: `${Date.now()}`,
        text: text,
        isCompleted: false,
    }

    todos.push(todo);
}

function deleteTodo (id) {
    const index = todos.findIndex(todo => todo.id === id);
    todos.splice(index, 1);

    return todos;
}

