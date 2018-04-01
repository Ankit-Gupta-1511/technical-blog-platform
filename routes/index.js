const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('base/index');
});

router.get('/author/login', (req, res)=>{
    res.render('base/login');
});

// blogs routes

router.get('/blogs/:id', (req, res)=>{
        res.send("showing blogs");
});
module.exports = router;