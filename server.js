const PORT = process.env.PORT || 3001;

const fs = require('fs');
const path = require('path');
const myNotes = require('./db/db.json');
const express = require('express');

const app = express();

// accesses the frontend public files
app.use(express.static('public'));

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

// parse incoming JSON data
app.use(express.json());

// joins notes to db
app.get('/api/notes', (req, res) => {
  res.json(path.join(__dirname, './db/db.json'));
});

// calls to html,
// homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// notes page
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

// WILD CARD call, in case user requests a non-existing page...will call homepage
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

function createNewNote(body, notesArray) {
  const newNote = body;
  if (!Array.isArray(notesArray))
  notesArray = [];

  if (notesArray.length === 0)
  notesArray.push(0);

  body.id = notesArray[0];
  notesArray[0]++;

  notesArray.push(newNote);
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify(notesArray, null, 2)
  );
  return newNote;
}

// adds new notes to db
app.post('/api/notes', (req, res) => {
  const newNote = createNewNote(req.body, myNotes);
});

function deleteNote(id, notesArray) {
  for (let i = 0; i < notesArray.length; i++) {
    let note = notesArray[i];

    if (note.id === id) {
      notesArray.splice(i, 1);
      fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArray, null, 2)
      );
    }
  }
}

// deletes notes from notes.json db
app.delete('/api/notes/:id', (req, res) => {
  deleteNote(req.params.id, myNotes);
  res.json(true);
});



app.listen(PORT, () => {
  console.log('API server now on port ${PORT}!')
});