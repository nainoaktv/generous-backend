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









module.exports = router;