const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('./keys');

module.exports = function(passport){
    passport.use(
        new GoogleStrategy({
            clientID: keys.googleClientId,
            ClientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true
        },
        function(accessToken, refreshToken, profile, done){
            console.log(accessToken);
            console.log(profile);
        })
    );
}