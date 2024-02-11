import { fileURLToPath } from 'url';
import { dirname, format } from 'path';
import express from 'express'
import path from 'path'
import { getPlayers, getPlayer, createPlayer, getWords } from './database.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express()
app.use(express.json())
app.use(express.static(__dirname + '/public'));

app.get('/Words', async (req, res) => {
    const words = await getWords()
    res.send(words)
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
    console.log(res.socket.remoteAddress)
})

app.get('/Players', async (req, res) => {
    const players = await getPlayers()
    res.send(players)
})

app.post('/Players', async (req, res) => {
    const { name, score } = req.body
    await createPlayer ( name, score )
})

app.listen(8080, () => {
    console.log('Server is listening on port 8080')
})