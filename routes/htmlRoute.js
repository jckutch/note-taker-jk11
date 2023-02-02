const router = require('express').Router();
const path = require('path');

//GET Route for notes
router.get('/notes',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/notes.html'));
});

//GET route route for index.html
router.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/index.html'));
});

module.exports = router;