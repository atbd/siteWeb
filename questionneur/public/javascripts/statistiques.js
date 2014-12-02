/*
 * statistiques.js
 *
 * Calcul et affichage des statistiques
 *
 */
$(document).ready(function() {
	//afficherStats();
	
	var reponseStat = $.ajax({
		type: 'POST',
		url: 'tableauBord/stats',
		datatype: 'json',
		success: function (data) {
		  $('#cumulRapide').text(data.repJusteGlobale + "/" + data.repTotalGlobale);
		  $('#cumulExam').text(data.pourcentage + "% correct");
		}
	});

	$('#RAZ').click(function () {
		var reponseRaz = $.ajax({
			type: 'POST',
			url: 'tableauBord/raz',
			success: function () {
				window.location.reload();
				// TODO: le rechargement ne fonctionne pas pour l'instant
			}
		}); 
	}); 

	var reponsePopup = $.ajax({
		type: 'POST',
		url: 'tableauBord/popup',
		datatype: 'json',
		success: function (data) {
			//alert("BWAAAAAAAAAAAAAHHHHHHHHH");

			var textStat = "<li>Résultats détaillés des examens</li>";
			var i = 0;
			var domain;
			var juste;
			var total;
			for (i = 0 ; i<data.length ; i++) {		
				juste = data[i].juste;
				total = data[i].total;
				domain = data[i].categorie;

				textStat += "<li> Examen " + (i+1) + " (" + domain + ") :" + juste + "/" + total + "</li>";
			}

			$('#listeDetails').html(textStat);
		}
	});
});


