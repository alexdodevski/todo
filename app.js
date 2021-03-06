'use strict'
// elements for work
let checked = document.querySelector('.checked')
let taskPanel = document.querySelector('.task_panel')
let taskInput = document.querySelector('.task_input')
let plus = document.querySelector('.plus')
let keys = Object.keys(localStorage)
let dateElem = document.querySelector('.date')
let selectInput = document.querySelector('.select_btn')
let btnTheme = document.querySelector('.btn_theme')
let currentDate = new Date()
let themeMenu = document.querySelector('.theme_menu')
let images = document.querySelectorAll('.image')
let selectedElem
let todoElem = document.querySelector('.todo')


//update date
function changeDate() {
    let months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
    let week = ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"]
    let day = currentDate.getDate()
    let weeklyDay = currentDate.getDay()
    let month = currentDate.getMonth()
    dateElem.innerHTML = `${week[weeklyDay]}, ${day} ${months[month]}`
}



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


// добавление тасок в туду 

function displayTodos() {
    for (let key of keys) {
        let item = JSON.parse(localStorage.getItem(key))
        if (item.current == true) {
            taskPanel.innerHTML += item.div
        }
    }
}

// create and delete todo function.


function createTodo() {
    let data = taskInput.value
    if (data === "" || data == null || data.trim() === "") return false

    let todo = new Todo();
    let id = Date.now()

    todo.div = `<div class="task" currentTodo="${id}"><div class="circle"><i class="far fa-circle"></i></div><div class="task_text">${taskInput.value}</div><div class="garbage"><i class="far fa-trash-alt"></i></div><div class="star"><i class=" far fa-star"></i></div></div>`
    taskPanel.innerHTML += todo.div
    localStorage.setItem(id, JSON.stringify(todo))
    taskInput.value = ''
}

function removeTodo(elem) {
    let curChangeElem = elem.parentElement.getAttribute('currentTodo')
    elem.parentElement.remove()
    localStorage.removeItem(curChangeElem)
}

//edit favorite and finished todo`s category

function starEdit(elem) {

    let starSolid = '<i class="fas fa-star"></i>'
    let curChangeElem = elem.parentElement.getAttribute('currentTodo')
    let obj = JSON.parse(localStorage.getItem(curChangeElem))

    if (elem.innerHTML == starSolid) {
        elem.innerHTML = '<i class="far fa-star"></i>'
        obj.div = elem.parentElement.outerHTML
        if (selectInput.value === 'favorite') {
            Array.from(taskPanel.children).forEach(item => {
                if (item.getAttribute('currentTodo') === curChangeElem) {
                    item.remove()
                }
            })
        }
    } else {
        elem.innerHTML = starSolid
        obj.div = elem.parentElement.outerHTML
    }


    Object.setPrototypeOf(obj, methods)
    obj.changeFavorite()
    localStorage.setItem(curChangeElem, JSON.stringify(obj))
}

function doneEdit(elem) {

    let elemDone = '<i class="fas fa-check-circle"></i>'
    let curChangeElem = elem.parentElement.getAttribute('currentTodo')
    let obj = JSON.parse(localStorage.getItem(curChangeElem))

    if (elem.innerHTML == elemDone) {
        elem.innerHTML = '<i class="far fa-circle"></i>'
        obj.div = elem.parentElement.outerHTML
        Array.from(taskPanel.children).forEach(item => {
            if (item.getAttribute('currentTodo') === curChangeElem) {
                item.remove()
            }
        })
    } else {

        elem.innerHTML = elemDone
        obj.div = elem.parentElement.outerHTML
        Array.from(taskPanel.children).forEach(item => {
            if (item.getAttribute('currentTodo') === curChangeElem) {
                item.remove()
            }
        })
    }

    Object.setPrototypeOf(obj, methods)
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

taskInput.addEventListener('keydown', function(e) {
    if (e.keyCode === 13) {
        createTodo()
    }
})

taskInput.addEventListener('blur', function() {
    plusRemove()
})

// event on task panel ,when click on star, done or garbage icons

taskPanel.addEventListener('click', function(e) {
    if (e.target.parentElement.classList.contains('star')) {
        starEdit(e.target.parentElement)
    } else if (e.target.parentElement.classList.contains('circle')) {
        doneEdit(e.target.parentElement)
    } else if (e.target.parentElement.classList.contains('garbage')) {
        removeTodo(e.target.parentElement)
    }
})

// select onchange

selectInput.addEventListener('change', function() {
    let keys = Object.keys(localStorage)
    taskPanel.innerHTML = ''
    for (let key of keys) {
        let item = JSON.parse(localStorage.getItem(key))
        if (item[selectInput.value] == true) {
            taskPanel.innerHTML += item.div
        }
    }
})


//theme menu

btnTheme.addEventListener('click', function(e) {
    if (themeMenu.style.display == 'block') themeMenu.style.display = 'none'
    else themeMenu.style.display = 'block'
    console.dir(e.target)
})

document.addEventListener('click', function(e) {
    if (e.target.closest('.todo') && e.target !== btnTheme && !themeMenu.contains(e.target)) themeMenu.style.display = 'none'
})

themeMenu.addEventListener('click', function(e) {
    let elem = e.target.closest('.image')
    if (elem) {
        console.log(e.target.src)
        todoElem.style.background = `url(${e.target.src}) no-repeat center`
        todoElem.style.backgroundSize = 'cover'
        hightlight(elem)
        saveSettings(elem, todoElem)
    }
})

function hightlight(elem) {
    if (selectedElem) {
        selectedElem.classList.remove('active')
    }
    selectedElem = elem
    elem.classList.add('active')
}

// saving and rendering settings of theme

function saveSettings(value, bg) {
    console.log(value)
    localStorage.setItem('selectedElem', JSON.stringify(value.getAttribute('data-value')))
    localStorage.setItem('todoStyle', JSON.stringify(bg.style.background))
}

function renderSettings() {
    let num = JSON.parse(localStorage.getItem('selectedElem'))
    selectedElem = images[num]
    selectedElem.classList.add('active')

    let style = JSON.parse(localStorage.getItem('todoStyle'))
    todoElem.style.background = style
}

renderSettings()
displayTodos()