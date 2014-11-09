/*
 * statistiques.js
 *
 * Calcul et affichage des statistiques
 *
 */

$(document).ready(function() {
	afficherStats();
});

function afficherStats() {

    // Affichage des résultats des tests rapides
	
    if (localStorage.getItem("totalRapide")==null) {
	    $('#cumulRapide').text("Pas encore de test effectué.");
	
	    } else {

	    var justeRapide = localStorage.getItem("justeRapide");
        var totalRapide = localStorage.getItem("totalRapide");
        var totalRapideCourant = localStorage.getItem("totalRapideCourant");
        var justeRapideCourant = localStorage.getItem("justeRapideCourant");

        justeRapide = parseInt(justeRapide);
        totalRapide = parseInt(totalRapide);
        totalRapideCourant = parseInt(totalRapideCourant);
        justeRapideCourant = parseInt(justeRapideCourant);
        
        totalRapide += totalRapideCourant;
        justeRapide += justeRapideCourant;
        
        localStorage.setItem("totalRapide", totalRapide.toString());
        localStorage.setItem("justeRapide", justeRapide.toString());

	    $('#cumulRapide').text(justeRapide + "/" + totalRapide);
    }

	// Pour l'affichage des résultats d'examens
	
		var totalExamCourant = localStorage.getItem("totalExamCourant");
		var justeExamCourant = localStorage.getItem("justeExamCourant");
		var totalExam = localStorage.getItem("totalExam");
		var justeExam = localStorage.getItem("justeExam");
	
		if (totalExamCourant != "X") {
	
			totalExam = parseInt(totalExam);
			justeExam = parseInt(justeExam);
			totalExamCourant = parseInt(totalExamCourant);
			justeExamCourant = parseInt(justeExamCourant);
	
			totalExam += totalExamCourant;
			justeExam += justeExamCourant;
	
			localStorage.setItem("totalExam", totalExam.toString());
			localStorage.setItem("justeExam", justeExam.toString());
		}
	
		if (totalExam != 0) {
			var pourcentage = ((justeExam/totalExam)*100).toString();
			$('#cumulExam').text(pourcentage + "% correct");
		} else {
			$('#cumulExam').text("Pas encore d'examen effectué");
		}
	
		localStorage.setItem("totalExamCourant", "0");
		localStorage.setItem("justeExamCourant", "0");
		localStorage.setItem("totalRapideCourant", "0");
		localStorage.setItem("justeRapideCourant", "0");	
	
		stats();
	
}

/*
 * Pour le bouton de remise à zero
 */
function raz() {
	localStorage.clear();
	window.location.reload();
}

/*
 * Permet la mise à jour du popup
 */
function stats() {
	var tableauExam;
	var textStat = "<li>Résultats détaillés des examens</li>";

	if (localStorage.getItem("tableauExam") != null) {

		tableauExam = localStorage.getItem("tableauExam");	
		tableauExam = JSON.parse(tableauExam);	// récupération d'un tableau de tableau grâce à ça

		var nbrExam = tableauExam.length;

		var i = 0;
		var domain;
		var juste;
		var total;
		for (i = 0 ; i<nbrExam ; i++) {		// récupération de tous les résultats des différents examens
			juste = tableauExam[i][0];
			total = tableauExam[i][1];
			domain = tableauExam[i][3];

			textStat += "<li> Examen " + (i+1) + " (" + domain + ") :" + juste + "/" + total + "</li>";
		}

		$('#listeDetails').html(textStat);
	}
}

