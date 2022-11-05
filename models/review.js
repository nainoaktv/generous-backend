const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
    header: String,
    comment: String,
    rating: String,
    recommendation: String,
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;