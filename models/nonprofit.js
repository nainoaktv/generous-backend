const mongoose = require('mongoose');
const { Schema } = mongoose;

const nonprofitSchema = new Schema({
    name: String,                  //"Homeward Pet Adoption Center"
    profileUrl: String,           //"https://www.every.org/homewardpet"
    description: String,          //"Our Homeward Pet's mission is to transform the lives of cats and dogs in need through compassionate medical care, positive behavior training, and successful adoption while building a more humane community."
    ein: String,                  //"911526803"
    logoCloudinaryId: String,     //"faja_profile/yx2bf7ajag59igzhv7uk"
    logoUrl: String,             //"https://res.cloudinary.com/everydotorg/image/upload/c_lfill,w_24,h_24,dpr_2/c_crop,ar_24:24/q_auto,f_auto,fl_progressive/faja_profile/yx2bf7ajag59igzhv7uk"
    matchedTerms: Array,          //["pet"]
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
    
});

const Nonprofit = mongoose.model('Nonprofit', nonprofitSchema);

module.exports = Nonprofit;