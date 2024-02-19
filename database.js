import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getWords () {
    const result = await pool.query('SELECT * FROM Words')
    return result
}

export async function getPlayers () {
    const result = await pool.query('SELECT * FROM Players')
    return result
}

// const players = await getPlayers()
// console.log(players)

export async function getPlayer (id) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM Players
    WHERE id = ?
    `, [id])
    return rows
}

// const player = await getPlayer()
// console.log(player)

export async function createPlayer (name, score) {
    const result = await pool.query(`
    INSERT INTO Players (name, score)
    VALUES (?, ?)
    `, [name, score])
    return result
}

// const result = await createPlayer ('Dodo', 1266)
// console.log(result)

export async function updatePlayer(name, score) {
    const update = await pool.query(`
    UPDATE Players
    SET score = ?
    WHERE name = ?
    `, [score, name]);
    return update;
}
