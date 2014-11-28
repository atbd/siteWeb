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
  var callback = function(questionAleatoire)
  {
    var current = questionAleatoire;
	  req.session.current = current;
  	res.render('question', { 
		  url: req.originalUrl,
		  question: current
    });
  }
  db.questionAleatoireRapide(callback);
});


router.post('/question/corriger', function(req,res) {
	var answerSent = req.body.reponse;
	var answerIs = req.session.current.answerIs;

	if (req.session.repJusteCourante == '' || req.session.repJusteCourante == undefined) {
		req.session.repJusteCourante = 0;
	}

	if (req.session.repTotalCourante == '' || req.session.repTotalCourante == undefined) {
		req.session.repTotalCourante = 0;
	}

	if (answerSent == answerIs) {
		req.session.repJusteCourante += 1;
	}

	req.session.repTotalCourante += 1;

	res.send({ // vérifier que ça renvoie bien des strings
		"answerSent": answerSent,
		"answerIs": answerIs,
		"repJusteCourante": req.session.repJusteCourante,
		"repTotalCourante": req.session.repTotalCourante
	});
});

router.post('/tableauBord/nbrQuestion', function(req,res) {
	var tableauNbrQ = [];
	
	var callback = function(nbrQuestionUnDomaine) {
		tableauNbrQ.push(nbrQuestionUnDomaine);
	}
	
	// Callback Hell
	// TODO: apprendre à utiliser correctement async et refactoriser tout ça !!!
	db.connect();// ça devrait pas être là
	db.obtenirNbrQuestionParDomaine("HTML", function(err, compte) {
	  if (err) return console.error(err);
	  tableauNbrQ.push(compte);
	  db.obtenirNbrQuestionParDomaine("CSS", function(err, compte2) {
	    if (err) return console.error(err);
	    tableauNbrQ.push(compte2);
	    db.obtenirNbrQuestionParDomaine("JS", function(err, compte3) {
	      if (err) return console.error(err);
	      tableauNbrQ.push(compte3);
	      db.disconnect();
	      res.send({
		      "nbrQuestionHTML": tableauNbrQ[0],
		      "nbrQuestionCSS": tableauNbrQ[1],
		      "nbrQuestionJS": tableauNbrQ[2]
	        }
	      );
	    });
	  });
	});
});

// Page web pour ajouter des questions dans notre bdd Mongo
router.get('/ajouterQuestion', function(req,res) {
	res.render('ajouterQuestion');
});

router.post('/ajouterQuestion', function(req,res) {
	// verifications sur la req
	//TODO !
	var categorie;
	if (req.body.HTML == "HTML")
		categorie = "HTML";
	if (req.body.CSS == "CSS")
		categorie = "CSS";
	if (req.body.JS == "JS")
		categorie = "JS";
	
	var content = {
		domain: categorie,
		text: req.body.question,
		answers: [req.body.reponse1,
				      req.body.reponse2,
				      req.body.reponse3,
				      req.body.reponse4],
		answerIs: req.body.bonneReponse-1
	};
	
	db.addQuestion(content);
	
	res.redirect('ajouterQuestion');
});	

router.get('/ajouterToutesLesQuestions', function(req, res) {
  db.addEverything();
  res.send("Toutes les questions ont été ajoutées.");
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
	db.initExam(domaines, req.body.number, function (idQuestions) {
	
//	  if (idQuestions === undefined)
//	  {
//		  // TODO: mieux gérer l'erreur
//		  console.log("Pas assez de question dans la bdd");
//		  res.redirect('tableauBord');
//	  }
//	  else
//	  {
		  // Enregistrement dans session
		  req.session.domaines = domaines;
		  req.session.idQuestions = idQuestions;
		  req.session.number = req.body.number;
		  req.session.indexCurrent = -1;// index dans le tableau idQuestions
		  res.redirect('questionExamen');
//	  }
	  
	});
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
	  db.obtenirQuestionParId(req.session.idQuestions[index]._id, function(questionTrouvee) {
	    req.session.current = questionTrouvee;
	  	res.render('question', { 
	  	  url: req.originalUrl,
	  		question: req.session.current
	  	});
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
