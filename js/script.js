// VARIABLES

const todos = [];
const createTodoBtn = document.querySelector('.todo__create-btn')
const inputTodo = document.querySelector('.todo__input')
const outputTodo = document.querySelector('#todo-output-container')

// FUNCTIONS


// LOAD TODOS FROM LOCALSTORAGE
function loadTodos() {
    for (let i = 0; i < localStorage.length; i++) {
        let todoId = localStorage.key(i);
        let todo = localStorage.getItem(todoId);
        todos.push(JSON.parse(todo));
    }

    render();
}

function createTodo (text) {
    const todo = {
        id: `${Date.now()}`,
        text: text,
        isCompleted: false,
    }

    todos.push(todo);
    // RENDER TASKS
    render();
    // SAVE INTO LOCALSTORAGE 
    localStorage.setItem((`${todo.id}`), JSON.stringify(todo));    
}

function deleteTodo (id) {
    const indexToDelete = todos.findIndex(todo => todo.id === id);
    todos.splice(indexToDelete, 1);

    // UPDATE LOCALSTORAGE AFTER DELETE
    localStorageUpdate(id);

    return todos;
}

function localStorageUpdate (id) {
    Object.keys(localStorage).forEach(key => {
        if (key === id) {
            localStorage.removeItem(key);
        }
    })
}

function render() {
    let html = ''

    todos.forEach(todo => {
        html += `
                <div class="todo-output-task">
                    <p class="todo-output__text">${todo.text}</p>
                    <div class="todo-output-btns-wrapper">
                        <button class="todo-output__delete-btn">Delete</button>
                        <button class="todo-output__complete-btn">Complete</button>
                    </div>
                </div>
                `
    })

    outputTodo.innerHTML = html;
}

// LISTENERS

document.addEventListener('DOMContentLoaded', loadTodos);

createTodoBtn.addEventListener('click', () => {
    let text = inputTodo.value;

    createTodo(text);
    inputTodo.value = '';
})





