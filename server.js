const express = require('express')
const path = require('path')

const app = express()


app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/api/users', (req, res) => {
    const users = [{
        id: '1',
        name: 'Peter'
    },
    {
        id: '2',
        name: 'Michael'
    }]
    res.json(users)
})

app.listen(8080, () => {
    console.log('Server is listening on port 8080')
})