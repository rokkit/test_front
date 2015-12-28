var fx = new FX(fxa.dashboard);
var currentUser = JSON.parse(localStorage.getItem('currentUser'));
window.hostUrl = 'http://176.112.194.149:81'
_.templateSettings =  {
  interpolate :/\{\{(.+?)\}\}/g
}
function bodyClick(e){
  $('body').on('click', function(e) {
    TweenLite.to('section.error_tooltip', 1, {opacity: 0});
    fx.back();
  });
}
function bodyClickOff(){
  $('body').off('click');
  $('#reserv_succes_form').css('right', '1600');

}

//Загрузка ачивок и скилов

function card(id){
    var achiv = $(this)
    var el = $('#all_ach figure[data-id='+id+']')
    $('#achivka h2').text(el.find('h6').text())
    $('#achivka p').text(el.attr('data-description'))
    $('#achivka img').attr('src', (el.find('img').attr('src')))
    if(el.data('open') == true) {
      $('#achivka h4').text('Получено')
    } else {
      $('#achivka h4').text('Не получено')
    }
    fx.do(['achiv', 'allAchivBG']);
}

function drawAchievementDetail(name, description, image, open) {
  $('#achivka .skill_header').text(name)
  $('#achivka .skill_description').text(description)
  $('#achivka .item_image').attr('src', image)
  if(open) {
    $('#achivka .skill_state').text('Получено')
  } else {
    $('#achivka .skill_state').text('Не получено')
  }
}

$(function() {

  $.getJSON(window.hostUrl + '/api/v1/achievements.json', {auth_token: currentUser.auth_token, role: currentUser.role}, function(json) {
    $('#achievements').empty()
    $('#all_ach .wrapper_for_ach').empty()
    $('#dashboard_ach_btn').text(currentUser.achievements.length+'/'+json.length)
    var user_achivs = _.map(currentUser.achievements, function(a) { return a.id });

    var achievementsNotViewed = []
    $.each(json, function(i) {
      var klass = ''
      var state = 'Получено'
      if(!this.open) {
        klass = 'color_blue_ach'
        state = 'Не получено'
      } else {
        //показать модалку ачивки если еще не видел ее до этого
        if(!this.viewed) {
          achievementsNotViewed.push(this)
        }
      }
      var template = "<figure data-open="+this.open+" data-id="+this.id+" onclick='card("+this.id+")' data-description='"+this.description+"'><img class='achievments_icon "+klass+"' src='"+window.hostUrl+this.image+"'><ficapation><h6>"+this.name+"</h6><p>"+state+"</p></ficapation></figure>";
      $('#all_ach .wrapper_for_ach').append(template);
    })
    //показать модалку ачивки если еще не видел ее до этого
    if (achievementsNotViewed.length > 0) {
      var achiv = achievementsNotViewed[0]
      setTimeout(function() {
        drawAchievementDetail(achiv.name, achiv.description, hostUrl + achiv.image, achiv.open)
        fx.do(['achiv', 'background'], bodyClick, bodyClickOff);
        $.post(hostUrl + '/api/v1/achievements/'+achiv.id+'/viewed.json', {auth_token: currentUser.auth_token}, function() {

        })
      }, 2000);
    }
    json = json.slice(0, 5)

      $.each(json, function(i) {
        var klass = ''
        var state = 'Получено'
        if(!this.open) {
          klass = 'color_blue_ach'
          state = 'Не получено'
        }
        var template = "<figure data-open="+this.open+" data-description='"+this.description+"'><img class='achievments_icon "+klass+"' src='"+window.hostUrl+this.image+"'><ficapation><h6>"+this.name+"</h6><p>"+state+"</p></ficapation></figure>";
        $('#achievements').append(template)
      })
    })



    $.getJSON(window.hostUrl + '/api/v1/skills.json', {auth_token: currentUser.auth_token, role: currentUser.role}, function(json) {
      $('#skills').empty()

      $('#dashboard_talents_btn').text(currentUser.skills.length+'/'+json.length)
      json = json.slice(0, 5)
        $.each(json, function(i) {

          var klass = ''
          var state = 'Изучен'
          if(!this.has) {
            klass = 'color_blue_ach'
            state = 'Не изучен'
          }
          var template = "<figure data-cost="+this.cost+" data-name='"+this.name+"' data-used_at="+this.used_at+" data-cooldown_end_at='"+this.cooldown_end_at+"' data-can_take="+this.can_take+" data-has="+this.has+" data-id="+this.id+" data-description='"+this.description+"'><img class='achievments_icon "+klass+"' src='"+window.hostUrl+this.image+"'><ficapation><h6>"+this.name+"</h6><p>"+state+"</p></ficapation></figure>";
          $('#skills').append(template)
        })
    })



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
    drawAchievementDetail( achiv.find('h6').text(),
                           achiv.attr('data-description'),
                           achiv.find('img').attr('src'),
                           achiv.data('open')
                          )
    fx.do(['achiv', 'background'], bodyClick, bodyClickOff);
  });
  // Открытие навыка
  $(document).on('click', '#skills figure', function(){
    var skill = $(this)
    var d = $(this).data()
    $('#skill .closing_item').show()
    console.log(d)
    $('#skill .skill_header').text(d.name);
    $('#skill .skill_description').text(d.description);
    $('#skill .item_image').attr('src', (skill.find('img').attr('src')));
    if(d.has) {
      $('#skill .skill_state').text('Изучен')
    } else {
      $('#skill .skill_state').text('Не изучен')
    }
    $('#skill .closing_item').off('click')
    $('#skill .closing_item').on('click', function() {
      console.log('clcik')
      $(this).hide()
      fx.back();
    })
    $('#skill button').attr('disabled', false);
    if(!d.has){
      if(d.can_take){
        console.log('162')

        bodyClickOff()
        $('#skill h4').text('Этот навык доступен для изучения');
        $('#skill button').show();
        $('#skill button').text('Изучить');


        $('#skill button').off('click');
        $('#skill button').on('click', function(){
          $.post(
            'http://176.112.194.149:81/api/v1/skills/'+d.id+'/take.json',
            {auth_token: currentUser.auth_token},
            function(){
              currentUser.skill_point -= d.cost
              fillSkillPointsInfo(currentUser.skill_point)
              $.getJSON(
                'http://176.112.194.149:81/api/v1/skills.json',
                {auth_token: currentUser.auth_token, role: currentUser.role},
                function(json) {
                  $('#skill button').text('Использовать');
                  $('#skill .skill_state').text('Навык изучен')

                  skill.data('has', true)
                  skill.data('can_take', false)
                  skill.find('p').text('Изучен')
                  skill.find('img').removeClass('color_blue_ach')
                  // $('#dashboard_talents_btn').text((currentUser.skills.length)+'/'+data.skillCount);
                  $('#skill button').off()
                  $('#skill button').attr('disabled', false);
                  $('#skill button').on('click', function(){
                    $.post(
                      'http://176.112.194.149:81/api/v1/skills/'+d.id+'/use.json',
                      {auth_token: currentUser.auth_token},
                      function(usedSkill){
                        $.getJSON(
                          'http://176.112.194.149:81/api/v1/skills.json',
                          {auth_token: currentUser.auth_token, role: currentUser.role},
                          function(json) {
                            $('#skill button').off('click');
                            var date = moment(json.used_at).format('DD.MM.YYYY HH:mm');
                            var cooldown_end_at = null;
                            var date_text = 'Вы использовали навык '+ date;
                            if(json.cooldown_end_at) {
                              cooldown_end_at = moment(json.cooldown_end_at)
                              var duration = moment.duration(moment().diff(cooldown_end_at));
                              button_text = 'До использования ' + duration.format("hh:mm").substr(1);
                              $('#skill button').show().text(button_text).attr('disabled', true);
                            } else {
                              $('#skill button').hide()
                            }
                            $('#skill h4').text(date_text);
                        });
                      }
                    );
                  });
              });
            }
          );
        });

      }else{
        $('#skill h4').text('Не изучен');
        $('#skill button').hide();
      }
    }else{
      console.log('224')
      if(d.used_at === null){
        $('#skill h4').text('У вас уже есть этот навык');
        $('#skill button').show();
        $('#skill button').text('Использовать');
        $('#skill button').on('click', function(){
          $.post(
            'http://176.112.194.149:81/api/v1/skills/'+d.id+'/use.json',
            {auth_token: currentUser.auth_token},
            function(){
              $.getJSON(
                'http://176.112.194.149:81/api/v1/skills.json',
                {auth_token: currentUser.auth_token, role: currentUser.role},
                function(json) {
                  $('#skill button').off('click');
              });
            }
          );
        });
      }else{
        var date = moment(d.used_at).format('DD.MM.YYYY HH:mm');
        var cooldown_end_at = null;
        var date_text = 'Вы использовали навык '+ date;
        if(d.cooldown_end_at) {
          cooldown_end_at = moment(d.cooldown_end_at)
          var duration = moment.duration(moment().diff(cooldown_end_at));
          button_text = 'До использования ' + duration.format("hh:mm").substr(1);
          $('#skill button').show().text(button_text).attr('disabled', true);
        } else {
          $('#skill button').hide()
        }
        $('#skill h4').text(date_text);

      }
    }
    $('#skill h2').text(d.name);
    $('#skill p').text(d.description);
    fx.do(['skill', 'background']);
  });


  $('.popup').click(function(event){
    event.stopPropagation();
  });

  $('.popup_vertical').click(function(e){
    e.stopPropagation();
  });

  $('.popup_horizontal').click(function(e){
    e.stopPropagation();
  });

})


window.waitForUserChoose = false;
setInterval(function() {
  if (!window.waitForUserChoose) {
    getNewAchivs()
  }

}, 4000);

function getNewAchivs() {
  $.getJSON(window.hostUrl + '/api/v1/achievements.json', {auth_token: currentUser.auth_token, role: currentUser.role}, function(json) {
    var achievementsNotViewed = []
    $.each(json, function(i) {
      if(this.open && !this.viewed) {
        //показать модалку ачивки если еще не видел ее до этого
        achievementsNotViewed.push(this)
      }
    })
    //показать модалку ачивки если еще не видел ее до этого
    if (achievementsNotViewed.length > 0) {
      window.waitForUserChoose = true
      var achiv = achievementsNotViewed[0]
        drawAchievementDetail(achiv.name, achiv.description, hostUrl + achiv.image, achiv.open)
        fx.do(['achiv', 'background'], function (){
          $('body').on('click', function(e) {
            $.post(hostUrl + '/api/v1/achievements/'+achiv.id+'/viewed.json', {auth_token: currentUser.auth_token}, function() {
                window.waitForUserChoose = false
            })
            fx.back();
          });
        }, bodyClickOff);

        var achivEl = $('#achievements figure[data-id='+achiv.id+']')
        achivEl.data('open', true)
        achivEl.find('img.achievments_icon').removeClass('color_blue_ach').prependTo('#achievements')
    }
  });
}
