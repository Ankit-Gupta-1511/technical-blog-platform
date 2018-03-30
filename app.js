const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');


const port = process.env.PORT || 5000;

const app = express();

//////////////////////
// load models

require('./models/User');

/////////////////////////
// passport config

require('./config/passport')(passport);

/////////////////////////////////

// Load Routes modules
const auth = require('./routes/auth');

// load keys

const keys = require('./config/keys');

//mongoose connection

mongoose.Promise = global.Promise;

mongoose.connect(keys.mongoURI).then( () => {
    console.log('mongoDB connected....');
}).catch((err) => {
    console.log(err);
});

//////////////////////////////////



// express session middleware

app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));

// cookie parser
app.use(cookieParser());

// body parser
app.use(bodyParser.urlencoded({ extended: true }));
// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// set global vars

app.use((req, res, next) => {
        res.locals.user = req.user || null;
        next();
});

//////////////////////////

// using routes
app.use('/auth', auth);

// creating routes

app.get('/', (req, res) => {
    res.send('It works');
});


///////////////////////////////////

app.listen(port, () => {
        console.log(`Server started on port : ${port}`);
});