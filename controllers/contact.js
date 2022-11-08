const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');
const passport = require('passport');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const bcrypt = require('bcrypt');
const { response } = require('express');
const apiKey = process.env.API_KEY;

//Find all contacts (in our database)
router.get('/', (req, res) => {
    Contact.find({}) 
     .then(response => {
        console.log(response)
        res.json({ response: response });
    })
    .catch(error => {
        console.log(error);
    })
})


//Find contacts by id (in our database)
router.get('/:id', (req,res) => {
Contact.findById(req.params.id)
.then(newMessage => {
    console.log('The place you are looking for is:', newMessage);            
    res.json({ newMessage: newMessage });
})
.catch(error => { 
    console.log('error >>>>>>', error) 
});
});



module.exports = router;