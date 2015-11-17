$(function() {
//Работа с сервером
	var currentUser = JSON.parse(localStorage.getItem('currentUser'))
  		if (currentUser) {
      		$('section.username h1').text(currentUser.name)
      		$('#login_btn').text(currentUser.name)
  		}

  	var tw1 = TweenLite;

  	$('#n_o_a').click(function(e){
  		animateForm('reserv_form');
  	});

  	$('#reserv_form').submit(function(e){
  		var form = document.getElementById('reserv_form');
  		TweenLite.to(form, 1, {left:"1860px"});
  		animateForm1('reserv_succes_form');
  		e.preventDefault();
  	});

  	$('#reserv_succes_form').submit(function(e){
  		var form = document.getElementById('reserv_succes_form');
  		TweenLite.to(form, 1, {right:"-1260px"});
  		e.preventDefault();
  	});

	function animateForm1(el) {
	  var form = document.getElementById(el)
	  var html_body = document.getElementById("html_body")
	  var color_overlay = document.getElementById("color_overlay")
	  var main = document.getElementById('main_content')
	  var wrapper =document.getElementById('wrapper_login')

	  tw1.to(form, 1, {right:"0px"})
	  tw1.to(color_overlay, 1, {opacity:"0.8", "-webkit-opacity":"1", 'pointer-events':"auto"})
	  tw1.to(main_content, 1, {filter:"blur(5px)", "-webkit-filter":"blur(4px)", transform:"scale(0.95, 0.95)"})
	  tw1.to(html_body, 1, {overflow:"hidden"})
	  tw1.to(form, 1, {'pointer-events':"auto"})
	}

  	function animateForm(el) {
	  var form = document.getElementById(el)
	  var html_body = document.getElementById("html_body")
	  var color_overlay = document.getElementById("color_overlay")
	  var main = document.getElementById('main_content')
	  var wrapper =document.getElementById('wrapper_login')

	  TweenLite.to(form, 1, {left:"160px"})
	  TweenLite.to(color_overlay, 1, {opacity:"0.8", "-webkit-opacity":"1", 'pointer-events':"auto"})
	  TweenLite.to(main_content, 1, {filter:"blur(5px)", "-webkit-filter":"blur(4px)", transform:"scale(0.95, 0.95)"})
	  TweenLite.to(html_body, 1, {overflow:"hidden"})
	  TweenLite.to(form, 1, {'pointer-events':"auto"})
	}
});
