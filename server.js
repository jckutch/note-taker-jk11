const express = require('express');
const path = require('path');
const apiRoute = require('./routes/apiRoute');
const htmlRoute = require('./routes/htmlRoute');
const app = express();
const PORT = process.env.PORT || 3001;

//Middleware for parsing JSON and urlencoded form data
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));
app.use('/api', apiRoute);
app.use('/', htmlRoute);

app.listen(PORT,()=> console.log(`Now listening on http:localhost:${PORT}`));