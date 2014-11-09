/*
 * gestion_questions.js
 *
 * Fonctions côté client
 */

/*
 * Vérifie qu'une réponse est bien choisie
 * et effectue la correction si c'est le cas
 */
$(document).ready(function() {
	$('form').submit( function (e) {
		if ($("input[type='radio']:checked").length == 0) {
			alert("Veuillez choisir une réponse");
		}
		else {
			// Requete ajax post qui nous permet de recuperer la bonne reponse
			$.ajax({
				type: 'POST',
				url: 'question/corriger',//à adapter si examen
				data: $('form').serialize(),
				success: correctAnswers,
				datatype: 'json'
			});
		}
		e.preventDefault();
		return false // on empeche le navigateur de renvoyer le formulaire
	});
});

function correctAnswers(data) {
	$("label[for=" + data.answerIs + "]").addClass('true');
	if (data.answerSent != data.answerIs)
		$("label[for=" + data.answerSent + "]").addClass('false');
	
	// TODO: modifier le bouton pour continuer (voir ancien code)
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
