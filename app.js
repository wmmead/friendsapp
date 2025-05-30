// app.js
const express = require('express');
const Parse = require('parse/node');
const dotenv = require('dotenv');
const friendsRoutes = require('./routes/friends');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Parse setup
Parse.initialize(process.env.APP_ID, process.env.JS_KEY);
Parse.serverURL = 'https://parseapi.back4app.com/';

// Middleware to serve static files
app.use(express.static('public'));
app.use(express.json());

// API route for friends
app.use('/api/friends', friendsRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});