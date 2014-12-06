/*
 * gestion_questions.js
 *
 * Fonctions côté client
 */

/*
 * Module angularjs
 */
var Quiz = angular.module('Quiz', []);

Quiz.controller('QuestionController', function($scope, $http, QuestionModel) {
	// Init
	$scope.question = QuestionModel.getQuestion();
	$scope.answer = QuestionModel.getAnswer();
	$scope.stat = QuestionModel.getStat();
	
	// On met constamment à jour notre modèle
	$scope.$watch('answer.index', function (newIndex) {
		QuestionModel.updateAnswer(newIndex);
	});
	
	// On gère le submit
	$scope.submit = function() {
		
		$http.post('/api/corriger', {reponse: $scope.answer.index}).success(function(postResponse) {
			$scope.buttonAction = $scope.nextQuestion;
			$scope.buttonName = "Question suivante";
			correctAnswers(postResponse);
			$scope.stat = QuestionModel.updateStat({
				"repJusteCourante": postResponse.repJusteCourante,
				"repTotalCourante": postResponse.repTotalCourante
			});
		});
	}
	
	$scope.nextQuestion = function() {
		$http.get('/api/question').success(function(queryResponse) {
			$scope.question = QuestionModel.updateQuestion(queryResponse.question);
		});
		$scope.buttonAction = $scope.submit;
		$scope.buttonName = "Corriger";
	};
	
	$scope.nextQuestion();
		
});

	

Quiz.service('QuestionModel', function() {
	var question = {domain: "", text: "", answers: [""]};
	var answer = {index: 0};	
	var stat = {"repJusteCourante": 0,
				"repTotalCourante": 0};
	
	this.getQuestion = function() {
		return question;
	};
	
	this.getAnswer = function() {
		return answer;
	};
	
	this.getStat = function() {
		return stat;
	};
	
	this.updateQuestion = function(newQuestion) {
		question = newQuestion;
		return question;
	};
	
	this.updateAnswer = function(newAnswer) {
		answer = newAnswer;
	};
	
	this.updateStat = function(newStat) {
		stat = newStat;
		return stat;
	};
	
});


/*
 * Vérifie qu'une réponse est bien choisie
 * et si c'est le cas effectue une requete ajax pour récupérer la réponse
 */
//$(document).ready(function() {
//	$('form').submit( function (e) {
//		if ($("input[type='radio']:checked").length == 0) {
//			alert("Veuillez choisir une réponse");
//		}
//		else if ($('#next').val() != 'Question suivante') {
//			// Requete ajax post qui nous permet de recuperer la bonne reponse
//			var reponse = $.ajax({
//				type: 'POST',
//				url: 'question/corriger',//à adapter si examen
//				data: $('form').serialize(),
//				datatype: 'json',
//				success: function (data) {
//					correctAnswers(data);
//					}
//			});
//		}
//		e.preventDefault();
//		return false; // on empeche le navigateur de renvoyer le formulaire
//	});

//	// pour notifier de l'abandon d'exam
//	if (window.location.pathname == '/questionExamen') {
//		$('#retour').click(function() {
//			var reponseAbandon = $.ajax({
//					type: 'GET',
//					url: 'question/abandon'
//				});
//		});
//	}

//});

/*
 * Callback de la requete ajax
 * Colore la bonne réponse et éventuellement la mauvaise
 */
function correctAnswers(data) {
	// On ajoute la classe true (css->fond vert) à la vraie réponse
	$("label[for=" + data.answerIs + "]").addClass('true');
	
	// On ajoute la classe false (css->fond rouge) à la réponse fausse
	if (data.answerSent != data.answerIs) {	
		$("label[for=" + data.answerSent + "]").addClass('false');
	}
}

//function changeButton() {
//	/* On utilise le même bouton pour la correction et le passage à la question
//     * suivante, on doit donc enmpêcher à nouveau le submit
//     * Note : ce n'est pas du tout élégant
//     */
//     $('#next').val('Question suivante');
//     $('form').submit( function (e) {
//     	e.preventDefault();
//     	// On va vers la question suivante, donc vers question ou questionExamen
//     	// window.location.pathname renvoie 'question' ou 'questionExamen'
//     	window.location.href = window.location.pathname;
//     });
//}

