const gameContainer = document.querySelector('main')
const overlay = document.querySelector('.game-overlay')
const overlayText = document.querySelector('.game-overlay__text')

const words = [
    ['Бык', 'Корова'],
    ['Лошадь', 'Мул'],
    ['Король', 'Королева'],
    ['Демон', 'Люцифер']
]

const images = {
    "Королева": "./img/oneren_queen_c487546e-16d4-4512-8fa8-b6afaf771b97.png",
    "Король": "./img/oneren_european_king_af6f2c59-f70b-4ad1-ba28-8ae677c9882e.png",
    "Лошадь": "./img/oneren_horse_f8a60c5a-5bcb-4c00-80de-9e0303bf137f.png",
    "Мул": "./img/oneren_mule_8dded179-a6b3-4c04-95e2-3a1599aa953d.png",
    "Корова": "./img/oneren_cow_bd8dfe46-7e2e-44cd-8d57-510464a7c160.png",
    "Бык": "./img/oneren_bull_6e7e0b58-0c53-421f-a765-a59f6f814e1b.png",
    "Демон": "./img/oneren_dark_female_demon_c997b3d8-519a-4e38-9626-d2d32b4ba97a.png",
    "Люцифер": "./img/oneren_dark_lucifer_9deb481f-a89c-48c7-8220-0e72a620fe95.png"
}

const colors = ['#CD5C5C', '#98FB98', '#8FBC8F', '#EEE8AA', '#778899'].sort(() => Math.random()-0.5)
const userPairs = []
let current = null
let currentColor = null
let currentPair
let pairCounter = 0

function renderWords(words) {
    const flatWords = words.flat(2)
    flatWords.sort(() => Math.random()-0.5)
    for (let i = 0; i < flatWords.length; i++) {
        const newWord = document.createElement('div')
        newWord.classList.add('word')
        newWord.style=`background-image:url("${images[flatWords[i]]}")`
        const span = document.createElement('span')
        span.innerHTML = flatWords[i]
        span.addEventListener('click', (event) => {event.stopPropagation()})
        newWord.appendChild(span)
        newWord.setAttribute('data-word', flatWords[i])
        newWord.addEventListener('click', handleClick)
        gameContainer.appendChild(newWord)
    }
}

function handleClick(e) {
    const target = e.target
    target.removeEventListener('click', handleClick)
    if (!current) {
        current = target
        currentColor = colors.pop()
        currentPair = [current.getAttribute('data-word')]
    }
    else {
        current = null
        currentPair.push(target.getAttribute('data-word'))
        if (!findPair(...currentPair)) handleEnd(false)
        else {
            userPairs.push(currentPair)
            pairCounter += 1
            if (pairCounter === words.length) handleEnd(true)
        }
    }
    target.style.border = "5px solid " + currentColor
    
}

function findPair(w1, w2) {
    for (let j = 0; j < words.length; j++) {
        curr1 = words[j][0]
        curr2 = words[j][1]

        if ((w1 === curr1 && w2 === curr2) || (w2 === curr1 && w1 === curr2)) return true
    }
    return false
}

function handleEnd(status) {
    if (status) {
        overlay.classList.add('game-overlay__win')
        overlayText.innerHTML = 'Победа'

        const data = JSON.parse(localStorage.getItem('game')) || {}
        const res = data.res = data.res || {}
        const userRes = res[data.currentUser] = res[data.currentUser] || {}
        userRes.match = userRes.match + 1 || 1
        localStorage.setItem('game', JSON.stringify(data));
    }
    else {
        overlay.classList.add('game-overlay__fail')
        overlayText.innerHTML = 'Поражение'
    }

    overlay.classList.remove('hide')
}


renderWords(words)