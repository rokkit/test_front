var fx = new FX(fxa.dashboard);
var currentUser = JSON.parse(localStorage.getItem('currentUser'));

$(function() {

  //Работа с сервером
  window.hostUrl = 'http://176.112.194.149:81'
  // window.hostUrl = 'http://localhost:3000'

	if (currentUser) {
  		$('section.username h1').text(currentUser.name)
  		$('#login_btn').text(currentUser.name)
      $('#city_user span').text(currentUser.city)
	}
    //Загрузить начальные данные
    $(function() {
      $.getJSON(hostUrl + '/api/v1/users/' + currentUser.id + '.json', {auth_token: currentUser.auth_token}, function(json) {
          var exp = parseInt(json.exp)
          var need_exp_to_levelup = 5000 - exp
          $('.progress_bar p span').text(need_exp_to_levelup)
          var percentsExp = 0
          if(exp != 0) {
              percentsExp = parseInt(5000 / (exp * 100))
          }
          $('.progress').css('width', percentsExp + '%' )
      })
    });

    $('input[name="visit_date"]').on('click', function() {
      $(this).val(moment().format('YYYY-MM-DD'))
    })

    function bodyClickOff(){
      $('body').off('click');
      $('#reserv_succes_form').css('right', '1600');

    }



    //Открытие всех достижений
    $('#dashboard_ach_btn').click(function(){
      fx.do(['allAchiv', 'background'], bodyClick, bodyClickOff);
    });

    $('#all_ach a').click(fx.back);

    $('#all_talents a').click(fx.back);

    // Открытие всех навыков
    $('#dashboard_talents_btn').click(function(){
      fx.do(['skillBoard', 'background'], bodyClick, bodyClickOff);
    });
    // Открытие достижения
    $(document).on('click', '#achievements figure',function() {
      var achiv = $(this)
      $('#achivka h2').text(achiv.find('h6').text())
      $('#achivka p').text(achiv.attr('data-description'))
      $('#achivka img').attr('src', (achiv.find('img').attr('src')))
      fx.do(['achiv', 'background'], bodyClick, bodyClickOff);
      //bodyClick();
    });

    $(document).on('click', '#skills figure', function(){
      var skill = $(this)
      $('#skill h2').text(skill.find('h6').text());
      $('#skill p').text(skill.attr('data-description'));
      $('#skill img').attr('src', (skill.find('img').attr('src')));
      fx.do(['skill', 'background'], bodyClick, bodyClickOff);
      //bodyClick();
    });

    $('.username h1').click(function(){
      fx.do(['background', 'editProfile'], bodyClick, bodyClickOff);
    });

    $('#edit-profile a').click(function(){
      fx.back();
    });

    window.hostUrl = 'http://176.112.194.149:81'
    // window.hostUrlLocal = 'http://localhost:3000'
    var $profile_wrapper = $('#edit-profile-wrapper')
    $profile_wrapper.find('input[name="name"]').val(currentUser.name)
    $profile_wrapper.find('input[name="city"]').val(currentUser.city)
    $profile_wrapper.find('input[name="employe"]').val(currentUser.employe)
    $profile_wrapper.find('input[name="work_company"]').val(currentUser.work_company)
    $profile_wrapper.find('input[name="hobby"]').val(currentUser.hobby)
    $profile_wrapper.find('input[name="phone"]').val('+'+currentUser.phone)
    $profile_wrapper.find('input[name="email"]').val(currentUser.email)

    $('form.edit_profile_form').on('submit', function(e) {
      e.preventDefault()

      var data = $(this).serialize() + '&auth_token='+currentUser.auth_token
      $.ajax({url: hostUrl + '/api/v1/users/' + currentUser.id, data: data, success: function(user) {
        window.currentUser = user
        localStorage.setItem('currentUser', JSON.stringify(user))
        $('section.username h1').text(currentUser.name)
    		$('#login_btn').text(currentUser.name)
        $('#city_user span').text(currentUser.city)
        fx.back();
      }, type: 'PUT'});
    })
});

$(function(){
  $('.popup').click(function(event){
    event.stopPropagation();
  });

  $('.popup_vertical').click(function(e){
    e.stopPropagation();
  });

  $('.popup_horizontal').click(function(e){
    e.stopPropagation();
  });
});

$(function(){

  $('#login_header_btn').on('click', function() {
      document.location.href = '/dashboard_client.html'
      window.currentUser = JSON.parse(localStorage.getItem('currentUser'))

  });
  $('#login_header_btn').text(currentUser.name)
  $('#signup_header_btn').hide()
  // $(document).on('click', '#all_ach figure', function(){
  //
  //   var achiv = $(this)
  //   $('#achivka h2').text(achiv.find('h6').text())
  //   $('#achivka p').text(achiv.attr('data-description'))
  //   $('#achivka img').attr('src', (achiv.find('img').attr('src')))
  //   animateAchivka();
  //   animateAchivBG();
  //   //bodyClick();
  // });
})

// PRELOADER
$(function() {
  var html_body = document.getElementById("main_content")
  TweenLite.to(html_body, 1, {opacity:1})
})

function bodyClick(e){
  $('body').on('click', function(e) {
    TweenLite.to('section.error_tooltip', 1, {opacity: 0});
    fx.back();
  });
}


//Загрузка ачивок и скилов

function card(){
    var achiv = $(this)
    $('#achivka h2').text(achiv.find('h6').text())
    $('#achivka p').text(achiv.attr('data-description'))
    $('#achivka img').attr('src', (achiv.find('img').attr('src')))
    fx.do(['achiv', 'allAchivBG']);
}

$(function() {
  $.getJSON(window.hostUrl + '/api/v1/achievements.json', {auth_token: currentUser.auth_token, role: 'hookmaster'}, function(json) {
    $('#achievements').empty()
    $('#all_ach .wrapper_for_ach').empty()
    $('#dashboard_ach_btn').text(0+'/'+json.length)
    $.each(json, function(i) {
      var template = "<figure onclick='card()' data-description='"+this.description+"'><img class='achievments_icon' src='"+window.hostUrl+this.image+"'><ficapation><h6>"+this.name+"</h6><p>21.09.15</p></ficapation></figure>";
      $('#all_ach .wrapper_for_ach').append(template)
    })
    json = json.slice(0, 5)

      $.each(json, function(i) {
        var template = "<figure data-description='"+this.description+"'><img class='achievments_icon' src='"+window.hostUrl+this.image+"'><ficapation><h6>"+this.name+"</h6><p>21.09.15</p></ficapation></figure>";
        $('#achievements').append(template)
      })
    })
    $.getJSON(window.hostUrl + '/api/v1/skills.json', {auth_token: currentUser.auth_token, role: 'hookmaster'}, function(json) {
      $('#skills').empty()
      $('#dashboard_talents_btn').text(0+'/'+json.length)
      json = json.slice(0, 5)

        $.each(json, function(i) {
          var template = "<figure><img class='achievments_icon' src='"+window.hostUrl+this.image+"'><ficapation><h6>"+this.name+"</h6><p>21.09.15</p></ficapation></figure>";
          $('#skills').append(template)
        })
    })
})
