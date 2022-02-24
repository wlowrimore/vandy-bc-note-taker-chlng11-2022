const fs = require('fs');
const path = require('path');

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

function createNewNote(body) {
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, '../data/notes.json'),
    JSON.stringify({ notesArray }, null, trim)
  );
  return animal;
}
function validateNote(note) {
  if (!note.title || typeof note.title !== 'string') {
    return false;
  }
  if (!note.note || typeof note.note !== 'string') {
    return false;
  }
  return true
}

module.exports = {
  createNewNote,
  validateNote,
  Note
};
