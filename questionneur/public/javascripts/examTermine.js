/* Ce script permet la mise en mémoire des résultats d'un examen */
var db = require('../lib/db');

$(document).ready(function () {

	var tmp = [];

	//var justeExamCourant = localStorage.getItem("justeExamCourant");
	//var totalExamCourant = localStorage.getItem("totalExamCourant");
	
	var cat;
	var nbr;
	var justeExamCourant;
	var tmp = [];
	var tableauExam = [];
	
	// on fait une requete pour recuperer les domaines
	// (et le nombre de questions) de l'examen auquel on a repondu
	// note : pas du tout optimisé
	var reponse = $.ajax({
				type: 'POST',
				url: 'examenTermine',
				datatype: 'json',
				success: function (data) {
					
					cat = data.domaines;
					nbr = data.nbrQuestions; // nbr questions de l'examen courant
					justeExamCourant = data.repJusteCourante;

					// ajout dans la db
					var content = {
						"juste": justeExamCourant.toString(),
						"total": nbr.toString(),
						"categorie": cat
					};
					db.ajoutUnExam(content);
	
					// affichage
					$('#noteExam').text(justeExamCourant.toString() + "/" + nbr.toString());

					var reussite = parseInt(justeExamCourant)/parseInt(nbr);
				    if (reussite < 0.25)
				        $('#msg_results').append("<br>Résultats très insuffisants. Révisez votre cours !");
				    else if (reussite >= 0.25 && reussite < 0.5)
				        $('#msg_results').append("<br>Résultats insuffisants. Révisez votre cours et ça ira mieux !");
				    else if (reussite >= 0.5 && reussite < 0.75)
				        $('#msg_results').append("<br>Bon résultats. Continuez sur cette voie et vous aurez tout bon la prochaine fois :-)");
				    else if (reussite >= 0.75 && reussite <= 1)
				        $('#msg_results').append("<br>Excellents résultats. Bravo et continuez ainsi !");
				    else
				        $('#msg_results').append("<br>Examen abandonné. N'ayez pas peur d'aller jusqu'au bout la prochaine fois ;-)");
								}			
	});
});
