const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema

const BlogSchema = new Schema({
    author:{
        type: Schema.Types.ObjectId,
        ref: 'authors',
        required: true,
    },
    title:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now()
    },
    body: {
        type: Object,
        required: true
    },
    
});

// create collection and add Schema

mongoose.model('blogs', BlogSchema);