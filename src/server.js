// Import node modules
const dotenv = require("dotenv").config();
const express = require('express');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require("body-parser");
// Import custom modules
const app = express();
const router = require("./routes");
// Basic Configuration 
const port = process.env.PORT || 3000;
// Mongoose fix deprecation warnings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
// Mongoose connection
mongoose.connect(process.env.MONGOLAB_URI);
// Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(router);
// Serving the public folder
app.use('/public', express.static(__dirname + '/public'));
// Listening on specified port
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});