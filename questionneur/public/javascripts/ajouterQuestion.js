$(document).ready(function() {
	$('form').submit( function (e) {
		if ($("input[type='radio']:checked").length == 0 || $("input[type='text']").val().length == 0) {
			alert("Veuillez remplir tout les champs.");
			e.preventDefault();
		}
	});
});