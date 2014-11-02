/*
 * gestion_questions.js
 *
 * Fonctions pour les tests rapides et l'examen
 */

/*
 * Demarre test rapide
 */
function startTest() {
    replaceQuestion(getRandomQuestion());
    $('#next').click(correctAnswer);
}

/*
 * Renvoit une question aléatoire
 */
function getRandomQuestion() {
    if (questions.length < 1) {
        alert("getRandomQuestion: Pas assez de questions dispos !");
        return;
    }
    var numero = Math.floor(Math.random()*questions.length);
    localStorage.setItem('numeroQuestion', numero);
    return questions[numero];
}

/* 
 * Affiche une nouvelle question
 */
function replaceQuestion(newQuestion) {
	$('#domain').text(newQuestion.domain);
	$('#question_text').text(newQuestion.text);
	$('#question label:nth-of-type(1)').text(newQuestion.answer1);
	$('#question label:nth-of-type(2)').text(newQuestion.answer2);
	$('#question label:nth-of-type(3)').text(newQuestion.answer3);
	$('#question label:nth-of-type(4)').text(newQuestion.answer4);
}

/* 
 * Passe à la question suivante en sauvegardant les réponses
 */
function gotoNextQuestion() {
    //alert("goto");
    $("input[type='radio']:checked").prop('checked',false);
    $('label').css('background-color','white');
    replaceQuestion(getRandomQuestion());
    $('#next').text("Corriger");
    $("#next").off('click');
    $('#next').click(correctAnswer);
    majNote();
} 

/*
 * Correction des réponses et changement bouton corriger en question suivante
 */
function correctAnswer() { 
    
    if (localStorage.getItem("repJuste")==null) {
        localStorage.setItem("repJuste", 0);
    }

    if (localStorage.getItem("repTotal")==null) {
        localStorage.setItem("repTotal", 0);
    }
    
    var repJuste = parseInt(localStorage.getItem("repJuste"));
    var repTotal = parseInt(localStorage.getItem("repTotal"));

    if ($("input[type='radio']:checked").length==0) {
        alert("Choississez une réponse");
        repTotal -=1;
        //window.location.reload();
        return;
    }

    var numero = localStorage.getItem('numeroQuestion');
    var vraiReponse = questions[numero].answerIs;
    var repCoche = $("input[type='radio']:checked").val();

        if ( repCoche== vraiReponse) {
            $("label[for=" + repCoche + "]").css('background-color', 'green');
            repJuste+=1;

        } else {
            $("label[for=" + repCoche + "]").css('background-color', 'red');
            $("label[for=" + vraiReponse + "]").css('background-color', 'green');
        }
    repTotal+=1;
    
    localStorage.setItem("repJuste", repJuste.toString());
    localStorage.setItem("repTotal", repTotal.toString());

    /* On utilise le même bouton pour la correction et le passage à la question
     * suivante, on doit donc adapter les évènements click */
    $('#next').text("Question suivante");
    $('#next').off("click");
    $('#next').click(gotoNextQuestion);
}

function majNote() {
    repJuste = localStorage.getItem("repJuste");
    repTotal = localStorage.getItem("repTotal");

    repJuste = (parseInt(repJuste)).toString();
    repTotal = (parseInt(repTotal)).toString();

    $('#noteCourante').text(repJuste + "/" + repTotal);
}
