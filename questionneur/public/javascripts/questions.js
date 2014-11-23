// Ce script récupère les catégories et nombre de questions voulue par l'utilisateur
// dans le tableau de bord

$(document).ready(function () {
	var nbrQ; 
	var categorie = [];

	$("input[class='button']").click( (function () {
		$("input[type='checkbox']:checked").each( function() {
				categorie.push($(this).attr('name'));
			}
		); 

		nbrQ = parseInt($("input[type='number']").val());

		if( (nbrQ > questions.length) || (categorie.length == 0) )
		{
			alert("Vous voulez trop travailler... Diminuez le nombre de questions. \nOu bien vous n'avez pas sélectionné de catégorie");
			
			$('form').submit( function (e) {
				e.preventDefault();
				window.location.reload();
			});
		}
	}));
});

/*
 * Vérifie qu'une catégorie est bien choisie
 */
$(document).ready(function() {
	$('form').submit( function (e) {
		if ($("input[type='checkbox']:checked").length == 0) {
			alert("Veuillez choisir au moins un domaine");
			e.preventDefault();
		}
	});
});


/*
* Récupération du nombre de questions par domaine dans la BD (ne marche pas encore)
* TODO: faire toutes l'arithmétique lorsque bouton coché ou non
*/
var nbrHTML;
var nbrCSS;
var nbrJS;
var nbrQuestionDispo = 0;

$(document).ready(function() {
	var nbrQuestionDispo = 0;
	var reponse = $.ajax({
		type: 'POST',
		url: 'tableauBord/nbrQuestion',
		datatype: 'json',
		success: function (data) {

		nbrHTML = data.nbrQuestionHTML;
		nbrCSS = data.nbrQuestionCSS;
		nbrJS = data.nbrQuestionJS;
		}
	});
});

if ($("input[name='HTML']").is(':checked')) {
	nbrQuestionDispo += nbrHTML;
}
if ($("input[name='CSS']").is(':checked')) {
	nbrQuestionDispo += nbrCSS;
}
if ($("input[name='JS']").is(':checked')) {
	nbrQuestionDispo += nbrJS;
}
if ($("input[name='HTML']").is(':not(:checked)')) {
	nbrQuestionDispo -= nbrHTML;
}
if ($("input[name='CSS']").is(':not(:checked)')) {
	nbrQuestionDispo -= nbrCSS;
}
if ($("input[name='JS']").is(':not(:checked)')) {
	nbrQuestionDispo -= nbrJS;
}
if ($("input[type='checkbox']").is(':checked')) {
	$("input[type='number']").attr('max', nbrQuestionDispo);
}














