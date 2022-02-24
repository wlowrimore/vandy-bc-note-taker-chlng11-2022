const router = require('express').Router();
const { addNewNote, validateNote } = require('../../lib/notes');
const { notes } = require('../../data/animals');

router.get('/notes', (req, res) => {
  let results = notes;
});

router.post('/notes', (req, res) => {
  // set id based on what the next index of the array will be
  req.body.title = notes.length.toString();

  if (!validateNote(req.body)) {
    res.status(400).send('The note is field is empty.');
  } else {
    const note = createNewNote(req.body, notes);
    res.json(note);
  }
});

module.exports = router;