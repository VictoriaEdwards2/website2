const wordEl = document.getElementById('word')
const wrongLettersEl = document.getElementById('wrong-letters')
const playAgainBtn = document.getElementById('play-again')
const popup = document.getElementById('popup-container')
const notification = document.getElementById('notification-container')
const finalMessage = document.getElementById('final-message')
const figureParts = document.querySelectorAll('.figure-part')

const word = ['HogRider', 'Larry', 'MegaKnight', 'Lebron']

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
        finalmessage.innerText = 'Congratulations! You Won!'
        popup.style.display = 'flex'
    }
}

displayWord()




//Keydown letter press
window.addEventListner('keydown')
displayWord()
