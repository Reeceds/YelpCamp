var express = require('express');
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");



router.get('/', function(req, res){
    // Retrives campgrounds from database and displays them
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render('campgrounds/index.ejs', {campgrounds: allCampgrounds, currentUser: req.user});
        }
    });
});


router.post('/', middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username,
    }
    var newCampground = {name: name, price: price, image: image, description: desc, author: author};
    // Saves newly added campground data and redirects to camprounds page
    Campground.create(newCampground, function(err, newlyCreated){
        if(err) {
            console.log(err);
        } else {
            res.redirect('/campgrounds');
        }
    });
});


router.get('/new', middleware.isLoggedIn, function(req, res){
    res.render('campgrounds/new.ejs');
});


router.get('/:id', function(req, res) {
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground){
        if(err || !foundCampground){
            req.flash('error', 'Campground not found');
            return res.redirect('back')
        } else {
            console.log(foundCampground);
            res.render('campgrounds/show.ejs', {campground: foundCampground});
        }
    });
});


// Update campground
router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req, res){
    // Is user logged in
        Campground.findById(req.params.id, function(err, foundCampground){
            res.render('campgrounds/edit.ejs', {campground: foundCampground})
        }) 
})


router.put('/:id', middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    })
})


// Destroy campground
router.delete('/:id', function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/campgrounds')
        } else {
            res.redirect('/campgrounds')
        }
    })
})




module.exports = router;