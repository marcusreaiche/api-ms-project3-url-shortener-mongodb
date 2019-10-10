'use strict';
// Import node modules
var express = require('express');
// var mongo = require('mongodb');
// var mongoose = require('mongoose');
var cors = require('cors');
const bodyParser = require("body-parser");
// Import custom modules
const {lookUpId, asyncInsertUrl} = require("./connect_file.js");
var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
// mongoose.connect(process.env.MONGOLAB_URI);
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/shorturl/:id", (req, res) => {
  // lookup id in table and get address
  const id = Number(req.params.id);
  const address = lookUpId(id);
  // redirect to address
  if (address) {
    res.redirect(address);
  }
  else {
    res.json({
      error: "No shorturl found for given input"
    });
  }
});

app.post("/api/shorturl/new", async (req, res) => {
  const {url} = req.body;
  const data = await asyncInsertUrl(url).catch(e => e);
  console.log(data);
  res.json({data});
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});