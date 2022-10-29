require('dotenv').config();
const mongoose = require('mongoose');
// connect to datbase
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
mongoose.connect(MONGO_CONNECTION_STRING, { useNewUrlParser: true });
const db = mongoose.connection;
const axios = require('axios')
const apiKey = process.env.API_KEY;
const express = require('express');
const router = express.Router();


db.once('open', () => {
    console.log(`Connected to MongoDB at HOST: ${db.host} and PORT: ${db.port}`);
});

db.on('error', (error) => {
    console.log(`Database Error: ${error}`);
});

const Nonprofit = require('../models/nonprofit');

function nonProfits() {
    axios.get(`https://partners.every.org/v0.2/browse/climate?apiKey=${apiKey}`)
        .then(response => {
            Nonprofit.insertMany(response.data.nonprofits);
        })
        .catch(error => {
            console.log(error);
        })
}

nonProfits();