require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:8080/users"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

router.get('/users',passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/')
  })


passport.use(new FacebookStrategy({
    clientID: process.env.APP_ID,
    clientSecret: process.env.APP_SECRET,
    callbackURL: "http://localhost:8080/auth/facebook/"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));


router.get('/', passport.authenticate('google', { scope: ['profile'] }))
router.get('/facebook',  passport.authenticate('facebook'));
 
router.get('/auth/facebook',
  passport.authenticate('facebook', { failureRedirect: '/facebook' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/facebook');
  })


module.exports = router 
