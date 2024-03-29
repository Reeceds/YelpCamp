var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require("mongoose"),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    Campground = require('./models/campground'),
    Comment = require('./models/comment'),
    User = require('./models/user'),
    methodOverride = require('method-override'),
    seedDB = require("./seeds"),
    flash = require('connect-flash');
    
    
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),    
    indexRoutes = require("./routes/index");    
    
    

// seedDB();
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost/yelp_camp', {useNewUrlParser: true});
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());


app.use(require('express-session')({
    secret:'such a long ting',
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});


app.use('/campgrounds/:id/comments', commentRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use(indexRoutes);





app.listen(process.env.PORT, process.env.IP, function(){
    console.log('The YelpCamp server has started');
});