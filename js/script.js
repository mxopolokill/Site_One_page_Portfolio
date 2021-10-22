
(function () {
 "use strict";


   
 var navbarHeight = $(".main-nav").height();
  $("a.btnAbout, a.hire").click(function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") ||
      location.hostname == this.hostname
    ) {

      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {

        $("html,body").animate(
          {
            scrollTop: target.offset().top - navbarHeight,
          },
          100
        );
        return false;
      }
    }
  });
 


 



  //fonction
  imgHover();//éxecution fonction imgHover
  lightboxPhoto();//éxecution fonction lightboxphoto
  winHeight();//éxecution fonction winheght
  barScroll();//éxecution fonction barScroll
  
  //nav container
  $(".navbar").sticky({ topSpacing: 0 });//coler la barre de naviguation au top de la page 
  $('.navbar-nav').onePageNav();//
  $("ul.nav li a").click(function () {//fonction au clic 

    $(".navbar-inverse .navbar-collapse").removeClass("in");//supression dela classe in 
  });
  //contenu
})(); 

$(window).load(function () {//chargment complet de la ressource 

  $("#flex-head").flexslider({//un slider dans le head 

    animation: "slide",//l'animation slide 
    slideshow: true,//diaporama activé 
  });

  navScroll();//éxecution de la fonction navScroll

  $("#filterOptions a").click(function (e) {//fonction au clic 
    e.preventDefault();//si pas de click pas d'utilisation de la function par defaut 

    // activer classe
    $("#filterOptions a").removeClass("cur");//suppression d'une class

    $(this).addClass("cur");//ajout d'une class

    var groupName = $(this).attr("data-group");//obtention valeur d'un atribut 

    $grid.shuffle("shuffle", groupName);//
  });

  var $grid = $("#grid"),
    $sizer = $grid.find(".shuffle__sizer");

  $grid.shuffle({
    itemSelector: ".box",
    sizer: $sizer,
  });
});


$(window).resize(function () {//function de redimensionnement fenetre
  navScroll();//execution fonction NavScroll
  winHeight();//execution fonction winHeight
});
$(window).scroll(function () {//fonction de défillement 
  
  navScroll();//execution de la fonction navScroll
  

});
//fonction

//fonction imgHover
function imgHover() {
  $(".thumb-img").hover(//fonction au passage de la souris 
    function () {
      $(this).find(".link-search, .link-chain").fadeIn();

      $(".link-search").removeClass("fadeOutLeft").addClass("fadeInLeft");//suppression et ajout d'une classe

      $(".link-chain").removeClass("fadeOutRight").addClass("fadeInRight");//suppression et ajout d'une classe

      $(this).children(".folio-caption").animate({//réalise une animation css 

        bottom: "0px",
      });
    },
    function () {
      $(this).find(".link-search, .link-chain").fadeOut();

      $(".link-search").removeClass("fadeInLeft").addClass("fadeOutLeft");

      $(".link-chain").removeClass("fadeInRight").addClass("fadeOutRight");

      $(this).children(".folio-caption").animate({//réalise une animation css 

        bottom: "-58px",
      });
    }
  );
}

function lightboxPhoto() {
  
  $(document).delegate('*[data-toggle="lightbox"]', "click", function (event) {//atachement d'un gestionnaire d'évenement pour l'éveleement 

    event.preventDefault();
    $(this).ekkoLightbox();
  });
}
//fonction Navscroll 
function navScroll() {

  var top = $(window).scrollTop();

  if (top > 3) {

    $(".main-nav").fadeIn();//laissant les élément bien visible 
  } else {

    $(".main-nav").fadeOut();//transparrance  d'élement 
  }
}

//fonction winHeght 
function winHeight() {
  //taille header
  var wHeight = $(window).height();
  $(".header").height(wHeight);
}

//fonction barScroll
function barScroll() {
  //démarre la fonction aprés 300ms
  setTimeout(function () { 
//Interroger un objet jQuery, en exécutant une fonction pour chaque élément correspondant.
    $(".progress-bar").each(function () {
      var me = $(this);
      //récuperation du fils de l'élement 
      var pe = $(this).children(".precent-value");
      //récuperation de la valeur de l'élement 
      var perc = me.attr("aria-valuenow");

      var current_perc = 0;

      var progress = setInterval(function () { //démarage des barres de progression a partir d'un delais spécifique 

        if (current_perc >= perc) {

          clearInterval(progress);//efface le timer prédéfini par le setinterval 
        } else {
          current_perc += 1;

          me.css("width", current_perc + "%");//définition propriété HTML 
        }

        pe.text(current_perc + "%");//ajout text
      }, 90);
    });
  }, 300);
}
