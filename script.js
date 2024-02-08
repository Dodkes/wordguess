const newWordButton = document.getElementById('newWordButton')
const wordContainer = document.getElementById('wordContainer')
const letterButton = document.querySelectorAll('.letter')

let correctWordArray

const words = [
    'RED',
    'BREAD',
    'BASEMENT',
    'ELECTRICITY',
    'HAPPINESS'
]

newWordButton.addEventListener('click', () => {
    const randomNumber = Math.floor(Math.random() * words.length)
    wordContainer.querySelectorAll('*').forEach(child => child.remove());

    refreshLetters()
    correctWordArray = words[randomNumber].split('')
    for (i = 0; i < words[randomNumber].length; i++) {
        generateWord()
    }
})

function generateWord () {
    const letterElement = document.createElement('span')
    letterElement.textContent = ' '
    letterElement.classList.add('wordLetter')
    wordContainer.appendChild(letterElement)
}

letterButton.forEach(button => button.addEventListener('click', () => {
    if (!correctWordArray) return

    button.classList.add('clicked')
    button.classList.remove('default')
    for (i = 0; i < correctWordArray.length; i++) {
        if (button.textContent === correctWordArray[i]) {
            wordContainer.childNodes[i].textContent = correctWordArray[i]
        }
    }

    const textElements = wordContainer.childNodes
    const textArray = []
    textElements.forEach(element => textArray.push(element.textContent))

    if (textArray.toString() === correctWordArray.toString()) {
        alert('Congrats')
    }
}))

function refreshLetters () {
    console.log('OK')
        letterButton.forEach(element => {
            element.classList.add('default')
            element.classList.remove('clicked')
    })
}