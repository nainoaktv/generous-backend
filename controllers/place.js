const express = require('express');
const router = express.Router();
const Place = require('../models/place');
const mongoose = require('mongoose');


//Route Place
router.get('/', (req, res) => {
    Place.find({})
    .then(places => {
        console.log('All places', places);
        res.json({ places: places });
    })
    .catch(error => { 
        console.log('error', error);
        res.json({ message: "Error ocurred, please try again" });
    });
});

// GET Place by id
router.get('/:id', (req,res) => {
    Place.findById(req.params.id)
    .then(places => {
        console.log('The place you are looking for is:', places);            
        res.json({ places: places });
    })
    .catch(error => { 
        console.log('error >>>>>>', error) 
    });
});

//POST Route - Create new Place
router.post('/', (req, res) => {
    Place.create({
        type: req.body.type,
        name: req.body.name,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode
    })
    .then(place=> {
        console.log('New place =>>', place);
        res.json({ place: place});
    })
    .catch(error => { 
        console.log('error', error) 
        res.json({ message: "Error ocurred, please try again" })
    });
});

//PUT Route - Update a Place by id
router.put('/:id', (req, res) => {
    console.log('route is being on PUT')
    Place.findById(req.params.id)
    .then(foundPlace => {
        console.log('Place found', foundPlace);
        Place.findByIdAndUpdate(req.params.id, { 
                type: req.body.type ? req.body.type : foundPlace.type,
                name: req.body.name ? req.body.name : foundPlace.name,
                address: req.body.address ? req.body.address : foundPlace.address,
                city: req.body.city ? req.body.city: foundPlace.city,
                state: req.body.state ? req.body.state : foundPlace.state,
                zipCode: req.body.zipCode ? req.body.zipCode : foundPlace.zipCode
        }, { 
            upsert: true 
        })
        .then(place => {
            console.log('place was updated', place);
            res.redirect(`/places/${req.params.id}`);
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

//Delete
router.delete('/:id', (req, res) => {
    Place.findByIdAndRemove(req.params.id)
    .then(response => {
        console.log('This was deleted', response);
        res.json({ message: `Place ${req.params.id} was deleted`});
    })
    .catch(error => {
        console.log('error', error) 
        res.json({ message: "Error ocurred, please try again" });
    })
});

module.exports = router;