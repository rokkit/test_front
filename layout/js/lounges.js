// var fx = new FX(fxa.pages_index);
//
// $(function(){
//   $('.popup').click(function(e){
//     e.stopPropagation();
//   });
// });
//
// function bodyClick(e){
//   $('body').on('click', function(e) {
//     fx.back();
//   });
// }
//
// function bodyClickOff(){
//   $('body').off('click');
// }
//
// $(function(){
//   $('#login_header_btn').on('click', function() {
//     if (!currentUser) {
//       fx.do(['errorTooltip', 'loginPopup', 'background'], bodyClick, bodyClickOff);
//     } else {
//       document.location.href = '/dashboard_client.html'
//     }
//   });
//
//   //Клик на кнопку регистрация в хедере
//  $('#signup_header_btn').on('click', function() {
//    fx.do(['errorTooltip', 'signupPopup', 'background'], bodyClick, bodyClickOff);
//  });
//
//  $('#login_form a').click(function(){
//    fx.swap('loginPopup', 'signupPopup');
//  });
//
//  $('#signup_form a').click(function(){
//    fx.swap('signupPopup', 'loginPopup');
//  });
// });

//Клик на кнопку Войти в хедере

$(function(){
  window.hostUrl = 'http://176.112.194.149:81'
  $.getJSON(hostUrl + '/api/v1/lounges.json', {}, function(json) {

    $.each(json, function() {
      if(this.title != 'Либерти') {
        ui.card.render(this.blazon, this.color, this.title, this.city, '.lounges');
      }
    })

  });

  $(document).on('click', '#oblaka-card', function() {
    document.location.href="/pages_lounges_oblaka.html"
  })
  $(document).on('click', '#academy_novosibirsk-card', function() {
    document.location.href="/pages_lounges_academy.html"
  })
  $(document).on('click', '#unityhall-card', function() {
    document.location.href="/pages_lounges_unityhall.html"
  })
  $(document).on('click', '#reserv-card', function() {
    document.location.href="/pages_lounges_rezerv.html"
  })
  $(document).on('click', '#liberty-card', function() {
    document.location.href="/pages_lounges_liberty.html"
  })
  $(document).on('click', '#ak_bars-card', function() {
    document.location.href="/pages_lounges_craft.html"
  })
});
