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

	if (answerSent == answerIs) {
		req.session.repJusteCourante += 1;
	}

	req.session.repTotalCourante += 1;

	res.send({ 
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
	//db.connect();// ça devrait pas être là
	db.obtenirNbrQuestionParDomaine("HTML", function(err, compte) {
	  if (err) return console.error(err);
	  tableauNbrQ.push(compte);
	  db.obtenirNbrQuestionParDomaine("CSS", function(err, compte2) {
	    if (err) return console.error(err);
	    tableauNbrQ.push(compte2);
	    db.obtenirNbrQuestionParDomaine("JS", function(err, compte3) {
	      if (err) return console.error(err);
	      tableauNbrQ.push(compte3);
	      //db.disconnect();
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

router.post('/tableauBord/popup', function(req, res) {
	// envoi le tableau des anciens exam
	var callback = function(array) {
	//	console.log(array[1]);
		res.send(array);
	}
	db.popupStats(callback);
	console.log("coucou d'index.js");
});

router.post('/tableauBord/raz', function(req, res) {
	db.remiseAZero();
});

router.get('/question/abandon', function(req,res) {
	// lorsque le "joueur" abandonne
	// TODO: à cause de l'asynchronisme le cumul se fait encore sur les questions rapide... Les lignes d'en dessous ne sont pas fait avant de se rendre sur tableauBord apparemment

	//req.session.repJusteCourante = 0;
	//req.session.repTotalCourante = 0;

	var callback = function() {
		req.session.repJusteCourante = 0;
		req.session.repTotalCourante = 0;
	}

	var content = {
		"juste": "0",
		"total": "X",
		"categorie": req.session.domaines
	};

	//db.ajoutUnExam(content);
	db.abandonExam(content, callback);
	console.log("Abandon d'un exam !!");

	// TODO: render et redirect ne fonctionne pas, je ne sais pas encore pk
	res.redirect('/tableauBord');
});

router.post('/examenTermine', function(req,res) {
	var repJuste = req.session.repJusteCourante;
	var nbr = req.session.repTotalCourante;

	req.session.repJusteCourante = 0;
	req.session.repTotalCourante = 0;

	// TODO : prendre en compte l'abandon d'exam, je sais pas encore comment
	req.session.repJusteGlobaleExam += repJuste;
	req.session.repTotalGlobaleExam += nbr;

	var content = {
		"juste": repJuste.toString(),
		"total": nbr.toString(),
		"categorie": req.session.domaines
	}; 
	db.ajoutUnExam(content);
	console.log("%%%%%%%%%%%%%%%%%%%%%%%%%");
	console.log("sauvegarde des notes");	
	console.log("total " + content.total);
	console.log("juste " + content.juste);
	console.log("categorie " + content.categorie);
	console.log("%%%%%%%%%%%%%%%%%%%%%%%%%");

	// On envoie des infos sur l'exam
	res.send({
		"repTotalCourante": nbr,
		"repJusteCourante": repJuste
		}
	);
});

router.get('/examenTermine', function(req, res) {
  	res.render('examenTermine');
});

router.get('/tableauBord', function(req, res) {
	// calcul des notes globales test rapide et examen (voir si vaut mieux pas mettre un ajax lorsqu'on clique sur retour menu pour test rapide et à la fin de l'exam une fois termine)
	if (req.session.repJusteGlobale == '' || req.session.repJusteGlobale == undefined) {
		req.session.repJusteGlobale = 0;
	}

	if (req.session.repTotalGlobale == '' || req.session.repTotalGlobale == undefined) {
		req.session.repTotalGlobale = 0;
	}

	if (req.session.repJusteCourante == '' || req.session.repJusteCourante == undefined) {
		req.session.repJusteCourante = 0;
	}

	if (req.session.repTotalCourante == '' || req.session.repTotalCourante == undefined) {
		req.session.repTotalCourante = 0;
	}

	if (req.session.repJusteGlobaleExam == '' || req.session.repJusteGlobaleExam == undefined) {
		req.session.repJusteGlobaleExam = 0;
	}

	if (req.session.repTotalGlobaleExam == '' || req.session.repTotalGlobaleExam == undefined) {
		req.session.repTotalGlobaleExam = 0;
	}

	req.session.repJusteGlobale += req.session.repJusteCourante;
	req.session.repTotalGlobale += req.session.repTotalCourante;

	req.session.repTotalCourante = 0;
	req.session.repJusteCourante = 0;

	db.connect();

	res.render('tableauBord');
});

router.post('/tableauBord/stats', function (req, res) {
	// TODO: prendre en compte abandon exam
	if (req.session.repTotalGlobaleExam != 0) {
		var pourcentage = ((req.session.repJusteGlobaleExam/req.session.repTotalGlobaleExam)*100).toString();
	} else {
		var pourcentage = ":) "; 
	}

	res.send({ 
		"repJusteGlobale": req.session.repJusteGlobale,
		"repTotalGlobale": req.session.repTotalGlobale,
		"pourcentage": pourcentage
	});
});

router.get('/instructions', function(req, res) {
  res.render('instructions');
});

module.exports = router;
