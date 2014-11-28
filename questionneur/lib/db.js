/*
 * Base de données
 */

// On utilise mongoose pour accéder à notre bdd mongodb
var mongoose = require('mongoose');
var random = require('mongoose-simple-random');
//var async = require('async');
var Schema = mongoose.Schema;
//module.exports.mongoose = mongoose;
//module.exports.Schema = Schema;

// Paramètres de connexion
var username = "test";
var password = "test";
var adress = '@ds053320.mongolab.com:53320/questions';
var adressNotes = '@ds053320.mongolab.com:53320/notes';

// Connexion
function connect() {
	var url = 'mongodb://' + username + ':' + password + adress;
	console.log("Connexion à " + adress);
	mongoose.connect(url, function(err) {
    if (err) return console.error(err);
    console.log("Connecté");

    var url2 = 'mongodb://' + username + ':' + password + adressNotes;
	console.log("Connexion à " + adressNotes);
	mongoose.connect(url2, function(err) {
    	if (err) return console.error(err);
    	console.log("Connecté");
  });
  });
}

// Déconnexion
function disconnect() {
	mongoose.disconnect();
	console.log("Déconnecté");
}

// Le schéma de notre bdd
var questionsSchema = new Schema({
	// id: c'est mongodb qui le crée
	// FIXME: empêcher les questions en double, là c'est censé marcher mais ça ne marche pas...
	domain: String,
	text: {type: String, unique: true, dropDups: true},
	answers: Array, //de Strings
	answerIs: Number
});

// Schéma de la db notes
var notesSchema = new Schema({
	juste: String,
	total: String,
	categorie: String
});

questionsSchema.plugin(random);

// On lui associe un modèle
var Question = mongoose.model('Question', questionsSchema);

// Ajout d'une question
function addQuestion(content) {
  
  connect();
  console.log("Ajout dans la bdd");
  console.log("+ Domaine : " + content.domain);
  console.log("+ Question : " + content.text);
  console.log("+ Reponses : " + content.answers);
  console.log("+ Bonne réponse : " + content.answerIs);
  
	var q = new Question({
		domain: content.domain,
		text: content.text,
		answers: content.answers,
		answerIs: content.answerIs
	});

	q.save(function (err) {
		if (err) return console.error(err);
		disconnect();
	});
	
}  

// Notre ancien tableau de questions à insérer
var questions = [];
  
// Les questions (source : w3schools.com)
questions.push({
			domain: "HTML",
			text: "Que signifie le sigle HTML ?",
			answers: ["Hyperlinks and Text Markup Language",
					  "Home Tool Markup Language",
			          "Hyper Text Markup Language",
			          "Hotel Tango Mike Lima"],
			answerIs: "2"});
questions.push({
			domain: "HTML",
			text: "Qui « fait » les standards du web ?",
			answers: ["Microsoft",
					  "The World Wide Web Consortium",
			          "Google",
			          "Mozilla"],
			answerIs: "1"});
questions.push({
			domain: "HTML",
			text: "Choisissez le tag HTML correspondant au plus gros titre :",
			answers: ["<head>",
					  "<h6>",
			          "<heading>",
			          "<h1>"],
			answerIs: "3"});
questions.push({
			domain: "CSS",
			text: "Que signifie CSS ?",
			answers:["Carambar Sweet Shop",
			         "Cascading Square Sheets",
			         "Collection of Style Sheets",
			         "Cascading Style Sheets"],
			answerIs: "3"});
questions.push({
			domain: "CSS",
			text: "Quel sélecteur correspond aux liens qui sont enfants directs de paragraphes ?",
			answers:["a",
			         "p a",
			         "p > a",
			         "p ~ a"],
			answerIs: "2"});
questions.push({
			domain: "CSS",
			text: "Quel attribut permet de changer la couleur d'arrière plan d'un bloc ?",
			answers:["color",
			         "background-color",
			         "display",
			         "background"],
			answerIs: "1"});
questions.push({
			domain: "CSS",
			text: ":hover est…",
			answers:["un pseudo-élément ?",
			         "une classe ?",
			         "une pseudo-classe ?",
			         "un attribut ?"],
			answerIs: "2"});
questions.push({
			domain: "JS",
			text: "Dans quel élément HTML place-t-on le JavaScript ?",
			answers:["<script>",
			         "<scripting>",
			         "<javascript>",
			         "<js>"],
			answerIs: "0"});
questions.push({
			domain: "JS",
			text: "Qu'est-ce que jQuery ?",
			answers:["Une bibliothèque JavaScript",
			         "Une fonction intégrée à JavaScript",
			         "Un élément HTML",
			         "Un sélecteur CSS"],
			answerIs: "0"});
questions.push({
			domain: "JS",
			text: "Qu'est-ce qui est interprété en premier dans un code JavaScript ?",
			answers:["L'affectation des variables'",
			         "La déclaration des variables",
			         "La déclaration des fonctions",
			         "La déclaration des variables et des fonctions"],
			answerIs: "3"});

// Ajout de tout le tableau de questions
function addEverything() {

  connect();

  // model.create() prend en argument un tableau et fait un appel à save pour chaque item
  Question.create(questions, function(err) {
    if (err) {
      return console.error(err);
    }
    disconnect();
  });
  
}

function obtenirQuestionParId(id, callback) {
  connect();
  Question.findById(mongoose.Types.ObjectId(id), function(err, found) {
    if (err) return console.error(err);
    disconnect();
    console.log(found);
    callback(found);
  });
}

function questionAleatoireRapide(callback) {
  connect();
  Question.findOneRandom(function(err, result) {
    if (err) return console.error(err);
    disconnect();
    console.log(result);
    callback(result);
  });
}

// renvoie les id des questions d'un examen
function initExam(categories, nbrQuestions, callback) {
  // mongoose-simple-random, c'est trop cool !
  connect();
  
  var filter = { domain: { $in: categories } };
  var fields = {_id: 1}; // on ne récupère que l'id
  var options = { skip: nbrQuestions, limit: nbrQuestions };
  Question.findRandom(filter, fields, options, function(err, results) {
    if (err) return console.error(err);
    disconnect();
    console.log(results);
    callback(results);
    }
  );
}

function obtenirNbrQuestionParDomaine(domaine, callback) {
  
  Question.count({domain: domaine}, function(err,compte) {
    if (err) return console.error(err);
    callback(err, compte);
  });
  
}
    

// Ne marche pas, on ne sait pas pourquoi
//	async.each(
//	  domaines,
//    function(unDomaine, majCompte) {
//      console.log({domain: unDomaine});
//      Question.count({domain: unDomaine}, function(err,compte) {
//        majCompte(err, compte);
//      });
//    },
//    function(err) {
//      if (err) return console.error(err);
//      console.log(reponse);
//      callback(reponse);
//      //disconnect();
//    }
//  );


exports.obtenirNbrQuestionParDomaine = obtenirNbrQuestionParDomaine;
exports.addQuestion = addQuestion;
exports.addEverything = addEverything;
exports.obtenirQuestionParId = obtenirQuestionParId;
exports.questionAleatoireRapide = questionAleatoireRapide;
exports.initExam = initExam;
exports.connect = connect;
exports.disconnect = disconnect;

