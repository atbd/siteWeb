/*
 * gestion_examen.js
 *
 * Fonctions spécifiques aux examens
 *
 */

function initExam() {
    //alert("init");
    var cat = localStorage.getItem("categorie");
    cat = cat.split(",");
    var nbr = localStorage.getItem("nbrQuestions");

    questionsExam = getExamQuestions(cat, nbr);    
    var nextQuestion = questionsExam.pop();
    localStorage.setItem("idQuestion", nextQuestion.id);
    replaceQuestion(nextQuestion);
    $('#next').click(correctAnswerExam);
}

/*
 * Renvoit des questions correspondant aux critères d'un examen
 */
function getExamQuestions(categories, nbrQuestions) {
    var examQuestions = [];
    
    // On ajoute d'abord toutes les questions correspondant
    // aux catégories demandées
    for(var i = 0; (i < questions.length); i++) {
        if (categories.indexOf(questions[i].domain) != -1) {
            examQuestions.push(questions[i]);
        }
    }
    
    // On enlève ensuite des questions aléatoirement
    // pour avoir seulement nbrQuestions questions
    while (examQuestions.length > nbrQuestions) {
        examQuestions.splice(Math.floor(Math.random()*examQuestions.length),1);
    }
    
    if (examQuestions.length < nbrQuestions) {
        alert("gestion_question.js: Pas assez de questions dispos dans la bdd!");
        return;
    }
    
    return examQuestions;
}

/* 
 * Passe à la question suivante en sauvegardant les réponses
 */
function gotoNextQuestionExam() {
    
    // On pop le tableau de questions de l'examen
    //alert("coucou");
    var nextQuestion = questionsExam.pop();
    
    // On teste si on n'a pas fini l'examen
    if (typeof(nextQuestion) == "undefined")
    {
        //alert("c'est la fin!");
        thisIsTheEnd();
        return;
    }
    
    // Si non, on continue
    $("input[type='radio']:checked").prop('checked',false);
    $('label').css('background-color','white');
    
    localStorage.setItem("idQuestion", nextQuestion.id);
    replaceQuestion(nextQuestion);
    
    $('#next').text("Corriger");
    $('#next').off("click");
    $('#next').click(correctAnswerExam);
    majNoteExam();
} 

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
    
    /* // Je ne comprends pas le but de ce code, tout marche bien sans maintenant
    var nbr = parseInt(localStorage.getItem("nbrQuestions"));
    var repTotal2 = repTotal/2;

    if (repTotal2 <= (nbr-0.5)) {   // n'affiche pas "Terminé" mais fait ce qu'on lui dit sinon...
        $('#next').text("Question suivante");
        $('#next').click(gotoNextQuestionExam);
    }
    else {
        thisIsTheEnd();
    }
    */
        
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

function majNoteExam() {
    repJusteExam = localStorage.getItem("repJusteExam");
    repTotalExam = localStorage.getItem("repTotalExam");

    repJusteExam = (parseInt(repJusteExam)).toString();
    repTotalExam = (parseInt(repTotalExam)).toString();

    $('#noteCourante').text(repJusteExam + "/" + repTotalExam);
}

/*
 * Fin de l'examen
 */
function thisIsTheEnd() {
    $('#next').text("Terminé !");
    $('#next').attr("href", "examenTermine.html");
}

/*
 * Si l'utilisateur abandonne l'examen en cours de route
 */
function abandon() {
    localStorage.setItem("repTotalExam", "X");
    localStorage.setItem("repJusteExam", "0");
}

