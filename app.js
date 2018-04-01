const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const exphbs = require('express-handlebars');

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
const index = require('./routes/index');
const dashboard = require('./routes/dashboard');
const blogApi = require('./routes/blog-api');
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

// express-handlebars middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

// express session middleware

app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));

// cookie parser
app.use(cookieParser());

// body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// set global vars

app.use((req, res, next) => {
        res.locals.user = req.user || null;
        next();
});

// set static
app.use(express.static(path.join(__dirname, 'static')));

//////////////////////////

// using routes

//auth routes
app.use('/auth', auth);

// dashboard routes
app.use('/dashboard', dashboard);

//blog api routes
app.use('/post', blogApi);

// index routes
app.use('/', index);


///////////////////////////////////

app.listen(port, () => {
        console.log(`Server started on port : ${port}`);
});