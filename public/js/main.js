$(document).ready(function(){

  // $('body').scrollspy({target: ".navbar", offset: 50});

  $('body').scrollspy({
    target: '.dotted-scrollspy'
});

  $("#myNavbar a").on('click', function(event) {

    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      var hash = this.hash;

      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 700, function(){

        window.location.hash = hash;
      });
    }
  });

});
