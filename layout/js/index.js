$(function() {
  window.hostUrl = 'http://192.168.1.39:82'

  $('#liberty_btn').on('click', function() {

    document.location.href="/pages_lounges_liberty.html"
  });

  // Анимациии Dashboard
  //

  //Открытие всех достижений
  $('#dashboard_ach_btn').on('click', function() {
    animateVertical_popup('all_ach')
  });


  // Открытие всех навыков
  $('#dashboard_talents_btn').on('click', function() {

    animateVertical_popup('all_talents')
  });
  // Открытие достижения
  $(document).on('click', '#achievements figure',function() {
    var achiv = $(this)
    $('#achivka h2').text(achiv.find('h6').text())
    $('#achivka img').attr('src', (achiv.find('img').attr('src')))
    animateOverall_popup('achivka')
  });
});


function animateVertical_popup(el) {
  var all_ach = document.getElementById(el)
  var html_body = document.getElementById("html_body")
  var color_overlay = document.getElementById("color_overlay")
  var main = document.getElementById('main_content')
  var wrapper = $('#all_ach_wrapper')[0]

  var tl = null

  var tw1 = TweenLite.to(all_ach, 1, {top:"80px", onComplete: function() {
    $('body').on('click', function(e) {
      console.log('ss')
      tl.reverse()
    });
  }})
  var tw2 = TweenLite.to(color_overlay, 1, {opacity:"0.8", "-webkit-opacity":"1", 'pointer-events':"auto"})
  var tw3 = TweenLite.to(main_content, 1, {filter:"blur(5px)", "-webkit-filter":"blur(4px)", transform:"scale(0.95, 0.95)"})
  var tw4 = TweenLite.to(html_body, 1, {overflow:"hidden"})
  // var tw4 = TweenLite.to(wrapper, 1, {'pointer-events':"auto"})
  tl = new TimelineLite().add([tw1,tw2,tw3], 'sequence');
}

function animateOverall_popup(el) {
  var achivka = document.getElementById(el)
  var html_body = document.getElementById("html_body")
  var color_overlay = document.getElementById("color_overlay")
  var main = document.getElementById('main_content')
  var tl = null
  var tw1 = TweenLite.to(achivka, 0.5, {top:"0", onComplete: function() {
    $('body').on('click', function(e) {
      tl.reverse()
    });
  }})
  var tw2 = TweenLite.to(color_overlay, 0.5, {opacity:"0.8", "-webkit-opacity":"1", 'pointer-events':"auto"})
  var tw3 = TweenLite.to(main_content, 0.5, {filter:"blur(5px)", "-webkit-filter":"blur(4px)"})
  var tw4 = TweenLite.to(html_body, 0.5, {overflow:"hidden"})
  tl = new TimelineLite().add([tw1,tw2,tw3,tw4], 'sequence');
}






//поиск по карточкам
// $(function() {
//   $('#lounge_search_input').keyup(function() {
//     if($('#lounge_search_input').val() == '') {
//       $('.lounge').fadeIn('fast')
//     }
//     _.each($('.lounge'), function(lounge) {
//       var lounge = $(lounge)
//       if(lounge.find('h4').text().indexOf($('#lounge_search_input').val())> -1) {
//         console.log('found')
//         lounge.fadeIn('fast')
//       } else {
//         console.log('no found')
//         lounge.fadeOut('fast')
//       }
//     })
//   });
// });

// TweenMax.staggerFrom(".stagger_gsap", 2, {scale:0.5, opacity:0, delay:0.5, ease:Elastic.easeOut, force3D:true}, 0.2);
