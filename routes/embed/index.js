const express = require('express');
const router = express.Router();

router.use('/stream', (req, res) => {
  res.render('embed/stream');
});

module.exports = router;
