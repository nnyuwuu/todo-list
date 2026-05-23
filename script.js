
{
    id: Number;
    text: String;
    completed: Boolean
}
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark')
}
const inputEl = document.querySelector('.todo__input')
const addBtn = document.querySelector('.todo__add-btn')
const todoList = document.querySelector('.todo__list')
const filterBtns = document.querySelectorAll('.todo__filter')
const counterEl = document.querySelector('.todo__counter')
const themeBtn = document.querySelector('.todo__theme-btn')

themeBtn.addEventListener('click', function() {
    document.body.classList.toggle('dark')
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light')
})

let currentFilter = "all"
let todos = []
const saved = localStorage.getItem('todos')
if (saved) {
    todos = JSON.parse(saved)
}
renderTodos()


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
    let filteredTodos = todos

    if (currentFilter === "active") {
        filteredTodos = todos.filter(todo => !todo.completed)
    } else if (currentFilter === "completed") {
        filteredTodos = todos.filter(todo => todo.completed)
    }
    filteredTodos.forEach(todo =>{  
        
        const li = document.createElement("li")
        li.className = "todo__item"
        li.innerHTML = `
        <input type="checkbox">
        <span class="todo__item-text">${todo.text}</span>
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
    const activeTodos = todos.filter(todo => !todo.completed)
    counterEl.textContent = `${activeTodos.length} tasks left`
    
    saveTodos()
}
function saveTodos() {
localStorage.setItem('todos', JSON.stringify(todos))

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

filterBtns.forEach(btn => {
    btn.addEventListener("click", function(){
        currentFilter = btn.dataset.filter
        filterBtns.forEach(b => b.classList.remove('todo__filter--active'))
        btn.classList.add('todo__filter--active')
        renderTodos()
    })
})
