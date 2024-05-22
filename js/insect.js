const screen = document.querySelectorAll('.screen')
const choose_insect_btns = document.querySelectorAll('.choose-insect-btn')
const game_container = document.getElementById('game-container')
const start_btn = document.getElementById('start-btn')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const message = document.getElementById('message')
let seconds = 0
let score = 0
let selected_insect = {}

start_btn.addEventListener('click', () =>
{
    screen[0].classList.add('up')
    home.classList.add('visable')
    next.classList.add('visable')


})

choose_insect_btns.forEach(btn =>
    {
        btn.addEventListener('click', () =>
        {
            const img = btn.querySelector('img')
            const alt = img.getAttribute('alt')
            const src = img.getAttribute('src')
            screen[1].classList.add('up')
            selected_insect = {src, alt}
            setTimeout(createInsect, 1000)
            startGame()

        })
    })
function startGame()
{
    setInterval(increaseTime, 1000)
}

function increaseTime()
{
    let m = Math.floor(seconds / 60)
    let s = seconds % 60
    if (m < 10) {
        m = `0${m}`
    }
    if (s < 10)
    {
        s= `0${s}`
    }
    timeEl.innerHTML = `Time: ${m}:${s}`
    seconds++
    if (score > 59 && seconds < 30 )
    {
        won.classList.add('visable')
        message.classList.remove('visable')
    }
    if (seconds > 30 && score < 60)
    {
        lost.classList.add('visable')
        message.classList.remove('visable')
    }
    if (seconds > 30 && score == 0)
    {
        lost.classList.add('visable')
    }
}

function createInsect()
{
    const insect = document.createElement('div')
    insect.classList.add('insect')
    const {x, y} = getRandomLocation()
    insect.style.top =  `${y}px`
    insect.style.left =  `${x}px`
    insect.innerHTML = `<img src = "${selected_insect.src}"
        alt = "${selected_insect.alt}"
        style = "transform: rotate(${Math.random() * 360}deg")/>`
    insect.addEventListener('click', catchInsect)
    game_container.appendChild(insect)
}


function catchInsect()
{
    increaseScore()
    this.classList.add('caught')
    setTimeout(() => this.remove(), 2000)
    addInsects()

}


function addInsects()
{
    setTimeout(createInsect, 1000)
    setTimout(createInsect, 1500)
}
function increaseScore()
{

    score = score + 1
    if (score > 19)
    {
        message.classList.add('visable')
    }
    scoreEl.innerHTML = `Score: ${score}`

}


function getRandomLocation()
{
    const width = window.innerWidth
    const height = window.innerHeight
    const x = Math.random() * (width -200) + 100
    const y = Math.random() * (height -200) + 100
    return {x,y}

}

