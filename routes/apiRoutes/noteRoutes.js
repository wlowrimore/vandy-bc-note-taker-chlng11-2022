const router = require('express').Router();
const { createNewNote } = require('../../lib/notes');
const { notes } = require('../../db/db');

  
router.get('/notes', (req, res) => {
  let results = notes;
  res.json(results);
});

router.post('/notes', (req, res) => {
  // set id based on the next index of array
  req.body.id = notes.length.toString();
  console.log(notes);
  const note = createNewNote(req.body, notes);
  res.json(note);
});

module.exports = router;