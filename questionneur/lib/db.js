/*
 * Base de données
 */

questions = [];
  
// Les questions (source : w3schools.com)
questions.push({id: 0,
			domain: "HTML",
			text: "Que signifie le sigle HTML ?",
			answers: ["Hyperlinks and Text Markup Language",
					  "Home Tool Markup Language",
			          "Hyper Text Markup Language",
			          "Hotel Tango Mike Lima"],
			answerIs: "3"});
questions.push({id: 1,
			domain: "HTML",
			text: "Qui « fait » les standards du web ?",
			answers: ["Microsoft",
					  "The World Wide Web Consortium",
			          "Google",
			          "Mozilla"],
			answerIs: "2"});
questions.push({id: 2,
			domain: "HTML",
			text: "Choisissez le tag HTML correspondant au plus gros titre :",
			answers: ["<head>",
					  "<h6>",
			          "<heading>",
			          "<h1>"],
			answerIs: "4"});
questions.push({id: 3,
			domain: "CSS",
			text: "Que signifie CSS ?",
			answers:["Carambar Sweet Shop",
			         "Cascading Square Sheets",
			         "Collection of Style Sheets",
			         "Cascading Style Sheets"],
			answerIs: "4"});
questions.push({id: 4,
			domain: "CSS",
			text: "Quel sélecteur correspond aux liens qui sont enfants directs de paragraphes ?",
			answers:["a",
			         "p a",
			         "p > a",
			         "p ~ a"],
			answerIs: "3"});
questions.push({id: 5,
			domain: "CSS",
			text: "Quel attribut permet de changer la couleur d'arrière plan d'un bloc ?",
			answers:["color",
			         "background-color",
			         "display",
			         "background"],
			answerIs: "2"});
questions.push({id: 6,
			domain: "CSS",
			text: ":hover est…",
			answers:["un pseudo-élément ?",
			         "une classe ?",
			         "une pseudo-classe ?",
			         "un attribut ?"],
			answerIs: "3"});
questions.push({id: 7,
			domain: "JS",
			text: "Dans quel élément HTML place-t-on le JavaScript ?",
			answers:["<script>",
			         "<scripting>",
			         "<javascript>",
			         "<js>"],
			answerIs: "1"});
questions.push({id: 8,
			domain: "JS",
			text: "Qu'est-ce que jQuery ?",
			answers:["Une bibliothèque JavaScript",
			         "Une fonction intégrée à JavaScript",
			         "Un élément HTML",
			         "Un sélecteur CSS"],
			answerIs: "1"});
questions.push({id: 9,
			domain: "JS",
			text: "Qu'est-ce qui est interprété en premier dans un code JavaScript ?",
			answers:["L'affectation des variables'",
			         "La déclaration des variables",
			         "La déclaration des fonctions",
			         "La déclaration des variables et des fonctions"],
			answerIs: "4"});

obtenirQuestionParId = function(id) {
	return questions[id];
};

questionAleatoireRapide = function() {
	var myId = Math.floor(Math.random()*questions.length);
	return obtenirQuestionParId(myId)
};

// On exporte les fonctions qui nous interessent
exports.obtenirQuestionParId = obtenirQuestionParId;
exports.questionAleatoireRapide = questionAleatoireRapide;
