/* Ce script permet la mise en mémoire (localStorage) des résultats d'un examen */

$(document).ready(function () {

	var tmp = [];

	var justeExamCourant = localStorage.getItem("justeExamCourant");
	var totalExamCourant = localStorage.getItem("totalExamCourant");
	
	var cat;
	var nbr;
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
					tmp = [justeExamCourant, nbr, cat];

					if (localStorage.getItem("tableauExam")!=null) {
		
						tableauExam = localStorage.getItem("tableauExam");
						tableauExam = JSON.parse(tableauExam);
					}
	
					tableauExam.push(tmp);

					localStorage.setItem("tableauExam", JSON.stringify(tableauExam));
					$('#noteExam').text(justeExamCourant + "/" + totalExamCourant);
				}
				
	});
});

$(document).ready(function message() {
    var reussite = parseInt(localStorage.getItem("justeExamCourant"))/parseInt(localStorage.getItem("totalExamCourant"));
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
});
