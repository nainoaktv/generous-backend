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

router.post("/", async (req, res) => {
    try {
        const response = await axios.get(`https://partners.every.org/v0.2/browse/climate?apiKey=${apiKey}`)
        console.log(response.data)
        res.json({data: response.data})
        
    } catch (error) {
       console.log("ERROR", error) 
    }
})




    // axios.get(`https://partners.every.org/v0.2/browse/climate?apiKey=${apiKey}`)
    //         .then(response => {
    //             Nonprofit.insertMany(response.data);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         })


module.exports = router



// function nonProfits() {
//     axios.get(`https://partners.every.org/v0.2/browse/climate?apiKey=${apiKey}`)
//         .then(response => {
//             Nonprofit.insertMany(response.data);
//         })
//         .catch(error => {
//             console.log(error);
//         })
// }
