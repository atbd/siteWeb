var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/accueil', function(req, res) {
  res.render('accueil');
});

router.get('/question', function(req, res) {
  res.render('question', { 
  url: req.originalUrl
 });
});

router.get('/questionExamen', function(req, res) {
  res.render('question', { 
  url: req.originalUrl
 });
});

router.get('/examenTermine', function(req, res) {
  res.render('examenTermine');
});

router.get('/tableauBord', function(req, res) {
  res.render('tableauBord');
});

router.get('/instructions', function(req, res) {
  res.render('instructions');
});

module.exports = router;
