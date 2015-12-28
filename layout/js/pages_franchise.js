// Открытие попапа
$(function(){

  var franchise_popup = new TimelineMax({paused:true});

  franchise_popup.from("#frn_b6", 0.1, {autoAlpha:0});
  franchise_popup.to("#frn_b6", 0.1, {autoAlpha:1});

  franchise_popup.to(".wrapper_form", 1, {top:"160px", ease: Power4.easeOut, onComplete: function() {
    $('body').on('click', function(e) {
      console.log('body click')
      franchise_popup.reverse();
      $('body').off('click')
    });
  }});
  franchise_popup.to("#html_body", 1, {overflow:"hidden"});

  $(".open_franchise_popup").click(function() {
    franchise_popup.play();
  });

  // $(".cross_white_popup").click(function() {
  //   franchise_popup.reverse();
  //   });

})
