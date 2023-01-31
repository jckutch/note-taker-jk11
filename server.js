const express = require('express');
const path = require('path');
const apiRoute = require('./Develop/routes/apiRoute.js');
const htmlRoute = require('./Develop/routes/htmlRoute.js');
const PORT = process.env.port || 3001;
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', apiRoute);
app.use('/', htmlRoute);

app.listen(PORT,()=> console.log(`Now listening on http:localhost:${PORT}`));
