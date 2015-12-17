var fx = new FX(fxa.pages_index);

$(function(){
  $('.popup').click(function(e){
    e.stopPropagation();
  });
});

function bodyClick(e){
  $('body').on('click', function(e) {
    fx.back();
  });
}

function bodyClickOff(){
  $('body').off('click');
  $('#wrapper_signup').css('pointer-events', 'none');
}

$(function(){
  $('#login_header_btn').on('click', function() {
    if (!currentUser) {
      fx.do(['errorTooltip', 'loginPopup', 'background'], bodyClick, bodyClickOff);
    } else {
      document.location.href = '/tech_preloader.html?redirect=profile'
    }
  });

  $('#recover_btn').on('click', function(){
    fx.swap('loginPopup', 'passPopup');
  });

  //Клик на кнопку регистрация в хедере
 $('#signup_header_btn').on('click', function() {

   if (!currentUser) {
     $('#wrapper_signup').css('pointer-events', 'auto');
     fx.do(['errorTooltip', 'signup', 'background'], bodyClick, bodyClickOff);
     //fx.do(['signup']);
   } else {
     document.location.href = '/tech_preloader.html?redirect=profile'
   }
 });

 $('#login_form a').click(function(){
   fx.swap('loginPopup', 'signupPopup');
 });

 $('#pass_form a').click(function(){
   fx.swap('passPopup', 'signupPopup');
 });

 $('#signup_form a').click(function(){
   fx.swap('signupPopup', 'loginPopup');
 });
});

$(function() {
  window.currentUser = JSON.parse(localStorage.getItem('currentUser'))
})

$(function() {
  window.tl = null;
  window.hostUrl = 'http://176.112.194.149:81'

  new svgIcon(
    document.querySelector('#menu_header_btn'),
    svgIconConfig,
    { easing : mina.easein, evtoggle : 'mouseover', size : { w : 34, h : 34 } }
  );

  $('#philosophie_block5 .button-dark').on('click', function(){
    if (!currentUser) {
      fx.do(['errorTooltip', 'loginPopup', 'background'], bodyClick, bodyClickOff);
    } else {
      document.location.href = '/dashboard_client.html'
    }
  });

  $('#reg_block5').on('click', function(){
    animateSignup();
    animateBG();
    bodyClick();
  });

  $('#reserve_table_btn').on('click', function() {
    animateSignup();
    animateBG();
    bodyClick();
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


//Создание сесии
  $('#login_form').on('submit', function(e) {
    e.preventDefault()
    doLogin(formatPhone($('#login_form input[name="phone"]').val()), $('#login_form input[name="password"]').val())
  });

  //Ссылка в логотипе
  $('#menu_header_logo').on('click', function() {
    document.location.href = '/pages_index.html'
  });

  $('#code_form button').on('click', function(){
    var code = $('#code_form input[name="code"]').val();
    $.post(hostUrl + '/api/v1/auth/registrations/confirm', {
      code: code
    }, function(resp){
      successAuth(resp);
    });
  });

  //Регистрация
  $('#signup_form').on('submit', function(e) {
    e.preventDefault()

    var phone = formatPhone($('#signup_form input[name="phone"]').val())
    var password = $('#signup_form input[name="password"]').val()
    var name = $('#signup_form input[name="name"]').val()
    if (password.length < 5) {
      $('.error_tooltip').text('Длина пароля должна быть не менее 5 символов')
      TweenLite.to('section.error_tooltip', 1, {opacity: 1});
      $('#signup_form input[name="password"]').addClass('wrong')
      return
    }
    if(!phone) {
      TweenLite.to('section.error_tooltip', 1, {opacity: 1});
      $('#signup_form input[name="phone"]').addClass('wrong')
    }
    if(!password) {
      $('.error_tooltip').text('Укажите номер телефона правильно')
      TweenLite.to('section.error_tooltip', 1, {opacity: 1});

      $('#signup_form input[name="phone"]').addClass('wrong')
    }
    if(!password) {
      $('.error_tooltip').text('Укажите пароль')
      TweenLite.to('section.error_tooltip', 1, {opacity: 1});
      $('#signup_form input[name="password"]').addClass('wrong')
    }
    if(!name) {
      $('.error_tooltip').text('Укажите своё реальное имя')
      TweenLite.to('section.error_tooltip', 1, {opacity: 1});
      $('#signup_form input[name="name"]').addClass('wrong')
    }

    if(!phone || !password || !name) { return }
    $.post(hostUrl + '/api/v1/auth/registrations.json', {
      phone: phone,
      name: name,
      password: password
    }, function(resp) {
      if(!resp['errors']) {
        $('#wrapper_signup').css('pointer-events', 'none');
        bodyClickOff();
        fx.swap('signup', 'code_form');
          //doLogin(phone, password)
      } else {
        $('#signup_form input').removeClass('wrong')
        if(resp['errors']['name']) {
          TweenLite.to('section.error_tooltip', 1, {opacity: 1});
          $('#error_password').text('Вы не указали имя')
          $('#signup_form input[name="name"]').addClass('wrong')
        }
        if(resp['errors']['phone']) {
          TweenLite.to('section.error_tooltip', 1, {opacity: 1});
          $('#error_password').text('Данный номер телефона уже зарегистрирован в системе')
          $('#signup_form input[name="phone"]').addClass('wrong')
        }
        if(resp['errors']['password']) {
          TweenLite.to('section.error_tooltip', 1, {opacity: 1});
          $('#error_password').text('Укажите пароль')
          $('#signup_form input[name="password"]').addClass('wrong')
        }
      }
    });
  });
  $('input[name="phone"]').mask('+7 (000) 000-00-00')

  //восстановление пароля
  $('#pass_form button').click(function(e) {
    console.log('pass')
    e.preventDefault()
    var phone = formatPhone($('#pass_form input[name="phone"]').val())
    $.post(hostUrl + '/api/v1/auth/sessions/forgot.json', {phone: phone}, function() {
      fx.swap('passPopup', 'loginPopup');
    })
  });
});

function successAuth(resp) {
  if(resp.role == 'user') {
    document.location.href = './dashboard_client.html'
  } else {
    document.location.href = './dashboard_hmaster.html'
  }
  TweenLite.to('section.error_tooltip', 1, {opacity: 0});
  localStorage.setItem('currentUser', JSON.stringify(resp));

}

function doLogin(phone, password) {
  if(!phone) {
    //$('section.error_tooltip').css('opacity', 1);
    $('.error_tooltip').text('Указанный телефон не найден')
    TweenLite.to('section.error_tooltip', 1, {opacity: 1});
    $('#login_form input[name="phone"]').addClass('wrong')
  }
  if(!password) {
    //$('section.error_tooltip').css('opacity', 1);
    $('.error_tooltip').text('Введеный телефон и пароль не совпадают! Попробуйте ввести логин и пароль еще раз.')
    TweenLite.to('section.error_tooltip', 1, {opacity: 1});
    $('#login_form input[name="password"]').addClass('wrong')
  }
  if(!phone || !password) { return }
  $.post(hostUrl + '/api/v1/auth/sessions.json', {
    phone: phone,
    password: password
  }, function(resp) {
    if(!resp['errors']) {
        successAuth(resp)
    } else {
      $('#login_form input').removeClass('wrong')
      if(resp['errors']['phone']) {
        //$('section.error_tooltip').css('opacity', 1)
        TweenLite.to('section.error_tooltip', 1, {opacity: 1});
        $('#login_form input[name="phone"]').addClass('wrong')
      }
      if(resp['errors']['password']) {
        //$('section.error_tooltip').css('opacity', 1)
        TweenLite.to('section.error_tooltip', 1, {opacity: 1});
        $('#login_form input[name="password"]').addClass('wrong')
      }
    }
  });
}

$(function(){
  $('#menu_right_part h3').each(function(i, v){
    //$(v).attr('class', 'text-color-white');
  });
  $('#'+$('body').data('page')+'_nav_btn').attr('class', 'text-color-orange');

  $('#menu_right_part h3').mouseenter(function(e){
    var ffff = 1;
  });

})

//Ссылка в логотипе
$(function() {
  $('#uhp_logo').on('click', function() {
    document.location.href = '/pages_index.html'
  });
});

// PRELOADER
$(function() {
  var html_body = document.getElementById("main_content")
  TweenLite.to(html_body, 1, {opacity:1})
})


// Конец
function formatPhone(raw_number) {
  raw_number = raw_number.replace(/ /g, '').replace('+', '').replace(/-/g, '').replace(/\(/g, '').replace(/\)/g, '')
  return raw_number
}

// Страница 404
////////////////////////////////////////////////////////
$(function() {
  $('#button_404').on('click', function() {
    document.location.href = '/pages_index.html'
  });
});

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
