const mongoose = require('mongoose');
const { Schema } = mongoose;

const placeSchema = new Schema({
    type: String,
    name: String,
    address: String,
    city: String,
    state: String,
    zipCode: String,
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;