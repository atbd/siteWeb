/*
 * gestion_examen.js
 *
 * Fonctions spécifiques aux examens
 *
 */



/*
 * Correction des réponses et gestion du bouton question suivante/corriger/fin exam
 * également comptage des reponses justes
 */
function correctAnswerExam() {
    //alert("correction");

    var repJusteExam = parseInt(localStorage.getItem("repJusteExam"));
    var repTotalExam = parseInt(localStorage.getItem("repTotalExam"));

    if ($("input[type='radio']:checked").length==0) {
        alert("Choississez une réponse");
        repTotalExam -=1;
        //window.location.reload();
        return;
    } 
    
    var id = localStorage.getItem('idQuestion');
    var vraiReponse = questions[id].answerIs;
    var repCoche = $("input[type='radio']:checked").val();

    if (repCoche == vraiReponse) {
        $("label[for=" + repCoche + "]").css('background-color', 'green');
        repJusteExam += 1;
    }
    else {
        $("label[for=" + repCoche + "]").css('background-color', 'red');
        $("label[for=" + vraiReponse + "]").css('background-color', 'green');
    }
    repTotalExam += 1;
    
        
    localStorage.setItem("repJusteExam", repJusteExam.toString());
    localStorage.setItem("repTotalExam", repTotalExam.toString());
    
    /* On utilise le même bouton pour la correction et le passage à la question
     * suivante, on doit donc adapter les évènements click */        
    if (questionsExam.length == 0)
        $('#next').text("Terminer");
    else
        $('#next').text("Question suivante");
    
    $('#next').off("click");
    $('#next').click(gotoNextQuestionExam);
}


/*
 * Si l'utilisateur abandonne l'examen en cours de route
 */
function abandon() {
    localStorage.setItem("repTotalExam", "X");
    localStorage.setItem("repJusteExam", "0");
}

