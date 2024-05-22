const wordEl = document.getElementById('word')
const wrongLettersEl = document.getElementById('wrong-letters')
const playAgainBtn = document.getElementById('play-button')
const popup = document.getElementById('popup-container')
const notification = document.getElementById('notification-container')
const finalMessage = document.getElementById('final-message')
const figureParts = document.querySelectorAll('.figure-part')
let stop = true

const word = ['computer', 'program', 'code', 'science']

let selectedIndex = Math.floor(word.length * Math.random())
let selectedWord = word[selectedIndex]



const correctLetters = []
const wrongLetters = []

//show hidden word
function displayWord() {
    wordEl.innerHTML = `
        ${selectedWord
            .split('')
            .map(letter => `
                <span class="letter">
                    ${correctLetters.includes(letter) ? letter : ''}
                </span>
            `).join('')
        }

    `
    const innerWord = wordEl.innerText.replace(/\n/g, '')

    if (innerWord == selectedWord) {
        finalMessage.innerText = 'Congratulations! You Won!'
        popup.style.display = 'flex'
        stop = false

        window.addEventListener('keydown', e => {

            if (e.keyCode >= 65 && e.keyCode <= 90) {
                pause()

            }

        })
        stop = false
    }
}

//Keydown letter press
window.addEventListener('keydown', e => {

    if (e.keyCode >= 65 && e.keyCode <= 90 && stop) {
        const letter = e.key

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter)

                displayWord()
            }else {
                showNotification()
            }} else {
                if (!wrongLetters.includes(letter)) {
                    wrongLetters.push(letter)

                    updateWrongLettersEl()
                }else {
                    showNotification()
                }

            }
        }

})

//update wrong letters
function updateWrongLettersEl() {
    wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `

//display letters
 figureParts.forEach((part, index) => {
    const errors = wrongLetters.length

    //check if lost
 if (index < errors) {
    part.style.display = 'block'
 } else{
    part.style.display = 'none'
 }
 })




 //check loss
 if (wrongLetters.length == figureParts.length) {
    finalMessage.innerText = `Unfortunately you lost! The correct word was ${selectedWord}.`
    popup.style.display = 'flex'
    stop = false

 }
}

//show notificaiton
function showNotification() {
    notification.classList.add('show')

    setTimeout(() => {
        notification.classList.remove('show')
    }, 2000)
}

//restart game
playAgainBtn.addEventListener('click', () => {
    stop = true
    correctLetters.length = 0
    wrongLetters.length = 0

    selectedIndex = Math.floor(word.length * Math.random())
    selectedWord = word[selectedIndex]

    displayWord()

    updateWrongLettersEl()

    popup.style.display = 'none'
})

displayWord()



