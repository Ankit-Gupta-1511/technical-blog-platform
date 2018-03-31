const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email']}));

// /google/callback is used in google+ api as callback after successfull authentication
router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/auth/google'}), (req, res) => {
    res.redirect('/auth/verify');
});

router.get('/verify', (req, res) => {
    if(req.user)
    {
        res.redirect('/dashboard')
    }
    else
    {
        res.send("author not verified")
    }
})

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});
module.exports = router;