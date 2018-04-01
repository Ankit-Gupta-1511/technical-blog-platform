const express = require('express');
const passport = require('passport');
const router = express.Router();
const {ensureAuthenticated} = require('../helpers/auth');


router.get('/', ensureAuthenticated, (req, res) => {
    res.render('dashboard/main', {
        layout: 'dashboard',
    });
});

router.get('/add-blog', (req, res)=>{
    res.render('dashboard/add-blog', {
        layout: 'dashboard-editor',
    });
});

router.post('/new-blog', (req, res)=>{
        
        var newBlog = {
            title: req.body.title,
            body: req.body.body
        };

        console.log(newBlog);
});

module.exports = router;