// Ce script récupère les catégories et nombre de questions voulue par l'utilisateur

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

		localStorage.setItem('categorie', categorie);
		localStorage.setItem('nbrQuestions', nbrQ);
	}));
});
