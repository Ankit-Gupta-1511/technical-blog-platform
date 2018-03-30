const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');


const port = process.env.PORT || 5000;

const app = express();

/////////////////////////
// passport config

require('./config/passport')(passport);

/////////////////////////////////

// Load Routes modules
const auth = require('./routes/auth');


//////////////////////////////////

// creating routes

app.get('/', (req, res) => {
    res.send('It works');
});

// using routes
app.use('/auth', auth);


///////////////////////////////////

app.listen(port, () => {
        console.log(`Server started on port : ${port}`);
});