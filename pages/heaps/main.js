const cards = [...document.querySelectorAll('.card')]
const field = document.querySelector('.field')

const overlay = document.querySelector('.game-overlay')
const overlayText = document.querySelector('.game-overlay__text')

const shuffleBnt = document.querySelector('.restart')
const checkBnt = document.querySelector('.check')

const fieldWidth = field.getClientRects()[0].width
const fieldHeight = field.getClientRects()[0].height

let wtfX = 0
let wtfY = 0

let elWidth = 200
let elHeight = 200

bindEvents()
shuffle()

function shuffle() {
    cards.forEach(elem => {
        const top = Math.round(Math.random()*(fieldHeight-elHeight))
        const left = Math.round(Math.random()*(fieldWidth-elWidth))
        elem.style.top = top + 'px'
        elem.style.left = left + 'px'
        elem.setAttribute('data-top', top)
        elem.setAttribute('data-left', left)
    })
}

function bindEvents() {
    shuffleBnt.addEventListener('click', shuffle)
    checkBnt.addEventListener('click', handleEnd)
    cards.forEach(elem => {
        elem.addEventListener('dragstart', (e) => {
            setTimeout(() => elem.classList.add('invisible'), 0)
            wtfX = e.offsetX
            wtfY = e.offsetY
        })
        elem.addEventListener('dragend', (e) => {
            e.preventDefault()

            let {offsetX, offsetY} = e
            offsetX -= wtfX
            offsetY -= wtfY

            const [y, x] = [+elem.getAttribute('data-top'), +elem.getAttribute('data-left')]

            if (
                offsetX + x > 0 &&
                offsetY + y > 0 &&
                offsetX + x + elWidth <= fieldWidth &&
                offsetY + y + elHeight <= fieldHeight
            ) {
                elem.style.left = (offsetX + x) + 'px'
                elem.style.top = (offsetY + y) + 'px'
                elem.setAttribute('data-left', (offsetX + x))
                elem.setAttribute('data-top', (offsetY + y))
            }

            elem.classList.remove('invisible')
        })
    })
}

function check() {
    let left = null
    let right = null
    let res = true

    cards.forEach(elem => {
        const x = +elem.getAttribute('data-left')
        const type = elem.getAttribute('data-type')

        if (x > fieldWidth/2) {
            if (right === null) right = type
            else if (type !== right) res = false
        } 
        else {
            if (left === null) left = type
            else if (type !== left) res = false
        }
    })

    return res
}

function handleEnd() {
    const status = check()

    if (status) {
        overlay.classList.add('game-overlay__win')
        overlayText.innerHTML = 'Победа'

        const data = JSON.parse(localStorage.getItem('game')) || {}
        const res = data.res = data.res || {}
        const userRes = res[data.currentUser] = res[data.currentUser] || {}
        userRes.heaps = userRes.heaps + 1 || 1

        localStorage.setItem('game', JSON.stringify(data));
    }
    else {
        overlay.classList.add('game-overlay__fail')
        overlayText.innerHTML = 'Поражение'
    }

    overlay.classList.remove('hide')
}