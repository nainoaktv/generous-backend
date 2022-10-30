const express = require('express');
const router = express.Router();
const Nonprofit = require('../models/nonprofit');
const passport = require('passport');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const bcrypt = require('bcrypt');
const apiKey = process.env.API_KEY;

        // axios.get(`https://partners.every.org/v0.2/browse/${req.params.concern}?apiKey=${apiKey}`)

//  passport.authenticate('jwt', { session: false }),

//Find nonprofits (in our database)
    router.get('/', (req, res) => {
        Nonprofit.find({}) 
         .then(response => {
            console.log(response)
            res.json({ response: response });
        })
        .catch(error => {
            console.log(error);
        })
    })

//Find nonprofits (in every.orgs api)
    router.get('/:concern', (req, res) => {
        axios.get(`https://partners.every.org/v0.2/browse/${req.params.concern}?apiKey=${apiKey}`)
         .then(response => {
            console.log(response.data)
            res.json({ response: response.data });
        })
        .catch(error => {
            console.log(error);
        })
    })
 
 //Post - create a nonprofit
 router.post('/', (req, res) => {
        Nonprofit.insertMany({
            name: req.body.name,
            profileUrl: req.body.profileUrl,
            description: req.body.description, 
            matchedTerms: req.body.matchedTerms,
        }) 
        .then(create => {
            res.redirect('/nonprofits')
        })
        .catch(error => {
            console.log(error)
        })
    })

 //Post nonprofits that already exist
 router.post('/', (req, res) => {
    axios.get(`https://partners.every.org/v0.2/browse/${req.body.name}?apiKey=${apiKey}`)
    .then(response => {
        function getNonprof(item) {
            return [item.name, item.profileUrl, item.description, item.ein, item.logoCloudinaryId, item.logoUrl, item.tags,];
          }
        response.data.nonprofits.map(getNonprof())
        Nonprofit.insertMany({
            name: req.body.name,
            profileUrl: response.data.nonprofits.profileUrl,
            description: response.data.nonprofits.description, 
            ein: response.data.nonprofits.ein,
            logoCloudinaryId: response.data.nonprofits.logoCloudinaryId,
            logoUrl: response.data.nonprofits.logoUrl,
            tags: response.data.nonprofits.tags,
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