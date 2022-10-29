require('dotenv').config();
const mongoose = require('mongoose');
// connect to datbase
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
mongoose.connect(MONGO_CONNECTION_STRING, { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => {
    console.log(`Connected to MongoDB at HOST: ${db.host} and PORT: ${db.port}`);
});

db.on('error', (error) => {
    console.log(`Database Error: ${error}`);
});

const Place = require('../models/place');
const { randAddress } = require('@ngneat/falso');


// test fake data
let newPlace = randAddress();
console.log('NEW PLACE', newPlace); // making sure it works w/ this line.


// create a async function that will make an array of 100 superheros
async function makePlaces() {
    // create an empty array
    const array = [];

    // make for loop
    for (let i = 0; i < 100; i++) {
        let newPlace = randAddress();
        // remove the id
        delete newPlace.id;
        // push it into the array
        array.push(newPlace);
    }

    return array;
}

makePlaces()
.then(array => {
    console.log('NUMBER OF PLACES', array);    
    // use insertMany function to create 100 superheros
    Place.insertMany(array)
    .then(response => {
        console.log('RESPONSE FROM MONGODB', response);
    })
    .catch(error => {
        console.log(error);
    })
})
.catch(error => {
    console.log('ERROR', error);
});


