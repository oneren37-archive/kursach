const match = document.querySelector('#match')
const path1 = document.querySelector('#path1')
const path2 = document.querySelector('#path2')
const path3 = document.querySelector('#path3')
const heaps = document.querySelector('#heaps')

const data = JSON.parse(localStorage.getItem('game'))

if (data.res) {
    Object.keys(data.res).forEach(username => {
        const userRes = data.res[username]

        const matchRes = document.createElement('span')
        matchRes.innerHTML = `${username}: ${userRes.match}`
        match.appendChild(matchRes)

        const heapsRes = document.createElement('span')
        heapsRes.innerHTML = `${username}: ${userRes.heaps}`
        heaps.appendChild(heapsRes)

        const path1Res = document.createElement('span')
        path1Res.innerHTML = `${username}: ${userRes.path[0]}`
        path1.appendChild(path1Res)

        const path2Res = document.createElement('span')
        path2Res.innerHTML = `${username}: ${userRes.path[1]}`
        path2.appendChild(path2Res)

        const path3Res = document.createElement('span')
        path3Res.innerHTML = `${username}: ${userRes.path[2]}`
        path3.appendChild(path3Res)
    })
}
