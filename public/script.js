const newWordButton = document.getElementById('newWordButton')
const wordContainer = document.getElementById('wordContainer')
const letterButton = document.querySelectorAll('.letter')
const loginContainer = document.getElementById('loginContainer')
const gameContainer = document.getElementById('gameContainer')

let correctWordArray
const words = []

fetch('/Words')
    .then(response => response.json())
    .then(data => {
        for (x of data[0]) {
            words.push(x.word)
        }
    })

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
    const letterElement = document.createElement('div')
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
        letterButton.forEach(element => {
            element.classList.add('default')
            element.classList.remove('clicked')
    })
}

function submitForm (event) {
    event.preventDefault()
    if (!document.getElementById('userName').value) return
    loginContainer.style.display = 'none'
    gameContainer.style.display = 'block'
    fetch('/Players')
    .then(response => response.json())
    .then( players => {
        const inputValue = document.getElementById('userName').value
        const playerInDB = players[0].find((element) => element.name === inputValue)

        if (playerInDB !== undefined) {
            console.log(playerInDB)
            document.getElementById('loggedInPlayer').textContent = playerInDB.name
            document.getElementById('playerScore').textContent = playerInDB.score
        } else {
            document.getElementById('loggedInPlayer').textContent = inputValue
            document.getElementById('playerScore').textContent = 0
            saveToDB(inputValue)
            console.log('New Player')
        }
        }
    )
}

function saveToDB (playerName) {
    const data = {
        name: playerName,
        score: 0
    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    fetch('/Players', requestOptions)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not OK')
        }
        return response.json()
    })
    .then(data => {
        console.log('Response', data) //Log response data
    })
    .catch(error => {
        console.error('There is a problem with POST request: ', error)
    })
}