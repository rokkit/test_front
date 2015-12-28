// Открытие попапа
$(function(){

  var franchise_popup = new TimelineMax({paused:true});

  franchise_popup.from("#frn_b6", 0.01, {autoAlpha:0});
  franchise_popup.to("#frn_b6", 0.01, {autoAlpha:1});

  franchise_popup.to("#html_body", 0.01, {overflow:"hidden"});

  $(".open_franchise_popup").click(function() {
    franchise_popup.play();
  });

  franchise_popup.to(".wrapper_form", 1, {top:"160px", ease: Power4.easeOut, onComplete: function() {
    $('body').on('click', function(e) {
      console.log('body click')
      franchise_popup.reverse();
      $('body').off('click')
    });
    $('.wrapper_form').click(function(e){
     e.stopPropagation();
    });
  }});

  // $(".cross_white_popup").click(function() {
  //   franchise_popup.reverse();
  //   });

})
