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
	// On envoie la bonne réponse et la réponse qui a été soumise
	// Le reste se fait côté client pour le moment
	// TODO: Il faudrait tester si la réponse envoyée n'est pas vide (pour éviter la triche)
	res.send({
		"answerSent": req.body.reponse,
		"answerIs": req.session.current.answerIs}
	);
});

router.get('/ajouterQuestion', function(req,res) {
	res.render('ajouterQuestion');
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
	// Pas de différence avec question pour le moment
	// mais on en aura peut-être dans les prochains tp si on fait plus
	// de choses côté serveur
	res.redirect('../question/corriger');
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

router.post('/examenTermine', function(req,res) {
	// On envoie des infos sur l'exam
	res.send({
		"domaines": req.session.domaines,
		"nbrQuestions": req.session.nbrQuestions
		}
	);
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
