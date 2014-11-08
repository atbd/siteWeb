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
  res.render('question', { 
    url: req.originalUrl,
	question: db.questionAleatoireRapide()
 });
});

router.post('/question/corriger', function(req,res) {
	// TODO !!!
//	console.log("reponse? => " + JSON.stringify(req.body.reponse));
//	if (req.body.reponse == req.session.current.answerIs)
//		console.log("reponse juste");
//	else
//		console.log("reponse fausse");
//	res.send({reponse: req.body.reponse});
	res.render('question', {url: '/question', question: db.questionAleatoireRapide()});
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
		res.redirect('questionExamen');
	}
});

router.post('/questionExamen/corriger', function(req, res) {
	//TODO !
	res.redirect('../questionExamen');
});

router.get('/questionExamen', function(req, res) {

	if (req.session.examcurrent === undefined)
		req.session.examcurrent = 0;
	else
		req.session.examcurrent++;
		
	if (req.session.examcurrent >= req.session.number)
		res.redirect('examenTermine');
	else {
  	res.render('question', { 
  		url: req.originalUrl,
  		question: db.obtenirQuestionParId(req.session.idQuestions[req.session.examcurrent])
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
