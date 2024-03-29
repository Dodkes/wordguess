const newWordButton = document.getElementById('newWordButton')
const wordContainer = document.getElementById('wordContainer')
const letterButton = document.querySelectorAll('.letter')
const loginContainer = document.getElementById('loginContainer')
const gameContainer = document.getElementById('gameContainer')
const potentialScoreWin = document.getElementById('potentialScore')
const playerScore = document.getElementById('playerScore')

let correctWordArray
let potentialScore, decrementScore
const words = []
let [guessedLetter, guessedWord] = [false, false]

fetch('/Words')
    .then(response => response.json())
    .then(data => {
        for (x of data[0]) {
            words.push(x.word)
        }
    })

newWordButton.addEventListener('click', () => {
    guessedWord = false
    const randomNumber = Math.floor(Math.random() * words.length)
    wordContainer.querySelectorAll('*').forEach(child => child.remove())
    refreshLetters()
    const randomWord = words[randomNumber]
    potentialScore = randomWord.length
    decrementScore = Number((potentialScore / 26).toFixed(2))
    potentialScoreWin.textContent = potentialScore
    correctWordArray = randomWord.split('')
    for (i = 0; i < randomWord.length; i++) {
        generateWord()
    }
    document.addEventListener('keydown', (event) => {
        guessFunction(document.getElementById(event.key.toUpperCase()))
        guessedLetter = false
    })
})

function generateWord () {
    const letterElement = document.createElement('div')
    letterElement.classList.add('wordLetter')
    wordContainer.appendChild(letterElement)
}

letterButton.forEach(button => button.addEventListener('click', () => {
    if (!correctWordArray) return
    if (guessedWord === true) return
    guessedLetter = false
    guessFunction(button)
}))

function guessFunction (button) {
    if (button.classList.contains('clicked')) return
    for (i = 0; i < correctWordArray.length; i++) {
        if (button.textContent === correctWordArray[i] && button.classList.contains('default')) {
            wordContainer.childNodes[i].textContent = correctWordArray[i]
            guessedLetter = true
        } 
    }

    if (guessedLetter === false) {
        potentialScore = Number(potentialScore - decrementScore).toFixed(2)
        potentialScoreWin.textContent = potentialScore
    }

    button.classList.add('clicked')
    button.classList.remove('default')

    const textElements = wordContainer.childNodes
    const textArray = []
    textElements.forEach(element => textArray.push(element.textContent))

    if (textArray.toString() === correctWordArray.toString()) {
        document.querySelectorAll('.wordLetter').forEach(item => {
            item.style.color = 'greenyellow'
        })
        guessedWord = true
        updatePlayerDB('Jozef2', 200)
    }
}


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
            document.getElementById('loggedInPlayer').textContent = playerInDB.name
            playerScore.textContent = playerInDB.score
        } else {
            document.getElementById('loggedInPlayer').textContent = inputValue
            playerScore.textContent = 0
            saveToDB(inputValue)
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
/// UPDATE PLAYER UNFINISHED
function updatePlayerDB (name, score) {
   const data = {
        name: name,
        score: score
   }

   const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
   }

   fetch('/test', requestOptions)
   fetch('/test', requestOptions)
   .then(async response => {
    if (!response.ok) {
        throw new Error('Network response was not OK')
    }
    try {
           const data = await response.json()
           console.log('Response', data)
       } catch (error) {
           console.error('There is a problem with POST request: ', error)
       }
})
}
/// UPDATE PLAYER UNFINISHED
