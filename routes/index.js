var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');


router.get('/', function(req, res){
    res.render('landing.ejs');
});




// =======================
// AUTH ROUTES
// =======================

router.get('/register', function(req, res) {
    res.render('register.ejs');
});


router.post('/register', function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            req.flash('error', err.message);
            return res.render('register.ejs');
        }
        passport.authenticate('local')(req, res, function(){
            req.flash('success', 'Welcome to YelpCamp' + user.username);
            res.redirect('/campgrounds');
        });
    });
});


router.get('/login', function(req, res) {
    req.flash('error', 'Please login first');
    res.render('login.ejs');
})


router.post('/login', passport.authenticate('local', 
    { 
        successRedirect: '/campgrounds',
        failureRedirect: '/login' 
        
    }), function(req, res) {
});
    
    
router.get('/logout', function(req, res) {
    req.logout();
    req.flash('success', 'Logged you out');
    res.redirect('/campgrounds');
});



module.exports = router;