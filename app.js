const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const users = require('./routes/users');

// Database Conection
mongoose.connect(config.database, (err) =>{
  if(err) {
    console.log('Database Error ' + err);
  }
});

// Connection Successfull
mongoose.connection.on('connected', () => {
  console.log('Connected to Database ' + config.database);
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

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// User Route
app.use('/users', users);

// Index Route
app.get('/', (req, res) => {
  res.send("Invalid Endpoint!");
  res.send("")
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
})

// Start Server
app.listen(port, () => {
  console.log("Server started on port " .port);
});
