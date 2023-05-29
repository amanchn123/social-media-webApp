"use strict";

var express = require('express');

var con = require('./connection');

var cors = require('cors');

var dotenv = require('dotenv');

var usernotfound = require('./CHATTING-section/errorHandling/apinotfound');

var register = require('./socialMedia-section/routes/AuthRoute.js');

var verify = require('./socialMedia-section/JWT_verification');

var app = express();
dotenv.config();
con();
app.use(cors({
  origin: "*"
}));
app.use(express.json());
app.use('/api', require('./CHATTING-section/useroutes/userRoute')); // app.use(usernotfound)

app.use('/apii', require('./socialMedia-section/routes/userRoutes'));
app.use('/apii', register);
app.use('/apii', require('./socialMedia-section/routes/postRoutes'));
app.use('/you', require('./socialMedia-section/routes/you'));
app.listen(5000, console.log('running succesfully'));