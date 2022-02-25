const fs = require('fs');
const path = require('path');
const myNotes = require('./db/db.json');

module.exports = app => {

  fs.readFile('db/db.json', 'utf8', (err, data) => {
    if (err) throw err;

    var notes = JSON.parse(data);
  

    app.get('/notes', (req, res) => {
      let results = notes;
    });

    app.post('api/notes', (req, res) => {

      let newNote = req.body;
      notes.push(newNote);
      saveNote();
      return console.log('New note added');
    });

    app.get('/api/notes/:id', (req, res) => {
      res.json(notes[req.params.id]);
    });

    app.delete('/api/notes/:id', (req, res) => {
      notes.splice(req.params.id, 1);
      updateNotes();
    });

    // Insert notes to page
    app.get('/notes', (req, res) => {
      res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    // Updates json file when note is added/deleted
    function updateNotes() {
      fs.writeFile('db/db.json', JSON.stringify(notes, '\t'), err => {
        if (err) throw err;
        return true;
      });
    }
  });
}
