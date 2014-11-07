/* Ce script permet la mise en mémoire (localStorage) des résultats d'un examen */

$(document).ready(function () {

	var tmp = [];

	var repJusteExam = localStorage.getItem("repJusteExam");
	var repTotalExam = localStorage.getItem("repTotalExam");

    if (repTotalExam != "X") {
	    repJusteExam = (parseInt(repJusteExam)).toString();
	    repTotalExam = (parseInt(repTotalExam)).toString();
    }

	var cat = localStorage.getItem("categorie");
	var nbr = localStorage.getItem("nbrQuestions");

	tmp = [repJusteExam, repTotalExam, nbr, cat];

	var tableauExam = [];

	if (localStorage.getItem("tableauExam")==null) {
		tableauExam.push(tmp);
	} else {
		
		tableauExam = localStorage.getItem("tableauExam");
		tableauExam = JSON.parse(tableauExam);
		tableauExam.push(tmp);
	}

	localStorage.setItem("tableauExam", JSON.stringify(tableauExam));

	$('#noteExam').text(repJusteExam + "/" + repTotalExam);
});

$(document).ready(function message() {
    var reussite = parseInt(localStorage.getItem("repJusteExam"))/parseInt(localStorage.getItem("repTotalExam"));
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
