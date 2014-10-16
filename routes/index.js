var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Adam\'s Charity Starbucks Event' });
});

module.exports = router;
