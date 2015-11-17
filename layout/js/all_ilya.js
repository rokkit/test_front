$(function() {
  window.hostUrl = 'http://192.168.1.39:82'
  //Клик на кнопку Войти в хедере
  $('#login_header_btn').on('click', function() {
    animateForm("login_form")
  });
  //Клик на кнопку регистрация в хедере
  $('#signup_header_btn').on('click', function() {
    animateForm("signin_form")
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
    doLogin($('#login_form input[name="phone"]').val().replace('+', ''), $('#login_form input[name="password"]').val())
  });
  //Регистрация
  $('#signin_form').on('submit', function(e) {
    e.preventDefault()
    var phone = $('#signin_form input[name="phone"]').val().replace('+', '')
    var password = $('#signin_form input[name="password"]').val()
    var name = $('#signin_form input[name="name"]').val()
    $.post(hostUrl + '/api/v1/auth/registrations.json', {
      phone: phone,
      name: name,
      password: password
    }, function(resp) {
      if(!resp['errors']) {
          doLogin(phone, password)
      } else {
        $('#signin_form input').removeClass('wrong')
        if(resp['errors']['name']) {
          $('#signin_form input[name="name"]').addClass('wrong')
        }
        if(resp['errors']['phone']) {
          $('#signin_form input[name="phone"]').addClass('wrong')
        }
        if(resp['errors']['password']) {
          $('#signin_form input[name="password"]').addClass('wrong')
        }
      }
    });
  });
  $('input[name="phone"]').mask('+0000000000000')
});

function successAuth(resp) {
  window.currentUser = resp
  document.location.href = './dashboard.html'
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

  TweenLite.to(form, 1, {left:"0"})
  TweenLite.to(color_overlay, 1, {opacity:"0.8", "-webkit-opacity":"1", 'pointer-events':"auto"})
  TweenLite.to(main_content, 1, {filter:"blur(5px)", "-webkit-filter":"blur(4px)", transform:"scale(0.95, 0.95)"})
  TweenLite.to(html_body, 1, {overflow:"hidden"})
}
