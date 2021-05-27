require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

let mongoose;
try {
  mongoose = require("mongoose");
} catch (e) {
  console.log(e);
}
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const router = express.Router();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(bodyParser.json());

app.use('/public', express.static(`${process.cwd()}/public`));


const Person = require("./test.js").PersonModel;



app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});



const ShortURL = require("./test.js").ShortURLModel;
const createShortURL = require("./test.js").createAndSaveShortURL;


app.post('/api/shorturl', function(req, res) {
  console.log(req.body);
  createShortURL(req.body,res)


  
});

app.get('/api/shorturl/:short', function(req, res) {
  console.log(req);
  
  ShortURL.find({ short: req.params['short'] }, (err, data) => {
      console.log('found',data,data.length)
      let ralph
      if (data.length === 0 ){
        
        res.json({"error":"No short URL found for the given input"});
      } else {
        console.log('get API'+req.params['short'])
        res.redirect(data[0].URL);
      };
      

      
      
      })

//res.json({ greeting: 'get API'+req.params['short'] });
  
});



app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
