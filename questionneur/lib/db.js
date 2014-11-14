/*
 * Base de données
 */

// On utilise mongoose pour accéder à notre bdd mongodb
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports.mongoose = mongoose;
module.exports.Schema = Schema;

// Paramètres de connexion
var username = "test"
var password = "test"
var adress = '@ds053320.mongolab.com:53320/questions'

// (Dé)connexion
function connect() {
	var url = 'mongodb://' + username + ':' + password + adress;
	mongoose.connect(url);
}

function disconnect() {
	moongoose.disconnect();
}

// EN-DESSOUS, ANCIEN CODE
questions = [];
  
// Les questions (source : w3schools.com)
questions.push({id: 0,
			domain: "HTML",
			text: "Que signifie le sigle HTML ?",
			answers: ["Hyperlinks and Text Markup Language",
					  "Home Tool Markup Language",
			          "Hyper Text Markup Language",
			          "Hotel Tango Mike Lima"],
			answerIs: "2"});
questions.push({id: 1,
			domain: "HTML",
			text: "Qui « fait » les standards du web ?",
			answers: ["Microsoft",
					  "The World Wide Web Consortium",
			          "Google",
			          "Mozilla"],
			answerIs: "1"});
questions.push({id: 2,
			domain: "HTML",
			text: "Choisissez le tag HTML correspondant au plus gros titre :",
			answers: ["<head>",
					  "<h6>",
			          "<heading>",
			          "<h1>"],
			answerIs: "3"});
questions.push({id: 3,
			domain: "CSS",
			text: "Que signifie CSS ?",
			answers:["Carambar Sweet Shop",
			         "Cascading Square Sheets",
			         "Collection of Style Sheets",
			         "Cascading Style Sheets"],
			answerIs: "3"});
questions.push({id: 4,
			domain: "CSS",
			text: "Quel sélecteur correspond aux liens qui sont enfants directs de paragraphes ?",
			answers:["a",
			         "p a",
			         "p > a",
			         "p ~ a"],
			answerIs: "2"});
questions.push({id: 5,
			domain: "CSS",
			text: "Quel attribut permet de changer la couleur d'arrière plan d'un bloc ?",
			answers:["color",
			         "background-color",
			         "display",
			         "background"],
			answerIs: "1"});
questions.push({id: 6,
			domain: "CSS",
			text: ":hover est…",
			answers:["un pseudo-élément ?",
			         "une classe ?",
			         "une pseudo-classe ?",
			         "un attribut ?"],
			answerIs: "2"});
questions.push({id: 7,
			domain: "JS",
			text: "Dans quel élément HTML place-t-on le JavaScript ?",
			answers:["<script>",
			         "<scripting>",
			         "<javascript>",
			         "<js>"],
			answerIs: "0"});
questions.push({id: 8,
			domain: "JS",
			text: "Qu'est-ce que jQuery ?",
			answers:["Une bibliothèque JavaScript",
			         "Une fonction intégrée à JavaScript",
			         "Un élément HTML",
			         "Un sélecteur CSS"],
			answerIs: "0"});
questions.push({id: 9,
			domain: "JS",
			text: "Qu'est-ce qui est interprété en premier dans un code JavaScript ?",
			answers:["L'affectation des variables'",
			         "La déclaration des variables",
			         "La déclaration des fonctions",
			         "La déclaration des variables et des fonctions"],
			answerIs: "3"});

obtenirQuestionParId = function(id) {
	return questions[id];
};

questionAleatoireRapide = function() {
	var myId = Math.floor(Math.random()*questions.length);
	return obtenirQuestionParId(myId)
};

// renvoie le tableau d'id questions
initExam = function(categories, nbrQuestions) {
	var examQuestions = [];
    
    // On ajoute d'abord toutes les questions correspondant
    // aux catégories demandées
    for(var i = 0; (i < questions.length); i++) {
        if (categories.indexOf(questions[i].domain) != -1) {
            examQuestions.push(questions[i].id);
        }
    }
    
    // On enlève ensuite des questions aléatoirement
    // pour avoir seulement nbrQuestions questions
    while (examQuestions.length > nbrQuestions) {
        examQuestions.splice(Math.floor(Math.random()*examQuestions.length),1);
    }
    
    if (examQuestions.length < nbrQuestions) {
        console.error("gestion_question.js: Pas assez de questions dispos dans la bdd!");
        return;
    }
    
    return examQuestions;
}
	
// On exporte les fonctions qui nous interessent
exports.obtenirQuestionParId = obtenirQuestionParId;
exports.questionAleatoireRapide = questionAleatoireRapide;
exports.initExam = initExam;
