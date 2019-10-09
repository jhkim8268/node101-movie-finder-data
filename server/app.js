const express = require('express');
const axios = require('axios');
const logger = require('morgan');

const app = express();
app.use(logger('combined'))

let cache = {};

app.get('/', (req, res) => {
  let reqURL = req.url;
  let siteURL = 'http://www.omdbapi.com' + reqURL + '&apikey=8730e0e';
  
  if(!Object.keys(cache).includes(reqURL)) {
    axios.get(siteURL)
    .then((response) => {
      cache[reqURL] = response.data
      res.send(response.data)
    })
    .catch((error) => {
      res.send(error)
    })
  } else {
    res.send(cache[reqURL])
  }
})

module.exports = app;
