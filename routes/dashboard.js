const express = require('express');
const passport = require('passport');
const router = express.Router();
const {ensureAuthenticated} = require('../helpers/auth');

var templateConfig = {
    layout: 'dashboard'
}


router.get('/', ensureAuthenticated, (req, res) => {
    res.render('dashboard/main', templateConfig);
});

router.get('/add-blog', ensureAuthenticated, (req, res)=>{
    res.render('dashboard/add-blog', templateConfig);
});

module.exports = router;