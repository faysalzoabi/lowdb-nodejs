const express = require('express')
const cors = require('cors')
const lowDb = require("lowdb")
const FileSync = require('lowdb/adapters/FileSync')
const bodyParser = require("body-parser")
const {nanoid} = require("nanoid")

const db = lowDb(new FileSync('db.json'))

db.defaults({notes: [], blogs:[], users:[]}).write()

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/notes', (req, res) => {
    const data = db.get("notes").value()
    return res.json(data)
})

app.post('/notes', (req, res) => {
    const note = req.body
    db.get("notes").push({
        ...note, id:nanoid()
    }).write()
    res.json({success:true})
})

const PORT = 4000

app.listen(PORT, () => {
    console.log(`Backend is running on ${PORT}`)
})