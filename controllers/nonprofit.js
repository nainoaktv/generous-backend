const express = require('express');
const router = express.Router();
const Nonprofit = require('../models/nonprofit');
const passport = require('passport');
const axios = require('axios');
const apiKey = process.env.API_KEY;



//Find nonprofits route
    router.get('/nonprofits/:concern', passport.authenticate('jwt', { session: false }), (req, res) => {
        axios.get(`https://partners.every.org/v0.2/browse/${req.params.concern}?apiKey=${apiKey}`)
        .then(response => {
            response.data.find({response.data});
        })
        .catch(error => {
            console.log(error);
        })
    })

   

 //Post nonprofits (Allow user to add to db)
 router.post('/nonprofits', (req, res) => {
    axios.get(`https://partners.every.org/v0.2/browse/${req.params.concern}?apiKey=${apiKey}`)
    .then(response => {
        Nonprofit.insertMany({
            name: req.body.name,
            profileUrl: req.body.profileUrl,
            description: req.body.description, 
            ein: req.body.ein,
            logoCloudinaryId: req.body.logoCloudinaryId,
            logoUrl: req.body.logoUrl,
            matchedTerms: req.body.matchedTerms,
        }) 
        .then(create => {
            res.redirect('/nonprofits')
        })
        .catch(error => {
            console.log(error)
        })
    })
    .catch(error => {
        console.log(error)
    })
});



module.exports = router;