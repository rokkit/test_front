// Изменение хидера при скроле
//......................................................................//
var cbpAnimatedHeader = (function() {

  var docElem = document.documentElement,
      header = document.getElementById("header"),
      didScroll = false,
      changeHeaderOn = 48;

  function init() {
    window.addEventListener( 'scroll', function( event ) {
      if( !didScroll ) {
        didScroll = true;
        setTimeout( scrollPage, 0 );
      }
    }, false );
  }

  function scrollPage() {
    
    var sy = scrollY();
    
    if ( sy >= changeHeaderOn ) {
      $('#header').css({"background": "rgba(0,0,0,0.75", "padding": "16px", "height": "auto"});
    }
    
    else {
      $('#header').css({"background": "none", "padding": "64px 48px 64px", "height": "40px"});
    }
    
    didScroll = false;
  }

  function scrollY() {
    return window.pageYOffset || docElem.scrollTop;
  }

  init();

})();

// Попапы кальянщиков: Резерв
//......................................................................//

// Первая карточка
$(function(){

  var hm_popup = new TimelineMax({paused:true});

  hm_popup.to("#html_body", 0.1, {overflow:"hidden"});
  hm_popup.to("#popup_hm_1", 0.9, {top:0, ease: Power4.easeOut});
  hm_popup.to("#wrapper_hm_popup", 0.1, {'pointer-events':'auto'});

  $("#btn_hm_1").click(function() {
    hm_popup.play();
  });

  $(".cross_white_popup").click(function() {
    hm_popup.reverse();
  });
})

// Вторая карточка
$(function(){

  var hm_popup = new TimelineMax({paused:true});
  
  hm_popup.to("#html_body", 0.1, {overflow:"hidden"});
  hm_popup.to("#popup_hm_2", 0.9, {top:0, ease: Power4.easeOut});
  hm_popup.to("#wrapper_hm_popup", 0.1, {'pointer-events':'auto'});

  $("#btn_hm_2").click(function() {
    hm_popup.play();
  });

  $(".cross_white_popup").click(function() {
    hm_popup.reverse();
  });
})

// Третья карточка
$(function(){

  var hm_popup = new TimelineMax({paused:true});

  hm_popup.to("#html_body", 0.1, {overflow:"hidden"});
  hm_popup.to("#popup_hm_3", 0.5, {top:0, ease: Power4.easeOut});
  hm_popup.to("#wrapper_hm_popup", 0.1, {'pointer-events':'auto'});

  $("#btn_hm_3").click(function() {
    hm_popup.play();
  });

  $(".cross_white_popup").click(function() {
    hm_popup.reverse();
  });
})