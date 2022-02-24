const fs = require('fs');
const path = require('path');
const { notes } = require('./db/notes');
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

// accesses the frontend public files
app.use(express.static('public'));

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

// parse incoming JSON data
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.listen(PORT, () => {
  console.log('API server now on port ${PORT}!')
});