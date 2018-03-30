const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema

const AuthorSchema = new Schema({
    googleID:{
        type: String,
        
    },
    email:{
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    image: {
        type: String
    }
});

// create collection and add Schema

mongoose.model('authors', AuthorSchema);