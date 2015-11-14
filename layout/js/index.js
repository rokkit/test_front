$(function() {
  //Клик на кнопку Войти в хедере
  $('#login_btn').on('click', function() {
    //сюда вставить анимацию формы входа
   	var login_form = document.getElementById("login_form")
    var html_body = document.getElementById("html_body")
	var color_overlay = document.getElementById("color_overlay")
	var main = document.getElementById('main_content')

  	TweenLite.to(login_form, 1, {left:"0"})
  	TweenLite.to(color_overlay, 1, {opacity:"0.8", "-webkit-opacity":"1", 'pointer-events':"auto"})
  	TweenLite.to(main_content, 1, {filter:"blur(5px)", "-webkit-filter":"blur(4px)", transform:"scale(0.95, 0.95)"})
  	TweenLite.to(html_body, 1, {overflow:"hidden"})
  });
});

// Sign in
$(function() {
  //Клик на кнопку Войти в хедере
  $('#signin_btn').on('click', function() {
    //сюда вставить анимацию формы входа
   	var signin_form = document.getElementById("signin_form")
    var html_body = document.getElementById("html_body")
	var color_overlay = document.getElementById("color_overlay")
	var main = document.getElementById('main_content')

  	TweenLite.to(signin_form, 1, {left:"0"})
  	TweenLite.to(color_overlay, 1, {opacity:"0.8", "-webkit-opacity":"1", 'pointer-events':"auto"})
  	TweenLite.to(main_content, 1, {filter:"blur(5px)", "-webkit-filter":"blur(4px)", transform:"scale(0.95, 0.95)"})
  	TweenLite.to(html_body, 1, {overflow:"hidden"})
  });
});

// Recover pass
$(function() {
  //Клик на кнопку Войти в хедере
  $('#recover_btn').on('click', function() {
    //сюда вставить анимацию формы входа
   	var recover_form = document.getElementById("recover_form")
    var html_body = document.getElementById("html_body")
	var color_overlay = document.getElementById("color_overlay")
	var main = document.getElementById('main_content')

  	TweenLite.to(recover_form, 1, {left:"0"})
  	TweenLite.to(color_overlay, 1, {opacity:"0.8", "-webkit-opacity":"1", 'pointer-events':"auto"})
  	TweenLite.to(main_content, 1, {filter:"blur(5px)", "-webkit-filter":"blur(4px)", transform:"scale(0.95, 0.95)"})
  	TweenLite.to(html_body, 1, {overflow:"hidden"})
  });
	