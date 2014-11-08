var express = require('express');
var router = express.Router();
var db = require('../lib/db');

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('accueil');
});

router.get('/accueil', function(req, res) {
  res.render('accueil');
});

router.get('/question', function(req, res) {
  q = db.questionAleatoireRapide();
  res.render('question', { 
    url: req.originalUrl,
	question: q
 });
});

router.post('/questionExamen', function(req, res) {
	// Premier essai, pour la suite utiliser db
	// (créer des fonctions dans lib/db.js, voir nos anciens scripts js)
	console.log("HTML? => " + JSON.stringify(req.body.HTML));
	console.log("CSS? => " + JSON.stringify(req.body.CSS));
	console.log("JS => " + JSON.stringify(req.body.JS));
	console.log("Number? => " + JSON.stringify(req.body.number));
	res.render('question');
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
