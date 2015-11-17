$(function() {
  //Работа с сервером
  window.hostUrl = 'http://192.168.1.39:82'
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
  		TweenLite.to(color_overlay, 1, {opacity:"0",});
  		TweenLite.to(main_content, 1, {filter:"blur(0px)", "-webkit-filter":"blur(0px)", transform:"scale(1, 1)"});
  		e.preventDefault();
  	});

	function animateForm1(el) {
	  var form = document.getElementById(el)
	  var html_body = document.getElementById("html_body")
	  var color_overlay = document.getElementById("color_overlay")
	  var main = document.getElementById('main_content')
	  var wrapper =document.getElementById('wrapper_login')
    var tl = null
	  var tw1 = TweenLite.to(form, 1, {right:"0px"})
	  var tw2 = TweenLite.to(color_overlay, 1, {opacity:"0.8", "-webkit-opacity":"1", 'pointer-events':"auto"})
	  var tw3 = TweenLite.to(main_content, 1, {filter:"blur(5px)", "-webkit-filter":"blur(4px)", transform:"scale(0.95, 0.95)"})
	  var tw4 = TweenLite.to(html_body, 1, {overflow:"hidden"})
	  var tw5 = TweenLite.to(form, 1, {'pointer-events':"auto"})
    tl = new TimelineLite().add([tw1,tw2,tw3, tw4, tw5], 'sequence');
    return tl;
	}

  	function animateForm(el) {
	  var form = document.getElementById(el)
	  var html_body = document.getElementById("html_body")
	  var color_overlay = document.getElementById("color_overlay")
	  var main = document.getElementById('main_content')
	  var wrapper =document.getElementById('wrapper_login')

    var tl = null
	  var tw1 = TweenLite.to(form, 1, {left:"160px"})
	  var tw2 = TweenLite.to(color_overlay, 1, {opacity:"0.8", "-webkit-opacity":"1", 'pointer-events':"auto"})
	  var tw3 = TweenLite.to(main_content, 1, {filter:"blur(5px)", "-webkit-filter":"blur(4px)", transform:"scale(0.95, 0.95)"})
	  var tw4 = TweenLite.to(html_body, 1, {overflow:"hidden"})
	  var tw5 = TweenLite.to(form, 1, {'pointer-events':"auto"})
    tl = new TimelineLite().add([tw1,tw2,tw3, tw4, tw5], 'sequence');
	}

	$.getJSON(window.hostUrl + '/api/v1/achievements.json', {auth_token: currentUser.auth_token}, function(json) {
		$('#achievements').empty()
    // $('#all_ach .wrapper_for_ach').empty()
		$('#dashboard_ach_btn').text(0+'/'+json.length)
    $.each(json, function(i) {
      var template = "<figure><img class='achievments_icon' src='"+window.hostUrl+this.image+"'><ficapation><h6>"+this.name+"</h6><p>21.09.15</p></ficapation></figure>";
      $('#all_ach .wrapper_for_ach').append(template)
    })
		json = json.slice(0, 6)

			$.each(json, function(i) {
				var template = "<figure><img class='achievments_icon' src='"+window.hostUrl+this.image+"'><ficapation><h6>"+this.name+"</h6><p>21.09.15</p></ficapation></figure>";
				$('#achievements').append(template)
			})
		})
		$.getJSON(window.hostUrl + '/api/v1/skills.json', {auth_token: currentUser.auth_token}, function(json) {
			$('#skills').empty()
			$('#dashboard_talents_btn').text(0+'/'+json.length)
			json = _.sortBy(json, function(a) { a.name })
			json = json.slice(0, 5)

				$.each(json, function(i) {
					var template = "<figure><img class='achievments_icon' src='"+window.hostUrl+this.image+"'><ficapation><h6>"+this.name+"</h6><p>21.09.15</p></ficapation></figure>";
					$('#skills').append(template)
				})
		})
});
