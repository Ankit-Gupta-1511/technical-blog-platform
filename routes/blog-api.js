const express = require('express');
const passport = require('passport');
const router = express.Router();
const {ensureAuthenticated} = require('../helpers/auth');


router.post('/new-blog', (req, res)=>{
        
    var newBlog = {
        title: req.body.title,
        body: req.body.body
    };

    var parsedBody = parseBody(req.body.body);

    //console.log(newBlog);
});

function parseBody(body)
{
    var body = JSON.parse(body);
    //console.log(body);
    var parsedBody = {};

    var contentArray = body.ops;

    contentArray.forEach(element => {
        //console.log(element);
        if(element.insert.image)
        {
            console.log(element);
            var path = saveImageOnServer(element.insert.image);
            parsedBody.insert.image = path;
        }
        else
        {
            parsedBody.element
        }

    });
}

module.exports = router;