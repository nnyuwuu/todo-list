
{
    id: Number;
    text: String;
    completed: Boolean
}
const inputEl = document.querySelector('.todo__input')
const addBtn = document.querySelector('.todo__add-btn')
const todoList = document.querySelector('.todo__list')

let todos = []

function addTodo (){
    if (inputEl.value === "")return
    todos.push({
        id: Date.now(),
        text: inputEl.value,
        completed: false
    })
    inputEl.value =""
    renderTodos()
}
addBtn.addEventListener("click", function(){
    addTodo()
})
function renderTodos(){
    todoList.innerHTML = ""
    todos.forEach(todo =>{  
        
        const li = document.createElement("li")
        li.className = "todo__item"
        li.innerHTML = `
        <input type="checkbox">
        <span class="todo__item-text">${todo.text}</span>
        <button class="todo__edit-btn">
        <img src="icons/edit.svg" alt="edit task">
        </button>
        <button class="todo__delete-btn" data-id="${todo.id}">
        <img src="icons/delete.svg" alt="delete task">
        </button>
        `
        const deleteBtn = li.querySelector(".todo__delete-btn")
        deleteBtn.addEventListener("click", function(){
            deleteTodo(todo.id)
        })
        const checkbox = li.querySelector('input[type="checkbox"]')
        checkbox.addEventListener("change", function(){
            toggleTodo(todo.id)
        })
        checkbox.checked = todo.completed
        if (todo.completed) {
            li.classList.add('todo__item--completed')
}
        todoList.appendChild(li)
        
    })
    if (todos.length === 0) {
        todoList.innerHTML = `<li class="todo__empty-img">
            <img src="images/todo_luffy.png" alt="image for empty todo list" width="400">
        </li>`
    }
    

}
function deleteTodo(id){
    todos = todos.filter(todo => todo.id !== id)
    renderTodos()
}
function toggleTodo(id){
    const todo = todos.find(todo => todo.id === id)
    todo.completed = !todo.completed
    renderTodos()
}