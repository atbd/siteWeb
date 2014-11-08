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
  req.session.current = db.questionAleatoireRapide();
  res.render('question', { 
    url: req.originalUrl,
	question: req.session.current
 });
});

router.post('/question/corriger', function(req,res) {
	console.log("reponse? => " + JSON.stringify(req.body.reponse));
	if (req.body.reponse == req.session.current.answerIs)
		console.log("reponse juste");
	else
		console.log("reponse fausse");
	res.render('question');
});

router.post('/questionExamen', function(req, res) {
	
	var domaines = [];
	if (req.body.HTML == "on")
		domaines.push("HTML");
	if (req.body.CSS == "on")
		domaines.push("CSS");
	if (req.body.JS == "on")
		domaines.push("JS");
	
	console.log(domaines);
	console.log("nb => " + req.body.number);
	
	var questions = initExam(domaines, req.body.number);
	console.log(questions);
	if (questions === undefined)
	{
		// TODO: mieux gérer l'erreur
		console.log("pas assez de question dans la bdd");
		res.redirect('tableauBord');
	}
	else
	{
		req.session.current = questions[0];
		console.log("ok");
		req.session.questionsExam = questions;
		res.render('question', {question: req.session.current});
	}
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
