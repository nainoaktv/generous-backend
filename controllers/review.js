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


//GET all reviews from all posts
router.get('/', (req, res) => {
    Review.find({})
    .then(reviews => {
        console.log('All reviews', reviews);
        res.json({ reviews: reviews });
    })
    .catch(error => {
        console.log('ERROR', error)
        res.json({ message: 'Error occured, please try again'})
    });
});

//GET review by id
router.get('/:id', (req, res) => {
    console.log('find review by id', req.params.id);
    
    Review.findById(req.params.id)
    .then(review => {
        console.log('Heres the review', review);
        res.json({ review: review});
    })
    .catch(error => {
        console.log('ERROR', error);
        res.json({ message: 'Error occured, please try again' });
    });
});

//PUT route - update a single review
router.put('/:id', (req, res) => {
    console.log('route is being on PUT')
    Review.findById(req.params.id)
    .then(foundReview => {
        console.log('Review found', foundReview);
        Review.findByIdAndUpdate(req.params.id, {
            header: req.body.header ? req.body.header : foundReview.header,
            comment: req.body.comment ? req.body.comment : foundReview.comment,
            rating: req.body.rating ? req.body.rating : foundReview.rating,
            recommendation: req.body.recommendation ? req.body.recommendation : foundReview.recommendation,
        }, {
            upsert: true
        })
        .then(review => {
            console.log('Review was updated', review);
            res.redirect(`/reviews/${req.params.id}`);
        })
        .catch(error => {
            console.log('ERROR', error)
            res.json({ message: 'Error occured, please try again'})
        })
    })
    .catch(error => {
        console.log('ERROR', error)
        res.json({ message: 'Error occured, please try again'})
    })
})


//DELETE a review
router.delete('/:id', (req, res) => {
    Review.findByIdAndRemove(req.params.id)
    .then(response => {
        console.log('This review was deleted', response);
        res.json({ message: `Review ${req.params.id} was deleted`});
    })
    .catch(error => {
        console.log('ERROR', error)
        res.json({ message: 'Error occured, please try again'})
    })
})



module.exports = router;