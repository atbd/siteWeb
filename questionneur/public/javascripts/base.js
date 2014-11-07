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
     }
});