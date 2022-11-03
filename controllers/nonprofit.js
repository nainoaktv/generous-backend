const express = require('express');
const router = express.Router();
const Nonprofit = require('../models/nonprofit');
const passport = require('passport');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const bcrypt = require('bcrypt');
const { response } = require('express');
const apiKey = process.env.API_KEY;
const bodyParser = require('body-parser');

        // axios.get(`https://partners.every.org/v0.2/browse/${req.params.concern}?apiKey=${apiKey}`)

//  passport.authenticate('jwt', { session: false }),

//Find all nonprofits (in our database)
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


//Find nonprofits by id (in our database)
router.get('/:id', (req,res) => {
    Nonprofit.findById(req.params.id)
    .then(nonProf => {
        console.log('The place you are looking for is:', nonProf);            
        res.json({ nonProf: nonProf });
    })
    .catch(error => { 
        console.log('error >>>>>>', error) 
    });
});


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
 
// POST route for user to create their own nonprofit
router.post('/', (req, res) => {
    Nonprofit.create({
        name: req.body.name,
        profileUrl: req.body.profileUrl,
        description: req.body.description,
        ein: req.body.ein,
        logoCloudinaryId: req.body.logoCloudinaryId,
        logoUrl: req.body.logoUrl,
        matchedTerms: req.body.matchedTerms,
    })
    .then(nonprof=> {
        console.log('New nonprofit =>>', nonprof);
        res.json({ nonprof: nonprof});
    })
    .catch(error => { 
        console.log('error', error) 
        res.json({ message: "Error ocurred, please try again" })
    });
});



//Connect to API  -  Return existing nonprofits based on user search
router.post('/results', async (req, res) => {
console.log('SEARCH TERMS', req.body.search);
axios.get(`https://partners.every.org/v0.2/search/${req.body.search}?apiKey=${apiKey}`)
.then(response => {
  console.log('API RESPONSE >>>>>>>>>>>>', response.data);
  res.json({ response: response.data });
})
.catch(error => console.log('ERROR', error));
})
 




//DELETE nonprofit from database
router.delete('/:id', (req, res) => {
    Nonprofit.findByIdAndRemove(req.params.id)
    .then(response => {
        console.log('This was deleted', response);
        res.json({ message: `Nonprofit ${req.params.id} was deleted`});
    })
    .catch(error => {
        console.log('error', error) 
        res.json({ message: "Error ocurred, please try again" });
    })
});




module.exports = router;