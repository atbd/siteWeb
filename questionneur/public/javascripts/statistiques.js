/*
 * statistiques.js
 *
 * Calcul et affichage des statistiques
 *
 */

function afficherStats() {

    // Affichage des résultats des tests rapides
	
    if (localStorage.getItem("repTotal")==null) {
	    $('#cumulRapide').text("Pas encore de test effectué.");
	
	    } else {

	    var repJuste = localStorage.getItem("repJuste");
        var repTotal = localStorage.getItem("repTotal");

        repJuste = (parseInt(repJuste)).toString();
        repTotal = (parseInt(repTotal)).toString();

	    $('#cumulRapide').text(repJuste + "/" + repTotal);
    }

    if (localStorage.getItem("repJusteExam")==null) {
        localStorage.setItem("repJusteExam", 0);
    }

    if (localStorage.getItem("repTotalExam")==null) {
        localStorage.setItem("repTotalExam", 0);
    }

    if (localStorage.getItem("totalJuste")==null) {	
	    localStorage.setItem("totalJuste", 0);
    }

    if (localStorage.getItem("total")==null) {
	    localStorage.setItem("total", 0);
    }	

    // Pour l'affichage des résultats d'examens

    var repTotalExam = localStorage.getItem("repTotalExam");
    var repJusteExam = localStorage.getItem("repJusteExam");
    var total = localStorage.getItem("total");
    var totalJuste = localStorage.getItem("totalJuste");

    if (repTotalExam != "X") {

	    total = parseInt(total);
	    totalJuste = parseInt(totalJuste);
	    repTotalExam = parseInt(repTotalExam);
	    repJusteExam = parseInt(repJusteExam);

	    total += repTotalExam;
	    totalJuste += repJusteExam;

	    localStorage.setItem("total", total.toString());
	    localStorage.setItem("totalJuste", totalJuste.toString());
    }

	if (total != 0) {
		var pourcentage = ((totalJuste/total)*100).toString();
		$('#cumulExam').text(pourcentage + "% correct");
	} else {
		$('#cumulExam').text("Pas encore d'examen effectué");
	}

	localStorage.setItem("repTotalExam", "0");
	localStorage.setItem("repJusteExam", "0");	

	stats();
};

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

