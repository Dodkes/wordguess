const newWordButton = document.getElementById('newWordButton')
const wordContainer = document.getElementById('wordContainer')

const words = [
    'red',
    'bread',
    'basement',
    'electricity',
    'happiness'
]


newWordButton.addEventListener('click', () => {
    const randomNumber = Math.floor(Math.random() * words.length)


    for (i = 0; i < words[randomNumber].length; i++) {
        console.log(words[randomNumber])
        console.log(i)
        generateWord()
    }
})


function generateWord () {
    const letterElement = document.createElement('span')
    letterElement.textContent = 'lol '
    wordContainer.appendChild(letterElement)
}