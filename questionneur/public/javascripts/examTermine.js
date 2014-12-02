/* Ce script permet la mise en mémoire des résultats d'un examen */
$(document).ready(function () {

	var nbr;
	var justeExamCourant;
	
	var reponse = $.ajax({
				type: 'POST',
				url: 'examenTermine',
				datatype: 'json',
				success: function (data) {
					
					nbr = data.repTotalCourante; 
					justeExamCourant = data.repJusteCourante;
	
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
