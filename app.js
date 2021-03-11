'use strict'

let star = document.querySelectorAll('.star')
let done = document.querySelectorAll('.circle')
let taskInput = document.querySelector('.task_input')
let plus = document.querySelector('.plus')

function starEdit(elem) {
    let starSolid = '<i class="fas fa-star"></i>'
    if (elem.innerHTML == starSolid) {
        elem.innerHTML = '<i class="far fa-star"></i>'
    } else {
        elem.innerHTML = starSolid
    }
}

function doneEdit(elem) {
    let elemDone = '<i class="fas fa-check-circle"></i>'
    if (elem.innerHTML == elemDone) {
        elem.innerHTML = '<i class="far fa-circle"></i>'
    } else {
        elem.innerHTML = elemDone
    }

}

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


star.forEach(item => item.addEventListener('click', function() {
    starEdit(item)
}))

done.forEach(item => item.addEventListener('click', function() {
    doneEdit(item)
}))