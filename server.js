import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__dirname);


import express from 'express'
import path from 'path'

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