const express = require('express');
const passport = require('passport');
const base64 = require('base64-img');
const path = require('path');
const router = express.Router();
const {ensureAuthenticated} = require('../helpers/auth');


router.post('/new-blog', (req, res)=>{
        
});

function parseBody(body)
{
    
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