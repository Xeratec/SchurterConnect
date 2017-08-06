const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const users = require('./routes/users');

// Database Conection
mongoose.connect(config.database);

// Connection Successfull
mongoose.connection.on('connected', () => {
  console.log('Connected to Database ' + config.database);
});

// Connection Error
mongoose.connection.on('error', (err) => {
  console.log('Database Error ' + err);
});

// Create App
const app = express();

// Port Number
const port = 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parse Middleware
app.use(bodyParser.json());


// User Route
app.use('/users', users);

// Index Route
app.get('/', (req, res) => {
  res.send("Invalid Endpoint!");
  res.send("")
});

// Start Server
app.listen(port, () => {
  console.log("Server started on port " .port);
});
