const wordEl = document.getElementById('word')
wrongLettersEl = document.getElementById('wrong-letters')
const playAgainBtm = document.getElementById('play-again')
const popup = document.getElememtById('popup-container')
const notification = document.getElementById('notification-container')
const finalMessage = document.getElementById('final-message')
const figureParts = document.querySelectorAll('.figure-part')

const word = ['application', ' programming', 'interface', ‘wizard’]

let selectedIndex = Math.floor(word.length * Math.random())
let selectedWord = word[selectedIndex]

const correctLetters = []
const wrongLetters = []

//Show hidden word
function displayWord()
{
	wordEl.innerHTML = `
	${selectedWord
.split(' ')
.map(letter => `
<span class = "letter">
	${correctLetters.includes(letter) ? letter : ' '}
</span>
`)join(' ')
}
`
}
displayWord()
