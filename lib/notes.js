const fs = require('fs');
const path = require('path');

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
  validateNote
};