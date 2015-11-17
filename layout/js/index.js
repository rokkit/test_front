$(function() {
  window.hostUrl = 'http://localhost:82'

  // Анимациии в хидере
  //

  //Клик на кнопку Войти в хедере
  $('#login_header_btn').on('click', function() {
    animateForm("login_form")
  });

   //Клик на кнопку регистрация в хедере
  $('#signup_header_btn').on('click', function() {
    animateSignup()
  });

     //Клик на кнопку меню в хедере
  $('#menu_header_btn').on('click', function() {
    animateMenu()
  });

  $('#recover_btn').on('click', function() {
    animateForm('recover_form')
  });
  //Клик на войти в форме регисрации
  $('#login_in_signin_btn').on('click', function() {
    animateForm('login_form')
  });
  //Клик на войти в форме восстановления пароля
  $('#login_in_recover_btn').on('click', function() {
    animateForm('login_form')
  });

  // Анимациии Dashboard
  //

  //Открытие всех достижений
  $('#dashboard_ach_btn').on('click', function() {
    animateVertical_popup('all_ach')
  });
  // Открытие всех навыков
  $('#dashboard_talents_btn').on('click', function() {
    console.log('ss')
    animateVertical_popup('all_talents')
  });
  // Открытие достижения
  $('#dashboard_open_ach_btn').on('click', function() {
    animateOverall_popup('achivka')
  });

  //Создание сесии
  $('#login_form').on('submit', function(e) {
    e.preventDefault()
    doLogin($('#login_form input[name="phone"]').val().replace('+', ''), $('#login_form input[name="password"]').val())
  });
  //Регистрация
  $('#signup_form').on('submit', function(e) {
    e.preventDefault()
    var phone = $('#signup_form input[name="phone"]').val().replace('+', '')
    var password = $('#signup_form input[name="password"]').val()
    var name = $('#signup_form input[name="name"]').val()
    $.post(hostUrl + '/api/v1/auth/registrations.json', {
      phone: phone,
      name: name,
      password: password
    }, function(resp) {
      if(!resp['errors']) {
          doLogin(phone, password)
      } else {
        $('#signup_form input').removeClass('wrong')
        if(resp['errors']['name']) {
          $('#signup_form input[name="name"]').addClass('wrong')
        }
        if(resp['errors']['phone']) {
          $('#signup_form input[name="phone"]').addClass('wrong')
        }
        if(resp['errors']['password']) {
          $('#signup_form input[name="password"]').addClass('wrong')
        }
      }
    });
  });
  $('input[name="phone"]').mask('+0000000000000')
});






function successAuth(resp) {
  localStorage.setItem('currentUser', JSON.stringify(resp))
  document.location.href = './dashboard_client.html'
}

function doLogin(phone, password) {
  $.post(hostUrl + '/api/v1/auth/sessions.json', {
    phone: phone,
    password: password
  }, function(resp) {
    if(!resp['errors']) {
        successAuth(resp)
    } else {
      $('#login_form input').removeClass('wrong')
      if(resp['errors']['phone']) {
        $('#login_form input[name="phone"]').addClass('wrong')
      }
      if(resp['errors']['password']) {
        $('#login_form input[name="password"]').addClass('wrong')
      }
    }
  });
}

function animateForm(el) {
  var form = document.getElementById(el)
  var html_body = document.getElementById("html_body")
  var color_overlay = document.getElementById("color_overlay")
  var main = document.getElementById('main_content')
  var wrapper =document.getElementById('wrapper_login')
  var tl = null;
  var tw1 = TweenLite.to(form, 1, {left:"160px", onComplete: function() {
    $('.popup').click(function(event){
      event.stopPropagation();
    });
    $('body').on('click', function(e) {
      tl.reverse()
    });
  }})
  var tw2 = TweenLite.to(color_overlay, 1, {opacity:"0.8", "-webkit-opacity":"1", 'pointer-events':"auto"})
  var tw3 = TweenLite.to(main_content, 1, {filter:"blur(5px)", "-webkit-filter":"blur(4px)", transform:"scale(0.95, 0.95)"})
  var tw4 = TweenLite.to(html_body, 1, {overflow:"hidden"})
  var tw5 = TweenLite.to(wrapper, 1, {'pointer-events':"auto"})

  tl = new TimelineLite().add([tw1,tw2,tw3, tw4, tw5], 'sequence');

}

function animateSignup() {
  var form = document.getElementById('signup_form')
  var html_body = document.getElementById("html_body")
  var color_overlay = document.getElementById("color_overlay")
  var main = document.getElementById('main_content')
  var wrapper =document.getElementById('wrapper_signup')
  var tl = null;

  var tw1 = TweenLite.to(form, 1, {left:"160px", onComplete: function() {
    $('.popup').click(function(event){
      event.stopPropagation();
    });
    $('body').on('click', function(e) {
      tl.reverse()
    });
  }})
  var tw2 = TweenLite.to(color_overlay, 1, {opacity:"0.8", "-webkit-opacity":"1", 'pointer-events':"auto"})
  var tw3 = TweenLite.to(main_content, 1, {filter:"blur(5px)", "-webkit-filter":"blur(4px)", transform:"scale(0.95, 0.95)"})
  var tw4 = TweenLite.to(html_body, 1, {overflow:"hidden"})
  var tw5 = TweenLite.to(wrapper, 1, {'pointer-events':"auto"})
  tl = new TimelineLite().add([tw1,tw2,tw3, tw4, tw5], 'sequence');
}


function animateMenu() {
  var left_part = document.getElementById("menu_left_part")
  var right_part = document.getElementById("menu_right_part")
  var html_body = document.getElementById("html_body")
  var color_overlay = document.getElementById("color_overlay")
  var main_content = document.getElementById('main_content')
  var wrapper =document.getElementById('wrapper_menu')

  var tl = null
  var tw1 = TweenLite.to(left_part, 0.5, {left:"0", onComplete: function() {
    $('#closing').on('click', function(e) {
      tl.reverse()
    });
  }})
  var tw2 = TweenLite.to(right_part, 0.5, {right:"0"})
  var tw3 = TweenLite.to(color_overlay, 1, {opacity:"0.8", "-webkit-opacity":"1", 'pointer-events':"auto"})
  var tw4 = TweenLite.to(main_content, 1, {filter:"blur(5px)", "-webkit-filter":"blur(4px)", transform:"scale(0.95, 0.95)"})
  var tw5 = TweenLite.to(html_body, 1, {overflow:"hidden"})
  var tw6 = TweenLite.to(wrapper, 1, {'pointer-events':"auto"})
  tl = new TimelineLite().add([tw1,tw2,tw3, tw4, tw5, tw6], 'sequence');
}

function animateVertical_popup(el) {
  var all_ach = document.getElementById(el)
  var html_body = document.getElementById("html_body")
  var color_overlay = document.getElementById("color_overlay")
  var main = document.getElementById('main_content')
  TweenLite.to(all_ach, 1, {top:"80px"})
  TweenLite.to(color_overlay, 1, {opacity:"0.8", "-webkit-opacity":"1", 'pointer-events':"auto"})
  TweenLite.to(main_content, 1, {filter:"blur(5px)", "-webkit-filter":"blur(4px)", transform:"scale(0.95, 0.95)"})
  TweenLite.to(html_body, 1, {overflow:"hidden"})
}

function animateOverall_popup(el) {
  var achivka = document.getElementById(el)
  var html_body = document.getElementById("html_body")
  var color_overlay = document.getElementById("color_overlay")
  var main = document.getElementById('main_content')

  TweenLite.to(achivka, 0.5, {top:"0"})
  TweenLite.to(color_overlay, 0.5, {opacity:"0.8", "-webkit-opacity":"1", 'pointer-events':"auto"})
  TweenLite.to(main_content, 0.5, {filter:"blur(5px)", "-webkit-filter":"blur(4px)"})
  TweenLite.to(html_body, 0.5, {overflow:"hidden"})
}

// PRELOADER
$(function() {
  var html_body = document.getElementById("main_content")
  TweenLite.to(html_body, 1, {opacity:1})
})
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
