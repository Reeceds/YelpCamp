var mongoose = require("mongoose");
var Campground = require('./models/campground');
var Comment = require('./models/comment');


var data = [
        {
            name: 'Arse Creek',
            image: 'https://tinboxtraveller.co.uk/wp-content/uploads/2018/08/PRIMA-campsite-1024x660.jpg',
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            name: 'Shite house',
            image: 'https://www.appletonmn.com/vertical/Sites/%7B4405B7C1-A469-4999-9BC5-EC3962355392%7D/uploads/campground_(2).jpg',
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            name: 'CBA',
            image: 'https://www.ottawatourism.ca/wp-content/uploads/2017/02/GP_readytocamp_pretacamper_0028_LR.jpg',
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        
    ]


// Remove all campgrounds
function seedDB (){
    Campground.remove({}, function(err){
    if(err){
        console.log(err);
    } 
    console.log('removed campgrounds');
    // Add a few campgrounds
    data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
            if(err){
                console.log(err);
            } else {
                console.log('Added a cmapground')
                // Create a comment
                Comment.create({
                    text: 'Blaaa, some shit',
                    author: 'Mate'
                }, function(err, comment){
                    if(err){
                        console.log(err);
                    } else {
                        campground.comments.push(comment);
                        campground.save();
                        console.log('Created new comment');
                    }
                })
            };
        })
    })
    });
    
}

module.exports = seedDB;