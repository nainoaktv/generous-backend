const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactSchema = new Schema({
    name: String,
    email: String,
    subject: String,
    message: String,
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;