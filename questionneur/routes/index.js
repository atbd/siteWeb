var express = require('express');
var db = require('../lib/db');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('accueil');
});

router.get('/accueil', function(req, res) {
  res.render('accueil');
});

router.get('/question', function(req, res) {
	var current = db.questionAleatoireRapide();
	req.session.current = current;
  	res.render('question', { 
		url: req.originalUrl,
		question: current
 });
});

router.post('/question/corriger', function(req,res) {
	// TODO !!!
	res.send({
		"answerSent": req.body.reponse,
		"answerIs": req.session.current.answerIs}
	);
	//res.render('question', {url: '/question', question: db.questionAleatoireRapide()});
});

router.post('/questionExamen', function(req, res) {

	var domaines = [];
	if (req.body.HTML == "on")
		domaines.push("HTML");
	if (req.body.CSS == "on")
		domaines.push("CSS");
	if (req.body.JS == "on")
		domaines.push("JS");

	// On récupère les id des questions de l'exam
	var idQuestions = db.initExam(domaines, req.body.number);
	
	if (idQuestions === undefined)
	{
		// TODO: mieux gérer l'erreur
		console.log("Pas assez de question dans la bdd");
		res.redirect('tableauBord');
	}
	else
	{
		// Enregistrement dans session
		req.session.domaines = domaines;
		req.session.idQuestions = idQuestions;
		req.session.number = req.body.number;
		req.session.indexCurrent = -1;// index dans le tableau idQuestions
		res.redirect('questionExamen');
	}
});

router.post('/questionExamen/corriger', function(req, res) {
	//TODO !
	res.redirect('../question/');
});

router.get('/questionExamen', function(req, res) {

	req.session.indexCurrent++;
	var index = req.session.indexCurrent;
		
	if (index >= req.session.number)
		res.redirect('examenTermine');
	else {
		req.session.current = db.obtenirQuestionParId(req.session.idQuestions[index]);
	  	res.render('question', { 
	  		url: req.originalUrl,
	  		question: req.session.current
	  	});
	}
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
