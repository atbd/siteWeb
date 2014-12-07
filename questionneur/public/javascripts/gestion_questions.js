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
	
	// Action du bouton de retour vers le tableau de bord
	$scope.leavingAction = function() {
		// dans le cas d'un examen, on avertit le serveur
		if (window.location.pathname == '/questionExamen') {
			$http.post('question/abandon').success(function() {
				window.location.href='/tableauBord';
			});
		}
		else {
			window.location.href='/tableauBord';
		}
	};
	
	// On met constamment à jour notre modèle au niveau de la réponse utilisateur
	$scope.$watch('answer.index', function (newIndex) {
		QuestionModel.updateAnswer(newIndex);
	});
	
	// On gère le submit
	$scope.submit = function() {		
		$http.post('/api/question/corriger', {reponse: $scope.answer.index}).success(function(postResponse) {
			$scope.buttonAction = $scope.nextQuestion;
			$scope.buttonName = "Question suivante";
			correctAnswers(postResponse);// pour le surlignage vert/rouge
			$scope.stat = QuestionModel.updateStat({
				"repJusteCourante": postResponse.repJusteCourante,
				"repTotalCourante": postResponse.repTotalCourante
			});
		});
	}
	
	$scope.nextQuestion = function() {
		$http.get('/api' + window.location.pathname).success(function(queryResponse) {
			if (queryResponse.finished == "yes") {
				window.location.href = '../examenTermine';//seule solution trouvée avec angular, apparemment il empêche le redirect d'express
			}
			else {
				$scope.question = QuestionModel.updateQuestion(queryResponse.question);
				$scope.buttonAction = $scope.submit;
				$scope.buttonName = "Corriger";
				$scope.answer = {index: 0};
			}
		});
	};
	
	// Et on lance tout avec cette ligne !
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
 * Dans le callback de la requete ajax
 * Colore la bonne réponse et éventuellement la mauvaise en utilisant jquery (ancien code)
 */
function correctAnswers(data) {
	// On ajoute la classe true (css->fond vert) à la vraie réponse
	$("label[for=" + data.answerIs + "]").addClass('true');
	
	// On ajoute la classe false (css->fond rouge) à la réponse fausse
	if (data.answerSent != data.answerIs) {	
		$("label[for=" + data.answerSent + "]").addClass('false');
	}
}


