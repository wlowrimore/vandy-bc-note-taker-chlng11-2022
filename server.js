const fs = require('fs');
const path = require('path');
const { notes } = require('./db/notes');
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

notesArray = [];

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

// parse incoming JSON data
app.use(express.json());

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  // assign id based on index of array
  req.body.id = notes.length.toString();

  // if any data in req.body is incorrect, send 400 error back
  if (!validateNote(req.body)) {
    res.status(400).send('Your note is not properly formatted.');
  } else {
    const note = createNewNote(req.body, notes);
    res.json(note);
  }  
});

function createNewNote(body, notesArray) {
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, './db/notes.json'),
    JSON.stringify({ notes: notesArray }, null, 2)
  );  
  return note;
}

function validateNote(note) {
  if (!note.title || typeof note.title !== 'string') {
    return false;
  }
  if (!note.text || typeof note.text !== 'string') {
    return false;
  } 
  return true;
}

app.listen(PORT, () => {
  console.log('API server now on port ${PORT}!')
});