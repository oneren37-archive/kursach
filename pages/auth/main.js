const form = document.querySelector('form')
const inp = document.querySelector('#name')

bindEvents()

function bindEvents() {
    form.addEventListener('submit', handleSubmit)
}

function handleSubmit(e) {
    e.preventDefault()

    const username = inp.value.trim()

    if (username) {
        const data = JSON.parse(localStorage.getItem('game')) || {}
        data.currentUser = username
        localStorage.setItem('game', JSON.stringify(data));
    
        window.location.href = '../../index.html'
    }
}
    
