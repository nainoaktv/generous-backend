const express = require('express');
const router = express.Router();
const Nonprofit = require('../models/nonprofit');
const Review = require('../models/review');
const passport = require('passport');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const bcrypt = require('bcrypt');
const { response } = require('express');
const apiKey = process.env.API_KEY;


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
});
 

//PUT ROUTE - user can update nonprofit they create
router.put('/:id', (req, res) => {
    console.log('route is being on PUT')
    Nonprofit.findById(req.params.id)
    .then(foundNonprofit => {
        console.log('Nonprofit found', foundNonprofit);
        Nonprofit.findByIdAndUpdate(req.params.id, { 
                name: req.body.name ? req.body.name : foundNonprofit.name,
                profileUrl: req.body.profileUrl ? req.body.profileUrl : foundNonprofit.profileUrl,
                description: req.body.description ? req.body.description : foundNonprofit.description,
                ein: req.body.ein ? req.body.ein : foundNonprofit.ein,
                logoCloudinaryId: req.body.logoCloudinaryId ? req.body.logoCloudinaryId : foundNonprofit.logoCloudinaryId,
                logoUrl: req.body.logoUrl ? req.body.logoUrl : foundNonprofit.logoUrl,
                matchedTerms: req.body.matchedTerms ? req.body.matchedTerms : foundNonprofit.matchedTerms,
        }, { 
            upsert: true 
        })
        .then(nonprofit => {
            console.log('nonprofit was updated', nonprofit);
            res.redirect(`/nonprofits/${req.params.id}`);
        })
        .catch(error => {
            console.log('error', error) 
            res.json({ message: "Error ocurred, please try again" })
        })
    })
    .catch(error => {
        console.log('error', error) 
        res.json({ message: "Error ocurred, please try again" })
    })
});



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


// ================================  BELOW RELATED TO REVIEWS ===========================

//GET a post's reviews
router.get('/:id/reviews', (req, res) => {
    Nonprofit.findById(req.params.id).populate('reviews').exec()      
    .then(nonprofit => {
        console.log('This is the nonprofit', nonprofit);
        res.json({ nonprofit:nonprofit });
    })
    .catch(error => { 
        console.log('error', error);
        res.json({ message: "Error ocurred, please try again" });
    });
});

//POST Route - Create a review on a nonprofit
router.post('/:id/reviews', (req, res) => {
    Nonprofit.findById(req.params.id)
    .then(nonprofit => {
        console.log('This is the nonprofit', nonprofit);
        //create and post review inside of nonprofit
        Review.create({
            header: req.body.header,
            comment: req.body.comment,
            rating: req.body.rating,
            recommendation: req.body.recommendation,
        })
        .then(review => {
            nonprofit.reviews.push(review);
            //save with review
            nonprofit.save();
            res.redirect(`/nonprofits/${req.params.id}`);
        })
        .catch(error => {
            console.log('error', error);
            res.json({ message: 'Error occurred, please try again '});
        });
    })
    .catch(error => {
        console.log('error', error);
        res.json({ message: 'Error occurred, please try again '});
    })
})







module.exports = router;