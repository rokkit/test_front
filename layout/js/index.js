$(function() {
  var hostUrl = 'http://192.168.1.39:82'
  //Клик на кнопку Войти в хедере
  $('#login_btn').on('click', function() {
    //сюда вставить анимацию формы входа
	  var login_form = document.getElementById("login_form")
	  var color_overlay = document.getElementById("color_overlay")
	  var main = document.getElementById('main_content')
  	TweenLite.to(login_form, 1, {left:"0"})
  	TweenLite.to(color_overlay, 1, {opacity:"0.8", "-webkit-opacity":"1", 'pointer-events':"auto"})
  	TweenLite.to(main_content, 1, {filter:"blur(5px)", "-webkit-filter":"blur(4px)", transform:"scale(0.95, 0.95)"})
  });

  //Создание сесии
  $('#login_form').on('submit', function(e) {
    e.preventDefault()
    $.post(hostUrl + '/api/v1/auth/sessions.json', {
      phone: $('#login_form input[name="phone"]').val(),
      password: $('#login_form input[name="password"]').val()
    }, function(resp) {
      console.log(resp)
      if(!resp['errors']) {
          successAuth(resp)
      } else {
        if(resp['errors']['phone']) {
          $('#login_form input[name="phone"]').addClass('wrong')
        }
        if(resp['errors']['password']) {
          $('#login_form input[name="password"]').addClass('wrong')
        }
      }

    });
  });
});

function successAuth(resp) {
  window.currentUser = resp
}
