const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('dashboard/main');
});

router.get('/add-blog', (req, res)=>{
    res.render('dashboard/add-blog');
});

module.exports = router;