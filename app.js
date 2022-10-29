// Imports
require('dotenv').config()
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const apiKey = process.env.API_KEY;
const axios = require('axios');
require('./config/passport')(passport);

// App Set up
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // JSON parsing
app.use(cors()); // allow all CORS requests
app.use(passport.initialize());

// Database Set Up
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
mongoose.connect(MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
    console.log(`Connected to MongoDB at HOST: ${db.host} and PORT: ${db.port}`);
});

db.on('error', (error) => {
    console.log(`Database Error: ${error}`);
})

// API Routes
app.get('/', (req, res) => {
  axios.get(`https://partners.every.org/v0.2/browse/climate?apiKey=${apiKey}`)
  .then(response => {
    console.log(response.data)
    res.send(response.data)
    const nonprofit = response.data;
    db.nonprofit.create({
      name: nonprofit.name,                 
      profileUrl: nonprofit.profileUrl,           
      description: nonprofit.description,          
      ein: nonprofit.ein,                  
      logoCloudinaryId: nonprofit.logoCloudinaryId,   
      logoUrl: nonprofit.logoUrl,             
      matchedTerms: nonprofit.matchedTerms 
    })
})
.catch(error => {
  console.log('error', error) 
  res.json({ message: "Error ocurred, please try again" });
})
});

app.use('/examples', require('./controllers/example'));
app.use('/users', require('./controllers/user'));

// Server
const server = app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));

module.exports = server;
