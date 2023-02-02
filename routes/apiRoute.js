const notes = require('express').Router();
const {readFromFile, readAndAppend,writeToFile,} = require ('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

//GET route for retrieving all notes
notes.get('/notes',(req,res)=>{
    readFromFile('./db/db.json').then((data)=>{
        res.json(JSON.parse(data));
    }).catch(err => res.status(400).json(err));      
});

//POST route for adding notes to db.json
notes.post('/notes',(req,res)=>{
    console.log(req.body);
    const {title, text}=req.body;
    if (title&&text){
        const saveNote ={
            title,
            text,
            id: uuidv4(),
        };
        readAndAppend(saveNote,'./db/db.json');
        res.json('Note saved');
    }
    else {
        res.error('Error in saving the note');
    }
});

//DELETE route for removing notes
//Method-override required
notes.delete('/notes/:id',(req,res)=>{
    const noteId=req.params.id;
    readFromFile('./db/db.json')
    .then((data)=>JSON.parse(data))
    .then((jsonNote)=>{
        const newNotesArray=jsonNote.filter((note)=>note.id !== noteId);
        writeToFile('./db/db.json', newNotesArray);
        res.json('Note '+noteId+' has been deleted.')
    })
    .catch(err => res.status(400).json(err));
});

module.exports = notes;