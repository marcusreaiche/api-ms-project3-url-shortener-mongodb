// Import node modules
const express = require('express');
// const mongo = require('mongodb');
// const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require("body-parser");
// Import custom modules
const { lookUpId, asyncInsertUrl } = require("./connect_file.js");
const app = express();

// Basic Configuration 
const port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
// mongoose.connect(process.env.MONGOLAB_URI);
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

// Serving the public folder
app.use('/public', express.static(__dirname + '/public'));
// root route
app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/index.html');
});
// shorturl API
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
  const { url } = req.body;
  const data = await asyncInsertUrl(url).catch(err => err);
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});