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


module.exports = router;