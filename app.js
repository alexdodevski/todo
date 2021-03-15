'use strict'
// elements for work
let checked = document.querySelector('.checked')
let taskPanel = document.querySelector('.task_panel')
let taskInput = document.querySelector('.task_input')
let plus = document.querySelector('.plus')
let keys = Object.keys(localStorage)


// prototype for TODO 
let methods = {
    changeFavorite() {
        if (this.favorite == false) {
            this.favorite = true
        } else {
            this.favorite = false
        }
    },
    changeFinished() {
        if (this.finished == false) {
            this.finished = true
        } else {
            this.finished = false
        }
    },
    changeCurrent() {
        if (this.current == false) {
            this.current = true
        } else {
            this.current = false
        }
    }
}

// function constructor
function Todo() {
    this.favorite = false
    this.finished = false
    this.current = true
}


for (let key of keys) {
    let item = JSON.parse(localStorage.getItem(key))
    console.log(item)
    if (item.current == true) {
        console.log(item.div)
        taskPanel.innerHTML += item.div
    }
}


checked.addEventListener('click', function() {
    let todo = new Todo();
    // todo.div = document.createElement('div')
    // todo.div.classList.add('task')
    // todo.div.innerHTML = `<div class="circle"><i class="far fa-circle"></i></div><div class="task_text">${taskInput.value}</div><div class="garbage"><i class="far fa-trash-alt"></i></div><div class="star"><i class=" far fa-star"></i></div>`
    // todo.div.setAttribute('currentTodo', new Date())
    todo.div = `<div class="task" currentTodo="${new Date()}"><div class="circle"><i class="far fa-circle"></i></div><div class="task_text">${taskInput.value}</div><div class="garbage"><i class="far fa-trash-alt"></i></div><div class="star"><i class=" far fa-star"></i></div></div>`
    console.log(todo)
    console.log(todo.div)
    taskPanel.innerHTML += todo.div
    localStorage.setItem(new Date(), JSON.stringify(todo))
    taskInput.value = ''
    console.log(localStorage)
})



function removeTodo(elem) {
    console.dir(elem)
    let curChangeElem = elem.parentElement.getAttribute('currentTodo')
    elem.parentElement.remove()
    localStorage.removeItem(curChangeElem)
}

function starEdit(elem) {
    let starSolid = '<i class="fas fa-star"></i>'
    if (elem.innerHTML == starSolid) {
        elem.innerHTML = '<i class="far fa-star"></i>'
    } else {
        elem.innerHTML = starSolid
    }
    let curChangeElem = elem.parentElement.getAttribute('currentTodo')
    let obj = JSON.parse(localStorage.getItem(curChangeElem))
    Object.setPrototypeOf(obj, methods)
    console.log(obj)
    obj.changeFavorite()
    localStorage.setItem(curChangeElem, JSON.stringify(obj))
}

function doneEdit(elem) {
    let elemDone = '<i class="fas fa-check-circle"></i>'
    if (elem.innerHTML == elemDone) {
        elem.innerHTML = '<i class="far fa-circle"></i>'
    } else {
        elem.innerHTML = elemDone
    }
    let curChangeElem = elem.parentElement.getAttribute('currentTodo')
    let obj = JSON.parse(localStorage.getItem(curChangeElem))
    Object.setPrototypeOf(obj, methods)
    console.log(obj)
    obj.changeFinished()
    obj.changeCurrent()
    localStorage.setItem(curChangeElem, JSON.stringify(obj))
}



// work`s block "added todo"
function plusEdit() {
    let circle = '<i class="far fa-circle"></i>'
    plus.innerHTML = circle
}

function plusRemove() {
    let plusDone = '<i class="fas fa-plus-circle"></i>'
    plus.innerHTML = plusDone
}

taskInput.addEventListener('focus', function() {
    plusEdit()
})

taskInput.addEventListener('blur', function() {
    plusRemove()
})



taskPanel.addEventListener('click', function(e) {
    if (e.target.parentElement.classList.contains('star')) {
        starEdit(e.target.parentElement)
    } else if (e.target.parentElement.classList.contains('circle')) {
        doneEdit(e.target.parentElement)
    } else if (e.target.parentElement.classList.contains('garbage')) {
        removeTodo(e.target.parentElement)
    }
})