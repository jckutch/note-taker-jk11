const notes = require('express').Router();
const {readFromFile, readAndAppend,writeToFile,} = require ('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

//Get route to retrieve notes
notes.get('/notes',(req,res)=>{
    readFromFile('./db/db.json').then((data)=>{
        res.json(JSON.parse(data));
    }).catch(err => res.status(400).json(err));
});

//Post route to save notes
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
        res.json('Note has been saved');
    }
    else {
        res.error('Error in saving the note');
    }

});

module.exports = notes;
