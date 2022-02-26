const path = require('path');
const router = require('express').Router();

// calls on the 'index.html' file
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// calls on the 'notes.html' file
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/notes.html'));
});

// WILD CARD call, in the case a user tries to access a page extension that does not exist
  // user will be directed to home page
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;