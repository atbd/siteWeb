/*
 * gestion_questions.js
 *
 * Fonctions côté client
 */

/*
 * Vérifie qu'une réponse est bien choisie
 * et si c'est le cas effectue une requete ajax pour récupérer la réponse
 */
$(document).ready(function() {
	$('form').submit( function (e) {
		if ($("input[type='radio']:checked").length == 0) {
			alert("Veuillez choisir une réponse");
		}
		else if ($('#next').val() != 'Question suivante') {
			// Requete ajax post qui nous permet de recuperer la bonne reponse
			var reponse = $.ajax({
				type: 'POST',
				url: 'question/corriger',//à adapter si examen
				data: $('form').serialize(),
				datatype: 'json',
				success: function (data) {
					correctAnswers(data);
					}
			});
		}
		e.preventDefault();
		return false // on empeche le navigateur de renvoyer le formulaire
	});
	
	if (window.location.pathname == '/question') {
		var justeString = "justeRapideCourant";
		var totalString = "totalRapideCourant";
	} else {
		var justeString = "justeExamCourant";
		var totalString = "totalExamCourant";
	}
	
	majNote(justeString, totalString);
});

/*
 * Callback de la requete ajax
 * Corrige la question (fond vert/rouge)
 * appel de fonctions pour les stats et se tenir pret à passer à la question suivante
 */
function correctAnswers(data) {

	// On ajoute la classe true (css->fond vert) à la vraie réponse
	$("label[for=" + data.answerIs + "]").addClass('true');
	
	if (window.location.pathname == '/question') {
		var justeString = "justeRapideCourant";
		var totalString = "totalRapideCourant";
	} else {
		var justeString = "justeExamCourant";
		var totalString = "totalExamCourant";
	}
	
	var justeCourant = parseInt(localStorage.getItem(justeString));
	var totalCourant = parseInt(localStorage.getItem(totalString));
	
	// On ajoute la classe false (css->fond rouge) à la réponse fausse
	if (data.answerSent != data.answerIs) {
		$("label[for=" + data.answerSent + "]").addClass('false');
	} else { // si la réponse est juste
		//var justeCourant = parseInt(localStorage.getItem("justeCourant"));
		justeCourant +=1;
		localStorage.setItem(justeString, justeCourant.toString());
	}
	
	totalCourant +=1;
	
	localStorage.setItem(totalString, totalCourant.toString());
	
    changeButton();
    majNote(justeString, totalString);
}

function changeButton() {
	/* On utilise le même bouton pour la correction et le passage à la question
     * suivante, on doit donc enmpêcher à nouveau le submit
     * Note : ce n'est pas du tout élégant
     */
     $('#next').val('Question suivante');
     $('form').submit( function (e) {
     	e.preventDefault();
     	// On va vers la question suivante, donc vers question ou questionExamen
     	// window.location.pathname renvoie 'question' ou 'questionExamen'
     	window.location.href = window.location.pathname;
     });
}

function majNote(justeString, totalString) {
    repJuste = localStorage.getItem(justeString);
    repTotal = localStorage.getItem(totalString);

    $('#noteCourante').text(repJuste + "/" + repTotal);
}


// EN DESSOUS ANCIEN CODE

/*
 * Demarre test rapide
 */
//function startTest() {
//    replaceQuestion(getRandomQuestion());
//    $('#next').click(correctAnswer);
//}

/* 
 * Passe à la question suivante en sauvegardant les réponses
 */
//function gotoNextQuestion() {
//    //alert("goto");
//    $("input[type='radio']:checked").prop('checked',false);
//    $('label').css('background-color','white');
//    replaceQuestion(getRandomQuestion());
//    $('#next').text("Corriger");
//    $("#next").off('click');
//    $('#next').click(correctAnswer);
//    majNote();
//} 

/*
 * Correction des réponses et changement bouton corriger en question suivante
 */
//$.ajax({
//    url: "/question",
//    type: "POST",
//    dataType: "json",
//    data: {objectData: someObject},
//    contentType: "application/json",
//    cache: false,
//    timeout: 5000,
//    complete: function() {
//      //called when complete
//      console.log('process complete');
//    },

//    success: function(data) {
//      console.log(data);
//      console.log('process sucess');
//   },

//    error: function() {
//      console.log('process error');
//    },
//});


//$(document).ready(function() {
//	
//	$('.button#next').click(function corriger(){
//		var repCoche = $("input[type='radio']:checked").val();
//		var vraiReponse = sessionStorage.getItem.current.answerIs;

//        if ( repCoche == vraiReponse) {
//            $("label[for=" + repCoche + "]").css('background-color', 'green');
//            repJuste+=1;

//        } else {
//            $("label[for=" + repCoche + "]").css('background-color', 'red');
//            $("label[for=" + vraiReponse + "]").css('background-color', 'green');
//        }
//    });
//});
	
	
//function correctAnswer() { 
//    
//    if (localStorage.getItem("repJuste")==null) {
//        localStorage.setItem("repJuste", 0);
//    }

//    if (localStorage.getItem("repTotal")==null) {
//        localStorage.setItem("repTotal", 0);
//    }
//    
//    var repJuste = parseInt(sessionStorage.getItem("repJuste"));
//    var repTotal = parseInt(sessionStorage.getItem("repTotal"));

//    if ($("input[type='radio']:checked").length==0) {
//        alert("Choississez une réponse");
//        repTotal -=1;
//        //window.location.reload();
//        return;
//    }

//    var numero = localStorage.getItem('numeroQuestion');
//    var vraiReponse = questions[numero].answerIs;
//    var repCoche = $("input[type='radio']:checked").val();

//        if ( repCoche== vraiReponse) {
//            $("label[for=" + repCoche + "]").css('background-color', 'green');
//            repJuste+=1;

//        } else {
//            $("label[for=" + repCoche + "]").css('background-color', 'red');
//            $("label[for=" + vraiReponse + "]").css('background-color', 'green');
//        }
//    repTotal+=1;
//    
//    localStorage.setItem("repJuste", repJuste.toString());
//    localStorage.setItem("repTotal", repTotal.toString());

//    /* On utilise le même bouton pour la correction et le passage à la question
//     * suivante, on doit donc adapter les évènements click */
//    $('#next').text("Question suivante");
//    $('#next').off("click");
//    $('#next').click(gotoNextQuestion);
//}

//function majNote() {
//    repJuste = localStorage.getItem("repJuste");
//    repTotal = localStorage.getItem("repTotal");

//    repJuste = (parseInt(repJuste)).toString();
//    repTotal = (parseInt(repTotal)).toString();

//    $('#noteCourante').text(repJuste + "/" + repTotal);
//}
//});
