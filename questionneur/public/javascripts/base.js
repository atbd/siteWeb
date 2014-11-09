$(document).ready(function () {
    switch (window.location.href.toString().split(window.location.host)[1]) {
        case "/accueil":
            $('#accueil').addClass("current");
            $('#tableauBord').removeClass("current");
            $('#instruction').removeClass("current");
            break;
        
        case "/tableauBord":
            $('#accueil').removeClass("current");
            $('#tableauBord').addClass("current");
            $('#instruction').removeClass("current");
            break;
        
        case "/instructions":
            $('#accueil').removeClass("current");
            $('#tableauBord').removeClass("current");
            $('#instruction').addClass("current");    
            break;
        
        default:
            $('#accueil').removeClass("current");
            $('#tableauBord').removeClass("current");
            $('#instruction').removeClass("current"); 
     }
     
        // pour stocker les notes courantes
     
        if (localStorage.getItem("justeExamCourant")==null) {
             localStorage.setItem("justeExamCourant", 0);
         }
     
         if (localStorage.getItem("totalExamCourant")==null) {
             localStorage.setItem("totalExamCourant", 0);
         }
     
         if (localStorage.getItem("justeRapideCourant")==null) {	
             localStorage.setItem("justeRapideCourant", 0);
         }
     
         if (localStorage.getItem("totalRapideCourant")==null) {
             localStorage.setItem("totalRapideCourant", 0);
         }	
         
         // pour stocker les notes globales
         
         if (localStorage.getItem("justeExam")==null) {
             localStorage.setItem("justeExam", 0);
         }
         
         if (localStorage.getItem("totalExam")==null) {
             localStorage.setItem("totalExam", 0);
         }
         
         if (localStorage.getItem("justeRapide")==null) {	
             localStorage.setItem("justeRapide", 0);
         }
         
         if (localStorage.getItem("totalRapide")==null) {
             localStorage.setItem("totalRapide", 0);
         }
         
         // pour stocker tous les résultats d'exam
         
         if (localStorage.getItem("tableauExam")==null) {
             localStorage.setItem("tableauExam", 0);
         }
});






