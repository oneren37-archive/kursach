const usernameField = document.querySelector('#username');

const data = JSON.parse(localStorage.getItem('game')) || {}
const username = data.currentUser

if (username) {
    usernameField.innerHTML = username
}
else {
    window.location.href='./pages/auth/index.html'
}

