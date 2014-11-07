$(document).ready(function () {

	function tableauQuestions() {
		questions = [];
	  
		// Les questions (source : w3schools.com)
		questions.push({id: 0,
	  				domain: "HTML",
	  				text: "Que signifie le sigle HTML ?",
	  				answer1: "Hyperlinks and Text Markup Language",
	  				answer2: "Home Tool Markup Language",
	  				answer3: "Hyper Text Markup Language",
	  				answer4: "Hotel Tango Mike Lima",
	  				answerIs: "3"});
	  	questions.push({id: 1,
	  				domain: "HTML",
	  				text: "Qui « fait » les standards du web ?",
	  				answer1: "Microsoft",
	  				answer2: "The World Wide Web Consortium",
	  				answer3: "Google",
	  				answer4: "Mozilla",
	  				answerIs: "2"});
	  	questions.push({id: 2,
	  				domain: "HTML",
	  				text: "Choisissez le tag HTML correspondant au plus gros titre :",
	  				answer1: "<head>",
	  				answer2: "<h6>",
	  				answer3: "<heading>",
	  				answer4: "<h1>",
	  				answerIs: "4"});
	  	questions.push({id: 3,
	  				domain: "CSS",
	  				text: "Que signifie CSS ?",
	  				answer1: "Carambar Sweet Shop",
	  				answer2: "Cascading Square Sheets",
	  				answer3: "Collection of Style Sheets",
	  				answer4: "Cascading Style Sheets",
	  				answerIs: "4"});
	  	questions.push({id: 4,
	  				domain: "CSS",
	  				text: "Quel sélecteur correspond aux liens qui sont enfants directs de paragraphes ?",
	  				answer1: "a",
	  				answer2: "p a",
	  				answer3: "p > a",
	  				answer4: "p ~ a",
	  				answerIs: "3"});
	 	questions.push({id: 5,
	  				domain: "CSS",
	  				text: "Quel attribut permet de changer la couleur d'arrière plan d'un bloc ?",
	  				answer1: "color",
	  				answer2: "background-color",
	  				answer3: "display",
	  				answer4: "background",
	  				answerIs: "2"});
	  	questions.push({id: 6,
	  				domain: "CSS",
	  				text: ":hover est…",
	  				answer1: "un pseudo-élément ?",
	  				answer2: "une classe ?",
	  				answer3: "une pseudo-classe ?",
	  				answer4: "un attribut ?",
	  				answerIs: "3"});
	  	questions.push({id: 7,
	  				domain: "JS",
	  				text: "Dans quel élément HTML place-t-on le JavaScript ?",
	  				answer1: "<script>",
	  				answer2: "<scripting>",
	  				answer3: "<javascript>",
	  				answer4: "<js>",
	  				answerIs: "1"});
	  	questions.push({id: 8,
	  				domain: "JS",
	  				text: "Qu'est-ce que jQuery ?",
	  				answer1: "Une bibliothèque JavaScript",
	  				answer2: "Une fonction intégrée à JavaScript",
	  				answer3: "Un élément HTML",
	  				answer4: "Un sélecteur CSS",
	  				answerIs: "1"});
	  	questions.push({id: 9,
	  				domain: "JS",
	  				text: "Qu'est-ce qui est interprété en premier dans un code JavaScript ?",
	  				answer1: "L'affectation des variables'",
	  				answer2: "La déclaration des variables",
	  				answer3: "La déclaration des fonctions",
	  				answer4: "La déclaration des variables et des fonctions",
	  				answerIs: "4"});
	  				 
		this._tableau = questions;
	}
	
	tableauQuestions.prototype.obtenirQuestionParId = function(id) {
		return this._tableau[id];
	};
	
	tableauQuestions.prototype.questionAleatoireRapide = function() {
		var myId = Math.floor(Math.random()*this._tableau.length);
		return tableauQuestions.prototype.obtenirQuestionParId(myId)
	};
});