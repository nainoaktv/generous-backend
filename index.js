require('dotenv').config();
const express = require('express');
const app = express();
const axios = require('axios')
const mongoose = require('mongoose');
const cors = require('cors');

//import models
const Place = require('./models/place')


//connect to database
//connect to the database
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
mongoose.connect(MONGO_CONNECTION_STRING, { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => {
    console.log(`Connected to MongoDB at HOST: ${db.host} and PORT: ${db.port}`);
});

db.on('error', (error) => {
    console.log(`Database Error: ${error}`);
})



app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Generous' });
});


//============== Places ==========================
app.use('/places', require('./controllers/place'))
//================================================



app.listen(8000, () => {
    console.log('Running port 8000')
});