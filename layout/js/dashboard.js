var currentUser = JSON.parse(localStorage.getItem('currentUser'))
$(function() {

  // Hamburger
  new svgIcon(
    document.querySelector('#menu_header_btn'),
    svgIconConfig,
    { easing : mina.easein, evtoggle : 'mouseover', size : { w : 34, h : 34 } }
  );


  //Работа с сервером
  window.hostUrl = 'http://192.168.1.39:82'

  		if (currentUser) {
      		$('section.username h1').text(currentUser.name)
      		$('#login_btn').text(currentUser.name)
  		}

  	$('#n_o_a').click(function(e){
  		animateForm('reserv_form');
  	});

    $('#invite').click(function(){
      animateForm('invite_form');
    });

    $('#reserv_form').submit(function(e){
      e.preventDefault();
      var form_reserv = document.getElementById('reserv_form');
      TweenLite.to(form_reserv, 1, {left:"1860px"});
      animateFormSuccess('reserv_succes_form');
    });

    $('#reserv_succes_form').submit(function(e){
      var form_success = document.getElementById('reserv_succes_form');
      var html_body3 = document.getElementById("html_body")
      var color_overlay3 = document.getElementById("color_overlay")
      var main3 = document.getElementById('main_content')
      TweenLite.to(form_success, 1, {right:"-1260px"});
      TweenLite.to(html_body3, 1, {overflow:"auto"})
      TweenLite.to(color_overlay3, 1, {opacity:"0", 'pointer-events': 'none'});
      TweenLite.to(main3, 1, {filter:"blur(0px)", "-webkit-filter":"blur(0px)", transform:"scale(1, 1)"});
      e.preventDefault();
    });


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
      $('#achivka p').text(achiv.attr('data-description'))
      $('#achivka img').attr('src', (achiv.find('img').attr('src')))
      animateOverall_popup('achivka')
    });
});

// PRELOADER
$(function() {
  var html_body = document.getElementById("main_content")
  TweenLite.to(html_body, 1, {opacity:1})
})

function bodyClick(tl){
  $('body').on('click', function(e) {
    if(e.target.tagName !== 'BUTTON'){
      tl.reverse();
    }
  });
}

function animateFormSuccess(el) {
  var form2 = document.getElementById(el)
  var html_body2 = document.getElementById("html_body")
  var color_overlay2 = document.getElementById("color_overlay")
  var main2 = document.getElementById('main_content')
  var wrapper2 =document.getElementById('wrapper_login')
  var tl = null

  var tw1 = TweenLite.to(form2, 1, {right:"0px", onComplete: function() {
    $('.popup').click(function(event){
      event.stopPropagation();
    });

    bodyClick(tl);

  }})
  var tw2 = TweenLite.to(color_overlay2, 1, {opacity:"0.8", "-webkit-opacity":"1", 'pointer-events':"auto"})
  var tw3 = TweenLite.to(main2, 1, {filter:"blur(5px)", "-webkit-filter":"blur(4px)", transform:"scale(0.95, 0.95)"})
  var tw4 = TweenLite.to(html_body2, 1, {overflow:"hidden"})
  var tw5 = TweenLite.to(form2, 1, {'pointer-events':"auto"})
  tl = new TimelineLite().add([tw1,tw2,tw3,tw4,tw5], 'sequence');
}

//Анимация формы бронирования
function animateForm(el) {
  var form1 = document.getElementById(el)
  var html_body1 = document.getElementById("html_body")
  var color_overlay1 = document.getElementById("color_overlay")
  var main1 = document.getElementById('main_content')
  var wrapper1 = document.getElementById('wrapper_login')
  var tl = null;
  var tw1 = TweenLite.to(form1, 1, {left:"160px", onComplete: function() {
    $('.popup').click(function(event){
      event.stopPropagation();
    });
    bodyClick(tl);

  }})
  var tw2 = TweenLite.to(color_overlay1, 1, {opacity:"0.8", "-webkit-opacity":"1", 'pointer-events':"auto"})
  var tw3 = TweenLite.to(main1, 1, {filter:"blur(5px)", "-webkit-filter":"blur(4px)", transform:"scale(0.95, 0.95)"})
  var tw4 = TweenLite.to(html_body1, 1, {overflow:"hidden"})
  var tw5 = TweenLite.to(form1, 1, {'pointer-events':"auto"})
  tl = new TimelineLite().add([tw1,tw2,tw3,tw4,tw5], 'sequence');
}

//Анимация модалки всех ачивок
function animateVertical_popup(el) {
  var all_ach = document.getElementById(el)
  var html_body = document.getElementById("html_body")
  var color_overlay = document.getElementById("color_overlay")
  var main = document.getElementById('main_content')
  var wrapper = $('#all_ach_wrapper')[0]

  var tl = null

  var tw1 = TweenLite.to(all_ach, 1, {top:"80px", onComplete: function() {
    bodyClick(tl);
  }})
  var tw2 = TweenLite.to(color_overlay, 1, {opacity:"0.8", "-webkit-opacity":"1", 'pointer-events':"auto"})
  var tw3 = TweenLite.to(main_content, 1, {filter:"blur(5px)", "-webkit-filter":"blur(4px)", transform:"scale(0.95, 0.95)"})
  var tw4 = TweenLite.to(html_body, 1, {overflow:"hidden"})
  var tw5 = TweenLite.to(wrapper, 1, {'pointer-events':"auto"})
  tl = new TimelineLite().add([tw1,tw2,tw3, tw4, tw5], 'normal');
}

//Анимация модалки навыков
function animateOverall_popup(el) {
  var achivka = document.getElementById(el)
  var html_body = document.getElementById("html_body")
  var color_overlay = document.getElementById("color_overlay")
  var main = document.getElementById('main_content')
  var tl = null
  var tw1 = TweenLite.to(achivka, 0.5, {top:"0", onComplete: function() {
    bodyClick(tl);
  }})
  var tw2 = TweenLite.to(color_overlay, 0.5, {opacity:"0.8", "-webkit-opacity":"1", 'pointer-events':"auto"})
  var tw3 = TweenLite.to(main_content, 0.5, {filter:"blur(5px)", "-webkit-filter":"blur(4px)"})
  var tw4 = TweenLite.to(html_body, 0.5, {overflow:"hidden"})
  tl = new TimelineLite().add([tw1,tw2,tw3,tw4], 'normal');
}

//Загрузка ачивок и скилов

$(function() {
  $.getJSON(window.hostUrl + '/api/v1/achievements.json', {auth_token: currentUser.auth_token}, function(json) {
    $('#achievements').empty()
    $('#all_ach .wrapper_for_ach').empty()
    $('#dashboard_ach_btn').text(0+'/'+json.length)
    $.each(json, function(i) {
      var template = "<figure data-description='"+this.description+"'><img class='achievments_icon' src='"+window.hostUrl+this.image+"'><ficapation><h6>"+this.name+"</h6><p>21.09.15</p></ficapation></figure>";
      $('#all_ach .wrapper_for_ach').append(template)
    })
    json = json.slice(0, 6)

      $.each(json, function(i) {
        var template = "<figure data-description='"+this.description+"'><img class='achievments_icon' src='"+window.hostUrl+this.image+"'><ficapation><h6>"+this.name+"</h6><p>21.09.15</p></ficapation></figure>";
        $('#achievements').append(template)
      })
    })
    $.getJSON(window.hostUrl + '/api/v1/skills.json', {auth_token: currentUser.auth_token}, function(json) {
      $('#skills').empty()
      $('#dashboard_talents_btn').text(0+'/'+json.length)
      json = json.slice(0, 5)

        $.each(json, function(i) {
          var template = "<figure><img class='achievments_icon' src='"+window.hostUrl+this.image+"'><ficapation><h6>"+this.name+"</h6><p>21.09.15</p></ficapation></figure>";
          $('#skills').append(template)
        })
    })
})
