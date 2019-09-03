var mongoose = require("mongoose")

// Setup Schema
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   price: String,
   description: String,
   author: {
        id: {
           type: mongoose.Schema.Types.ObjectId,
           ref: 'User'
        },
        username: String
    },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});


// Turn Schema into a model
module.exports = mongoose.model('Campground', campgroundSchema);