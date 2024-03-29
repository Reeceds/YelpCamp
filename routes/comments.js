var express = require('express');
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");


// =======================
// COMMENTS ROUTES
// =======================

router.get('/new', middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if (err){
            console.log(err);
        } else {
            res.render('comments/new.ejs', {campground: campground});
        }
    })
})

router.post('/', middleware.isLoggedIn, function(req, res){
    // Lookup campground using id
    Campground.findById(req.params.id, function(err, campground){
        if (err){
            console.log(err);
            res.redirect('/campgrounds');
        } else {
            // Create new comment
            Comment.create(req.body.comment, function(err, comment){
                if (err){
                    console.log(err);
                } else {
                    // Add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    // Connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    // redirect campground showpage
                    req.flash('sccess', "Successfully added comment");
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});


// Update comment
router.get('/:comment_id/edit', middleware.checkCommentOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err || !foundCampground){
            req.flash('error', 'No campground found');
            return res.redirect('back');
        }
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect('back')
            } else {
                res.render('comments/edit.ejs', {campground_id: req.params.id, comment: foundComment});
            }
        });
    })
});


router.put('/:comment_id', middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect('back');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    })
})


// Destroy comment
router.delete('/:comment_id', middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect('back')
        } else {
            req.flash('success', 'Comment deleted');
            res.redirect('/campgrounds/' + req.params.id)
        }
    })
})




module.exports = router;