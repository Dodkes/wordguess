import { fileURLToPath } from 'url';
import { dirname, format } from 'path';
import express from 'express'
import path from 'path'
import { getPlayers, getPlayer, createPlayer } from './database.js'


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express()
app.use(express.json())

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/Players', async (req, res) => {
    const players = await getPlayers()
    res.send(players)
})

app.post('/Players', async (req, res) => {
    const { name, score } = req.body
    const player = await createPlayer ( name, score )
    res.send(player)
})


app.listen(8080, () => {
    console.log('Server is listening on port 8080')
})