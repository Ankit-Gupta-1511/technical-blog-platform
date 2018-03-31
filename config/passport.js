const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('./keys');

const Author = mongoose.model('authors');

module.exports = function(passport){
    passport.use(
        new GoogleStrategy({
            clientID: keys.googleClientId,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true
        },
        function(accessToken, refreshToken, profile, done){
            // console.log(accessToken);
             console.log(profile);

            const image = profile.photos[0].value.substring(0, profile.photos[0].value.indexOf('?'));
            console.log(image);

            const newAuthor = {
                googleID: profile.id,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                email: profile.emails[0].value,
                image: image
            };

            // Check for existing user
            Author.findOne({googleID: profile.id})
                  .then( author => {
                        if(author){
                            // author exist return
                            done(null, author);
                        }
                        else
                        {
                            // new author hence create a new author and save it
                            new Author(newAuthor).save().then( (author) => {
                                done(null, author);
                            }).catch((err) => {
                                console.log(err)
                            });
                        }
                  })
                  .catch();

        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        Author.findById(id).then((author) => {
            done(null, author);
        }).catch( err => {
            console.log(err);
        });
    })
}
