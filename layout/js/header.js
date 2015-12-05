$(function(){
  var h, w;
      w = $("#viewport-left").width();
      h = $("#viewport-left").height();
      this.nodesLeft = new Nodes('viewport-left', w, h);
      this.nodesLeft.render;
      this.nodesRight = new Nodes('viewport-right', w, h);
      this.nodesRight.render;
});

var animation = {
  level: '',
  body: {},
  login: {},
  reg: {}
};

function animateBG(){
  animation.body = new TimelineLite()
  .to('.color_overlay', 1, {opacity:"0.8", "-webkit-opacity":"1", 'pointer-events':"auto"}, 'sequence')
  .to('#main_content', 1, {filter:"blur(5px)", "-webkit-filter":"blur(4px)", transform:"scale(0.95, 0.95)"}, 'sequence');
  TweenLite.to('body', 1, {overflow:"hidden"});
}

function animateLogin(){
  TweenLite.to('section.error_tooltip', 1, {opacity: 0});
  animation.login = new TimelineLite()
  .to('#login_form', 1, {left:"190px"})
  .to('#wrapper_login', 0, {'pointer-events':"auto"});

  animation.level = 'login';
}

function animateSignup() {
  TweenLite.to('section.error_tooltip', 1, {opacity: 0});
  animation.reg = new TimelineLite()
  .to('#signup_form', 1, {left:"120px"})
  .to('#wrapper_signup', 0, {'pointer-events':"auto"});

  animation.level = 'reg';
}


function loginReverse(){
  animation.login.reverse();
  animation.body.reverse();
}

function animationReverse(){
  switch (animation.level) {
    case 'login':
      animation.login.reverse();
      TweenLite.to('#wrapper_login', 1, {'pointer-events':"none"});
      break;
    case 'reg':
      animation.reg.reverse();
      break;
    case 3:
      achivkaReverse();
      break;
  }
  animation.body.reverse();
  $('body').css('overflow', "visible");
  $('body').off('click');
  var errTooltip = $('section.error_tooltip').css('opacity');
  if(errTooltip === '1'){
      TweenLite.to('section.error_tooltip', 1, {opacity: 0});
  }
}

$(function() {
  window.tl = null;
  window.hostUrl = 'http://176.112.194.149:81'

  new svgIcon(
    document.querySelector('#menu_header_btn'),
    svgIconConfig,
    { easing : mina.easein, evtoggle : 'mouseover', size : { w : 34, h : 34 } }
  );

  //Клик на кнопку Войти в хедере
  $('#login_header_btn').on('click', function() {
    animateLogin();
    animateBG();
    bodyClick();
  });

  $('#btn1').on('click', function(){
    $('body').click();
    animateSignup();
  });

  $('#login_form a').click(function(){
    animation.login.reverse();
    animateSignup();
    bodyClick();
  });

  $('#signup_form a').click(function(){
    animation.reg.reverse();
    animateLogin();
    bodyClick();
  });

   //Клик на кнопку регистрация в хедере
  $('#signup_header_btn').on('click', function() {
    animateSignup();
    animateBG();
    bodyClick();
  });

  $('#reg_block5').on('click', function(){
    animateSignup();
    animateBG();
    bodyClick();
  });

  $('#menu_right_part button').on('click', function() {
    window.tl.reverse();
    animateForm('login_form');
  });

  $('#reserve_table_btn').on('click', function() {
    animateSignup();
    animateBG();
    bodyClick();
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

  //Создание сесии
  $('#login_form').on('submit', function(e) {
    e.preventDefault()
    doLogin($('#login_form input[name="phone"]').val().replace('+', ''), $('#login_form input[name="password"]').val())
  });

  $('#header img').on('click', function() {
    document.location.href = '/pages_index.html'
  });

  //Регистрация
  $('#signup_form').on('submit', function(e) {
    e.preventDefault()
    var phone = $('#signup_form input[name="phone"]').val().replace('+', '')
    var password = $('#signup_form input[name="password"]').val()
    var name = $('#signup_form input[name="name"]').val()
    if(!phone) {
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
          doLogin(phone, password)
      } else {
        $('#signup_form input').removeClass('wrong')
        if(resp['errors']['name']) {
          TweenLite.to('section.error_tooltip', 1, {opacity: 1});
          $('#signup_form input[name="name"]').addClass('wrong')
        }
        if(resp['errors']['phone']) {
          TweenLite.to('section.error_tooltip', 1, {opacity: 1});
          $('#signup_form input[name="phone"]').addClass('wrong')
        }
        if(resp['errors']['password']) {
          TweenLite.to('section.error_tooltip', 1, {opacity: 1});
          $('#signup_form input[name="password"]').addClass('wrong')
        }
      }
    });
  });
  $('input[name="phone"]').mask('+70000000000')
});

function bodyClick(){
  $('.popup').click(function(event){
    event.stopPropagation();
  });

  $('body').on('click', function(e){
    if(e.target.tagName !== 'BUTTON' && e.target.tagName !== 'A'){
      animationReverse();
    }
  });
}

function animateForm(el) {
  var form = document.getElementById(el)
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
  var tw2 = TweenLite.to('#color_overlay', 1, {opacity:"0.8", "-webkit-opacity":"1", 'pointer-events':"auto"})
  var tw3 = TweenLite.to('#main_content', 1, {filter:"blur(5px)", "-webkit-filter":"blur(4px)", transform:"scale(0.95, 0.95)"})
  var tw4 = TweenLite.to('body', 1, {overflow:"hidden"})
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

  var tw1 = TweenLite.to(left_part, 0.5, {left:"0", onComplete: function() {
    $('#closing').on('click', function(e) {
      window.tl.reverse()
    });
  }})
  var tw2 = TweenLite.to(right_part, 0.5, {right:"0"})
  var tw3 = TweenLite.to(color_overlay, 1, {opacity:"0.8", "-webkit-opacity":"1", 'pointer-events':"auto"})
  var tw4 = TweenLite.to(main_content, 1, {filter:"blur(5px)", "-webkit-filter":"blur(4px)", transform:"scale(0.95, 0.95)"})
  var tw5 = TweenLite.to(html_body, 1, {overflow:"hidden"})
  var tw6 = TweenLite.to(wrapper, 1, {'pointer-events':"auto"})
  window.tl = new TimelineLite().add([tw1,tw2,tw3, tw4, tw5, tw6], 'sequence');
}

function successAuth(resp) {
  TweenLite.to('section.error_tooltip', 1, {opacity: 0});
  localStorage.setItem('currentUser', JSON.stringify(resp))
  document.location.href = './dashboard_client.html'
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
    $(v).attr('class', 'text-color-white');
  });
  $('#'+$('body').data('page')+'_nav_btn').attr('class', 'text-color-orange');

  $('#menu_right_part h3').mouseenter(function(e){
    var ffff = 1;
  });

})

//Переходы по страницам меню
$(function() {
  $('#lounges_nav_btn').on('click', function() {
    document.location.href = '/pages_index.html'
  });
  $('#philosophy_nav_btn').on('click', function() {
    document.location.href = '/pages_philosophy.html'
  });
  $('#community_nav_btn').on('click', function() {
    document.location.href = '/pages_community.html'
  });
});

// PRELOADER
$(function() {
  var html_body = document.getElementById("main_content")
  TweenLite.to(html_body, 1, {opacity:1})
})

//Новости из группы ВК
$(function() {
  VK.init({
    apiId: 5023577
  })
  VK.Api.call('wall.get', {domain: 'libertyfamily', filter: 'owner'}, function(json) {
    json = json.response
    var newsHtml = '<h5><%= text %></h5><p><%= date %> в <%= time %> от #unihuqhookahplaces</p>'
    var newsTpl = _.template(newsHtml)
    var news = _.filter(json, function(post) {
      if (_.isObject(post)) {
        return true//post.text.indexOf('#unihuqhookahplaces') > -1
      }
    })
    news = news.splice(0, 5)
    $('#menu_left_part span').empty()
    _.each(news, function(n) {
        var newsText = strip(n.text).replace('<h5>', '').replace('</h5>', '').substr(0, 140)
        var newsEl = newsTpl({text: newsText, date: '12.04.2015', time: '12:30'})
        $('#menu_left_part span').append(newsEl)
    })
  });
});

function strip(html){
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}
// Конец
