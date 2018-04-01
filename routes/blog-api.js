const express = require('express');
const passport = require('passport');
const path = require('path');
const base64 = require('base64-img');
const router = express.Router();
const mongoose = require('mongoose');
const Blog = mongoose.model('blogs');
const Author = mongoose.model('authors');
const {ensureAuthenticated} = require('../helpers/auth');


router.post('/new-blog', (req, res)=>{
        
    var newBlog = {
        author: req.user.id,
        title: req.body.title,
        body: req.body.body
    };

    var parsedBody = parseBody(req.body.body);
    newBlog.body = parsedBody;
    // console.log("New blog is:");
    // console.log(JSON.stringify(newBlog));

    new Blog(newBlog).save()
                        .then((blog)=>{
                            res.redirect(`/blogs/${blog.id}`);
                        })
                        .catch(function(err){
                            console.log(err);
                        });    
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
            element.insert.image = path;
        }

    });

    return body;
}

function saveImageOnServer(imageUrl)
{
    var currentDir = __dirname;
    var basePath = currentDir.split('routes');

    var destination = path.join(path.join(path.normalize(basePath[0]), 'blog-images'),'test');

    console.log(destination);
    var imagePath = base64.imgSync(imageUrl, destination, 'test');
    console.log(imagePath);
     return imagePath;
}

module.exports = router;