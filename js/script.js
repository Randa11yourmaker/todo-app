// VARIABLES

const todos = [];
const createTodoBtn = document.querySelector('.todo__create-btn');
const inputTodo = document.querySelector('.todo__input');
const outputTodo = document.querySelector('#todo-output-container');


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
        date: getDate(),
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
    const todoToDelete = todos.findIndex(todo => todo.id === id);
    todos.splice(todoToDelete, 1);

    // UPDATE LOCALSTORAGE AFTER DELETE
    localStorageDeleteTodo(id);

    // RENDER TASKS
    render();
}

function clearCompleted() {

    for (let i = todos.length - 1; i >= 0; i--){
        if (todos[i].isCompleted === true) {
            localStorage.removeItem(todos[i].id);
            todos.splice(i, 1);
        }
    }

    render();
}

function completeTodo (id) {
    const todoToComplete = todos.find(todoToComplete => todoToComplete.id === id);
    if (todoToComplete) {
        todoToComplete.isCompleted = !todoToComplete.isCompleted;
    }

    localStorageCompleteTodo(id);

    render();
}

function render() {
    let html;

    todos.length === 0 ? 
        html = '<p class="todo-output-null">NOTHING TO DO YET</p>' :
        html = '';

    const sortedTodos = todos.sort((a, b) => a.id - b.id);
    
    sortedTodos.forEach(todo => {

        if(todo.isCompleted === false) {
            html += `
                    <div class="todo-output-task">
                        <p class="todo-output__text">${todo.text}</p>
                        <p class="todo-output__date">${todo.date}</p>
                        <div class="todo-output-btns-wrapper">
                            <button onclick="deleteTodo('${todo.id}')" class="todo-output__delete-btn">Delete</button>
                            <button onclick="completeTodo('${todo.id}')" class="todo-output__complete-btn">Complete</button>
                        </div>
                    </div>
                    `
        }else{
            html += `
                    <div class="todo-output-task">
                        <p class="todo-output__text todo-output__textIsComplete">${todo.text}</p>
                        <p class="todo-output__date">${todo.date}</p>
                        <div class="todo-output-btns-wrapper">
                            <button onclick="deleteTodo('${todo.id}')" class="todo-output__delete-btn">Delete</button>
                            <button onclick="completeTodo('${todo.id}')" class="todo-output__complete-btn">Complete</button>
                        </div>
                    </div>
                    `
        }
        
    })

    outputTodo.innerHTML = html;
}

function getDate() {
    let month = ["января", "февраля", "марта", "апреля",
        "мая", "июня", "июля", "августа",
        "сентября", "октября", "ноября", "декабря"]

    let date = new Date();
    let dateMonth = month[date.getMonth()];
    let dateTime = `${date.getHours()}:${date.getMinutes()} `;

    return `${date.getDate()} ${dateMonth} ${dateTime}`;
    
}


// LOCALSTORAGE FUNCTIONS

function localStorageDeleteTodo (id) {
    Object.keys(localStorage).forEach(key => {
        if (key === id) {
            localStorage.removeItem(key);
        }
    })
}

// function localStorageClearCompleted () {
//     todos.forEach(todo => {
//         let todoToCheck = JSON.parse(localStorage.getItem(todo.id))
//         if (todoToCheck.isCompleted === true) {
//             localStorage.removeItem(todo.id);
//         }
//     })
// }

function localStorageCompleteTodo (id) {
    const itemToComplete = JSON.parse(localStorage.getItem(id));

    if (itemToComplete) {
        itemToComplete.isCompleted = !itemToComplete.isCompleted;

        localStorage.setItem(`${id}`, JSON.stringify(itemToComplete));
    }
}

// LISTENERS

document.addEventListener('DOMContentLoaded', loadTodos);

document.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        let text = inputTodo.value;
        let isTextEmpty = inputTodo.value.trim();

        if(isTextEmpty){
            createTodo(text);
            inputTodo.value = '';
            
        }else{
            alert('Nothing to add')
            inputTodo.value = '';
        }
    }
});

createTodoBtn.addEventListener('click', function() {
    let isTextEmpty = inputTodo.value.trim();

    if(isTextEmpty){
        let text = inputTodo.value;

        createTodo(text);
        inputTodo.value = '';
    }else{
        alert('Nothing to add');
        inputTodo.value = '';
    }
})





