const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', 
    required: true
  },
  image: {
    type: String, 
    required: false
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now 
  },
  month: {
    type: String,
    default: function () {
      return new Date().toLocaleString('en-US', { month: 'long' }); 
    }
  },
  year: {
    type: Number,
    default: function () {
      return new Date().getFullYear(); 
    }
  }
});

const Review = mongoose.model('review', reviewSchema);
module.exports = Review;
