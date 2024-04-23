const wordEl = document.getElementById('word')
const wrongLettersEl = document.getElementById('wrong-letters')
const playAgainBtn = document.getElementById('play-again')
const popup = document.getElementById('popup-container')
const notification = document.getElementById('notification-container')
const finalMessage = document.getElementById('final-message')
const figureParts = document.querySelectorAll('.figure-part')

const word = ['wizard', 'computer', 'program', 'science']

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

    if(innerWord == selectedWord) {
        finalmessage.innerText = 'Congratulations! You Won!'
        popup.style.display = 'flex'
    }
}

//Update The wrong Letters
function updateWrongLetterEl()
{
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong<p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `

    figureParts.forEach((part, index) =>
    {
        const errors = wrongLetters.length
        if(index < errors)
        {
            part.style.display = 'block'
        } else
        {
            part.style.display = 'none'
        }
    })
}

// show notification
function showNotification()
{
    notification.classList.add('show')

    setTimeout(() =>
    {
        notification.classList.remove('show')
    }, 2000)
}
//Keydown letter press
window.addEventListener('keydown', e =>{

    if(e.keyCode >= 65 && e.keyCode <= 90)
    {
        const letter = e.key

        if (selectedWord.includes(letter))
        {
            if(!correctLetters.includes(letter))
            {
                correctLetters.push(letter)

                displayWord()
            } else
            {
                showNotification()
            }
        }else
        {
            if(!wrongLetters.includes(letter))
            {
                wrongLetters.push(letter)

                updateWrongLettersEl()
            }else
            {
                showNotification()
            }
        }
    }
})
displayWord()
