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
	$scope.question = QuestionModel.question();
	$scope.stat = QuestionModel.stat();
}); 

Quiz.service('QuestionModel', function() {
	this.question = function() {
		return {domain: "hello", text: "world", answers: ["1", "2", "3", "4"]}
	};
	this.answer = function() { return "not chosen yet" };
	this.stat = function() { return "stat" };
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
 * Corrige la question (fond vert/rouge)
 * appel de fonctions pour les stats et se tenir pret à passer à la question suivante
 */
function correctAnswers(data) {	// fera juste la coloration au final

	// On ajoute la classe true (css->fond vert) à la vraie réponse
	$("label[for=" + data.answerIs + "]").addClass('true');
	
	// On ajoute la classe false (css->fond rouge) à la réponse fausse
	if (data.answerSent != data.answerIs) {	
		$("label[for=" + data.answerSent + "]").addClass('false');
	} 
	
    changeButton();
    $('#noteCourante').text(data.repJusteCourante + "/" + data.repTotalCourante);
}

function changeButton() {
	/* On utilise le même bouton pour la correction et le passage à la question
     * suivante, on doit donc enmpêcher à nouveau le submit
     * Note : ce n'est pas du tout élégant
     */
     $('#next').val('Question suivante');
     $('form').submit( function (e) {
     	e.preventDefault();
     	// On va vers la question suivante, donc vers question ou questionExamen
     	// window.location.pathname renvoie 'question' ou 'questionExamen'
     	window.location.href = window.location.pathname;
     });
}

