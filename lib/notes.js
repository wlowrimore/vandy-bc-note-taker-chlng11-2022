const fs = require('fs');
const path = require('path');
const { notes } = require('./db/notes');
const express = require('express');

class Note {
  constructor (title, text, id) {
    this.title = title;
    this.text = text;
    this.id = id;
  };

  getTitle() {
    return this.title;
  }

  getText() {
    return this.text;
  }

  getId() {
    return this.id;
  }

  getNote() {
    return "Note";
  }
}

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

module.exports = {
  createNewNote,
  validateNote,
  Note
};
