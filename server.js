const express = require('express');

const PORT = process.env.PORT || 3001;
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const req = require('express/lib/request');
const res = require('express/lib/response');
const fs = require('fs');
const path = require('path');


const app = express();
app.use(express.static('public'));

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

// parse incoming JSON data
app.use(express.json());
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


app.listen(PORT, () => {
  console.log('API server is now on port ${PORT}!');
});