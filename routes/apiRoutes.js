const fs = require('fs');
const router = require('express').Router();
const uniqid = require('uniqid')
let notes = require('../db/db.json')

router.get('/api/notes', (req,res) => {
    res.json(notes)
})
router.post('/api/notes', (req,res) => {
    req.body.id = uniqid()
    console.log(req.body)
    notes.push(req.body)

    fs.writeFile(__dirname + '/../db/db.json', JSON.stringify(notes),(err) => {
        if (err)throw err
    })
    res.end()
})
router.delete('/api/notes/:id', (req,res) => {
    console.log(req.params.id)
    const deletenote = notes.filter(note => {
        return note.id != req.params.id
    })
    notes = deletenote
    //fs.writeFile(__dirname + '/../db/db.json', JSON.stringify(deletenote),(err) => {
    //    if (err)throw err
    //})
    res.end()
})

module.exports = router