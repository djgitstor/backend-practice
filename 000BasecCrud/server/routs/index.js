const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  res.json({ "index": "index.html" });
});
router.post('/', function (req, res) {
  console.log(req.body);
  res.json({ name: 'Sahil' })
})

module.exports = router;